import { getFocusableElements, hasModifierKey, isEditableTarget } from "./dom";

export const setupChangelogSheet = () => {
	const sheetRoot = document.querySelector("[data-sheet-root]");
	const sheetPanel = document.querySelector("[data-sheet-panel]");
	const openButtons = Array.from(
		document.querySelectorAll("[data-sheet-toggle]")
	);
	const closeButtons = Array.from(
		document.querySelectorAll("[data-sheet-close]")
	);
	const closeFocusTarget = document.querySelector(
		"[data-sheet-close-button]"
	);

	if (
		!(sheetRoot instanceof HTMLElement) ||
		!(sheetPanel instanceof HTMLElement) ||
		!(closeFocusTarget instanceof HTMLButtonElement) ||
		!openButtons.length ||
		sheetRoot.dataset.sheetInitialized === "true"
	) {
		return;
	}

	sheetRoot.dataset.sheetInitialized = "true";

	let lastTrigger: HTMLElement | null = null;
	let closeTimer = 0;
	let lastInteractionWasPointer = false;

	const focusSheetTarget = (preferCloseButton = true) => {
		if (preferCloseButton && closeFocusTarget.getClientRects().length > 0) {
			closeFocusTarget.focus();
			return;
		}

		const [firstFocusable] = getFocusableElements(sheetPanel);
		(firstFocusable ?? sheetPanel).focus();
	};

	const syncTriggerState = (isOpen: boolean) => {
		openButtons.forEach((button) => {
			if (!(button instanceof HTMLButtonElement)) {
				return;
			}

			button.setAttribute("aria-expanded", String(isOpen));
		});
	};

	const openSheet = (
		button: HTMLElement,
		options: { focusCloseButton?: boolean } = {}
	) => {
		const { focusCloseButton = true } = options;

		if (closeTimer) {
			window.clearTimeout(closeTimer);
			closeTimer = 0;
		}

		lastTrigger = button;
		sheetRoot.hidden = false;
		document.body.style.overflow = "hidden";
		syncTriggerState(true);

		requestAnimationFrame(() => {
			sheetRoot.dataset.state = "open";
			focusSheetTarget(focusCloseButton);
		});
	};

	const closeSheet = (options: { restoreFocus?: boolean } = {}) => {
		const { restoreFocus = true } = options;

		if (sheetRoot.hidden) {
			return;
		}

		sheetRoot.dataset.state = "closed";
		document.body.style.overflow = "";
		syncTriggerState(false);

		closeTimer = window.setTimeout(() => {
			sheetRoot.hidden = true;
			if (restoreFocus && lastTrigger instanceof HTMLElement) {
				lastTrigger.focus();
			}
		}, 280);
	};

	openButtons.forEach((button) => {
		if (!(button instanceof HTMLButtonElement)) {
			return;
		}

		button.addEventListener("pointerdown", () => {
			lastInteractionWasPointer = true;
		});
		button.addEventListener("keydown", () => {
			lastInteractionWasPointer = false;
		});
		button.addEventListener("click", () =>
			openSheet(button, {
				focusCloseButton: !lastInteractionWasPointer
			})
		);
	});

	closeButtons.forEach((button) => {
		if (!(button instanceof HTMLElement)) {
			return;
		}

		button.addEventListener("pointerdown", () => {
			lastInteractionWasPointer = true;
		});
		button.addEventListener("keydown", () => {
			lastInteractionWasPointer = false;
		});
		button.addEventListener("click", () => {
			const isBackdrop = button.classList.contains("site-sheet__backdrop");

			if (isBackdrop && document.activeElement instanceof HTMLElement) {
				document.activeElement.blur();
				closeSheet({ restoreFocus: false });
				return;
			}

			closeSheet({ restoreFocus: !lastInteractionWasPointer });
		});
	});

	document.addEventListener("keydown", (event) => {
		if (sheetRoot.hidden) {
			return;
		}

		if (event.key === "Tab") {
			const focusableElements = getFocusableElements(sheetPanel);

			if (!focusableElements.length) {
				event.preventDefault();
				sheetPanel.focus();
				return;
			}

			const firstFocusable = focusableElements[0];
			const lastFocusable = focusableElements[focusableElements.length - 1];
			const activeElement = document.activeElement;

			if (event.shiftKey) {
				if (
					activeElement === firstFocusable ||
					activeElement === sheetPanel ||
					!sheetPanel.contains(activeElement)
				) {
					event.preventDefault();
					lastFocusable.focus();
				}
				return;
			}

			if (
				activeElement === lastFocusable ||
				!sheetPanel.contains(activeElement)
			) {
				event.preventDefault();
				firstFocusable.focus();
			}
			return;
		}

		if (event.key === "Escape") {
			if (document.activeElement instanceof HTMLElement) {
				document.activeElement.blur();
			}

			closeSheet({ restoreFocus: false });
		}
	});

	document.addEventListener("focusin", (event) => {
		if (sheetRoot.hidden) {
			return;
		}

		const target = event.target;

		if (target instanceof Node && sheetPanel.contains(target)) {
			return;
		}

		focusSheetTarget();
	});

	const handleChangelogKeydown = (event: KeyboardEvent) => {
		if (
			event.defaultPrevented ||
			event.repeat ||
			hasModifierKey(event) ||
			event.code !== "KeyC"
		) {
			return;
		}

		if (isEditableTarget(event.target)) {
			return;
		}

		lastInteractionWasPointer = false;

		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}

		if (sheetRoot.hidden) {
			const firstButton = openButtons.find(
				(button): button is HTMLButtonElement =>
					button instanceof HTMLButtonElement
			);

			if (firstButton instanceof HTMLButtonElement) {
				openSheet(firstButton, { focusCloseButton: false });
			}
			return;
		}

		closeSheet({ restoreFocus: false });
	};

	sheetPanel.addEventListener("click", (event) => {
		event.stopPropagation();
	});

	if (document.documentElement.dataset.changelogKeydownBound !== "true") {
		document.addEventListener("keydown", handleChangelogKeydown);
		document.documentElement.dataset.changelogKeydownBound = "true";
	}
};
