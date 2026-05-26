import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// FAQ shape reused across collections (renders to FAQPage JSON-LD).
const faq = z.object({ q: z.string(), a: z.string() });

// City landing pages (e.g. Atlanta). Clone-per-city: add a file = add a market.
const cities = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cities' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(), // "Atlanta"
      state: z.string(), // "GA"
      slug: z.string(), // "atlanta"
      region: z.enum(['atlanta', 'metro', 'georgia']).default('metro'),
      title: z.string(), // SEO <title>
      description: z.string(), // meta description
      intro: z.string(), // hero subhead / lede
      heroImage: z.string().optional(), // image map key or /images path
      neighborhoods: z.array(z.string()).default([]), // neighborhood slugs
      highlights: z.array(z.string()).default([]),
      faqs: z.array(faq).default([]),
      order: z.number().default(0),
      published: z.boolean().default(true),
    }),
});

// Neighborhood landing pages (Buckhead, Midtown, …). Hyper-local SEO.
const neighborhoods = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/neighborhoods' }),
  schema: z.object({
    name: z.string(), // "Buckhead"
    slug: z.string(), // "buckhead"
    citySlug: z.string(), // "atlanta"
    title: z.string(),
    description: z.string(),
    intro: z.string(),
    heroImage: z.string().optional(),
    demandDrivers: z.array(z.string()).default([]), // why STR works here
    attractions: z.array(z.string()).default([]),
    faqs: z.array(faq).default([]),
    published: z.boolean().default(true),
  }),
});

// Long-form authority content (fees, regulations, "is it worth it", blog).
const resources = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().default('Guide'),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    faqs: z.array(faq).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { cities, neighborhoods, resources };
