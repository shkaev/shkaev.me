import type { Locale } from "./config";
export interface NavigationCopy {
	href: string;
	label: string;
}

export interface SocialLinkCopy {
	href: string;
	label: string;
}

export interface HeaderCopy {
	homeAriaLabel: string;
	primaryNavAriaLabel: string;
	changelogLabel: string;
	changelogAriaLabel: string;
	themeToggleAriaLabelLight: string;
	themeToggleAriaLabelDark: string;
	themeTooltipLight: string;
	themeTooltipDark: string;
	languageToggleAriaLabel: string;
	languageTooltip: string;
	languageLabel: string;
}

export interface FooterCopy {
	tagline: string;
}

export interface ChangelogSheetCopy {
	title: string;
	description: string;
	closeAriaLabel: string;
}

export interface HomePageCopy {
	metaTitle: string;
	metaDescription: string;
	heroTitle: string;
	introBeforePhotos: string;
	photosLabel: string;
	introBeforeHighlights: string;
	highlightsLabel: string;
	introBeforeAbout: string;
	aboutLabel: string;
	introAfterAbout: string;
}

export interface DesignPageCopy {
	metaTitle: string;
	metaDescription: string;
	eyebrow: string;
	title: string;
	lead: string;
	caseStudyBackLabel: string;
	caseStudyReadMoreLabel: string;
}

export interface PhotographyPageCopy {
	metaTitle: string;
	metaDescription: string;
	eyebrow: string;
	title: string;
	lead: string;
	searchPlaceholder: string;
	searchAriaLabel: string;
	clearSearchAriaLabel: string;
	countryAriaLabel: string;
	allCountriesLabel: string;
	yearAriaLabel: string;
	allYearsLabel: string;
	sortAriaLabel: string;
	sortOptions: Array<{ value: "newest" | "oldest"; label: string }>;
	legacyYearLabel: string;
	emptyStateTitle: string;
	emptyStateDescription: string;
	clearAllLabel: string;
	framesLabel: (count: number) => string;
	backToArchiveLabel: string;
	photoViewerLabel: (title: string) => string;
	closeViewerAriaLabel: string;
	prevPhotoAriaLabel: string;
	nextPhotoAriaLabel: string;
	photoGalleryAriaLabel: string;
}

export interface SiteCopy {
	siteName: string;
	navigation: NavigationCopy[];
	socialLinks: SocialLinkCopy[];
	header: HeaderCopy;
	footer: FooterCopy;
	changelog: ChangelogSheetCopy;
	home: HomePageCopy;
	design: DesignPageCopy;
	photography: PhotographyPageCopy;
}

export const siteCopy: Record<Locale, SiteCopy> = {
	en: {
		siteName: "Dmitry Shkaev",
		navigation: [
			{ href: "/photography", label: "Photography" },
			{ href: "/design", label: "Design" },
			{ href: "/about", label: "About" }
		],
		socialLinks: [
			{ href: "https://www.linkedin.com/in/shkaev/", label: "LinkedIn" },
			{ href: "https://t.me/shkaev", label: "Telegram" },
			{ href: "https://www.instagram.com/shkaev/", label: "Instagram" }
		],
		header: {
			homeAriaLabel: "Home",
			primaryNavAriaLabel: "Primary",
			changelogLabel: "Changelog",
			changelogAriaLabel: "Open changelog",
			themeToggleAriaLabelLight: "Switch to dark mode",
			themeToggleAriaLabelDark: "Switch to light mode",
			themeTooltipLight: "Dark mode",
			themeTooltipDark: "Light mode",
			languageToggleAriaLabel: "Switch to Russian",
			languageTooltip: "Русский",
			languageLabel: "РУ"
		},
		footer: {
			tagline: "Photography, design, and the things in between."
		},
		changelog: {
			title: "Changelog",
			description: "A running record of meaningful production updates.",
			closeAriaLabel: "Close changelog"
		},
		home: {
			metaTitle: "Dmitry Shkaev",
			metaDescription: "Personal website of Dmitry Shkaev.",
			heroTitle: "Hey, it's great to meet you! I'm Dima",
			introBeforePhotos: "Here you can find curated collections of the ",
			photosLabel: "photos",
			introBeforeHighlights: " I've been taking over the years, as well as some ",
			highlightsLabel: "highlights",
			introBeforeAbout: " of my professional career as a ",
			aboutLabel: "product designer",
			introAfterAbout: "."
		},
		design: {
			metaTitle: "Design | Dmitry Shkaev",
			metaDescription: "Product design highlights and selected work by Dmitry Shkaev.",
			eyebrow: "Design",
			title: "Case studies",
			lead: "Explore some of the featured product design work I've been doing over the years.",
			caseStudyBackLabel: "Case studies",
			caseStudyReadMoreLabel: "Read more case studies"
		},
		photography: {
			metaTitle: "Photography | Dmitry Shkaev",
			metaDescription: "Photography collections and visual stories by Dmitry Shkaev.",
			eyebrow: "Photography",
			title: "My collection",
			lead: "This is an archive of photos taken with my Fujifilm X-E4. It’s built series by series, with every collection kept in sequence to preserve the feeling of time, place, and movement.",
			searchPlaceholder: "Search by place, title, or year",
			searchAriaLabel: "Search photography series",
			clearSearchAriaLabel: "Clear search",
			countryAriaLabel: "Filter by country",
			allCountriesLabel: "All countries",
			yearAriaLabel: "Filter by year",
			allYearsLabel: "All years",
			sortAriaLabel: "Sort photography series",
			sortOptions: [
				{ value: "newest", label: "Newest first" },
				{ value: "oldest", label: "Oldest first" }
			],
			legacyYearLabel: "Legacy",
			emptyStateTitle: "No series matched these filters",
			emptyStateDescription: "Try clearing one of the filters or broadening the search.",
			clearAllLabel: "Clear all",
			framesLabel: (count) => `${count} frames`,
			backToArchiveLabel: "Photography",
			photoViewerLabel: (title) => `Photo viewer for ${title}`,
			closeViewerAriaLabel: "Close photo viewer",
			prevPhotoAriaLabel: "Previous photo",
			nextPhotoAriaLabel: "Next photo",
			photoGalleryAriaLabel: "Photo gallery"
		}
	},
	ru: {
		siteName: "Дмитрий Шкаев",
		navigation: [
			{ href: "/photography", label: "Фото" },
			{ href: "/design", label: "Дизайн" },
			{ href: "/about", label: "Обо мне" }
		],
		socialLinks: [
			{ href: "https://www.linkedin.com/in/shkaev/", label: "LinkedIn" },
			{ href: "https://t.me/shkaev", label: "Telegram" },
			{ href: "https://www.instagram.com/shkaev/", label: "Instagram" }
		],
		header: {
			homeAriaLabel: "Главная",
			primaryNavAriaLabel: "Основная навигация",
			changelogLabel: "История изменений",
			changelogAriaLabel: "Открыть историю изменений",
			themeToggleAriaLabelLight: "Переключить на тёмную тему",
			themeToggleAriaLabelDark: "Переключить на светлую тему",
			themeTooltipLight: "Тёмная тема",
			themeTooltipDark: "Светлая тема",
			languageToggleAriaLabel: "Switch to English",
			languageTooltip: "English",
			languageLabel: "EN"
		},
		footer: {
			tagline: "Фото, дизайн и всё, что между ними."
		},
		changelog: {
			title: "История изменений",
			description: "Хроника обновлений и улучшений сайта.",
			closeAriaLabel: "Закрыть историю изменений"
		},
		home: {
			metaTitle: "Дмитрий Шкаев",
			metaDescription: "Персональный сайт Дмитрия Шкаева.",
			heroTitle: "Привет, рад\u00A0знакомству! Я — Дима.",
			introBeforePhotos: "На сайте вы можете посмотреть, что я ",
			photosLabel: "фотографировал",
			introBeforeHighlights: " за последние несколько лет, а также почитать описание ",
			highlightsLabel: "проектов",
			introBeforeAbout: " из моей профессиональной карьеры продуктового ",
			aboutLabel: "дизайнера",
			introAfterAbout: "."
		},
		design: {
			metaTitle: "Дизайн | Дмитрий Шкаев",
			metaDescription: "Избранные продуктовые кейсы и работы Дмитрия Шкаева.",
			eyebrow: "Дизайн",
			title: "Проекты",
			lead: "Несколько интересных продуктовых кейсов, над которыми я работал в разные годы. Тексты написал в 2023 году: сначала только на английском, а на русский перевёл в 2026 при поддержке ИИ.",
			caseStudyBackLabel: "Кейсы",
			caseStudyReadMoreLabel: "Ещё кейсы"
		},
		photography: {
			metaTitle: "Фотография | Дмитрий Шкаев",
			metaDescription: "Фотографические коллекции и визуальные истории Дмитрия Шкаева.",
			eyebrow: "Фото",
			title: "Моя коллекция",
			lead: "Архив фотографий, снятых в основном на Fujifilm X-E4 и плёнку. Он сформирован по локациям и расположен в хронологическом порядке. Для удобства есть поиск с фильтрами.",
			searchPlaceholder: "Поиск по месту, названию или году",
			searchAriaLabel: "Искать серии фотографий",
			clearSearchAriaLabel: "Очистить поиск",
			countryAriaLabel: "Фильтр по стране",
			allCountriesLabel: "Все страны",
			yearAriaLabel: "Фильтр по году",
			allYearsLabel: "Все годы",
			sortAriaLabel: "Сортировка фотосерий",
			sortOptions: [
				{ value: "newest", label: "Сначала новые" },
				{ value: "oldest", label: "Сначала старые" }
			],
			legacyYearLabel: "Архив",
			emptyStateTitle: "По этим фильтрам ничего не нашлось",
			emptyStateDescription: "Попробуйте поменять запрос или сбросить один из фильтров.",
			clearAllLabel: "Сбросить всё",
			framesLabel: (count) => `${count} кадров`,
			backToArchiveLabel: "Фотография",
			photoViewerLabel: (title) => `Просмотр фотографий: ${title}`,
			closeViewerAriaLabel: "Закрыть просмотр фотографий",
			prevPhotoAriaLabel: "Предыдущая фотография",
			nextPhotoAriaLabel: "Следующая фотография",
			photoGalleryAriaLabel: "Фотогалерея"
		}
	}
};

export const getSiteCopy = (locale: Locale) => siteCopy[locale];
