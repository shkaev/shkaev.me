import { renderRecommendationQuote } from "../lib/renderInlineRichText";

interface RecommendationSliderItem {
	name: string;
	href: string;
	favicon: string;
	role: string;
	avatar: string;
	text: string;
}

interface RecommendationSliderConfig {
	items: RecommendationSliderItem[];
	nextLabel: string;
	restartLabel: string;
}

export const setupRecommendationSlider = () => {
	const configElement = document.querySelector("[data-recommendation-slider]");

	if (!configElement?.textContent) {
		return;
	}

	let config: RecommendationSliderConfig;

	try {
		config = JSON.parse(configElement.textContent);
	} catch {
		return;
	}

	const recommendationItems = config.items;
	const nextRecommendationLabel = config.nextLabel;
	const restartRecommendationLabel = config.restartLabel;

			const recommendationCopy = document.getElementById("featured-recommendation-copy");
		const recommendationMeta = document.getElementById("featured-recommendation-meta");
		const recommendationText = document.getElementById("featured-recommendation-text");
		const recommendationAvatarLink = document.getElementById(
			"featured-recommendation-avatar-link"
		);
		const recommendationName = document.getElementById("featured-recommendation-name");
		const recommendationNameText = document.getElementById(
			"featured-recommendation-name-text"
		);
		const recommendationFavicon = document.getElementById(
			"featured-recommendation-favicon"
		);
		const recommendationRole = document.getElementById("featured-recommendation-role");
		const recommendationAvatar = document.getElementById("featured-recommendation-avatar");
		const recommendationAvatarPlaceholder = document.getElementById(
			"featured-recommendation-avatar-placeholder"
		);
		const recommendationProgressFill = document.getElementById(
			"featured-recommendation-progress-fill"
		);
		const recommendationPrev = document.getElementById("featured-recommendation-prev");
		const recommendationNext = document.getElementById("featured-recommendation-next");
		const recommendationNextIcon = document.getElementById(
			"featured-recommendation-next-icon"
		);
		const recommendationResetIcon = document.getElementById(
			"featured-recommendation-reset-icon"
		);

		if (
			recommendationItems.length > 0 &&
			recommendationCopy instanceof HTMLElement &&
			recommendationMeta instanceof HTMLElement &&
			recommendationText instanceof HTMLElement &&
			recommendationAvatarLink instanceof HTMLAnchorElement &&
			recommendationName instanceof HTMLAnchorElement &&
			recommendationNameText instanceof HTMLElement &&
			recommendationFavicon instanceof HTMLImageElement &&
			recommendationRole instanceof HTMLElement &&
			recommendationAvatar instanceof HTMLImageElement &&
			recommendationAvatarPlaceholder instanceof HTMLElement &&
			recommendationProgressFill instanceof HTMLElement &&
			recommendationPrev instanceof HTMLButtonElement &&
			recommendationNext instanceof HTMLButtonElement &&
			recommendationNextIcon instanceof HTMLElement &&
			recommendationResetIcon instanceof HTMLElement
		) {
			let recommendationIndex = 0;
			let isAnimating = false;
			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)"
			).matches;
			const preloadImage = (src: string) => {
				if (!src) {
					return;
				}

				const image = new Image();
				image.src = src;
			};
			const measureRecommendationHeight = () => {
				const copyWidth = recommendationCopy.getBoundingClientRect().width;

				if (!copyWidth) {
					return;
				}

				const measurementNode = document.createElement("div");
				measurementNode.className =
					"pointer-events-none fixed left-0 top-0 -z-10 flex max-w-5xl items-end opacity-0";
				measurementNode.style.width = `${copyWidth}px`;

				const measurementText = document.createElement("p");
				measurementText.className =
					"text-[1.7rem] font-medium leading-[1.26] tracking-tight text-ink sm:text-[2.2rem] sm:leading-[1.28]";
				measurementNode.append(measurementText);
				document.body.append(measurementNode);

				let maxHeight = 0;

				for (const item of recommendationItems) {
					measurementText.innerHTML = renderRecommendationQuote(item.text);
					maxHeight = Math.max(maxHeight, measurementNode.getBoundingClientRect().height);
				}

				measurementNode.remove();

				if (maxHeight > 0) {
					recommendationCopy.style.minHeight = `${Math.ceil(maxHeight)}px`;
				}
			};

			const syncRecommendationControls = () => {
				const isFirstRecommendation = recommendationIndex === 0;
				const isLastRecommendation =
					recommendationIndex === recommendationItems.length - 1;

				recommendationPrev.disabled = isFirstRecommendation;
					recommendationNext.disabled = false;
					recommendationNext.setAttribute(
						"aria-label",
						isLastRecommendation ? restartRecommendationLabel : nextRecommendationLabel
					);
				recommendationNextIcon.classList.toggle("hidden", isLastRecommendation);
				recommendationResetIcon.classList.toggle("hidden", !isLastRecommendation);
			};

			const renderRecommendation = () => {
				const item = recommendationItems[recommendationIndex];

				recommendationText.innerHTML = renderRecommendationQuote(item.text);
				recommendationAvatarLink.href = item.href;
				recommendationNameText.textContent = item.name;
				recommendationName.href = item.href;
				recommendationRole.textContent = item.role;
				recommendationFavicon.src = item.favicon;
				recommendationFavicon.classList.toggle("hidden", !item.favicon);

				if (item.avatar) {
					recommendationAvatar.src = item.avatar;
					recommendationAvatar.alt = item.name;
					recommendationAvatar.classList.remove("hidden");
					recommendationAvatarPlaceholder.classList.add("hidden");
				} else {
					recommendationAvatar.classList.add("hidden");
					recommendationAvatarPlaceholder.classList.remove("hidden");
				}

				const progress = ((recommendationIndex + 1) / recommendationItems.length) * 100;
				recommendationProgressFill.classList.remove("hidden");
				recommendationProgressFill.style.width = `${progress}%`;

				syncRecommendationControls();
			};

			measureRecommendationHeight();

			if ("ResizeObserver" in window) {
				const resizeObserver = new ResizeObserver(() => {
					measureRecommendationHeight();
				});
				resizeObserver.observe(recommendationCopy);
			} else {
				window.addEventListener("resize", measureRecommendationHeight);
			}

			recommendationItems.forEach((item) => {
				preloadImage(item.avatar);
				preloadImage(item.favicon);
			});

			const animateElements = (
			elements: HTMLElement[],
			keyframes: Keyframe[],
			options: KeyframeAnimationOptions
		) =>
				Promise.all(
					elements.map(
						(element) =>
							new Promise((resolve) => {
								const animation = element.animate(keyframes, options);
								animation.addEventListener("finish", resolve, { once: true });
							})
					)
				);

			const transitionRecommendation = async (step: number) => {
				if (isAnimating) {
					return;
				}

				const nextIndex =
					(recommendationIndex + step + recommendationItems.length) %
					recommendationItems.length;

				if (prefersReducedMotion) {
					recommendationIndex = nextIndex;
					renderRecommendation();
					return;
				}

				isAnimating = true;
				syncRecommendationControls();

				const exitOffset = step > 0 ? -18 : 18;
				const enterOffset = step > 0 ? 18 : -18;
				const animatedElements = [recommendationCopy, recommendationMeta];

				await animateElements(
					animatedElements,
					[
						{ opacity: 1, transform: "translate3d(0, 0, 0)" },
						{
							opacity: 0,
							transform: `translate3d(${exitOffset}px, 0, 0)`
						}
					],
					{ duration: 180, easing: "ease-out", fill: "forwards" }
				);

				recommendationIndex = nextIndex;
				renderRecommendation();

				animatedElements.forEach((element) => {
					element.style.opacity = "0";
					element.style.transform = `translate3d(${enterOffset}px, 0, 0)`;
				});

				await animateElements(
					animatedElements,
					[
						{
							opacity: 0,
							transform: `translate3d(${enterOffset}px, 0, 0)`
						},
						{ opacity: 1, transform: "translate3d(0, 0, 0)" }
					],
					{ duration: 220, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
				);

				animatedElements.forEach((element) => {
					element.style.opacity = "";
					element.style.transform = "";
				});

				isAnimating = false;
				syncRecommendationControls();
			};

			recommendationPrev.addEventListener("click", () => {
				void transitionRecommendation(-1);
			});

			recommendationNext.addEventListener("click", () => {
				if (recommendationIndex === recommendationItems.length - 1) {
					recommendationIndex = 0;

					if (prefersReducedMotion) {
						renderRecommendation();
						return;
					}

					isAnimating = true;
					syncRecommendationControls();

					const animatedElements = [recommendationCopy, recommendationMeta];

					void animateElements(
						animatedElements,
						[
							{ opacity: 1, transform: "translate3d(0, 0, 0)" },
							{ opacity: 0, transform: "translate3d(-18px, 0, 0)" }
						],
						{ duration: 180, easing: "ease-out", fill: "forwards" }
					).then(async () => {
						renderRecommendation();

						animatedElements.forEach((element) => {
							element.style.opacity = "0";
							element.style.transform = "translate3d(18px, 0, 0)";
						});

						await animateElements(
							animatedElements,
							[
								{ opacity: 0, transform: "translate3d(18px, 0, 0)" },
								{ opacity: 1, transform: "translate3d(0, 0, 0)" }
							],
							{
								duration: 220,
								easing: "cubic-bezier(0.22, 1, 0.36, 1)",
								fill: "forwards"
							}
						);

						animatedElements.forEach((element) => {
							element.style.opacity = "";
							element.style.transform = "";
						});

						isAnimating = false;
						syncRecommendationControls();
					});
					return;
				}

				void transitionRecommendation(1);
			});
			renderRecommendation();
		}
};
