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
		'<strong class="font-bold text-stone-950 dark:text-stone-50">$1</strong>'
	);
