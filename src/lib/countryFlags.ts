import { resolveStaticAssetUrl } from "./assetUrl";
import type { Locale } from "../i18n/config";

const countryFlagByLocation: Record<string, string> = {
	Cyprus: resolveStaticAssetUrl("/images/flags/cyprus.svg"),
	Kazakhstan: resolveStaticAssetUrl("/images/flags/kazakhstan.svg"),
	Uzbekistan: resolveStaticAssetUrl("/images/flags/uzbekistan.svg"),
	Russia: resolveStaticAssetUrl("/images/flags/russia.svg"),
	UAE: resolveStaticAssetUrl("/images/flags/uae.svg"),
	"United Arab Emirates": resolveStaticAssetUrl("/images/flags/uae.svg")
};

const countryLabelByLocale: Record<Locale, Record<string, string>> = {
	en: {
		Cyprus: "Cyprus",
		Kazakhstan: "Kazakhstan",
		Uzbekistan: "Uzbekistan",
		Russia: "Russia",
		UAE: "UAE",
		"United Arab Emirates": "United Arab Emirates"
	},
	ru: {
		Cyprus: "Кипр",
		Kazakhstan: "Казахстан",
		Uzbekistan: "Узбекистан",
		Russia: "Россия",
		UAE: "ОАЭ",
		"United Arab Emirates": "ОАЭ"
	}
};

export const resolveCountryFlag = (location: string) =>
	countryFlagByLocation[location];

export const resolveCountryLabel = (location: string, locale: Locale) =>
	countryLabelByLocale[locale][location] ?? location;
