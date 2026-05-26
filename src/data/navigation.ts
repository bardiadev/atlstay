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
      { label: 'Free rental projection', href: '/rental-projection/' },
      { label: 'Areas we serve', href: '/areas-we-serve/' },
    ],
  },
  {
    heading: 'Atlanta neighborhoods',
    links: [
      { label: 'Buckhead', href: '/atlanta/buckhead/' },
      { label: 'Midtown', href: '/atlanta/midtown/' },
      { label: 'Old Fourth Ward', href: '/atlanta/old-fourth-ward/' },
      { label: 'Inman Park', href: '/atlanta/inman-park/' },
      { label: 'Decatur', href: '/atlanta/decatur/' },
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
