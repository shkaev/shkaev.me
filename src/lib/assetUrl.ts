const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const assetBaseUrl = trimTrailingSlash(
	import.meta.env.PUBLIC_ASSET_BASE_URL ??
		import.meta.env.PUBLIC_PHOTO_BASE_URL ??
		""
);

export const resolveStaticAssetUrl = (src: string) => {
	if (!assetBaseUrl || /^https?:\/\//.test(src)) {
		return src;
	}

	return `${assetBaseUrl}${src.startsWith("/") ? src : `/${src}`}`;
};
