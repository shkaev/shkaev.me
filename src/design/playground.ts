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

const playgroundCards = [
	{
		title: "Color combos",
		description: "A fun tool I made featuring 10 curated color pairs and an endless mode for your inspiration. Best enjoyed in fullscreen.",
		href: "/design/playground/color-combos",
		imageSrc: "/images/playground/color-combos-cover.svg",
		imageAlt: "Solid muted green cover for the Color combos playground card."
	}
] satisfies PlaygroundCardMeta[];

export const playgroundSection = {
	title: "Playground",
	lead: "A place for design artifacts, explorations, and experimental visual ideas.",
	cards: playgroundCards
} satisfies PlaygroundSectionMeta;
