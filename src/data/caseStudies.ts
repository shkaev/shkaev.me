import type { Locale } from "../i18n/config";

export type CaseStudySlug = "aosp" | "cookie-manager" | "trackoff";

export interface CaseStudyCardData {
	slug: CaseStudySlug;
	href: string;
	title: string;
	logoSrc: string;
	logoAlt: string;
	imageSrc: string;
	imageAlt: string;
	description: string;
}

interface LocalizedText {
	en: string;
	ru: string;
}

interface CaseStudyDefinition {
	slug: CaseStudySlug;
	href: string;
	title: LocalizedText;
	logoSrc: string;
	logoAlt: string;
	imageSrc: string;
	imageAlt: LocalizedText;
	description: LocalizedText;
}

const caseStudyDefinitions: CaseStudyDefinition[] = [
	{
		slug: "aosp",
		href: "/design/case-studies/aosp",
		title: {
			en: "Avast Online Security & Privacy",
			ru: "Avast Online Security & Privacy"
		},
		logoSrc: "/favicons/avast.ico",
		logoAlt: "Avast",
		imageSrc: "/images/case-studies/aosp/aosp-hero.jpg",
		imageAlt: {
			en: "Avast Online Security & Privacy case study preview",
			ru: "Превью кейса Avast Online Security & Privacy"
		},
		description: {
			en: "A major redesign of the flagship browser extension with over 10 million users.",
			ru: "Большой редизайн флагманского браузерного расширения с аудиторией более 10 миллионов пользователей."
		}
	},
	{
		slug: "cookie-manager",
		href: "/design/case-studies/cookie-manager",
		title: {
			en: "Cookie Manager",
			ru: "Cookie Manager"
		},
		logoSrc: "/favicons/avast.ico",
		logoAlt: "Avast",
		imageSrc: "/images/case-studies/cookie-manager/cookie-manager-hero.jpg",
		imageAlt: {
			en: "Cookie Manager case study preview",
			ru: "Превью кейса Cookie Manager"
		},
		description: {
			en: "Designing, building, and integrating a new feature in Avast Online Security & Privacy.",
			ru: "Проектирование, запуск и интеграция новой функции в Avast Online Security & Privacy."
		}
	},
	{
		slug: "trackoff",
		href: "/design/case-studies/trackoff",
		title: {
			en: "TrackOFF",
			ru: "TrackOFF"
		},
		logoSrc: "/favicons/trackoff.png",
		logoAlt: "TrackOFF",
		imageSrc: "/images/case-studies/trackoff/trackoff-hero.jpg",
		imageAlt: {
			en: "TrackOFF case study preview",
			ru: "Превью кейса TrackOFF"
		},
		description: {
			en: "A short story about building a successful product from the ground up and seeing it through to acquisition.",
			ru: "Короткая история о том, как продукт строился с нуля и дошёл до приобретения крупной компанией."
		}
	}
];

const toCardData = (definition: CaseStudyDefinition, locale: Locale): CaseStudyCardData => ({
	slug: definition.slug,
	href: definition.href,
	title: definition.title[locale],
	logoSrc: definition.logoSrc,
	logoAlt: definition.logoAlt,
	imageSrc: definition.imageSrc,
	imageAlt: definition.imageAlt[locale],
	description: definition.description[locale]
});

export const getCaseStudyCardData = (
	slug: CaseStudySlug,
	locale: Locale
): CaseStudyCardData => {
	const definition = caseStudyDefinitions.find((entry) => entry.slug === slug);

	if (!definition) {
		throw new Error(`Unknown case study slug: ${slug}`);
	}

	return toCardData(definition, locale);
};

export const getCaseStudyCards = (locale: Locale): CaseStudyCardData[] =>
	caseStudyDefinitions.map((definition) => toCardData(definition, locale));

export const getMoreCaseStudyCards = (
	currentSlug: CaseStudySlug,
	locale: Locale
): CaseStudyCardData[] =>
	caseStudyDefinitions
		.filter((definition) => definition.slug !== currentSlug)
		.map((definition) => toCardData(definition, locale));
