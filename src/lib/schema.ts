// JSON-LD builders. Pages/layout render these via:
//   <script type="application/ld+json" set:html={JSON.stringify(x)} />
import { site } from '../config/site';

const ORG_ID = `${site.domain}/#organization`;

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
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: site.contact.phone,
      email: site.contact.email,
      areaServed: 'US',
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
    parentOrganization: { '@id': ORG_ID },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: site.domain,
    name: site.brandName,
    publisher: { '@id': ORG_ID },
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

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  if (!faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished?: string | Date;
  dateModified?: string | Date;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: new URL(opts.path, site.domain).href,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    ...(opts.datePublished ? { datePublished: new Date(opts.datePublished).toISOString() } : {}),
    ...(opts.dateModified ? { dateModified: new Date(opts.dateModified).toISOString() } : {}),
    ...(opts.image ? { image: new URL(opts.image, site.domain).href } : {}),
  };
}
