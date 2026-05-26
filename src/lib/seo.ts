import { site } from '../config/site';

export const DEFAULT_OG_IMAGE = '/images/og-default.jpg';

/** Brand-suffixed page title. Home passes no title → bare brand + tagline. */
export function pageTitle(title?: string): string {
  if (!title) return `${site.brandName} — ${site.tagline}`;
  return `${title} | ${site.brandName}`;
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
