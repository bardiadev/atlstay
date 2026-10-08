// Centralized image manifest. Keys are semantic; files live in /public/images.
// The assets agent downloads real, license-free photography to these paths.
// Until then, components layer a tasteful gradient behind <img> so sections
// never look broken. Swap any `src` to replace imagery in one place.
export interface SiteImage {
  src: string;
  alt: string;
}

export const images = {
  ogDefault: { src: '/images/og-default.jpg', alt: 'ATLStay — premium short-term rental management in Atlanta' },

  heroHome: { src: '/images/hero-home.webp', alt: 'Sunlit, beautifully styled Atlanta living room ready for guests' },
  heroProjection: { src: '/images/hero-projection.webp', alt: 'Bright modern interior of a managed Atlanta short-term rental' },

  atlantaSkyline: { src: '/images/atlanta-skyline.webp', alt: 'The Atlanta, Georgia city skyline at dusk' },
  // STOPGAP 2026-10-08: this pointed at /images/service-management.webp — a
  // vacant storefront in the snow with a FOR RENT sign and another company's
  // phone number on it, used as the hero of /services/ and 8 resource guides.
  // Reusing the villa shot until a real service/maintenance photo is sourced.
  // The old file is left in public/images/ and is no longer referenced.
  serviceManagement: { src: '/images/about.webp', alt: 'A bright, well-kept managed rental home' },
  cleaning: { src: '/images/cleaning.webp', alt: 'Spotless, professionally cleaned and staged bedroom' },
  pricingDashboard: { src: '/images/dynamic-pricing.webp', alt: 'Calendar and pricing strategy for a vacation rental' },
  guestExperience: { src: '/images/guest-experience.webp', alt: 'Crisp white linens freshly made up for the next guest' },
  photography: { src: '/images/photography.webp', alt: 'Professionally photographed, light-filled living space' },
  ownerHandshake: { src: '/images/owner.webp', alt: 'A styled, move-in-ready living room in a managed rental' },
  about: { src: '/images/about.webp', alt: 'The ATLStay approach to local, hands-on hosting' },

  nbhdBuckhead: { src: '/images/buckhead.webp', alt: 'Upscale Buckhead, Atlanta neighborhood' },
  nbhdMidtown: { src: '/images/midtown.webp', alt: 'Midtown Atlanta high-rises and Piedmont Park' },
  nbhdOldFourthWard: { src: '/images/old-fourth-ward.webp', alt: 'The Atlanta BeltLine in Old Fourth Ward' },
  nbhdInmanPark: { src: '/images/inman-park.webp', alt: 'Historic homes in Inman Park, Atlanta' },
  nbhdDecatur: { src: '/images/decatur.webp', alt: 'Downtown Decatur square near Atlanta' },
  nbhdDefault: { src: '/images/neighborhood-default.webp', alt: 'A charming Atlanta residential street' },

  worldCup: { src: '/images/world-cup.webp', alt: "Mercedes-Benz Stadium, an Atlanta World Cup 2026 host venue" },

  // Regional hero images for metro Atlanta + Georgia location pages
  metroAtlanta: { src: '/images/metro-atlanta.webp', alt: 'Leafy residential street in suburban metro Atlanta' },
  suburbHome: { src: '/images/suburb-home.webp', alt: 'Welcoming suburban Atlanta home exterior' },
  savannah: { src: '/images/savannah.webp', alt: 'Historic Savannah, Georgia square shaded by live oaks' },
  northGeorgia: { src: '/images/north-georgia.webp', alt: 'Blue Ridge mountains in north Georgia' },
  georgiaCoast: { src: '/images/georgia-coast.webp', alt: 'Georgia coastline near Tybee Island' },
  athensGa: { src: '/images/athens-ga.webp', alt: 'Downtown Athens, Georgia' },
  lakeLanier: { src: '/images/lake-lanier.webp', alt: 'Lake Lanier waterfront in north Georgia' },
  georgiaCity: { src: '/images/georgia-city.webp', alt: 'Historic downtown street in a Georgia city' },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
