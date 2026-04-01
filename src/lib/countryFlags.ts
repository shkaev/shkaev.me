import { resolveStaticAssetUrl } from "./assetUrl";

const countryFlagByLocation: Record<string, string> = {
	Cyprus: resolveStaticAssetUrl("/images/flags/cyprus.svg"),
	Kazakhstan: resolveStaticAssetUrl("/images/flags/kazakhstan.svg"),
	Uzbekistan: resolveStaticAssetUrl("/images/flags/uzbekistan.svg"),
	Russia: resolveStaticAssetUrl("/images/flags/russia.svg"),
	UAE: resolveStaticAssetUrl("/images/flags/uae.svg"),
	"United Arab Emirates": resolveStaticAssetUrl("/images/flags/uae.svg")
};

export const resolveCountryFlag = (location: string) =>
	countryFlagByLocation[location];
