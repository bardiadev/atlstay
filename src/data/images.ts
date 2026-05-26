// Centralized image manifest. Keys are semantic; files live in /public/images.
// The assets agent downloads real, license-free photography to these paths.
// Until then, components layer a tasteful gradient behind <img> so sections
// never look broken. Swap any `src` to replace imagery in one place.
export interface SiteImage {
  src: string;
  alt: string;
}

export const images = {
  ogDefault: { src: '/images/og-default.jpg', alt: 'Keystone Stays — premium short-term rental management in Atlanta' },

  heroHome: { src: '/images/hero-home.jpg', alt: 'Sunlit, beautifully styled Atlanta living room ready for guests' },
  heroProjection: { src: '/images/hero-projection.jpg', alt: 'Bright modern interior of a managed Atlanta short-term rental' },

  atlantaSkyline: { src: '/images/atlanta-skyline.jpg', alt: 'The Atlanta, Georgia city skyline at dusk' },
  serviceManagement: { src: '/images/service-management.jpg', alt: 'Host preparing a five-star welcome for short-term rental guests' },
  cleaning: { src: '/images/cleaning.jpg', alt: 'Spotless, professionally cleaned and staged bedroom' },
  pricingDashboard: { src: '/images/dynamic-pricing.jpg', alt: 'Calendar and pricing strategy for a vacation rental' },
  guestExperience: { src: '/images/guest-experience.jpg', alt: 'Guests arriving at a welcoming Atlanta home' },
  photography: { src: '/images/photography.jpg', alt: 'Professionally photographed, light-filled living space' },
  ownerHandshake: { src: '/images/owner.jpg', alt: 'A homeowner reviewing results with their property manager' },
  about: { src: '/images/about.jpg', alt: 'The Keystone Stays approach to local, hands-on hosting' },

  nbhdBuckhead: { src: '/images/buckhead.jpg', alt: 'Upscale Buckhead, Atlanta neighborhood' },
  nbhdMidtown: { src: '/images/midtown.jpg', alt: 'Midtown Atlanta high-rises and Piedmont Park' },
  nbhdOldFourthWard: { src: '/images/old-fourth-ward.jpg', alt: 'The Atlanta BeltLine in Old Fourth Ward' },
  nbhdInmanPark: { src: '/images/inman-park.jpg', alt: 'Historic homes in Inman Park, Atlanta' },
  nbhdDecatur: { src: '/images/decatur.jpg', alt: 'Downtown Decatur square near Atlanta' },
  nbhdDefault: { src: '/images/neighborhood-default.jpg', alt: 'A charming Atlanta residential street' },

  worldCup: { src: '/images/world-cup.jpg', alt: "Mercedes-Benz Stadium, an Atlanta World Cup 2026 host venue" },

  // Regional hero images for metro Atlanta + Georgia location pages
  metroAtlanta: { src: '/images/metro-atlanta.jpg', alt: 'Leafy residential street in suburban metro Atlanta' },
  suburbHome: { src: '/images/suburb-home.jpg', alt: 'Welcoming suburban Atlanta home exterior' },
  savannah: { src: '/images/savannah.jpg', alt: 'Historic Savannah, Georgia square shaded by live oaks' },
  northGeorgia: { src: '/images/north-georgia.jpg', alt: 'Blue Ridge mountains in north Georgia' },
  georgiaCoast: { src: '/images/georgia-coast.jpg', alt: 'Georgia coastline near Tybee Island' },
  athensGa: { src: '/images/athens-ga.jpg', alt: 'Downtown Athens, Georgia' },
  lakeLanier: { src: '/images/lake-lanier.jpg', alt: 'Lake Lanier waterfront in north Georgia' },
  georgiaCity: { src: '/images/georgia-city.jpg', alt: 'Historic downtown street in a Georgia city' },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
