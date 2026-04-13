import { FaceDetector, FilesetResolver, type Detection } from "@mediapipe/tasks-vision";
import { GIFEncoder, applyPalette, quantize } from "gifenc";
import {
	ACCEPTED_IMAGE_TYPES,
	DEAL_WITH_IT_GLASSES,
	EXPORT_CONFIG,
	FACE_DETECTOR_MODEL_URL,
	MEDIAPIPE_WASM_BASE,
	MAX_UPLOAD_BYTES,
	type DealWithItAppConfig,
	type DealWithItGlassesAsset
} from "./shared";

type Step = "upload" | "editor" | "result";

interface Point {
	x: number;
	y: number;
}

interface FaceGeometry {
	x: number;
	y: number;
	width: number;
	height: number;
	leftEye?: Point;
	rightEye?: Point;
	nose?: Point;
}

interface Placement {
	x: number;
	y: number;
	width: number;
	height: number;
}

interface CropRect {
	x: number;
	y: number;
	size: number;
}

const buildCenterCropRect = (
	imageWidth: number,
	imageHeight: number
): CropRect => {
	const size = Math.min(imageWidth, imageHeight);

	return {
		x: Math.round((imageWidth - size) / 2),
		y: Math.round((imageHeight - size) / 2),
		size: Math.round(size)
	};
};

interface AppState {
	step: Step;
	isUploading: boolean;
	isGenerating: boolean;
	uploadError: string | null;
	editorError: string | null;
	inputFile: File | null;
	previewDataUrl: string | null;
	previewSize: number;
	faceGeometry: FaceGeometry | null;
	selectedGlassesId: string;
	generatedGifBlob: Blob | null;
	generatedGifUrl: string | null;
	basePlacement: Placement | null;
	placement: Placement | null;
	manualOffset: Point;
	manualScale: number;
	manualRotation: number;
}

const PREVIEW_MAX_SIZE = 512;

const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

const parseConfig = (root: HTMLElement): DealWithItAppConfig => {
	const configElement = root.querySelector(
		"[data-deal-with-it-config]"
	);

	if (!(configElement instanceof HTMLScriptElement) || !configElement.textContent) {
		throw new Error("Deal with it config is missing.");
	}

	return JSON.parse(configElement.textContent) as DealWithItAppConfig;
};

const loadImageElement = (src: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.decoding = "async";
		image.onload = () => resolve(image);
		image.onerror = () => reject(new Error("Image could not be loaded."));
		image.src = src;
	});

const fileToObjectUrl = (file: File) => URL.createObjectURL(file);

const imageFileToLoadedImage = async (file: File) => {
	const objectUrl = fileToObjectUrl(file);

	try {
		return await loadImageElement(objectUrl);
	} finally {
		URL.revokeObjectURL(objectUrl);
	}
};

const createFaceDetector = async () => {
	const vision = await FilesetResolver.forVisionTasks(MEDIAPIPE_WASM_BASE);
	return FaceDetector.createFromOptions(vision, {
		baseOptions: {
			modelAssetPath: FACE_DETECTOR_MODEL_URL,
			delegate: "CPU"
		},
		runningMode: "IMAGE",
		minDetectionConfidence: 0.5
	});
};

const wait = (ms: number) =>
	new Promise<null>((resolve) => {
		window.setTimeout(() => resolve(null), ms);
	});

const selectPrimaryDetection = (detections: Detection[]) =>
	[...detections].sort((left, right) => {
		const leftBox = left.boundingBox;
		const rightBox = right.boundingBox;

		const leftArea = leftBox ? leftBox.width * leftBox.height : 0;
		const rightArea = rightBox ? rightBox.width * rightBox.height : 0;

		return rightArea - leftArea;
	})[0];

const buildStrictCropRect = (
	detection: Detection,
	imageWidth: number,
	imageHeight: number
): CropRect | null => {
	const box = detection.boundingBox;

	if (!box) {
		return null;
	}

	const maxDimension = Math.max(box.width, box.height);
	const minimumSide = maxDimension * 1.35;
	const targetSide = Math.min(
		Math.min(imageWidth, imageHeight),
		maxDimension * 2.4
	);

	if (targetSide < minimumSide) {
		return null;
	}

	const half = targetSide / 2;
	const centerX = box.originX + box.width / 2;
	const centerY = box.originY + box.height / 2 - box.height * 0.08;

	let x = centerX - half;
	let y = centerY - half;

	x = clamp(x, 0, imageWidth - targetSide);
	y = clamp(y, 0, imageHeight - targetSide);

	return {
		x: Math.round(x),
		y: Math.round(y),
		size: Math.round(targetSide)
	};
};

const cropToSquarePreview = async (
	image: HTMLImageElement,
	crop: CropRect
) => {
	const previewSize = Math.min(PREVIEW_MAX_SIZE, crop.size);
	const canvas = document.createElement("canvas");
	canvas.width = previewSize;
	canvas.height = previewSize;
	const context = canvas.getContext("2d");

	if (!context) {
		throw new Error("Canvas context is unavailable.");
	}

	context.drawImage(
		image,
		crop.x,
		crop.y,
		crop.size,
		crop.size,
		0,
		0,
		previewSize,
		previewSize
	);

	return {
		previewSize,
		dataUrl: canvas.toDataURL("image/png")
	};
};

const getFaceGeometry = (
	detection: Detection,
	crop: CropRect,
	imageWidth: number,
	imageHeight: number,
	previewSize: number
): FaceGeometry | null => {
	const box = detection.boundingBox;

	if (!box) {
		return null;
	}

	const scale = previewSize / crop.size;
	const geometry: FaceGeometry = {
		x: (box.originX - crop.x) * scale,
		y: (box.originY - crop.y) * scale,
		width: box.width * scale,
		height: box.height * scale
	};

	if (detection.keypoints.length >= 3) {
		const mapPoint = (keypoint: Detection["keypoints"][number]): Point => ({
			x: (keypoint.x * imageWidth - crop.x) * scale,
			y: (keypoint.y * imageHeight - crop.y) * scale
		});

		geometry.leftEye = mapPoint(detection.keypoints[0]);
		geometry.rightEye = mapPoint(detection.keypoints[1]);
		geometry.nose = mapPoint(detection.keypoints[2]);
	}

	return geometry;
};

const buildFallbackFaceGeometry = (
	previewSize: number
): FaceGeometry => ({
	x: previewSize * 0.24,
	y: previewSize * 0.2,
	width: previewSize * 0.52,
	height: previewSize * 0.52
});

const buildPlacement = (
	faceGeometry: FaceGeometry,
	previewSize: number,
	glasses: DealWithItGlassesAsset
): Placement => {
	if (faceGeometry.leftEye && faceGeometry.rightEye && faceGeometry.nose) {
		const eyeDistance = Math.hypot(
			faceGeometry.leftEye.x - faceGeometry.rightEye.x,
			faceGeometry.leftEye.y - faceGeometry.rightEye.y
		);
		const scale =
			(eyeDistance / glasses.eyesDistance) * glasses.scaleMultiplier;
		const width = Math.min(glasses.width * scale, previewSize * 0.92);
		const height = glasses.height * scale;
		const eyeCenterY =
			(faceGeometry.leftEye.y + faceGeometry.rightEye.y) / 2;
		const x = clamp(
			faceGeometry.nose.x - glasses.noseOffsetX * scale + width * glasses.offsetX,
			0,
			previewSize - width
		);
		const y = clamp(
			eyeCenterY - glasses.noseOffsetY * scale + height * glasses.offsetY,
			0,
			previewSize - height
		);

		return {
			x: x / previewSize,
			y: y / previewSize,
			width: width / previewSize,
			height: height / previewSize
		};
	}

	const faceAnchorX = faceGeometry.x + faceGeometry.width / 2;
	const faceAnchorY = faceGeometry.y + faceGeometry.height * 0.41;
	const width = Math.min(faceGeometry.width * glasses.scaleMultiplier, previewSize * 0.92);
	const height = width * (glasses.height / glasses.width);
	const x = clamp(
		faceAnchorX - width * glasses.anchorX + width * glasses.offsetX,
		0,
		previewSize - width
	);
	const y = clamp(
		faceAnchorY - height * glasses.anchorY + height * glasses.offsetY,
		0,
		previewSize - height
	);

	return {
		x: x / previewSize,
		y: y / previewSize,
		width: width / previewSize,
		height: height / previewSize
	};
};

const buildDownloadName = (file: File | null) => {
	if (!file) {
		return "deal-with-it.gif";
	}

	const baseName = file.name.replace(/\.[^.]+$/u, "");
	return `${baseName || "deal-with-it"}-deal-with-it.gif`;
};

const getAnimatedY = (frameIndex: number, targetY: number, targetHeight: number) => {
	const progress = frameIndex / Math.max(1, EXPORT_CONFIG.frameCount - 1);
	const eased = 1 - (1 - progress) ** 3;
	const startY = -targetHeight;
	return startY + (targetY - startY) * eased;
};

const renderGif = async (
	sourceDataUrl: string,
	glassesUrl: string,
	placement: Placement,
	rotationDegrees: number
) => {
	const [sourceImage, glassesImage] = await Promise.all([
		loadImageElement(sourceDataUrl),
		loadImageElement(glassesUrl)
	]);

	const canvas = document.createElement("canvas");
	canvas.width = EXPORT_CONFIG.outputSize;
	canvas.height = EXPORT_CONFIG.outputSize;
	const context = canvas.getContext("2d", { willReadFrequently: true });

	if (!context) {
		throw new Error("Could not create rendering context.");
	}

	const gif = GIFEncoder();

	for (let frameIndex = 0; frameIndex < EXPORT_CONFIG.frameCount; frameIndex += 1) {
		context.clearRect(0, 0, EXPORT_CONFIG.outputSize, EXPORT_CONFIG.outputSize);
		context.drawImage(
			sourceImage,
			0,
			0,
			EXPORT_CONFIG.outputSize,
			EXPORT_CONFIG.outputSize
		);

		const targetX = placement.x * EXPORT_CONFIG.outputSize;
		const targetY = placement.y * EXPORT_CONFIG.outputSize;
		const targetWidth = placement.width * EXPORT_CONFIG.outputSize;
		const targetHeight = placement.height * EXPORT_CONFIG.outputSize;
		const animatedY = getAnimatedY(frameIndex, targetY, targetHeight);

		context.save();
		context.translate(
			targetX + targetWidth / 2,
			animatedY + targetHeight / 2
		);
		context.rotate((rotationDegrees * Math.PI) / 180);
		context.drawImage(
			glassesImage,
			-targetWidth / 2,
			-targetHeight / 2,
			targetWidth,
			targetHeight
		);
		context.restore();

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
	return new Blob([gif.bytes()], { type: "image/gif" });
};

const applyManualOffset = (
	placement: Placement,
	previewSize: number,
	manualOffset: Point
): Placement => {
	const widthPx = placement.width * previewSize;
	const heightPx = placement.height * previewSize;
	const nextX = clamp(
		placement.x * previewSize + manualOffset.x,
		0,
		previewSize - widthPx
	);
	const nextY = clamp(
		placement.y * previewSize + manualOffset.y,
		0,
		previewSize - heightPx
	);

	return {
		x: nextX / previewSize,
		y: nextY / previewSize,
		width: placement.width,
		height: placement.height
	};
};

const applyManualScale = (
	basePlacement: Placement,
	previewSize: number,
	scaleMultiplier: number
): Placement => {
	const baseWidthPx = basePlacement.width * previewSize;
	const baseHeightPx = basePlacement.height * previewSize;
	const scaledWidthPx = clamp(baseWidthPx * scaleMultiplier, 24, previewSize * 0.98);
	const scaledHeightPx = clamp(baseHeightPx * scaleMultiplier, 12, previewSize * 0.98);
	const centerX = basePlacement.x * previewSize + baseWidthPx / 2;
	const centerY = basePlacement.y * previewSize + baseHeightPx / 2;
	const x = clamp(centerX - scaledWidthPx / 2, 0, previewSize - scaledWidthPx);
	const y = clamp(centerY - scaledHeightPx / 2, 0, previewSize - scaledHeightPx);

	return {
		x: x / previewSize,
		y: y / previewSize,
		width: scaledWidthPx / previewSize,
		height: scaledHeightPx / previewSize
	};
};

export const initDealWithIt = () => {
	const root = document.querySelector("[data-deal-with-it-root]");

	if (!(root instanceof HTMLElement)) {
		return;
	}

	const config = parseConfig(root);
	const detectorPromise = createFaceDetector();

	const uploadScreen = root.querySelector("[data-step-upload]");
	const editorScreen = root.querySelector("[data-step-editor]");
	const resultScreen = root.querySelector("[data-step-result]");
	const uploadButton = root.querySelector("[data-upload-button]");
	const uploadInput = root.querySelector("[data-upload-input]");
	const uploadError = root.querySelector("[data-upload-error]");
	const previewFrame = root.querySelector("[data-preview-frame]");
	const previewImage = root.querySelector("[data-preview-image]");
	const overlayImage = root.querySelector("[data-preview-overlay]");
	const scaleSlider = root.querySelector("[data-scale-slider]");
	const rotationSlider = root.querySelector("[data-rotation-slider]");
	const glassesButtons = Array.from(root.querySelectorAll("[data-glasses-button]"));
	const uploadNewButton = root.querySelector("[data-upload-new-button]");
	const createGifButton = root.querySelector("[data-create-gif-button]");
	const editorError = root.querySelector("[data-editor-error]");
	const resultImage = root.querySelector("[data-result-image]");
	const downloadButton = root.querySelector("[data-download-button]");
	const restartButton = root.querySelector("[data-restart-button]");
	const debugStatus = root.querySelector("[data-debug-status]");
	const debugLog = root.querySelector("[data-debug-log]");

	if (
		!(uploadScreen instanceof HTMLElement) ||
		!(editorScreen instanceof HTMLElement) ||
		!(resultScreen instanceof HTMLElement) ||
		!(uploadButton instanceof HTMLButtonElement) ||
		!(uploadInput instanceof HTMLInputElement) ||
		!(uploadError instanceof HTMLElement) ||
		!(previewFrame instanceof HTMLElement) ||
		!(previewImage instanceof HTMLImageElement) ||
		!(overlayImage instanceof HTMLImageElement) ||
		!(scaleSlider instanceof HTMLInputElement) ||
		!(rotationSlider instanceof HTMLInputElement) ||
		!(uploadNewButton instanceof HTMLButtonElement) ||
		!(createGifButton instanceof HTMLButtonElement) ||
		!(editorError instanceof HTMLElement) ||
		!(resultImage instanceof HTMLImageElement) ||
		!(downloadButton instanceof HTMLButtonElement) ||
		!(restartButton instanceof HTMLButtonElement) ||
		!(debugStatus instanceof HTMLElement) ||
		!(debugLog instanceof HTMLElement)
	) {
		return;
	}

	const debugEntries: string[] = [];

	const setDebug = (status: string, details?: string) => {
		const line = details ? `${status}: ${details}` : status;
		debugStatus.textContent = line;
		debugEntries.unshift(line);
		debugEntries.splice(10);
		debugLog.textContent = debugEntries.join("\n");
		console.log("[deal-with-it]", line);
	};

	setDebug("init", "bindings ready");

	const state: AppState = {
		step: "upload",
		isUploading: false,
		isGenerating: false,
		uploadError: null,
		editorError: null,
		inputFile: null,
		previewDataUrl: null,
		previewSize: 0,
		faceGeometry: null,
		selectedGlassesId: config.glasses[0]?.id ?? DEAL_WITH_IT_GLASSES[0].id,
		generatedGifBlob: null,
		generatedGifUrl: null,
		basePlacement: null,
		placement: null,
		manualOffset: { x: 0, y: 0 },
		manualScale: 1,
		manualRotation: 0
	};

	let dragPointerId: number | null = null;
	let dragStartPointer: Point | null = null;
	let dragStartOffset: Point | null = null;
	let dragScale = { x: 1, y: 1 };

	const setStep = (step: Step) => {
		state.step = step;
		uploadScreen.hidden = step !== "upload";
		editorScreen.hidden = step !== "editor";
		resultScreen.hidden = step !== "result";
		setDebug("step", step);
	};

	const updateSelectedGlasses = () => {
		const selected = config.glasses.find(
			(item) => item.id === state.selectedGlassesId
		);

		if (!selected || !state.faceGeometry || !state.previewSize) {
			return;
		}

		const autoPlacement = buildPlacement(
			state.faceGeometry,
			state.previewSize,
			selected
		);
		state.basePlacement = autoPlacement;
		const scaledPlacement = applyManualScale(
			autoPlacement,
			state.previewSize,
			state.manualScale
		);
		state.placement = applyManualOffset(
			scaledPlacement,
			state.previewSize,
			state.manualOffset
		);

		overlayImage.src = selected.src;
		overlayImage.style.left = `${state.placement.x * 100}%`;
		overlayImage.style.top = `${state.placement.y * 100}%`;
		overlayImage.style.width = `${state.placement.width * 100}%`;
		overlayImage.style.height = `${state.placement.height * 100}%`;
		overlayImage.style.transform = `rotate(${state.manualRotation}deg)`;

		for (const button of glassesButtons) {
			if (!(button instanceof HTMLButtonElement)) {
				continue;
			}

			button.dataset.selected = button.dataset.glassesButton === state.selectedGlassesId
				? "true"
				: "false";
		}
	};

	const syncUi = () => {
		uploadButton.disabled = state.isUploading;
		uploadButton.textContent = state.isUploading
			? config.copy.uploadButtonBusy
			: config.copy.uploadButton;
		uploadError.textContent = state.uploadError ?? "";
		uploadError.hidden = !state.uploadError;

		createGifButton.disabled = state.isGenerating || !state.previewDataUrl;
		createGifButton.textContent = state.isGenerating
			? config.copy.createGifButtonBusy
			: config.copy.createGifButton;
		editorError.textContent = state.editorError ?? "";
		editorError.hidden = !state.editorError;

		downloadButton.disabled = !state.generatedGifBlob;
		if (state.previewSize > 0) {
			previewFrame.style.setProperty("--preview-size", `${state.previewSize}px`);
		}
		if (state.previewDataUrl) {
			previewImage.src = state.previewDataUrl;
			updateSelectedGlasses();
		}
		if (state.generatedGifUrl) {
			resultImage.src = state.generatedGifUrl;
		}
	};

	const resetState = () => {
		setDebug("reset", "clearing runtime state");
		if (state.generatedGifUrl) {
			URL.revokeObjectURL(state.generatedGifUrl);
		}

		state.step = "upload";
		state.isUploading = false;
		state.isGenerating = false;
		state.uploadError = null;
		state.editorError = null;
		state.inputFile = null;
		state.previewDataUrl = null;
		state.previewSize = 0;
		state.faceGeometry = null;
		state.basePlacement = null;
		state.manualOffset = { x: 0, y: 0 };
		state.manualScale = 1;
		state.manualRotation = 0;
		state.selectedGlassesId = config.glasses[0]?.id ?? DEAL_WITH_IT_GLASSES[0].id;
		state.generatedGifBlob = null;
		state.generatedGifUrl = null;
		state.placement = null;
		uploadInput.value = "";
		previewImage.removeAttribute("src");
		overlayImage.removeAttribute("src");
		resultImage.removeAttribute("src");
		scaleSlider.value = "1";
		rotationSlider.value = "0";
		setStep("upload");
		syncUi();
	};

	const detectFaceWithTimeout = async (image: HTMLImageElement) => {
		try {
			const result = await Promise.race([
				detectorPromise.then((detector) => detector.detect(image)),
				wait(1500)
			]);

			if (!result || !("detections" in result)) {
				return undefined;
			}

			return selectPrimaryDetection(result.detections);
		} catch (error) {
			console.error("Deal with it face detection failed:", error);
			setDebug("detect:error", error instanceof Error ? error.message : "unknown");
			return undefined;
		}
	};

	const refineFaceGeometry = async (
		image: HTMLImageElement,
		crop: CropRect,
		previewSize: number
	) => {
		const primaryDetection = await detectFaceWithTimeout(image);

		if (!primaryDetection) {
			setDebug("detect:fallback", "using fallback geometry");
			return;
		}

		const refinedGeometry = getFaceGeometry(
			primaryDetection,
			crop,
			image.naturalWidth,
			image.naturalHeight,
			previewSize
		);

		if (!refinedGeometry) {
			setDebug("detect:fallback", "geometry unavailable");
			return;
		}

		state.faceGeometry = refinedGeometry;
		setDebug("detect:refined", `${Math.round(refinedGeometry.width)}x${Math.round(refinedGeometry.height)}`);
		syncUi();
	};

	const preparePhoto = async (file: File) => {
		setDebug("prepare:start", `${file.name} (${file.type || "unknown"}, ${file.size} bytes)`);
		state.isUploading = true;
		state.uploadError = null;
		state.editorError = null;
		syncUi();

		try {
			const image = await imageFileToLoadedImage(file);
			setDebug("prepare:image-loaded", `${image.naturalWidth}x${image.naturalHeight}`);
			const primaryDetection = await detectFaceWithTimeout(image);
			const crop =
				primaryDetection
					? buildStrictCropRect(
							primaryDetection,
							image.naturalWidth,
							image.naturalHeight
						) ?? buildCenterCropRect(image.naturalWidth, image.naturalHeight)
					: buildCenterCropRect(image.naturalWidth, image.naturalHeight);
			setDebug("prepare:crop", `${crop.size}px square`);
			const preview = await cropToSquarePreview(image, crop);
			setDebug("prepare:preview", `${preview.previewSize}px`);
			const faceGeometry =
				primaryDetection
					? getFaceGeometry(
							primaryDetection,
							crop,
							image.naturalWidth,
							image.naturalHeight,
							preview.previewSize
						) ?? buildFallbackFaceGeometry(preview.previewSize)
					: buildFallbackFaceGeometry(preview.previewSize);

			state.inputFile = file;
			state.previewDataUrl = preview.dataUrl;
			state.previewSize = preview.previewSize;
			state.faceGeometry = faceGeometry;
			state.basePlacement = null;
			state.manualOffset = { x: 0, y: 0 };
			state.manualScale = 1;
			state.manualRotation = 0;
			state.selectedGlassesId = config.glasses[0]?.id ?? DEAL_WITH_IT_GLASSES[0].id;
			state.generatedGifBlob = null;
			state.generatedGifUrl = null;
			scaleSlider.value = "1";
			rotationSlider.value = "0";
			setStep("editor");
			syncUi();
			void refineFaceGeometry(image, crop, preview.previewSize);
		} catch (error) {
			console.error("Deal with it photo preparation failed:", error);
			setDebug(
				"prepare:error",
				error instanceof Error ? error.message : "unknown error"
			);
			state.uploadError = config.copy.processingError;
			setStep("upload");
		} finally {
			state.isUploading = false;
			syncUi();
		}
	};

	const validateFile = (file: File) => {
		if (!ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])) {
			setDebug("validate:fail", "invalid type");
			state.uploadError = config.copy.invalidTypeError;
			syncUi();
			return false;
		}

		if (file.size > MAX_UPLOAD_BYTES) {
			setDebug("validate:fail", "file too large");
			state.uploadError = config.copy.fileTooLargeError;
			syncUi();
			return false;
		}

		setDebug("validate:ok", "file accepted");
		return true;
	};

	const generateGif = async () => {
		if (!state.previewDataUrl || !state.placement) {
			setDebug("gif:abort", "missing preview or placement");
			return;
		}

		const selected = config.glasses.find(
			(item) => item.id === state.selectedGlassesId
		);

		if (!selected) {
			setDebug("gif:abort", "missing selected glasses");
			return;
		}

		setDebug("gif:start", selected.id);
		state.isGenerating = true;
		state.editorError = null;
		syncUi();

		try {
			const blob = await renderGif(
				state.previewDataUrl,
				selected.src,
				state.placement,
				state.manualRotation
			);

			if (state.generatedGifUrl) {
				URL.revokeObjectURL(state.generatedGifUrl);
			}

			state.generatedGifBlob = blob;
			state.generatedGifUrl = URL.createObjectURL(blob);
			setDebug("gif:done", `${blob.size} bytes`);
			setStep("result");
		} catch (error) {
			setDebug(
				"gif:error",
				error instanceof Error ? error.message : "render failed"
			);
			state.editorError = config.copy.generationError;
			setStep("editor");
		} finally {
			state.isGenerating = false;
			syncUi();
		}
	};

	uploadButton.addEventListener("click", () => {
		setDebug("upload:click", "opening file picker");
		uploadInput.click();
	});

	uploadInput.addEventListener("change", () => {
		const file = uploadInput.files?.[0];

		if (!file) {
			setDebug("upload:change", "no file selected");
			return;
		}

		setDebug("upload:change", file.name);
		state.uploadError = null;

		if (!validateFile(file)) {
			return;
		}

		void preparePhoto(file);
	});

	for (const button of glassesButtons) {
		if (!(button instanceof HTMLButtonElement)) {
			continue;
		}

		button.addEventListener("click", () => {
			const id = button.dataset.glassesButton;

			if (!id) {
				return;
			}

			setDebug("glasses:select", id);
			state.selectedGlassesId = id;
			state.manualOffset = { x: 0, y: 0 };
			state.editorError = null;
			syncUi();
		});
	}

	scaleSlider.addEventListener("input", () => {
		state.manualScale = Number.parseFloat(scaleSlider.value) || 1;
		setDebug("scale", scaleSlider.value);
		syncUi();
	});

	rotationSlider.addEventListener("input", () => {
		state.manualRotation = Number.parseFloat(rotationSlider.value) || 0;
		setDebug("rotation", rotationSlider.value);
		syncUi();
	});

	const handlePointerMove = (event: PointerEvent) => {
		if (
			dragPointerId !== event.pointerId ||
			!dragStartPointer ||
			!dragStartOffset
		) {
			return;
		}

		state.manualOffset = {
			x:
				dragStartOffset.x +
				(event.clientX - dragStartPointer.x) * dragScale.x,
			y:
				dragStartOffset.y +
				(event.clientY - dragStartPointer.y) * dragScale.y
		};
		syncUi();
	};

	const finishDrag = (event: PointerEvent) => {
		if (dragPointerId !== event.pointerId) {
			return;
		}

		setDebug(
			"drag:end",
			`${Math.round(state.manualOffset.x)}, ${Math.round(state.manualOffset.y)}`
		);
		dragPointerId = null;
		dragStartPointer = null;
		dragStartOffset = null;
		overlayImage.dataset.dragging = "false";
		window.removeEventListener("pointermove", handlePointerMove);
		window.removeEventListener("pointerup", finishDrag);
		window.removeEventListener("pointercancel", finishDrag);
	};

	overlayImage.addEventListener("pointerdown", (event) => {
		if (!state.placement || state.step !== "editor") {
			return;
		}

		dragPointerId = event.pointerId;
		dragStartPointer = { x: event.clientX, y: event.clientY };
		dragStartOffset = { ...state.manualOffset };
		const rect = previewFrame.getBoundingClientRect();
		dragScale = {
			x: rect.width > 0 ? state.previewSize / rect.width : 1,
			y: rect.height > 0 ? state.previewSize / rect.height : 1
		};
		overlayImage.dataset.dragging = "true";
		setDebug("drag:start", state.selectedGlassesId);
		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("pointerup", finishDrag);
		window.addEventListener("pointercancel", finishDrag);
	});

	uploadNewButton.addEventListener("click", () => {
		resetState();
	});

	createGifButton.addEventListener("click", () => {
		void generateGif();
	});

	restartButton.addEventListener("click", () => {
		resetState();
	});

	downloadButton.addEventListener("click", () => {
		if (!state.generatedGifBlob || !state.generatedGifUrl) {
			setDebug("download:abort", "missing gif");
			return;
		}

		setDebug("download:start", buildDownloadName(state.inputFile));
		const link = document.createElement("a");
		link.href = state.generatedGifUrl;
		link.download = buildDownloadName(state.inputFile);
		link.click();
	});

	syncUi();
	setDebug("ready", "waiting for file");
};
