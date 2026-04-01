const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const photoBaseUrl = trimTrailingSlash(
	import.meta.env.PUBLIC_PHOTO_BASE_URL ?? ""
);

const toVariantPath = (
	src: string,
	variant: "image" | "thumb" | "card-cover" = "image"
): string => {
	if (!src.includes("/images/")) {
		return src;
	}

	switch (variant) {
		case "image":
			return src.replace("/images/", "/display/");
		case "thumb":
			return src.replace("/images/", "/thumbs/");
		case "card-cover":
			return src.replace("/images/", "/card-covers/");
		default: {
			const exhaustiveCheck: never = variant;
			return exhaustiveCheck;
		}
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
