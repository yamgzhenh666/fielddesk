import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const sourceItem = z.object({
  label: z.string(),
  href: z.string().url(),
  note: z.string().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    section: z.enum([
      "field-notes",
      "company-dossiers",
      "people",
      "sector-briefs",
    ]),
    featured: z.boolean().default(false),
    author: z.string().default("Fielddesk Editorial"),
    sources: z.array(sourceItem).default([]),
  }),
});

export const collections = { blog };
