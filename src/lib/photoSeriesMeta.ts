import type { Locale } from "../i18n/config";

const resolveRussianPhotoNoun = (count: number) => {
	const mod10 = count % 10;
	const mod100 = count % 100;

	if (mod10 === 1 && mod100 !== 11) {
		return "фотография";
	}

	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
		return "фотографии";
	}

	return "фотографий";
};

interface PhotoSeriesMetaDescriptionInput {
	title: string;
	countryLabel: string;
	timeframe: string;
	photoCount: number;
	locale: Locale;
}

export const buildPhotoSeriesMetaDescription = ({
	title,
	countryLabel,
	timeframe,
	photoCount,
	locale
}: PhotoSeriesMetaDescriptionInput) => {
	if (locale === "ru") {
		const lowercasedTimeframe =
			timeframe.charAt(0).toLowerCase() + timeframe.slice(1);

		return `${title} — фотосерия Дмитрия Шкаева. ${countryLabel}, ${lowercasedTimeframe}. ${photoCount} ${resolveRussianPhotoNoun(photoCount)}.`;
	}

	return `${title} — a photo series by Dmitry Shkaev. ${countryLabel}, ${timeframe}. ${photoCount} ${photoCount === 1 ? "photo" : "photos"}.`;
};
