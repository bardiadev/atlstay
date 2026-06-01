// JSON-LD builders. Pages/layout render these via:
//   <script type="application/ld+json" set:html={JSON.stringify(x)} />
import { site } from '../config/site';

const ORG_ID = `${site.domain}/#organization`;
const SITE_ID = `${site.domain}/#website`;

function postalAddress() {
  const a = site.contact.address;
  const addr: Record<string, string> = {
    '@type': 'PostalAddress',
    addressLocality: a.city,
    addressRegion: a.region,
    addressCountry: a.country,
  };
  if (a.street) addr.streetAddress = a.street;
  if (a.postalCode) addr.postalCode = a.postalCode;
  return addr;
}

export function organizationSchema() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.brandName,
    url: site.domain,
    description: site.description,
    slogan: site.tagline,
    logo: {
      '@type': 'ImageObject',
      url: `${site.domain}/icon-512.png`,
      width: 512,
      height: 512,
    },
    image: `${site.domain}/images/og-default.jpg`,
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: site.contact.phone,
      email: site.contact.email,
      areaServed: 'US',
      availableLanguage: 'English',
    },
  };
}

/** ProfessionalService is a LocalBusiness subtype — fits STR management. */
export function localBusinessSchema(opts: { areaServed?: string[] } = {}) {
  const areaServed = opts.areaServed ?? [...site.serviceAreas];
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.domain}/#localbusiness`,
    name: site.brandName,
    url: site.domain,
    description: site.description,
    image: `${site.domain}/images/og-default.jpg`,
    logo: `${site.domain}/icon-512.png`,
    telephone: site.contact.phone,
    email: site.contact.email,
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.contact.geo.lat,
      longitude: site.contact.geo.lng,
    },
    areaServed: areaServed.map((name) => ({ '@type': 'City', name })),
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: site.reviews.ratingValue,
      reviewCount: site.reviews.reviewCount,
      bestRating: site.reviews.bestRating,
    },
    foundingDate: String(site.stats.foundingYear),
    parentOrganization: { '@id': ORG_ID },
  };
}

/**
 * WebSite schema + SearchAction. This is what lets Google show a sitelinks
 * searchbox under our SERP listing for branded queries. The urlTemplate has to
 * point at a real, working search results page — see /search/.
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: site.domain,
    name: site.brandName,
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.domain}/search/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  serviceType?: string;
  /** Per-location targeting — adds GeoCoordinates + county for local SEO. */
  area?: { name: string; lat?: number; lng?: number; county?: string };
}) {
  const a = opts.area;
  const areaServed = a
    ? {
        '@type': 'City',
        name: a.name,
        ...(a.lat != null && a.lng != null
          ? { geo: { '@type': 'GeoCoordinates', latitude: a.lat, longitude: a.lng } }
          : {}),
        ...(a.county ? { containedInPlace: { '@type': 'AdministrativeArea', name: `${a.county} County, GA` } } : {}),
      }
    : { '@type': 'City', name: `${site.contact.address.city}, ${site.contact.address.region}` };
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? 'Short-term rental management',
    provider: { '@id': ORG_ID },
    areaServed,
  };
}

/**
 * FAQPage schema. The Speakable spec marks the actual answer paragraphs (we
 * tag them with `data-speakable` in the FAQ component) so voice/AI surfaces
 * can quote them verbatim.
 */
export function faqPageSchema(faqs: { q: string; a: string }[]) {
  if (!faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable]'],
    },
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: new URL(it.path, site.domain).href,
    })),
  };
}

/**
 * Article schema. Org-as-author is the honest default; pass `author` to emit
 * a Person instead. `speakable: true` marks the H1 + any [data-speakable]
 * elements as voice/AI-extractable.
 */
export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished?: string | Date;
  dateModified?: string | Date;
  image?: string;
  author?: { name: string; jobTitle?: string; description?: string };
  speakable?: boolean;
}) {
  const authorRef = opts.author
    ? {
        '@type': 'Person',
        name: opts.author.name,
        ...(opts.author.jobTitle ? { jobTitle: opts.author.jobTitle } : {}),
        ...(opts.author.description ? { description: opts.author.description } : {}),
        worksFor: { '@id': ORG_ID },
      }
    : { '@id': ORG_ID };
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: new URL(opts.path, site.domain).href,
    author: authorRef,
    publisher: { '@id': ORG_ID },
    ...(opts.datePublished ? { datePublished: new Date(opts.datePublished).toISOString() } : {}),
    ...(opts.dateModified ? { dateModified: new Date(opts.dateModified).toISOString() } : {}),
    ...(opts.image ? { image: new URL(opts.image, site.domain).href } : {}),
    ...(opts.speakable
      ? {
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', '[data-speakable]'],
          },
        }
      : {}),
  };
}

/**
 * ItemList — for hub/directory pages. Lets SERP carousels and AI answer
 * engines treat the page as an enumerated list of its items.
 */
export function itemListSchema(opts: {
  name: string;
  items: { name: string; path: string; description?: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: opts.name,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: new URL(it.path, site.domain).href,
      ...(it.description ? { description: it.description } : {}),
    })),
  };
}
