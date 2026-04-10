import { caseStudyCard as aosp } from "./aosp";
import { caseStudyCard as cookieManager } from "./cookie-manager";
import { caseStudyCard as trackoff } from "./trackoff";
import type { CaseStudyCardMeta } from "../types";

const caseStudyCards = [aosp, cookieManager, trackoff] as const;

export const getCaseStudyCards = (): CaseStudyCardMeta[] => [...caseStudyCards];

export const getCaseStudyCard = (href: string): CaseStudyCardMeta => {
	const card = caseStudyCards.find((entry) => entry.href === href);

	if (!card) {
		throw new Error(`Unknown case study href: ${href}`);
	}

	return card;
};

export const getMoreCaseStudyCards = (currentHref: string): CaseStudyCardMeta[] =>
	caseStudyCards.filter((entry) => entry.href !== currentHref);
