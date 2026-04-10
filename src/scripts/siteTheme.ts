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

	const lightAriaLabel =
		button.dataset.themeLabelLight ?? "Switch to dark mode";
	const darkAriaLabel =
		button.dataset.themeLabelDark ?? "Switch to light mode";
	const lightTooltip =
		button.dataset.themeTooltipLight ?? "Dark mode";
	const darkTooltip =
		button.dataset.themeTooltipDark ?? "Light mode";
	const lightTooltipText = document.querySelector("[data-theme-tooltip-light-text]");
	const darkTooltipText = document.querySelector("[data-theme-tooltip-dark-text]");

	button.setAttribute("aria-pressed", String(isDark));
	button.setAttribute(
		"aria-label",
		isDark ? darkAriaLabel : lightAriaLabel
	);

	if (lightTooltipText instanceof HTMLElement) {
		lightTooltipText.textContent = lightTooltip;
	}

	if (darkTooltipText instanceof HTMLElement) {
		darkTooltipText.textContent = darkTooltip;
	}
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
