import { defaultLocale, getOtherLocale, isLocale, type Locale } from "./config";
import { normalizePath } from "../lib/sitePath";

const localizedBasePaths = new Set(["/", "/about", "/design", "/photography"]);

export const localeAvailabilityMap = {
	en: "all",
	ru: Array.from(localizedBasePaths)
} as const;

export const getLocaleFromPath = (pathname: string): Locale => {
	const normalizedPath = normalizePath(pathname);

	if (normalizedPath === "/") {
		return defaultLocale;
	}

	const [, maybeLocale] = normalizedPath.split("/");

	return maybeLocale && isLocale(maybeLocale) ? maybeLocale : defaultLocale;
};

export const stripLocaleFromPath = (pathname: string) => {
	const normalizedPath = normalizePath(pathname);
	const locale = getLocaleFromPath(normalizedPath);

	if (locale === defaultLocale) {
		return normalizedPath;
	}

	const stripped = normalizedPath.replace(new RegExp(`^/${locale}(?=/|$)`, "u"), "");

	return stripped || "/";
};

export const localizePath = (pathname: string, locale: Locale) => {
	const basePath = stripLocaleFromPath(pathname);

	if (locale === defaultLocale) {
		return basePath;
	}

	return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
};

export const hasLocaleVariant = (pathname: string, locale: Locale) => {
	const basePath = stripLocaleFromPath(pathname);

	if (locale === defaultLocale) {
		return true;
	}

	return localizedBasePaths.has(basePath);
};

export const getLocaleTargetPath = (pathname: string, targetLocale: Locale) => {
	return hasLocaleVariant(pathname, targetLocale)
		? localizePath(pathname, targetLocale)
		: null;
};

export const getAlternateLocaleLinks = (pathname: string) => {
	const basePath = stripLocaleFromPath(pathname);
	const currentLocale = getLocaleFromPath(pathname);
	const alternateLocale = getOtherLocale(currentLocale);

	if (!hasLocaleVariant(basePath, alternateLocale)) {
		return [];
	}

	return [
		{ locale: currentLocale, href: localizePath(basePath, currentLocale) },
		{ locale: alternateLocale, href: localizePath(basePath, alternateLocale) }
	];
};

export const getLocalizedRouteHref = (pathname: string, locale: Locale) => {
	return hasLocaleVariant(pathname, locale) ? localizePath(pathname, locale) : pathname;
};
