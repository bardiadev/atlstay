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

/**
 * Real `lastmod` for every page type, read from a COMMITTED map.
 *
 * This deliberately does not call git. The first version did, and it silently
 * did nothing in production: Cloudflare Pages builds from a shallow clone, so
 * `git log` saw one commit, every path resolved to the same date, and the
 * sitemap went straight back to claiming all 910 URLs changed today. It passed
 * locally and failed live — caught only by reading the deployed sitemap.
 *
 * scripts/build-lastmod.mjs computes the dates where full history exists and
 * writes src/data/lastmod.json, which is committed. Run it before committing
 * when content changes. A missing or stale map degrades to the build timestamp
 * — the old behaviour — rather than producing a date that is wrong.
 */
let GIT_LASTMOD = /** @type {Record<string,string>} */ ({});
try {
  GIT_LASTMOD = JSON.parse(readFileSync(new URL('./src/data/lastmod.json', import.meta.url), 'utf8'));
} catch {
  console.warn('[sitemap] src/data/lastmod.json missing — lastmod falls back to build time. Run: node scripts/build-lastmod.mjs');
}

/** Newest ISO date among the given repo paths, or null if none are known. */
function newestOf(/** @type {(string|null|undefined)[]} */ ...paths) {
  let best = null;
  for (const p of paths) {
    if (!p) continue;
    const d = GIT_LASTMOD[p];
    if (d && (!best || d > best)) best = d;
  }
  return best;
}

/** Any serviceLines / serviceNotes file can change a service page. */
const NEWEST_SERVICE_DATA = newestOf(
  ...Object.keys(GIT_LASTMOD).filter(
    (p) => p.startsWith('src/data/serviceLines/') || p.startsWith('src/data/serviceNotes/'),
  ),
);

// NOTE: update `site` to the production domain before deploy.
export default defineConfig({
  site: 'https://atlstay.com',
  trailingSlash: 'always',
  build: { format: 'directory', // 'auto', not 'always'. Inlining put 63KB of CSS into every one of 894 pages —
    // 40% of the homepage's 155KB — which the browser must pull down before it can
    // even request the hero image, and the hero image is the LCP element (measured:
    // 91% of a 375px viewport). 'auto' still inlines small sheets but links the big
    // one, so it downloads in parallel AND is cached for every subsequent page —
    // which matters on a site whose whole funnel is city page -> service page.
    inlineStylesheets: 'auto' },
  integrations: [
    react(),
    sitemap({
      lastmod: new Date(),
      // /boroto = private dashboard; /search = noindex (a sitemapped noindex URL
      // triggers "Submitted URL marked noindex" in Search Console).
      filter: (page) => !page.includes('/boroto') && !/\/search\/?$/.test(page),
      serialize(item) {
        // `priority` and `changefreq` are deliberately NOT emitted. Google has
        // ignored both for years, and the values here had already drifted out of
        // step with what the code claimed to produce — so they were bytes on
        // every one of ~894 URLs that no search engine reads.
        //
        // `lastmod` is real for every page type we can source honestly:
        // resources from their own frontmatter, everything else from the last
        // commit touching the content, data and template files that determine
        // the page. Anything we cannot source keeps the build timestamp rather
        // than getting a date we made up.
        const u = item.url;
        const path = new URL(u).pathname;
        const seg = path.split('/').filter(Boolean);

        const resource = /\/resources\/([^/]+)\/$/.exec(u);
        if (resource && RESOURCE_LASTMOD.get(resource[1])) {
          item.lastmod = RESOURCE_LASTMOD.get(resource[1]);
          return item;
        }

        let lastmod = null;
        if (seg[0] === 'services' && seg.length === 3) {
          // service x city: the service data, the city's own file, and the template
          lastmod = newestOf(
            NEWEST_SERVICE_DATA,
            `src/content/cities/${seg[2]}.md`,
            'src/pages/services/[service]/[city].astro',
          );
        } else if (seg[0] === 'services') {
          lastmod = newestOf(NEWEST_SERVICE_DATA, 'src/pages/services/[service]/index.astro');
        } else if (seg[0] === 'furnished-housing') {
          lastmod = newestOf('src/data/anchors.ts', 'src/pages/furnished-housing/[anchor].astro');
        } else if (seg[0] === 'counties') {
          lastmod = newestOf('src/data/counties.ts');
        } else if (seg[0] === 'manage') {
          lastmod = newestOf('src/data/propertyTypes.ts');
        } else if (seg[0] === 'near') {
          lastmod = newestOf('src/data/landmarks.ts');
        } else if (seg.length === 2) {
          // {city}/{neighbourhood}
          lastmod = newestOf(
            `src/content/neighborhoods/${seg[1]}.md`,
            `src/content/cities/${seg[0]}.md`,
            'src/pages/[city]/[neighborhood].astro',
          );
        } else if (seg.length === 1) {
          // A city page, or a hand-built top-level page — try both.
          lastmod = newestOf(
            `src/content/cities/${seg[0]}.md`,
            `src/pages/${seg[0]}.astro`,
            `src/pages/${seg[0]}/index.astro`,
          );
        } else if (seg.length === 0) {
          lastmod = newestOf('src/pages/index.astro');
        }

        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
