import type { Locale } from "../i18n/config";

export interface PlaygroundCardMeta {
	title: string;
	description: string;
	href?: string;
	imageSrc: string;
	imageAlt: string;
}

export interface PlaygroundSectionMeta {
	title: string;
	lead: string;
	cards: PlaygroundCardMeta[];
}

const playgroundCardsEn = [
	{
		title: "Color combos",
		description: "A fun tool I made featuring 10 curated color pairs and an endless mode for your inspiration. Best enjoyed in fullscreen.",
		href: "/design/playground/color-combos",
		imageSrc: "/images/playground/color-combos-cover.svg",
		imageAlt: "Two color panels with an inverted circle between them for the Color combos playground card."
	}
] satisfies PlaygroundCardMeta[];

const playgroundCardsRu = [
	{
		title: "Цветовые комбо",
		description: "Десять приятных пар цветов и режим бесконечности для вдохновения. Лучше всего смотреть на полном экране.",
		href: "/design/playground/color-combos",
		imageSrc: "/images/playground/color-combos-cover.svg",
		imageAlt: "Обложка для карточки «Цветовые комбо» с двумя цветовыми панелями и инвертированным кругом по центру."
	}
] satisfies PlaygroundCardMeta[];

const playgroundSectionEn = {
	title: "Playground",
	lead: "A place for design artifacts, explorations, and experimental visual ideas.",
	cards: playgroundCardsEn
} satisfies PlaygroundSectionMeta;

const playgroundSectionRu = {
	title: "Эксперименты",
	lead: "Пространство для дизайн-артефактов, исследований и реализации визуальных идей.",
	cards: playgroundCardsRu
} satisfies PlaygroundSectionMeta;

export const getPlaygroundSection = (locale: Locale): PlaygroundSectionMeta =>
	locale === "ru" ? playgroundSectionRu : playgroundSectionEn;
