import type { Locale } from "../../i18n/config";
import rawHtml from "./color-combos-document.html?raw";

const englishHtml = rawHtml.replace('<html lang="ru">', '<html lang="en">');

export const getColorCombosHtml = (locale: Locale): string => {
	if (locale !== "ru") {
		return englishHtml;
	}

	return rawHtml
		.replace("<span>Color copied</span>", "<span>Скопирован</span>")
		.replace('? "Endless"', '? "Беско"')
		.replace('? "Mode"', '? "нечность"');
};
