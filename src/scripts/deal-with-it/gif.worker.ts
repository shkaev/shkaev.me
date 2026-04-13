import { GIFEncoder, applyPalette, quantize } from "gifenc";
import { EXPORT_CONFIG } from "./shared";

interface RenderMessage {
	sourceDataUrl: string;
	glassesUrl: string;
	placement: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
}

const loadBitmap = async (src: string): Promise<ImageBitmap> => {
	const response = await fetch(src);
	const blob = await response.blob();
	return createImageBitmap(blob);
};

const getAnimatedY = (frameIndex: number, targetY: number, targetHeight: number) => {
	const progress = frameIndex / Math.max(1, EXPORT_CONFIG.frameCount - 1);
	const eased = 1 - (1 - progress) ** 3;
	const startY = -targetHeight;
	return startY + (targetY - startY) * eased;
};

self.onmessage = async (event: MessageEvent<RenderMessage>) => {
	try {
		const { sourceDataUrl, glassesUrl, placement } = event.data;
		const [sourceBitmap, glassesBitmap] = await Promise.all([
			loadBitmap(sourceDataUrl),
			loadBitmap(glassesUrl)
		]);

		const canvas = new OffscreenCanvas(
			EXPORT_CONFIG.outputSize,
			EXPORT_CONFIG.outputSize
		);
		const context = canvas.getContext("2d", { willReadFrequently: true });

		if (!context) {
			throw new Error("Could not create rendering context.");
		}

		const gif = GIFEncoder();

		for (let frameIndex = 0; frameIndex < EXPORT_CONFIG.frameCount; frameIndex += 1) {
			context.clearRect(0, 0, EXPORT_CONFIG.outputSize, EXPORT_CONFIG.outputSize);
			context.drawImage(
				sourceBitmap,
				0,
				0,
				EXPORT_CONFIG.outputSize,
				EXPORT_CONFIG.outputSize
			);

			const targetX = placement.x * EXPORT_CONFIG.outputSize;
			const targetY = placement.y * EXPORT_CONFIG.outputSize;
			const targetWidth = placement.width * EXPORT_CONFIG.outputSize;
			const targetHeight = placement.height * EXPORT_CONFIG.outputSize;

			context.drawImage(
				glassesBitmap,
				targetX,
				getAnimatedY(frameIndex, targetY, targetHeight),
				targetWidth,
				targetHeight
			);

			const imageData = context.getImageData(
				0,
				0,
				EXPORT_CONFIG.outputSize,
				EXPORT_CONFIG.outputSize
			);
			const palette = quantize(imageData.data, 256);
			const indexedFrame = applyPalette(imageData.data, palette);

			gif.writeFrame(indexedFrame, EXPORT_CONFIG.outputSize, EXPORT_CONFIG.outputSize, {
				palette,
				delay:
					frameIndex === EXPORT_CONFIG.frameCount - 1
						? EXPORT_CONFIG.lastFrameDelayMs
						: EXPORT_CONFIG.frameDelayMs,
				repeat: frameIndex === 0 ? EXPORT_CONFIG.repeat : undefined
			});
		}

		gif.finish();
		const bytes = gif.bytes();
		const blob = new Blob([bytes], { type: "image/gif" });

		self.postMessage({
			type: "success",
			blob
		});
	} catch (error) {
		self.postMessage({
			type: "error",
			message: error instanceof Error ? error.message : "Unknown GIF generation error."
		});
	}
};
