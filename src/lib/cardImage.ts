// Smart, varied card imagery. Maps each location to a category-appropriate
// photo pool (urban intown, suburban metro, mountains, lake, coast, GA city),
// then assigns images so no two *adjacent* cards in a grid share one — fixing
// the "every card uses the same picture" look. Real photos, decoratively
// cropped/graded (see scripts/generate-card-images.mjs); not claiming to be a
// specific address.

export interface CardImage {
  src: string;
  alt: string;
}

const C = (src: string, alt: string): CardImage => ({ src, alt });

const POOLS: Record<string, CardImage[]> = {
  intown: [
    C('/images/buckhead.jpg', 'An upscale intown Atlanta neighborhood'),
    C('/images/midtown.jpg', 'Midtown Atlanta'),
    C('/images/old-fourth-ward.jpg', 'The Atlanta BeltLine corridor'),
    C('/images/inman-park.jpg', 'A historic Atlanta neighborhood'),
    C('/images/decatur.jpg', 'A walkable Atlanta district'),
    C('/images/atlanta-skyline.jpg', 'The Atlanta skyline'),
    C('/images/neighborhood-default.jpg', 'A charming Atlanta residential street'),
  ],
  suburban: [
    C('/images/suburb-home.jpg', 'A metro Atlanta home'),
    C('/images/metro-atlanta.jpg', 'A leafy metro Atlanta street'),
    C('/images/neighborhood-default.jpg', 'A metro Atlanta residential street'),
    C('/images/cards/suburb-1.jpg', 'A metro Atlanta home'),
    C('/images/cards/suburb-2.jpg', 'A metro Atlanta home'),
    C('/images/cards/suburb-3.jpg', 'A metro Atlanta street'),
    C('/images/cards/suburb-4.jpg', 'A metro Atlanta street'),
    C('/images/cards/suburb-5.jpg', 'A metro Atlanta residential area'),
    C('/images/cards/suburb-6.jpg', 'A metro Atlanta residential area'),
  ],
  mountains: [
    C('/images/north-georgia.jpg', 'The north Georgia mountains'),
    C('/images/cards/mtn-1.jpg', 'The north Georgia mountains'),
    C('/images/cards/mtn-2.jpg', 'North Georgia mountain country'),
    C('/images/cards/mtn-3.jpg', 'The Blue Ridge mountains of north Georgia'),
  ],
  lake: [
    C('/images/lake-lanier.jpg', 'A north Georgia lake'),
    C('/images/cards/lake-1.jpg', 'A north Georgia lake'),
    C('/images/cards/lake-2.jpg', 'Lakefront in north Georgia'),
    C('/images/cards/lake-3.jpg', 'A Georgia lake community'),
  ],
  coast: [
    C('/images/georgia-coast.jpg', 'The Georgia coast'),
    C('/images/savannah.jpg', 'Historic Savannah, Georgia'),
    C('/images/cards/coast-1.jpg', 'The Georgia coast'),
    C('/images/cards/coast-2.jpg', 'A Georgia coastal town'),
    C('/images/cards/coast-3.jpg', 'A historic Georgia square'),
    C('/images/cards/coast-4.jpg', 'Coastal Georgia charm'),
  ],
  city: [
    C('/images/georgia-city.jpg', 'A historic Georgia downtown'),
    C('/images/athens-ga.jpg', 'A Georgia college-town downtown'),
    C('/images/cards/city-1.jpg', 'A historic Georgia downtown'),
    C('/images/cards/city-2.jpg', 'A Georgia downtown street'),
    C('/images/cards/city-3.jpg', 'A Georgia downtown'),
    C('/images/cards/city-4.jpg', 'A Georgia city street'),
  ],
};

const KEYWORDS: Record<string, string[]> = {
  mountains: ['blue-ridge', 'helen', 'dahlonega', 'ellijay', 'blairsville', 'hiawassee', 'clayton', 'jasper', 'dawsonville', 'clarkesville', 'cleveland', 'cornelia', 'toccoa', 'canton', 'ball-ground', 'young-harris', 'sautee', 'mountain'],
  lake: ['lanier', 'gainesville', 'buford', 'cumming', 'flowery-branch', 'acworth', 'lake'],
  coast: ['savannah', 'tybee', 'st-simons', 'jekyll', 'brunswick', 'sea-island', 'darien', 'pooler', 'richmond-hill', 'island', 'coast'],
  city: ['columbus', 'augusta', 'macon', 'athens', 'valdosta', 'warner-robins', 'albany', 'rome', 'dalton', 'milledgeville', 'statesboro', 'americus', 'carrollton'],
};

export function categoryFor(slug: string, region?: string): string {
  const s = slug.toLowerCase();
  for (const [cat, words] of Object.entries(KEYWORDS)) {
    if (words.some((w) => s.includes(w))) return cat;
  }
  if (region === 'atlanta') return 'intown';
  if (region === 'metro') return 'suburban';
  if (region === 'georgia') return 'city';
  return 'intown';
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Assign an image to each item so no two consecutive items share one.
 * Stable per slug (via hash) but bumps to the next pool image on a collision
 * with the previous card.
 */
export function assignCardImages(items: { slug: string; region?: string }[]): CardImage[] {
  const out: CardImage[] = [];
  let prev = '';
  for (const it of items) {
    const pool = POOLS[categoryFor(it.slug, it.region)] ?? POOLS.intown;
    let idx = hash(it.slug) % pool.length;
    if (pool.length > 1 && pool[idx].src === prev) idx = (idx + 1) % pool.length;
    out.push(pool[idx]);
    prev = pool[idx].src;
  }
  return out;
}
