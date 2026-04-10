import type { Locale } from "../i18n/config";

const monthNamesByLocale: Record<Locale, Record<string, string>> = {
	en: {
		January: "January",
		February: "February",
		March: "March",
		April: "April",
		May: "May",
		June: "June",
		July: "July",
		August: "August",
		September: "September",
		October: "October",
		November: "November",
		December: "December"
	},
	ru: {
		January: "Январь",
		February: "Февраль",
		March: "Март",
		April: "Апрель",
		May: "Май",
		June: "Июнь",
		July: "Июль",
		August: "Август",
		September: "Сентябрь",
		October: "Октябрь",
		November: "Ноябрь",
		December: "Декабрь"
	}
};

export const formatPhotoTimeframe = (timeframe: string, locale: Locale) => {
	const normalizedTimeframe = timeframe.trim();

	if (/^\d{4}-\d{4}$/u.test(normalizedTimeframe)) {
		return normalizedTimeframe.replace("-", "–");
	}

	const [month, year] = normalizedTimeframe.split(" ");

	if (!month || !year) {
		return normalizedTimeframe;
	}

	return `${monthNamesByLocale[locale][month] ?? month} ${year}`;
};
