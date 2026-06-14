const escapeHtml = (value: string) =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");

export const renderInlineRichText = (value: string) =>
	escapeHtml(value).replaceAll(
		/\*\*(.+?)\*\*/g,
		'<strong class="font-bold text-ink">$1</strong>'
	);

export const renderRecommendationQuote = (value: string) =>
	escapeHtml(value).replaceAll(
		"[...]",
		'<span class="text-stone-300 dark:text-stone-700">[...]</span>'
	);
