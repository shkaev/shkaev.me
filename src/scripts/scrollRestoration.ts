export const setupScrollRestoration = () => {
	const scrollStorageKey = "scroll-position:";
	const restoreScrollFlagKey = "restore-scroll:";
	let saveScrollFrame = 0;

	const getStorageKey = (prefix: string, path = window.location.href) => {
		const url = new URL(path, window.location.origin);

		return `${prefix}${url.pathname}${url.search}`;
	};

	const saveScrollPosition = () => {
		try {
			sessionStorage.setItem(getStorageKey(scrollStorageKey), String(window.scrollY));
		} catch {
			// Ignore storage failures and keep default browser behavior.
		}
	};

	const scheduleScrollPositionSave = () => {
		if (saveScrollFrame) {
			return;
		}

		saveScrollFrame = window.requestAnimationFrame(() => {
			saveScrollFrame = 0;
			saveScrollPosition();
		});
	};

	const restoreScrollPosition = () => {
		try {
			const storedPosition = sessionStorage.getItem(getStorageKey(scrollStorageKey));

			if (storedPosition === null) {
				return;
			}

			const y = Number.parseFloat(storedPosition);

			if (!Number.isFinite(y)) {
				return;
			}

			const restore = () => {
				window.scrollTo({ top: y, left: 0, behavior: "auto" });
			};

			requestAnimationFrame(() => {
				requestAnimationFrame(restore);
			});

			for (const delay of [80, 180, 360, 720]) {
				window.setTimeout(restore, delay);
			}
		} catch {
			// Ignore storage failures and keep default browser behavior.
		}
	};

	const markRestoreForPath = (path: string) => {
		try {
			sessionStorage.setItem(getStorageKey(restoreScrollFlagKey, path), "1");
		} catch {
			// Ignore malformed targets and keep default browser behavior.
		}
	};

	const isPlainSameTabClick = (event: MouseEvent, link: HTMLAnchorElement) => {
		return !(
			event.defaultPrevented ||
			event.button !== 0 ||
			link.target === "_blank" ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey
		);
	};

	const isInternalNavigation = (link: HTMLAnchorElement) => {
		try {
			const url = new URL(link.href, window.location.href);

			return url.origin === window.location.origin;
		} catch {
			return false;
		}
	};

	if ("scrollRestoration" in history) {
		history.scrollRestoration = "manual";
	}

	window.addEventListener("scroll", scheduleScrollPositionSave, { passive: true });
	window.addEventListener("pagehide", saveScrollPosition);
	document.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "hidden") {
			saveScrollPosition();
		}
	});

	window.addEventListener("pageshow", (event) => {
		const navigationEntry = performance.getEntriesByType("navigation")[0];
		const navigationType = navigationEntry &&
			typeof navigationEntry === "object" &&
			"type" in navigationEntry
			? navigationEntry.type
			: "";

		let shouldRestoreViaFlag = false;

		try {
			shouldRestoreViaFlag =
				sessionStorage.getItem(getStorageKey(restoreScrollFlagKey)) === "1";
		} catch {
			shouldRestoreViaFlag = false;
		}

		if (
			event.persisted ||
			navigationType === "back_forward" ||
			shouldRestoreViaFlag
		) {
			try {
				sessionStorage.removeItem(getStorageKey(restoreScrollFlagKey));
			} catch {
				// Ignore storage failures and keep default browser behavior.
			}

			restoreScrollPosition();
		}
	});

	document.addEventListener("click", (event) => {
		const target = event.target;

		if (!(target instanceof Element)) {
			return;
		}

		const link = target.closest("a[href]");

		if (
			!(link instanceof HTMLAnchorElement) ||
			!isPlainSameTabClick(event, link) ||
			!isInternalNavigation(link)
		) {
			return;
		}

		saveScrollPosition();

		const restoreTarget =
			link.dataset.restoreScrollTarget || link.getAttribute("href");

		if (!link.hasAttribute("data-restore-scroll-target") || !restoreTarget) {
			return;
		}

		markRestoreForPath(restoreTarget);
	});
};
