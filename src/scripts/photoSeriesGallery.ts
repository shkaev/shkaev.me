interface GalleryPhotoSource {
	src: string;
}

export const setupPhotoSeriesGallery = () => {
	const galleryDataElement = document.querySelector("[data-gallery-photos]");

	if (!galleryDataElement?.textContent) {
		return;
	}

	let galleryPhotos: GalleryPhotoSource[];

	try {
		galleryPhotos = JSON.parse(galleryDataElement.textContent);
	} catch {
		return;
	}

	const galleryImages = Array.from(
		document.querySelectorAll(".photo-tile__image")
	);
	const pageTitle = document.querySelector("[data-page-title]");
	const mobileCarousel = document.querySelector("[data-mobile-carousel]");
	const mobileCarouselSlides = Array.from(
		document.querySelectorAll("[data-mobile-carousel-slide]")
	);
	const mobileCarouselImages = Array.from(
		document.querySelectorAll("[data-mobile-carousel-image]")
	);
	const triggers = Array.from(
		document.querySelectorAll("[data-lightbox-trigger]")
	);
	const lightbox = document.querySelector("[data-lightbox]");
	const chrome = document.querySelector("[data-lightbox-chrome]");
	const frame = document.querySelector("[data-lightbox-frame]");
	const image = document.querySelector("[data-lightbox-image]");
	const mobileScroller = document.querySelector("[data-lightbox-mobile-scroller]");
	const mobileImages = Array.from(
		document.querySelectorAll("[data-lightbox-mobile-image]")
	);
	const mobileSlides = Array.from(
		document.querySelectorAll("[data-lightbox-mobile-slide]")
	);
	const closeButtons = Array.from(
		document.querySelectorAll("[data-lightbox-close]")
	);
	const closeButton = document.querySelector("[data-lightbox-close-button]");
	const prevButton = document.querySelector("[data-lightbox-prev]");
	const nextButton = document.querySelector("[data-lightbox-next]");

	if (
		!galleryImages.length ||
		!triggers.length ||
		!(lightbox instanceof HTMLElement) ||
		!(chrome instanceof HTMLElement) ||
		!(frame instanceof HTMLElement) ||
		!(image instanceof HTMLImageElement) ||
		!(mobileScroller instanceof HTMLElement) ||
		!(closeButton instanceof HTMLButtonElement) ||
		!(prevButton instanceof HTMLButtonElement) ||
		!(nextButton instanceof HTMLButtonElement)
	) {
		return;
	}

	const markImageAsLoaded = (image) => {
		if (!(image instanceof HTMLImageElement)) {
			return;
		}

		const tile = image.closest(".photo-tile");

		if (tile instanceof HTMLElement) {
			tile.classList.add("is-loaded");
		}
	};

	galleryImages.forEach((image) => {
		if (!(image instanceof HTMLImageElement)) {
			return;
		}

		if (image.complete) {
			markImageAsLoaded(image);
			return;
		}

		image.addEventListener("load", () => markImageAsLoaded(image), {
			once: true
		});
	});

	const lightboxPhotos = galleryPhotos.map((photo, index) => {
		const trigger = triggers.find((item) => {
			if (!(item instanceof HTMLElement)) {
				return false;
			}

			return Number(item.dataset.photoIndex) === index;
		});

		return {
			src: photo.src,
			alt:
				trigger instanceof HTMLElement
					? trigger.dataset.photoAlt ?? `Photo ${index + 1}`
					: `Photo ${index + 1}`
		};
	});

	let currentIndex = 0;
	let lastFocusedElement = null;
	let mobileCarouselSettledTimer = 0;
	let mobileScrollSettledTimer = 0;
	let mobileCarouselHeightObserver = null;
	let observedMobileCarouselReference = null;
	const preloadedCarouselSources = new Map();
	const preloadedMobileSources = new Map();
	let touchStartX = 0;
	let touchStartY = 0;
	let isTrackingDismiss = false;
	let dismissDirectionLocked = false;
	const focusableSelector = [
		"a[href]",
		"button:not([disabled])",
		"input:not([disabled]):not([type='hidden'])",
		"select:not([disabled])",
		"textarea:not([disabled])",
		"[tabindex]:not([tabindex='-1'])"
	].join(",");

	const normalizeIndex = (index) =>
		(index + lightboxPhotos.length) % lightboxPhotos.length;

	const isMobileViewport = () => window.matchMedia("(max-width: 767px)").matches;
	const isVisibleFocusable = (element) =>
		element instanceof HTMLElement &&
		!element.hidden &&
		element.getAttribute("aria-hidden") !== "true" &&
		element.getClientRects().length > 0;

	const getFocusableElements = (container) =>
		Array.from(container.querySelectorAll(focusableSelector)).filter(
			isVisibleFocusable
		);

	const focusLightboxTarget = () => {
		if (isVisibleFocusable(closeButton)) {
			closeButton.focus();
			return;
		}

		const [firstFocusable] = getFocusableElements(chrome);
		(firstFocusable ?? chrome).focus();
	};

	const alignInitialMobileViewport = () => {
		if (
			!isMobileViewport() ||
			location.hash ||
			window.scrollY > 4 ||
			!(pageTitle instanceof HTMLElement) ||
			!(mobileCarousel instanceof HTMLElement)
		) {
			return;
		}

		const titleTop = pageTitle.getBoundingClientRect().top + window.scrollY;
		window.scrollTo(0, Math.max(0, titleTop - 8));
	};

	const loadMobileCarouselImage = (carouselImage, priority = "auto") => {
		if (!(carouselImage instanceof HTMLImageElement)) {
			return;
		}

		const source = carouselImage.dataset.fullSrc;

		if (!source) {
			return;
		}

		if (carouselImage.currentSrc === source || carouselImage.getAttribute("src") === source) {
			return;
		}

		if (!preloadedCarouselSources.has(source)) {
			const preloadImage = new Image();
			preloadImage.decoding = "async";
			preloadImage.fetchPriority = priority;
			preloadImage.src = source;
			preloadedCarouselSources.set(
				source,
				typeof preloadImage.decode === "function"
					? preloadImage.decode().catch(() => {})
					: Promise.resolve()
			);
		}

		const preloadPromise = preloadedCarouselSources.get(source);

		if (preloadPromise instanceof Promise) {
			preloadPromise.finally(() => {
				if (carouselImage.getAttribute("src") !== source) {
					carouselImage.src = source;
				}
			});
			return;
		}

		carouselImage.src = source;
	};

	const preloadInitialMobileCarouselImages = (count = 5) => {
		mobileCarouselImages.slice(0, count).forEach((carouselImage) => {
			loadMobileCarouselImage(carouselImage, "high");
		});
	};

	const preloadMobileCarouselWindow = (index) => {
		if (!mobileCarouselSlides.length) {
			return;
		}

		const startIndex = Math.max(0, index);
		const endIndex = Math.min(mobileCarouselSlides.length - 1, index + 3);

		for (let slideIndex = startIndex; slideIndex <= endIndex; slideIndex += 1) {
			const slide = mobileCarouselSlides[slideIndex];

			if (!(slide instanceof HTMLElement)) {
				continue;
			}

			const slideImages = Array.from(
				slide.querySelectorAll("[data-mobile-carousel-image]")
			);

			slideImages.forEach((carouselImage, imageIndex) => {
				loadMobileCarouselImage(
					carouselImage,
					slideIndex <= index + 1 && imageIndex === 0 ? "high" : "auto"
				);
			});
		}
	};

	const syncMobileCarouselFromScroll = () => {
		if (!(mobileCarousel instanceof HTMLElement) || !mobileCarouselSlides.length) {
			return;
		}

		const carouselRect = mobileCarousel.getBoundingClientRect();
		const carouselCenter = carouselRect.left + carouselRect.width / 2;
		let nearestIndex = 0;
		let nearestDistance = Number.POSITIVE_INFINITY;

		mobileCarouselSlides.forEach((slide, index) => {
			if (!(slide instanceof HTMLElement)) {
				return;
			}

			const rect = slide.getBoundingClientRect();
			const slideCenter = rect.left + rect.width / 2;
			const distance = Math.abs(slideCenter - carouselCenter);

			if (distance < nearestDistance) {
				nearestDistance = distance;
				nearestIndex = index;
			}
		});

		preloadMobileCarouselWindow(nearestIndex);
	};

	const syncMobileCarouselHeights = () => {
		if (!(mobileCarousel instanceof HTMLElement) || !isMobileViewport()) {
			return;
		}

		const referenceSlide = mobileCarousel.querySelector(
			"[data-mobile-carousel-single=\"true\"] .photo-tile"
		);

		if (!(referenceSlide instanceof HTMLElement)) {
			return;
		}

		const referenceHeight = referenceSlide.getBoundingClientRect().height;

		if (referenceHeight > 0) {
			mobileCarousel.style.setProperty(
				"--mobile-carousel-single-height",
				`${referenceHeight}px`
			);
		}
	};

	const observeMobileCarouselHeights = () => {
		if (!(mobileCarousel instanceof HTMLElement) || !isMobileViewport()) {
			return;
		}

		const referenceSlide = mobileCarousel.querySelector(
			"[data-mobile-carousel-single=\"true\"] .photo-tile"
		);

		if (!(referenceSlide instanceof HTMLElement)) {
			return;
		}

		if (observedMobileCarouselReference === referenceSlide) {
			syncMobileCarouselHeights();
			return;
		}

		observedMobileCarouselReference = referenceSlide;

		if (typeof ResizeObserver !== "function") {
			syncMobileCarouselHeights();
			return;
		}

		if (mobileCarouselHeightObserver instanceof ResizeObserver) {
			mobileCarouselHeightObserver.disconnect();
		}

		mobileCarouselHeightObserver = new ResizeObserver(() => {
			syncMobileCarouselHeights();
		});
		mobileCarouselHeightObserver.observe(referenceSlide);
		syncMobileCarouselHeights();
	};

	const applyDismissDrag = (offsetY, withTransition = false) => {
		const progress = Math.min(Math.abs(offsetY) / 240, 1);
		const scale = 1 - progress * 0.04;
		const opacity = Math.max(0.38, 1 - progress * 0.62);

		frame.style.transition = withTransition
			? "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease"
			: "none";
		frame.style.transform = `translate3d(0, ${offsetY}px, 0) scale(${scale})`;
		frame.style.opacity = String(opacity);
		lightbox.style.setProperty(
			"--lightbox-overlay-opacity",
			String(Math.max(0.18, 0.8 - progress * 0.56))
		);
	};

	const resetDismissDrag = (withTransition = true) => {
		frame.style.transition = withTransition
			? "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease"
			: "none";
		frame.style.transform = "";
		frame.style.opacity = "";
		lightbox.style.setProperty("--lightbox-overlay-opacity", "0.8");
	};

	const updateImage = () => {
		const photo = lightboxPhotos[currentIndex];

		if (!photo) {
			return;
		}

		image.src = photo.src;
		image.alt = photo.alt;
	};

	const loadMobileImageAt = (index) => {
		const normalizedIndex = normalizeIndex(index);
		const mobileImage = mobileImages[normalizedIndex];
		const source = lightboxPhotos[normalizedIndex]?.src;

		if (!source) {
			return;
		}

		if (mobileImage instanceof HTMLImageElement && !mobileImage.getAttribute("src")) {
			mobileImage.loading = "eager";
			mobileImage.fetchPriority = "high";
			mobileImage.src = source;
		}

		if (!preloadedMobileSources.has(source)) {
			const preloadImage = new Image();
			preloadImage.decoding = "async";
			preloadImage.fetchPriority = "high";
			preloadImage.src = source;
			preloadedMobileSources.set(
				source,
				typeof preloadImage.decode === "function"
					? preloadImage.decode().catch(() => {})
					: Promise.resolve()
			);
		}
	};

	const preloadMobileWindow = (index) => {
		loadMobileImageAt(index - 2);
		loadMobileImageAt(index - 1);
		loadMobileImageAt(index);
		loadMobileImageAt(index + 1);
		loadMobileImageAt(index + 2);
		loadMobileImageAt(index + 3);
	};

	const scrollMobileToIndex = (index, behavior = "smooth") => {
		const slide = mobileSlides[index];

		if (!(slide instanceof HTMLElement)) {
			return;
		}

		slide.scrollIntoView({
			behavior,
			inline: "center",
			block: "nearest"
		});
	};

	const syncCurrentIndexFromMobileScroll = () => {
		const scrollerRect = mobileScroller.getBoundingClientRect();
		const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;
		let nearestIndex = currentIndex;
		let nearestDistance = Number.POSITIVE_INFINITY;

		mobileSlides.forEach((slide, index) => {
			if (!(slide instanceof HTMLElement)) {
				return;
			}

			const rect = slide.getBoundingClientRect();
			const slideCenter = rect.left + rect.width / 2;
			const distance = Math.abs(slideCenter - scrollerCenter);

			if (distance < nearestDistance) {
				nearestDistance = distance;
				nearestIndex = index;
			}
		});

		currentIndex = nearestIndex;
		updateImage();
		preloadMobileWindow(currentIndex);
	};

	const open = (index) => {
		currentIndex = index;
		lastFocusedElement = document.activeElement;
		updateImage();
		preloadMobileWindow(index);
		lightbox.hidden = false;
		document.body.style.overflow = "hidden";
		resetDismissDrag(false);

		requestAnimationFrame(() => {
			if (isMobileViewport()) {
				scrollMobileToIndex(index, "auto");
				return;
			}

			focusLightboxTarget();
		});
	};

	const close = () => {
		lightbox.hidden = true;
		image.removeAttribute("src");
		document.body.style.overflow = "";
		resetDismissDrag(false);
		isTrackingDismiss = false;
		dismissDirectionLocked = false;

		if (lastFocusedElement instanceof HTMLElement) {
			lastFocusedElement.focus();
		}
	};

	const closeWithFade = () => {
		frame.style.transition =
			"transform 100ms cubic-bezier(0.22, 1, 0.36, 1), opacity 100ms ease";
		frame.style.transform = "scale(0.985)";
		frame.style.opacity = "0";
		lightbox.style.setProperty("--lightbox-overlay-opacity", "0");
		window.setTimeout(() => {
			close();
		}, 100);
	};

	const closeWithDismiss = (offsetY) => {
		const exitOffset =
			offsetY + Math.sign(offsetY || 1) * Math.max(window.innerHeight * 0.35, 220);

		applyDismissDrag(exitOffset, true);
		window.setTimeout(() => {
			close();
		}, 180);
	};

	const goTo = (direction) => {
		currentIndex =
			(currentIndex + direction + lightboxPhotos.length) % lightboxPhotos.length;
		updateImage();
		preloadMobileWindow(currentIndex);
		if (isMobileViewport()) {
			scrollMobileToIndex(currentIndex);
		}
	};

	triggers.forEach((trigger) => {
		trigger.addEventListener("click", (event) => {
			if (!(trigger instanceof HTMLElement)) {
				return;
			}

			if (isMobileViewport()) {
				return;
			}

			event.preventDefault();
			open(Number(trigger.dataset.photoIndex ?? 0));
		});
	});

	closeButtons.forEach((button) => {
		button.addEventListener("click", closeWithFade);
	});

	chrome.addEventListener("click", (event) => {
		const target = event.target;

		if (!(target instanceof HTMLElement)) {
			return;
		}

		if (
			target.closest(
				"[data-lightbox-image], [data-lightbox-prev], [data-lightbox-next], [data-lightbox-close-button]"
			)
		) {
			return;
		}

		closeWithFade();
	});

	prevButton.addEventListener("click", () => goTo(-1));
	nextButton.addEventListener("click", () => goTo(1));
	image.addEventListener("click", () => {
		if (isMobileViewport() || lightbox.hidden) {
			return;
		}

		goTo(1);
	});

	mobileScroller.addEventListener(
		"touchstart",
		(event) => {
			if (lightbox.hidden || !isMobileViewport() || event.touches.length !== 1) {
				return;
			}

			const touch = event.touches[0];

			if (!touch) {
				return;
			}

			touchStartX = touch.clientX;
			touchStartY = touch.clientY;
			isTrackingDismiss = false;
			dismissDirectionLocked = false;
			resetDismissDrag(false);
		},
		{ passive: true }
	);

	mobileScroller.addEventListener(
		"touchmove",
		(event) => {
			if (lightbox.hidden || !isMobileViewport() || event.touches.length !== 1) {
				return;
			}

			const touch = event.touches[0];

			if (!touch) {
				return;
			}

			const deltaX = touch.clientX - touchStartX;
			const deltaY = touch.clientY - touchStartY;
			const absDeltaX = Math.abs(deltaX);
			const absDeltaY = Math.abs(deltaY);

			if (!dismissDirectionLocked) {
				if (absDeltaY > 10 && absDeltaY > absDeltaX * 1.1) {
					isTrackingDismiss = true;
					dismissDirectionLocked = true;
				} else if (absDeltaX > 10 && absDeltaX > absDeltaY) {
					isTrackingDismiss = false;
					dismissDirectionLocked = true;
				}
			}

			if (!isTrackingDismiss) {
				return;
			}

			event.preventDefault();
			applyDismissDrag(deltaY, false);
		},
		{ passive: false }
	);

	mobileScroller.addEventListener(
		"touchend",
		(event) => {
			if (lightbox.hidden || !isMobileViewport()) {
				return;
			}

			const touch = event.changedTouches[0];

			if (!touch) {
				return;
			}

			const deltaY = touch.clientY - touchStartY;

			if (isTrackingDismiss && Math.abs(deltaY) > 110) {
				closeWithDismiss(deltaY);
			} else if (isTrackingDismiss) {
				resetDismissDrag(true);
			}

			isTrackingDismiss = false;
			dismissDirectionLocked = false;
		},
		{ passive: true }
	);

	mobileScroller.addEventListener(
		"touchcancel",
		() => {
			if (lightbox.hidden || !isMobileViewport()) {
				return;
			}

			resetDismissDrag(true);
			isTrackingDismiss = false;
			dismissDirectionLocked = false;
		},
		{ passive: true }
	);

	mobileScroller.addEventListener("scroll", () => {
		if (lightbox.hidden || !isMobileViewport() || isTrackingDismiss) {
			return;
		}

		if (mobileScrollSettledTimer) {
			window.clearTimeout(mobileScrollSettledTimer);
		}

		mobileScrollSettledTimer = window.setTimeout(() => {
			syncCurrentIndexFromMobileScroll();
		}, 120);
	});

	if (mobileCarousel instanceof HTMLElement) {
		mobileCarousel.addEventListener("scroll", () => {
			if (!isMobileViewport()) {
				return;
			}

			if (mobileCarouselSettledTimer) {
				window.clearTimeout(mobileCarouselSettledTimer);
			}

			mobileCarouselSettledTimer = window.setTimeout(() => {
				syncMobileCarouselFromScroll();
			}, 120);
		});
	}

	if (isMobileViewport()) {
		preloadInitialMobileCarouselImages(5);
		preloadMobileCarouselWindow(0);
		observeMobileCarouselHeights();
		requestAnimationFrame(() => {
			alignInitialMobileViewport();
			observeMobileCarouselHeights();
		});
	}

	document.addEventListener("keydown", (event) => {
		if (lightbox.hidden) {
			return;
		}

		if (event.key === "Tab") {
			const focusableElements = getFocusableElements(chrome);

			if (!focusableElements.length) {
				event.preventDefault();
				chrome.focus();
				return;
			}

			const firstFocusable = focusableElements[0];
			const lastFocusable = focusableElements[focusableElements.length - 1];
			const activeElement = document.activeElement;

			if (event.shiftKey) {
				if (
					activeElement === firstFocusable ||
					activeElement === chrome ||
					!chrome.contains(activeElement)
				) {
					event.preventDefault();
					lastFocusable.focus();
				}
				return;
			}

			if (activeElement === lastFocusable || !chrome.contains(activeElement)) {
				event.preventDefault();
				firstFocusable.focus();
			}
		} else if (event.key === "Escape") {
			closeWithFade();
		} else if (event.key === "ArrowLeft") {
			goTo(-1);
		} else if (event.key === "ArrowRight") {
			goTo(1);
		}
	});

	document.addEventListener("focusin", (event) => {
		if (lightbox.hidden) {
			return;
		}

		const target = event.target;

		if (target instanceof Node && chrome.contains(target)) {
			return;
		}

		focusLightboxTarget();
	});

	window.addEventListener("resize", () => {
		if (isMobileViewport()) {
			syncMobileCarouselFromScroll();
			syncMobileCarouselHeights();
		}

		if (!lightbox.hidden) {
			scrollMobileToIndex(currentIndex, "auto");
		}
	});
};
