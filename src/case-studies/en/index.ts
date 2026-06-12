import { caseStudyCard as aosp } from "./aosp";
import { caseStudyCard as cookieManager } from "./cookie-manager";
import { caseStudyCard as trackoff } from "./trackoff";
import { createCaseStudyCardApi } from "../cards";

export const { getCaseStudyCards, getCaseStudyCard, getMoreCaseStudyCards } =
	createCaseStudyCardApi([aosp, cookieManager, trackoff]);
