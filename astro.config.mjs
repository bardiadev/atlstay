// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Real per-article <lastmod> dates for the sitemap.
 *
 * Every URL sharing one build timestamp teaches Google to ignore lastmod
 * entirely, so resource articles publish their own `updatedDate ?? publishDate`
 * straight from the collection frontmatter. Astro's config can't call
 * getCollection(), so the frontmatter is read from disk here. Page types with
 * no real date keep the build timestamp — we never invent a date.
 *
 * @returns {Map<string, string>} slug → ISO date string
 */
function resourceLastmods() {
  /** @type {Map<string, string>} */
  const map = new Map();
  const dir = new URL('./src/content/resources/', import.meta.url);
  /** @type {string[]} */
  let files = [];
  try {
    files = readdirSync(dir);
  } catch {
    return map; // no resources dir → sitemap still builds
  }
  for (const file of files) {
    if (!/\.mdx?$/.test(file)) continue;
    let raw = '';
    try {
      raw = readFileSync(new URL(file, dir), 'utf8');
    } catch {
      continue;
    }
    const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
    if (!fm) continue;
    const pick = (/** @type {string} */ key) =>
      new RegExp(`^${key}:\\s*['"]?(\\d{4}-\\d{2}-\\d{2})`, 'm').exec(fm[1])?.[1] ?? null;
    const date = pick('updatedDate') ?? pick('publishDate');
    if (!date) continue;
    const parsed = new Date(`${date}T00:00:00.000Z`);
    if (Number.isNaN(parsed.getTime())) continue;
    map.set(file.replace(/\.mdx?$/, ''), parsed.toISOString());
  }
  return map;
}

const RESOURCE_LASTMOD = resourceLastmods();

// NOTE: update `site` to the production domain before deploy.
export default defineConfig({
  site: 'https://atlstay.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      // /boroto = private dashboard; /search = noindex (a sitemapped noindex URL
      // triggers "Submitted URL marked noindex" in Search Console).
      filter: (page) => !page.includes('/boroto') && !/\/search\/?$/.test(page),
      serialize(item) {
        const u = item.url;
        const resource = /\/resources\/([^/]+)\/$/.exec(u);
        const lastmod = resource && RESOURCE_LASTMOD.get(resource[1]);
        if (lastmod) item.lastmod = lastmod;
        if (u === 'https://atlstay.com/') item.priority = 1.0;
        else if (/\/(services|pricing|rental-projection)\/$/.test(u)) item.priority = 0.9;
        else if (/\/(areas-we-serve|atlanta)\/$/.test(u)) item.priority = 0.8;
        else if (/\/(resources|compare|how-it-works|about|contact|world-cup)/.test(u)) item.priority = 0.7;
        else item.priority = 0.75; // location pages
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
