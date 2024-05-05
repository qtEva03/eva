import { defineCollection, z } from "astro:content";

const projectCollection = defineCollection({
    type: "content",
    schema: ({ image }) => z.object({
        href: z.string(),
        datetime: z.string(),
        date: z.string(),
        icon: z.object({
            src: image(),
            alt: z.string(),
        }),
        title: z.string(),
    })
});

export const collections = {
    "projects": projectCollection,
};