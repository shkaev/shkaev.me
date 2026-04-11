export interface PlaygroundCardMeta {
	title: string;
	description: string;
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
		description: "Quick palette sketches for atmospheres, surfaces, and visual contrast.",
		imageSrc: "/images/playground/color-combos-cover.svg",
		imageAlt: "Solid muted green cover for the Color combos playground card."
	}
] satisfies PlaygroundCardMeta[];

export const playgroundSection = {
	title: "Playground",
	lead: "A place for smaller design artifacts, rough explorations, and visual ideas that do not need a full case study.",
	cards: playgroundCards
} satisfies PlaygroundSectionMeta;
