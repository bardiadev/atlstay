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
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
