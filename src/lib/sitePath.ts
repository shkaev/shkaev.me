export const normalizePath = (value: string) => {
	if (value === "/") {
		return value;
	}

	return value
		.replace(/\/index\.html$/u, "")
		.replace(/\/+$/u, "") || "/";
};
