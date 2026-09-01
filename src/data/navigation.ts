// Centralized navigation. All internal hrefs use trailing slashes (trailingSlash: 'always').
//
// This file renders on EVERY page, so a link added here gains sitewide internal
// links instantly. That makes it the highest-leverage file on the site — and it
// is why /manage/, /counties/ and /compare/ now appear below: an audit found all
// three hubs were absent from every navigation, leaving them near-orphaned.
export const primaryCta = { label: 'Get my free projection', href: '/rental-projection/' };

export const mainNav: { label: string; href: string }[] = [
  { label: 'How it works', href: '/how-it-works/' },
  { label: 'Services', href: '/services/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Areas we serve', href: '/areas-we-serve/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'About', href: '/about/' },
];

export const footerNav: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'How it works', href: '/how-it-works/' },
      { label: 'Pricing', href: '/pricing/' },
      { label: 'All services', href: '/services/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  {
    heading: 'Short-term rentals',
    links: [
      { label: 'Atlanta Airbnb management', href: '/atlanta-airbnb-management/' },
      { label: 'Short-term rental management', href: '/short-term-rental-management-atlanta/' },
      { label: 'Vrbo management', href: '/services/vrbo-management/' },
      { label: 'Marriott Homes & Villas', href: '/services/marriott-homes-villas/' },
      { label: 'Direct booking & channels', href: '/services/direct-booking/' },
      { label: 'Dynamic pricing & revenue', href: '/dynamic-pricing/' },
      { label: 'Airbnb management near you', href: '/airbnb-management-near-me/' },
      { label: 'By property type', href: '/manage/' },
      { label: 'Compare managers', href: '/compare/' },
    ],
  },
  {
    heading: 'Long-term & commercial',
    links: [
      { label: 'Long-term rental management', href: '/services/long-term-rental-management/' },
      { label: 'Tenant placement & leasing', href: '/services/tenant-placement/' },
      { label: 'Commercial property management', href: '/services/commercial-property-management/' },
      { label: 'Multi-family management', href: '/services/multi-family-property-management/' },
      { label: 'HOA & community associations', href: '/services/hoa-management/' },
      { label: 'Investor & realtor services', href: '/services/investor-services/' },
    ],
  },
  {
    heading: 'Furnished & mid-term',
    links: [
      { label: 'Mid-term (30+ day) rentals', href: '/services/mid-term-rental-management/' },
      { label: 'Corporate housing', href: '/services/corporate-housing-management/' },
      { label: 'Travel nurse housing', href: '/services/travel-nurse-housing/' },
      { label: 'Insurance & displacement', href: '/services/insurance-housing/' },
      { label: 'Film & production housing', href: '/services/film-production-housing/' },
      { label: 'Student & university housing', href: '/services/student-housing/' },
      // The anchor hub. Without an inbound link from here the furnished
      // location pages would be orphans reachable only from the sitemap.
      { label: 'Housing near hospitals', href: '/furnished-housing/' },
    ],
  },
  {
    heading: 'Popular areas',
    links: [
      { label: 'Atlanta', href: '/atlanta/' },
      { label: 'Buckhead', href: '/atlanta/buckhead/' },
      { label: 'Marietta', href: '/marietta/' },
      { label: 'Sandy Springs', href: '/sandy-springs/' },
      { label: 'Savannah', href: '/savannah/' },
      { label: 'Blue Ridge', href: '/blue-ridge/' },
      { label: 'Counties we serve', href: '/counties/' },
      { label: 'Near Atlanta landmarks', href: '/near/' },
      { label: 'All areas we serve', href: '/areas-we-serve/' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Airbnb management cost', href: '/resources/airbnb-management-cost-atlanta/' },
      { label: 'Atlanta STR regulations', href: '/resources/atlanta-short-term-rental-regulations/' },
      { label: 'Is management worth it?', href: '/resources/is-airbnb-management-worth-it/' },
      { label: 'Airbnb vs long-term rental', href: '/resources/airbnb-vs-long-term-rental-atlanta/' },
      { label: 'Free rental projection', href: '/rental-projection/' },
      { label: 'Airbnb income calculator', href: '/airbnb-calculator-atlanta/' },
      { label: 'All resources', href: '/resources/' },
    ],
  },
];
