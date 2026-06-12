import type { Locale } from "../i18n/config";
import { formatPhotoTimeframe } from "./photoTimeframe";

const exactPhotoSeriesLabelMap: Record<string, string> = {
	"Old Film Collection": "Плёночный архив",
	"Siberian Legacy": "Сибирское наследие",
	"Edro III Shipwreck": "Кораблекрушение Edro III",
	Lefkara: "Лефкара",
	Ekaterinburg: "Екатеринбург",
	Burabay: "Боровое",
	"Limassol & Countryside": "Лимассол и окрестности",
	"Here and there": "Тут и там",
	"Q Gardens": "Q Gardens",
	"Aphrodite Hills & Rock": "Камень и холмы Афродиты",
	Zygi: "Зиги",
	Kiti: "Кити",
	"Limassol Carnival 2024": "Карнавал в Лимассоле 2024",
	"Limassol Carnival 2025": "Карнавал в Лимассоле 2025",
	"Limassol Carnival": "Карнавал в Лимассоле",
	Hiking: "Походы",
	"Home & Kids": "Дом и дети",
	"Kampi Trail Hike": "Поход по тропе Kampi",
	"Fig Tree Bay & Pissouri": "Fig Tree Bay и Писсури",
	"Agios Pavlos": "Святой Павел",
	Troodos: "Троодос",
	"Abu Dhabi": "Абу-Даби",
	"Governor's Beach": "Губернаторский пляж",
	"Aphrodite Hills & Q Gardens": "Холмы Афродиты и Q Gardens",
	"Genesis Aphrodite’s Trail": "Рождение Афродиты",
	"Kalidonia Waterfalls": "Водопад Каледония",
	Agros: "Агрос",
	Omodos: "Омодос",
	Omsk: "Омск",
	Astana: "Астана",
	Limassol: "Лимассол",
	Paphos: "Пафос",
	Larnaca: "Ларнака",
	Nicosia: "Никосия",
	Tashkent: "Ташкент",
	Pissouri: "Писсури",
	"Bolsherechye, Omsk Oblast": "Большеречье, Омская область"
};

const seriesPartTitlePattern = /^(.+), Part (\d+)$/u;

const specialSummaryMap: Record<string, string> = {
	"Pictures were taken approximately in between 2003 and 2007. Scanned on Noritsu professional photo lab in Saint-Petersburg by me without any post-processing.":
		"Фотографии были сделаны примерно между 2003 и 2007 годами. Я отсканировал их на профессиональной фотолаборатории Noritsu в Санкт-Петербурге без какой-либо дополнительной обработки."
};

const specialIntroMap: Record<string, string> = {
	"Scanned on Noritsu professional photo lab in Saint-Petersburg by me without any post-processing.":
		"Я отсканировал эту серию на профессиональной фотолаборатории Noritsu в Санкт-Петербурге без какой-либо дополнительной обработки."
};

const translateRussianPhotoSeriesLabel = (value: string) => {
	const exactLabel = exactPhotoSeriesLabelMap[value];

	if (exactLabel) {
		return exactLabel;
	}

	const partMatch = value.match(seriesPartTitlePattern);

	if (partMatch) {
		const baseLabel = exactPhotoSeriesLabelMap[partMatch[1]];

		if (baseLabel) {
			return `${baseLabel}, часть ${partMatch[2]}`;
		}
	}

	return value;
};

export const resolveLocalizedPhotoSeriesLabel = (value: string, locale: Locale) => {
	return locale === "ru" ? translateRussianPhotoSeriesLabel(value) : value;
};

export const resolveLocalizedPhotoSeriesTitle = (title: string, locale: Locale) => {
	return resolveLocalizedPhotoSeriesLabel(title, locale);
};

export const resolveLocalizedPhotoSeriesSummary = (summary: string, locale: Locale) => {
	if (locale === "en") {
		return summary;
	}

	const specialSummary = specialSummaryMap[summary];

	if (specialSummary) {
		return specialSummary;
	}

	const match = summary.match(/^([A-Za-z]+ \d{4})(?:, (.+))?$/u);

	if (!match) {
		return summary;
	}

	const [, timeframe, suffix] = match;
	const localizedTimeframe = formatPhotoTimeframe(timeframe, locale);

	if (!suffix) {
		return localizedTimeframe;
	}

	return `${localizedTimeframe}, ${resolveLocalizedPhotoSeriesLabel(suffix, locale)}`;
};

export const resolveLocalizedPhotoSeriesIntro = (intro: string | undefined, locale: Locale) => {
	if (!intro || locale === "en") {
		return intro;
	}

	return specialIntroMap[intro] ?? intro;
};
