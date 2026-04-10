export const locales = ["en", "ru"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

export const isLocale = (value: string): value is Locale => {
	return locales.includes(value as Locale);
};

export const getOtherLocale = (locale: Locale): Locale => {
	return locale === "en" ? "ru" : "en";
};
