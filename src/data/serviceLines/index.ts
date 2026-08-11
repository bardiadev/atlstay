// Barrel for the service-line axis. Import `serviceLines` everywhere.
import type { ServiceLine, ServiceCategory } from './types';
import type { ProjectionFormVariant } from '../../components/react/ProjectionForm';
import { site } from '../../config/site';
import { longTermServices } from './longTerm';
import { midTermServices } from './midTerm';
import { platformServices } from './platform';
import { hoaServices } from './hoa';

export type { ServiceLine, ServiceCategory, ServiceFaq, ServiceSection, ServiceSource } from './types';

export const serviceLines: ServiceLine[] = [
  ...longTermServices,
  ...midTermServices,
  ...platformServices,
  ...hoaServices,
].filter((s) => s.published);

/** Display order + copy for the category groupings on the /services/ hub. */
export const serviceCategories: {
  key: ServiceCategory;
  label: string;
  blurb: string;
}[] = [
  {
    key: 'long-term',
    label: 'Long-term rentals',
    blurb: 'Twelve-month leases, real tenants, and the licensed brokerage work that goes with them.',
  },
  {
    key: 'mid-term',
    label: 'Mid-term & furnished',
    blurb: 'Thirty days and up — corporate, healthcare, insurance, and production housing.',
  },
  {
    key: 'commercial',
    label: 'Commercial & investment',
    blurb: 'Retail, office, flex, multi-unit portfolios, and the investor services behind them.',
  },
  {
    key: 'platform',
    label: 'Booking channels',
    blurb: 'Getting your property in front of guests wherever they actually book.',
  },
  {
    key: 'short-term',
    label: 'Short-term rentals',
    blurb: 'Nightly Airbnb and vacation-rental management — where we started.',
  },
];

export function servicesByCategory(cat: ServiceCategory): ServiceLine[] {
  return serviceLines.filter((s) => s.category === cat).sort((a, b) => a.order - b.order);
}

export function findService(slug: string): ServiceLine | undefined {
  return serviceLines.find((s) => s.slug === slug);
}

/**
 * How the fee is described on a service page.
 *
 * `site.pricing.rate` is the SHORT-TERM rate — a percentage of *booking
 * revenue*. That is simply untrue for long-term, commercial and HOA work,
 * which are priced per property or per door, per month. Printing the booking
 * -revenue rate on those pages would publish a wrong business fact, so the
 * copy is chosen by category and only ever states a number where it applies.
 */
export function feeLine(category: ServiceCategory): string {
  switch (category) {
    case 'short-term':
    case 'platform':
    case 'mid-term':
      return `${site.pricing.rate} ${site.pricing.rateNote} — quoted for your property, in writing, before you sign anything.`;
    case 'commercial':
    case 'long-term':
    default:
      return 'One management fee, quoted for your property in writing before you sign anything — no onboarding charge, no markup on maintenance, and no surprise line items.';
  }
}

/**
 * Which set of questions the lead form should ask on this service's pages.
 *
 * The form is one shared React island across ~900 pages; asking an HOA board
 * how many bedrooms it has, or an office landlord whether it's on Airbnb, loses
 * the lead. Anything without its own question set falls back to 'short-term',
 * which is the site-wide default and must stay the default.
 * (Type-only import — erased at build, so no runtime coupling to the island.)
 */
export function formVariantFor(s: ServiceLine): ProjectionFormVariant {
  if (s.slug === 'hoa-management') return 'hoa';
  if (s.category === 'commercial') return 'commercial';
  if (s.category === 'long-term') return 'long-term';
  return 'short-term';
}

/** Heading for the mid-page lead-capture band, phrased for the audience. */
export function formBandHeading(s: ServiceLine): string {
  if (s.slug === 'hoa-management') return 'What would it take to manage your community properly?';
  if (s.category === 'commercial') return `What would ${s.name} look like for your asset?`;
  return `What could your property earn with ${s.name}?`;
}
