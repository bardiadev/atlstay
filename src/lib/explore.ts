/**
 * The "explore" grid on a city page.
 *
 * WHY THIS EXISTS. The city page used to render a four-column grid containing
 * only that city's own neighborhood pages. We publish 55 neighborhood pages
 * across 100 cities, and 32 of those 55 belong to Atlanta — so in practice:
 *   - 85 city pages rendered no grid at all and offered no cards to explore,
 *   - 5 cities rendered a single lonely card,
 *   - 6 cities (Marietta among them) rendered two cards in a four-wide grid,
 *     leaving two visibly empty columns.
 * The last case is what the owner saw and reported: it reads as a broken page
 * rather than a short list.
 *
 * The fix is not to invent neighborhoods. It is to notice that a city page had
 * no route at all to two whole families of pages we already publish — the
 * `/near/{landmark}/` pages and the `/furnished-housing/{anchor}/` pages — and
 * that those are exactly the pages a reader on a city page wants next. Filling
 * the grid from them adds real internal links rather than padding.
 *
 * PRIORITY ORDER, best-first, deduped by href and capped:
 *   1. the city's own neighborhood pages
 *   2. furnished-housing anchors located in that city (hospital / studio /
 *      campus pages — brand new, and previously reachable only from the
 *      furnished-housing hub)
 *   3. landmark pages that link back into this city
 *   4. nearby cities, same county first
 *
 * The landmark mapping is INVERTED from data we already maintain rather than
 * hand-written: a landmark belongs to a city when its own `nearby` list points
 * at that city or one of its neighborhoods. That means it can never drift out
 * of step with the landmark page, and a landmark with no honest connection to
 * a city simply never appears on it.
 */
import type { Landmark } from '@/data/landmarks';
import type { Anchor } from '@/data/anchors';

export type ExploreKind = 'neighborhood' | 'anchor' | 'landmark' | 'city' | 'county';

export interface ExploreItem {
  name: string;
  href: string;
  blurb?: string;
  /** Feeds assignCardStyles so no two adjacent cards look alike. */
  slug: string;
  kind: ExploreKind;
}

/** Lower-cased, hyphenated — matches the slugs used across the content collections. */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * True when this landmark's own `nearby` list points at the city, either at the
 * city page itself (`/marietta/`) or at one of its neighborhood pages
 * (`/marietta/east-cobb/`). Anchored on both ends so `/marietta/` cannot match
 * a longer city slug that merely starts the same way.
 */
export function landmarkServesCity(landmark: Landmark, citySlug: string): boolean {
  const city = `/${citySlug}/`;
  return landmark.nearby.some((n) => n.href === city || n.href.startsWith(city));
}

export interface BuildExploreInput {
  citySlug: string;
  /** Already ordered by the city's own frontmatter. */
  neighborhoods: { name: string; slug: string; intro?: string }[];
  anchors: Anchor[];
  landmarks: Landmark[];
  nearbyCities: { name: string; slug: string; intro?: string }[];
  /** Widest breakpoint of the grid. Padding rounds up to a multiple of this. */
  columns?: number;
  /** Minimum rows to fill. Two, so a thin city still offers eight routes on. */
  minRows?: number;
}

export function buildExplore({
  citySlug,
  neighborhoods,
  anchors,
  landmarks,
  nearbyCities,
  columns = 4,
  minRows = 2,
}: BuildExploreInput): ExploreItem[] {
  const items: ExploreItem[] = [];
  const seen = new Set<string>();

  /* No cap on the in-city pages. An early version capped the whole grid at
     eight, which quietly cut Atlanta from thirty-two neighborhood links to
     eight — removing twenty-four internal links from the single most important
     page on the site to make a grid tidier. Everything that genuinely belongs
     to this city goes in; only the nearby-city padding is bounded. */
  const push = (item: ExploreItem) => {
    if (seen.has(item.href)) return;
    seen.add(item.href);
    items.push(item);
  };

  for (const n of neighborhoods) {
    push({
      name: n.name,
      href: `/${citySlug}/${n.slug}/`,
      blurb: n.intro,
      slug: n.slug,
      kind: 'neighborhood',
    });
  }

  for (const a of anchors) {
    if (slugify(a.city) !== citySlug) continue;
    push({
      name: a.shortName ?? a.name,
      href: `/furnished-housing/${a.slug}/`,
      blurb: `Furnished 30+ day housing near ${a.shortName ?? a.name}.`,
      slug: a.slug,
      kind: 'anchor',
    });
  }

  for (const l of landmarks) {
    if (!landmarkServesCity(l, citySlug)) continue;
    push({
      name: l.shortName ?? l.name,
      href: `/near/${l.slug}/`,
      blurb: l.tagline,
      slug: l.slug,
      kind: 'landmark',
    });
  }

  /* Nearby cities are padding, not content: enough of them to finish the last
     row (and to reach a first full row at all), never more. That is what turns
     Marietta's two lonely cards into two complete rows without inventing
     anything — every pad is a real city page we publish. */
  const target = Math.max(columns * minRows, Math.ceil(items.length / columns) * columns);
  for (const c of nearbyCities) {
    if (items.length >= target) break;
    push({ name: c.name, href: `/${c.slug}/`, blurb: c.intro, slug: c.slug, kind: 'city' });
  }
  return items;
}

/**
 * The same grid for a county page, which lists the cities it contains and,
 * until now, nothing else. Ten of the seventeen county pages carried three
 * cards or fewer — three of them a single card in a four-wide grid.
 */
export function buildCountyExplore({
  cities,
  citySlugs,
  anchors,
  landmarks,
  neighborhoods = [],
  nearbyCounties = [],
  countyName,
  limit = 12,
}: {
  cities: { name: string; slug: string; intro?: string }[];
  citySlugs: string[];
  anchors: Anchor[];
  landmarks: Landmark[];
  /** Neighborhood pages inside this county's cities. */
  neighborhoods?: { name: string; slug: string; citySlug: string; intro?: string }[];
  /** Counties in the same region — the last resort for a thinly-covered county. */
  nearbyCounties?: { name: string; slug: string; intro?: string }[];
  countyName: string;
  limit?: number;
}): ExploreItem[] {
  const items: ExploreItem[] = [];
  const seen = new Set<string>();
  const push = (item: ExploreItem) => {
    if (seen.has(item.href) || items.length >= limit) return;
    seen.add(item.href);
    items.push(item);
  };

  for (const c of cities) {
    push({ name: c.name, href: `/${c.slug}/`, blurb: c.intro, slug: c.slug, kind: 'city' });
  }
  for (const a of anchors) {
    if (slugify(a.county) !== slugify(countyName)) continue;
    push({
      name: a.shortName ?? a.name,
      href: `/furnished-housing/${a.slug}/`,
      blurb: `Furnished 30+ day housing near ${a.shortName ?? a.name}.`,
      slug: a.slug,
      kind: 'anchor',
    });
  }
  for (const l of landmarks) {
    if (!citySlugs.some((c) => landmarkServesCity(l, c))) continue;
    push({ name: l.shortName ?? l.name, href: `/near/${l.slug}/`, blurb: l.tagline, slug: l.slug, kind: 'landmark' });
  }
  for (const n of neighborhoods) {
    push({
      name: n.name,
      href: `/${n.citySlug}/${n.slug}/`,
      blurb: n.intro,
      slug: n.slug,
      kind: 'neighborhood',
    });
  }
  // Last resort for a county where we manage only one or two cities. Ten of the
  // seventeen still fell short of a full row on cities, anchors and landmarks
  // alone — Rockdale on one card. A neighbouring county page is a genuinely
  // useful next step for a reader, and it is the only remaining honest fill.
  for (const c of nearbyCounties) {
    push({ name: `${c.name} County`, href: `/counties/${c.slug}/`, blurb: c.intro, slug: c.slug, kind: 'county' });
  }
  return items;
}

/** Tailwind classes that keep a short row centred instead of left-hugging. */
export function exploreGridClass(count: number): string {
  const base = 'grid grid-cols-1 gap-6 sm:grid-cols-2';
  if (count >= 4) return `${base} lg:grid-cols-4`;
  if (count === 3) return `${base} mx-auto max-w-4xl lg:grid-cols-3`;
  if (count === 2) return `${base} mx-auto max-w-2xl`;
  return `${base} mx-auto max-w-sm sm:grid-cols-1`;
}

/**
 * Guides that name a specific city, for linking from that city's page.
 *
 * WHY. An audit found 139 resource guides whose slug names a city we publish —
 * `airbnb-in-marietta-ga`, `airbnb-management-cost-alpharetta` — and only 3 of
 * them were linked from the city page they are about. The rest were reachable
 * essentially only from the /resources/ index, which is why 169 pages sitewide
 * had one inbound internal link or none. City pages are the strongest pages we
 * have (2,265 impressions across 56 of them); the guides are among the weakest.
 * Linking the two is free equity and it is the link a reader wants anyway.
 *
 * Matching is longest-city-slug-first and anchored on both ends, so
 * `airbnb-in-east-atlanta-village` resolves to east-atlanta-village rather than
 * to atlanta, and `airbnb-in-marietta-ga` is not claimed by a city whose slug
 * merely appears inside another.
 */
export function guidesForCity(
  citySlug: string,
  allCitySlugs: string[],
  guides: { slug: string; title: string; description?: string }[],
  limit = 8,
): { slug: string; title: string; description?: string }[] {
  const byLength = [...allCitySlugs].sort((a, b) => b.length - a.length);
  const out: typeof guides = [];
  for (const g of guides) {
    const owner = byLength.find((c) =>
      new RegExp(`(^|-)${c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(-|$)`).test(g.slug),
    );
    if (owner === citySlug) out.push(g);
    if (out.length >= limit) break;
  }
  return out;
}
