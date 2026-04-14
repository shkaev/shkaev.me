export const MAX_UPLOAD_BYTES = 10_000_000;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"] as const;

export const EXPORT_CONFIG = {
	frameCountDefault: 24,
	frameCountSlackEmoji: 16,
	frameDelayMs: 60,
	lastFrameDelayMs: 1500,
	outputSizeDefault: 256,
	outputSizeSlackEmoji: 80,
	repeat: 0
} as const;

export const MEDIAPIPE_WASM_BASE =
	"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.34/wasm";

export const FACE_DETECTOR_MODEL_URL =
	"https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite";

export interface DealWithItGlassesAsset {
	id: string;
	fileName: string;
	width: number;
	height: number;
	scaleMultiplier: number;
	eyesDistance: number;
	noseOffsetX: number;
	noseOffsetY: number;
}

export const DEAL_WITH_IT_GLASSES: DealWithItGlassesAsset[] = [
	{ id: "glasses-01", fileName: "glasses-01.svg", width: 248, height: 64, scaleMultiplier: 0.84, eyesDistance: 104, noseOffsetX: 128, noseOffsetY: 25 },
	{ id: "glasses-02", fileName: "glasses-02.svg", width: 200, height: 64, scaleMultiplier: 0.8, eyesDistance: 100, noseOffsetX: 104, noseOffsetY: 25 },
	{ id: "glasses-03", fileName: "glasses-03.svg", width: 248, height: 64, scaleMultiplier: 0.86, eyesDistance: 104, noseOffsetX: 126, noseOffsetY: 25 },
	{ id: "glasses-05", fileName: "glasses-05.svg", width: 208, height: 48, scaleMultiplier: 0.76, eyesDistance: 96, noseOffsetX: 104, noseOffsetY: 22 },
	{ id: "glasses-04", fileName: "glasses-04.svg", width: 248, height: 80, scaleMultiplier: 0.98, eyesDistance: 110, noseOffsetX: 138, noseOffsetY: 34 },
	{ id: "glasses-06", fileName: "glasses-06.svg", width: 256, height: 56, scaleMultiplier: 0.89, eyesDistance: 112, noseOffsetX: 152, noseOffsetY: 24 },
	{ id: "glasses-07", fileName: "glasses-07.svg", width: 248, height: 56, scaleMultiplier: 0.85, eyesDistance: 108, noseOffsetX: 96, noseOffsetY: 24 },
	{ id: "glasses-08", fileName: "glasses-08.svg", width: 1024, height: 165, scaleMultiplier: 0.94, eyesDistance: 385, noseOffsetX: 660, noseOffsetY: 64 }
] as const;

export interface DealWithItCopy {
	uploadButton: string;
	uploadButtonBusy: string;
	uploadHelper: string;
	uploadPrivacyNote: string;
	invalidTypeError: string;
	fileTooLargeError: string;
	noFaceError: string;
	processingError: string;
	createGifButton: string;
	createGifButtonBusy: string;
	exportModeSlackEmojiLabel: string;
	uploadNewPhotoButton: string;
	resultTitleLead: string;
	resultTitleRest: string;
	makeAnotherOneButton: string;
	downloadButton: string;
	generationError: string;
	backLabel: string;
}

export interface DealWithItAppConfig {
	locale: "en" | "ru";
	backHref: string;
	dogGifSrc: string;
	glasses: Array<DealWithItGlassesAsset & { src: string }>;
	copy: DealWithItCopy;
}
