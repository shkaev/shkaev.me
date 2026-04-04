const localeStorageKey = "preferred-locale";

const getStoredLocale = () => {
	try {
		return localStorage.getItem(localeStorageKey);
	} catch {
		return null;
	}
};

const setStoredLocale = (locale: string) => {
	try {
		localStorage.setItem(localeStorageKey, locale);
	} catch {
		// Ignore storage failures and continue with navigation behavior.
	}
};

const localizeHref = (baseRoute: string, locale: string) => {
	if (locale === "en") {
		return baseRoute;
	}

	return baseRoute === "/" ? `/${locale}` : `/${locale}${baseRoute}`;
};

const syncLocalizedRouteLinks = (locale: string) => {
	const links = document.querySelectorAll("[data-localized-route]");

	links.forEach((link) => {
		if (!(link instanceof HTMLAnchorElement)) {
			return;
		}

		const baseRoute = link.dataset.localizedRoute;

		if (!baseRoute) {
			return;
		}

		link.href = localizeHref(baseRoute, locale);
	});
};

export const setupLocaleToggle = () => {
	const button = document.querySelector("[data-locale-toggle]");

	if (!(button instanceof HTMLButtonElement)) {
		return;
	}

	const currentLocale = button.dataset.currentLocale;
	const targetLocale = button.dataset.targetLocale;
	const targetPath = button.dataset.targetPath;

	if (!currentLocale || !targetLocale) {
		return;
	}

	const storedLocale = getStoredLocale();

	if (storedLocale === "ru" || storedLocale === "en") {
		syncLocalizedRouteLinks(storedLocale);
	}

	if (button.dataset.localeToggleBound === "true") {
		return;
	}

	button.addEventListener("click", () => {
		setStoredLocale(targetLocale);

		if (targetPath) {
			window.location.assign(targetPath);
			return;
		}

		syncLocalizedRouteLinks(targetLocale);
	});

	button.dataset.localeToggleBound = "true";
};
