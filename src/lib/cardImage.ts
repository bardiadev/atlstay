// Card styling for area/neighborhood cards. Instead of repeating a small pool
// of photos (which read as "the same picture" and made white text unreadable),
// each card gets a rich, dark, brand-harmonious gradient + a quiet category
// icon (skyline / house / mountain / waves) so cream text always stays crisp
// and no two nearby cards look alike. The location name is the focus.
//
// Gradients are emitted as real CSS values (applied via inline `style`) so they
// render regardless of how the CSS scanner treats this file.

export interface CardStyle {
  gradient: string; // CSS `background-image` value (dark → very dark; cream text safe)
  icon: 'building' | 'house' | 'mountain' | 'wave';
}

// Deep, jewel-toned, brand-harmonious gradients — all dark enough for cream text.
const GRADIENTS = [
  'linear-gradient(135deg,#1c4a3c,#0e241d)', // brand forest
  'linear-gradient(135deg,#1a4a3a,#0a201a)',
  'linear-gradient(135deg,#143a3a,#08201f)',
  'linear-gradient(135deg,#1c3550,#0c1d2e)',
  'linear-gradient(135deg,#33294a,#161226)',
  'linear-gradient(135deg,#4a3a20,#1d1408)',
  'linear-gradient(135deg,#23402c,#0f231a)',
  'linear-gradient(135deg,#2b3a42,#121c20)',
  'linear-gradient(135deg,#3f2a2a,#1a0f0f)',
  'linear-gradient(135deg,#15403a,#0a221e)',
];

const KEYWORDS: Record<string, string[]> = {
  mountains: ['blue-ridge', 'helen', 'dahlonega', 'ellijay', 'blairsville', 'hiawassee', 'clayton', 'jasper', 'dawsonville', 'clarkesville', 'cleveland', 'cornelia', 'toccoa', 'canton', 'ball-ground', 'young-harris', 'sautee', 'mountain', 'cartersville'],
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

const ICON_FOR: Record<string, CardStyle['icon']> = {
  intown: 'building',
  city: 'building',
  suburban: 'house',
  mountains: 'mountain',
  lake: 'wave',
  coast: 'wave',
};

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Assign a {gradient, icon} per item. The icon reflects the location's
 * character (semantic); the gradient is varied by slug so a grid never looks
 * repetitive. We avoid reusing any of the last few gradients, which keeps
 * horizontal neighbours — and the card directly above in a 4-column grid —
 * from ever sharing the same background.
 */
export function assignCardStyles(items: { slug: string; region?: string }[]): CardStyle[] {
  const out: CardStyle[] = [];
  const recent: string[] = [];
  const window = Math.min(4, GRADIENTS.length - 1);
  for (const it of items) {
    let i = hash(it.slug) % GRADIENTS.length;
    let guard = 0;
    while (recent.includes(GRADIENTS[i]) && guard < GRADIENTS.length) {
      i = (i + 1) % GRADIENTS.length;
      guard++;
    }
    const gradient = GRADIENTS[i];
    recent.push(gradient);
    if (recent.length > window) recent.shift();
    out.push({ gradient, icon: ICON_FOR[categoryFor(it.slug, it.region)] ?? 'building' });
  }
  return out;
}
