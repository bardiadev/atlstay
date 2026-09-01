// JSON-LD builders. Pages/layout render these via:
//   <script type="application/ld+json" set:html={JSON.stringify(x)} />
import { site } from '../config/site';
import { serviceLines } from '../data/serviceLines';

const ORG_ID = `${site.domain}/#organization`;
const SITE_ID = `${site.domain}/#website`;
// Parent/operating company — Silverstone Management LLC (ssmproperty.com), which
// owns the Google Business Profile. ATLStay is its secondary SEO brand and
// references it as parentOrganization (without claiming its GBP reviews).
const SILVERSTONE_ID = `${site.company.url}/#organization`;

/**
 * The management fee, as structured data.
 *
 * WHY THIS EXISTS. Asked "what does Atlanta property management cost" or
 * "cheapest Airbnb management in Atlanta", an assistant extracts a price if one
 * is machine-readable and paraphrases vaguely if it is not. Ours was only ever
 * in prose. The fee is a genuine competitive fact — 10–15% all-in against the
 * 25–35% that industry reviews report for the national operators, sourced on
 * our own comparison pages — so it is worth stating in a form a machine can
 * read.
 *
 * `unitText` is doing real work here. minPrice 10 / maxPrice 15 with a USD
 * currency would otherwise read as ten to fifteen DOLLARS, which would be
 * worse than saying nothing. The unit text and the description both spell out
 * that this is a percentage of booking revenue.
 *
 * Deliberately NOT asserted: the happiness guarantee and the no-long-term-
 * contract terms. The owner confirmed both are real but that they "depend on
 * deal and offer", so they are not universal, and a blanket offer term in
 * schema would misrepresent them.
 */
function managementOffer() {
  return {
    '@type': 'Offer',
    name: 'All-inclusive property management',
    description:
      `${site.pricing.rate} ${site.pricing.rateNote}. ${site.pricing.rateBasis}`,
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: 'USD',
      minPrice: Number(site.pricing.rateFrom.replace('%', '')),
      maxPrice: Number(site.pricing.rateHigh.replace('%', '')),
      unitText: 'percent of booking revenue',
      description: `${site.pricing.rate} of booking revenue, all-inclusive. No setup fees and no per-booking charges.`,
    },
    seller: { '@id': ORG_ID },
    areaServed: { '@type': 'State', name: 'Georgia' },
  };
}

/** Every service line we actually publish a page for. */
function offerCatalog() {
  return {
    '@type': 'OfferCatalog',
    name: `${site.brandName} property management services`,
    itemListElement: serviceLines.map((l) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: l.name,
        serviceType: l.name,
        url: `${site.domain}/services/${l.slug}/`,
        provider: { '@id': ORG_ID },
      },
    })),
  };
}

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
    foundingDate: String(site.stats.foundingYear),
    areaServed: [...site.serviceAreas].map((name) =>
      name === 'Georgia, US'
        ? { '@type': 'State', name: 'Georgia' }
        : { '@type': 'City', name },
    ),
    // Topical scope, for entity understanding. Every one of these is a subject
    // we publish a real service line or guide on — not an aspirational list.
    knowsAbout: [
      'Short-term rental management',
      'Airbnb property management',
      'Vacation rental management',
      'Long-term rental management',
      'Tenant placement',
      'Mid-term and furnished rental management',
      'Corporate housing',
      'Travel nurse housing',
      'Insurance and displacement housing',
      'Film and production housing',
      'Student housing',
      'HOA and community association management',
      'Commercial property management',
      'Multi-family property management',
      'Georgia landlord-tenant law',
      'Atlanta short-term rental regulations',
    ],
    hasOfferCatalog: offerCatalog(),
    makesOffer: managementOffer(),
    // ATLStay is a secondary brand operated by Silverstone Management LLC.
    parentOrganization: { '@id': SILVERSTONE_ID },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: site.contact.phone,
      email: site.contact.email,
      areaServed: 'Georgia, US',
      availableLanguage: 'English',
    },
  };
}

/** Silverstone Management LLC — the real parent company (ssmproperty.com) that
 *  owns the Google Business Profile. Emitted site-wide so ATLStay's Organization
 *  and LocalBusiness reference it as their parent, without claiming its GBP
 *  reviews as ATLStay's own. */
export function parentOrganizationSchema() {
  const c = site.company;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': SILVERSTONE_ID,
    name: c.name,
    legalName: c.legalName,
    url: c.url,
    telephone: c.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.address.street,
      addressLocality: c.address.city,
      addressRegion: c.address.region,
      postalCode: c.address.postalCode,
      addressCountry: c.address.country,
    },
    sameAs: [c.url, c.mapsUrl].filter(Boolean),
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
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    // NOTE: aggregateRating intentionally omitted. Google restricts self-served
    // review markup on a business's own LocalBusiness entity, and an unverifiable
    // count on a new domain risks being ignored or flagged. The visible
    // social-proof copy (ReviewProof) carries the rating instead.
    foundingDate: String(site.stats.foundingYear),
    // The fee is repeated here on purpose — it is the single most extracted
    // fact on the page and the ProfessionalService entity is what a local
    // query resolves to. The full service catalogue is NOT repeated: it hangs
    // off the Organization above, which this references as parent, and
    // duplicating fifteen offers into every one of 936 pages bought weight
    // without adding meaning.
    makesOffer: managementOffer(),
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
  area?: {
    name: string;
    type?: 'City' | 'AdministrativeArea';
    lat?: number;
    lng?: number;
    county?: string;
  };
}) {
  const a = opts.area;
  const areaType = a?.type ?? 'City';
  const areaServed = a
    ? {
        '@type': areaType,
        name: a.name,
        ...(a.lat != null && a.lng != null
          ? { geo: { '@type': 'GeoCoordinates', latitude: a.lat, longitude: a.lng } }
          : {}),
        ...(a.county && areaType === 'City'
          ? { containedInPlace: { '@type': 'AdministrativeArea', name: `${a.county} County, GA` } }
          : {}),
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
    offers: managementOffer(),
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
