/**
 * Sentence-aware text helpers.
 *
 * Naive `text.split('.')[0]` cuts on the first period, which mangles common
 * abbreviations in our local copy — "St. Simons", "Dr. Martin Luther King",
 * "Martin Luther King Jr.", "Mt. Yonah", "U.S. 41". Use `firstSentence()` for
 * every card blurb / meta-description lede instead.
 */

/**
 * Abbreviations that end in a period but never end a sentence. Stored
 * lower-cased and WITHOUT the trailing period.
 *
 * Deliberately excluded, because our own copy uses them as real sentence
 * endings: state codes ("…in Marietta, GA. We handle…"), "No." / "Yes." as
 * one-word FAQ answers, and "sq ft.". Blocking those would swallow a real
 * boundary, which is worse than the occasional missed abbreviation.
 */
const ABBREVIATIONS = new Set([
  // Personal titles / suffixes
  'mr', 'mrs', 'ms', 'dr', 'prof', 'rev', 'jr', 'sr', 'st', 'hon',
  'pres', 'gov', 'sen', 'gen', 'col', 'capt', 'lt', 'sgt', 'atty',
  // Street / place types
  'ave', 'blvd', 'rd', 'ln', 'ct', 'cir', 'pkwy', 'hwy', 'ste', 'apt', 'bldg',
  'mt', 'mts', 'nw', 'ne', 'sw', 'se',
  // Organizations / legal
  'inc', 'llc', 'ltd', 'co', 'corp', 'dept', 'univ', 'assn', 'bros',
  // Regions
  'u.s', 'u.s.a', 'u.k', 'd.c',
  // Latin / editorial
  'e.g', 'i.e', 'etc', 'vs', 'approx', 'fig', 'vol',
  // Units / time
  'sq', 'hr', 'hrs', 'min', 'max', 'yr', 'yrs', 'a.m', 'p.m',
  // Months
  'jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sept', 'sep', 'oct', 'nov', 'dec',
]);

/**
 * Pronouns and demonstratives that can never continue a proper-noun phrase, so
 * they override the abbreviation blocklist: "…Martin Luther King Jr. It's one
 * of…" really is a sentence break, while "…MLK Jr. National Historic Park" is
 * not.
 */
const HARD_SENTENCE_STARTERS = new Set([
  'it', 'its', "it's", 'we', "we're", "we've", 'you', "you're", "you'll",
  'your', 'they', "they're", 'their', 'he', 'she', 'there', "there's",
  'this', 'that', "that's", 'these', 'those', 'our',
]);

/** Sentence-terminator followed by whitespace and the start of a new sentence. */
const BOUNDARY = /([.!?])(["'”’)\]]*)\s+(?=["'“‘(\[]*[A-Z0-9])/g;

/** True when the period at `dotIndex` closes a known abbreviation or an initial. */
function isAbbreviation(text: string, dotIndex: number): boolean {
  let i = dotIndex - 1;
  while (i >= 0 && /[A-Za-z.]/.test(text[i]!)) i--;
  const token = text.slice(i + 1, dotIndex);
  if (!token) return false;
  // Single capital letter = a personal initial ("J. Smith"), never a full stop.
  if (token.length === 1 && /[A-Z]/.test(token)) return true;
  return ABBREVIATIONS.has(token.toLowerCase());
}

/** The word that begins right after a candidate boundary, lower-cased. */
function nextWord(text: string, from: number): string {
  const m = /^["'“‘(\[]*([A-Za-z']+)/.exec(text.slice(from));
  return m ? m[1]!.toLowerCase() : '';
}

/**
 * Return the first real sentence of `text`, including its terminating
 * punctuation. Abbreviation-safe: "Georgia's coast — Tybee Island, St. Simons,
 * Jekyll Island … Southeast." comes back whole instead of cutting at "St.".
 *
 * Falls back to the whole (trimmed) string when there is no boundary, and
 * appends a period when the string has no terminator of its own.
 */
export function firstSentence(text: string | undefined | null): string {
  const s = String(text ?? '').trim();
  if (!s) return '';

  BOUNDARY.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = BOUNDARY.exec(s)) !== null) {
    const isBreak =
      m[1] !== '.' ||
      !isAbbreviation(s, m.index) ||
      HARD_SENTENCE_STARTERS.has(nextWord(s, BOUNDARY.lastIndex));
    if (!isBreak) continue;
    return s.slice(0, m.index + m[1]!.length + m[2]!.length);
  }

  return /[.!?…]["'”’)\]]*$/.test(s) ? s : `${s}.`;
}
