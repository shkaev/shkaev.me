import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const photoSeries = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/content/photo-series" }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		summary: z.string(),
		intro: z.string().optional(),
		cardLocation: z.string(),
		location: z.string(),
		timeframe: z.string(),
		legacyPath: z.string().optional(),
		sortOrder: z.number().int(),
		cover: z.object({
			src: z.string(),
			width: z.number().int().positive(),
			height: z.number().int().positive()
		}),
		cardCover: z
			.object({
				src: z.string(),
				width: z.number().int().positive(),
				height: z.number().int().positive()
			})
			.optional(),
		photos: z
			.array(
				z.object({
					src: z.string(),
					width: z.number().int().positive(),
					height: z.number().int().positive(),
					size: z.number().int().positive().optional()
				})
			)
			.min(1)
	})
});

export const collections = {
	"photo-series": photoSeries
};
