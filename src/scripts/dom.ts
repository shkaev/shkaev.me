const focusableSelector = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled]):not([type='hidden'])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex='-1'])"
].join(",");

export const isEditableTarget = (target: EventTarget | null): boolean =>
	target instanceof HTMLElement &&
	(
		target.isContentEditable ||
		target.closest("input, textarea, select, [contenteditable='true']")
	);

export const hasModifierKey = (event: KeyboardEvent): boolean =>
	event.metaKey || event.ctrlKey || event.altKey || event.shiftKey;

const isVisibleFocusable = (element: Element): element is HTMLElement =>
	element instanceof HTMLElement &&
	!element.hidden &&
	element.getAttribute("aria-hidden") !== "true" &&
	element.getClientRects().length > 0;

export const getFocusableElements = (container: ParentNode): HTMLElement[] =>
	Array.from(container.querySelectorAll(focusableSelector)).filter(
		isVisibleFocusable
	);
