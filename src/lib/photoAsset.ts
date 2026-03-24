const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const photoBaseUrl = trimTrailingSlash(
	import.meta.env.PUBLIC_PHOTO_BASE_URL ?? ""
);

const toVariantPath = (
	src: string,
	variant: "image" | "thumb" | "card-cover" = "image"
) => {
	if (!src.includes("/images/")) {
		return src;
	}

	if (variant === "image") {
		return src.replace("/images/", "/display/");
	}

	if (variant === "thumb") {
		return src.replace("/images/", "/thumbs/");
	}

	if (variant === "card-cover") {
		return src.replace("/images/", "/card-covers/");
	}
};

export const resolvePhotoAssetUrl = (
	src: string,
	variant: "image" | "thumb" | "card-cover" = "image"
) => {
	const path = toVariantPath(src, variant);

	if (!photoBaseUrl || /^https?:\/\//.test(path)) {
		return path;
	}

	return `${photoBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};
