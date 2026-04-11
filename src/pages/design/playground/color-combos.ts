import html from "../../../design/playground/color-combos-document.html?raw";

export const prerender = true;

export function GET() {
	return new Response(html, {
		headers: {
			"Content-Type": "text/html; charset=utf-8"
		}
	});
}
