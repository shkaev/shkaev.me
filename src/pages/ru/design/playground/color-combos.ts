import { getColorCombosHtml } from "../../../../design/playground/color-combos-html";

export const prerender = true;

export function GET() {
	return new Response(getColorCombosHtml("ru"), {
		headers: {
			"Content-Type": "text/html; charset=utf-8"
		}
	});
}
