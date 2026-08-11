// Barrel for the service-line axis. Import `serviceLines` everywhere.
import type { ServiceLine, ServiceCategory } from './types';
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
