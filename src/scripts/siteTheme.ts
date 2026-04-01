import { hasModifierKey, isEditableTarget } from "./dom";
import { applyThemeToRoot, resolveStoredTheme, themeStorageKey } from "./themeShared";

const root = document.documentElement;

const getStoredTheme = (): "light" | "dark" => {
	return resolveStoredTheme(themeStorageKey);
};

const syncThemeButton = (isDark: boolean) => {
	const button = document.querySelector("[data-theme-toggle]");

	if (!(button instanceof HTMLButtonElement)) {
		return;
	}

	button.setAttribute("aria-pressed", String(isDark));
	button.setAttribute(
		"aria-label",
		isDark ? "Switch to light mode" : "Switch to dark mode"
	);
};

const applyTheme = (theme: "light" | "dark") => {
	const isDark = theme === "dark";
	applyThemeToRoot(root, theme);
	syncThemeButton(isDark);
};

const toggleTheme = () => {
	const nextTheme = getStoredTheme() === "dark" ? "light" : "dark";
	localStorage.setItem(themeStorageKey, nextTheme);
	applyTheme(nextTheme);
};

const handleThemeKeydown = (event: KeyboardEvent) => {
	if (
		event.defaultPrevented ||
		event.repeat ||
		hasModifierKey(event) ||
		event.code !== "KeyL"
	) {
		return;
	}

	if (isEditableTarget(event.target)) {
		return;
	}

	if (document.activeElement instanceof HTMLElement) {
		document.activeElement.blur();
	}

	toggleTheme();
};

export const setupThemeControls = () => {
	applyTheme(getStoredTheme());

	const button = document.querySelector("[data-theme-toggle]");

	if (
		button instanceof HTMLButtonElement &&
		button.dataset.themeBound !== "true"
	) {
		button.addEventListener("click", toggleTheme);
		button.dataset.themeBound = "true";
	}

	if (root.dataset.themeKeydownBound !== "true") {
		document.addEventListener("keydown", handleThemeKeydown);
		root.dataset.themeKeydownBound = "true";
	}
};
