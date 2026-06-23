// Centralized navigation. All internal hrefs use trailing slashes (trailingSlash: 'always').
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
      { label: 'Contact', href: '/contact/' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Full-service management', href: '/services/' },
      { label: 'Atlanta Airbnb management', href: '/atlanta-airbnb-management/' },
      { label: 'Short-term rental management', href: '/short-term-rental-management-atlanta/' },
      { label: 'Dynamic pricing & revenue', href: '/dynamic-pricing/' },
      { label: 'Airbnb income calculator', href: '/airbnb-calculator-atlanta/' },
      { label: 'Free rental projection', href: '/rental-projection/' },
      { label: 'Airbnb management near you', href: '/airbnb-management-near-me/' },
      { label: 'Near Atlanta landmarks', href: '/near/' },
      { label: 'Areas we serve', href: '/areas-we-serve/' },
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
      { label: 'All areas we serve', href: '/areas-we-serve/' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Airbnb management cost', href: '/resources/airbnb-management-cost-atlanta/' },
      { label: 'Atlanta STR regulations', href: '/resources/atlanta-short-term-rental-regulations/' },
      { label: 'Is management worth it?', href: '/resources/is-airbnb-management-worth-it/' },
    ],
  },
];
