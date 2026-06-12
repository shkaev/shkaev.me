import type { CaseStudyCardMeta } from "./types";

export const createCaseStudyCardApi = (
	caseStudyCards: readonly CaseStudyCardMeta[]
) => ({
	getCaseStudyCards: (): CaseStudyCardMeta[] => [...caseStudyCards],
	getCaseStudyCard: (href: string): CaseStudyCardMeta => {
		const card = caseStudyCards.find((entry) => entry.href === href);

		if (!card) {
			throw new Error(`Unknown case study href: ${href}`);
		}

		return card;
	},
	getMoreCaseStudyCards: (currentHref: string): CaseStudyCardMeta[] =>
		caseStudyCards.filter((entry) => entry.href !== currentHref)
});
