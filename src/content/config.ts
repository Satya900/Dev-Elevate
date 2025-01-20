import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		author: z.string(),
		date: z.date(),
		category: z.string(),
		excerpt: z.string(),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = {
	blog: blogCollection,
};