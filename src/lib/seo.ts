import { site } from '../config/site';

export const DEFAULT_OG_IMAGE = '/images/og-default.jpg';

/** Brand-suffixed page title. Drops the brand suffix when it would push the
 *  title past ~60 chars (Google's SERP display limit) so titles never truncate. */
export function pageTitle(title?: string): string {
  if (!title) return `${site.brandName} — ${site.tagline}`;
  const withBrand = `${title} | ${site.brandName}`;
  return withBrand.length <= 60 ? withBrand : title;
}

/** Trim a meta description to ~158 chars at a word boundary (avoids SERP cutoff). */
export function clampDescription(desc: string, max = 158): string {
  if (!desc || desc.length <= max) return desc;
  const cut = desc.slice(0, max);
  const i = cut.lastIndexOf(' ');
  return (i > 40 ? cut.slice(0, i) : cut).replace(/[\s.,;:—-]+$/, '') + '…';
}

/** Absolute canonical URL from the current Astro request URL. */
export function canonical(url: URL): string {
  return new URL(url.pathname, site.domain).href;
}

/** Resolve an OG image (key/relative path) to an absolute URL. */
export function absoluteImage(pathOrUrl?: string): string {
  const p = pathOrUrl || DEFAULT_OG_IMAGE;
  if (p.startsWith('http')) return p;
  return new URL(p, site.domain).href;
}

export interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  /** "website" | "article" */
  ogType?: string;
  noindex?: boolean;
}
