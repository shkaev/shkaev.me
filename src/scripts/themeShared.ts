export const themeStorageKey = "theme";

export const resolveStoredTheme = (storageKey: string) => {
	const storedTheme = localStorage.getItem(storageKey);

	if (storedTheme === "light" || storedTheme === "dark") {
		return storedTheme;
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

export const applyThemeToRoot = (
	root: HTMLElement,
	theme: "light" | "dark"
) => {
	root.classList.toggle("dark", theme === "dark");
	root.style.colorScheme = theme;
};
