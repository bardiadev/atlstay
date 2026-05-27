// Generates a varied pool of card tiles by cropping + lightly color-grading the
// existing base photos, so neighborhood/area cards don't all repeat one image.
// Real photography, decoratively treated (not claiming to be a specific address).
// Run: node scripts/generate-card-images.mjs  → public/images/cards/*.jpg
import { createRequire } from 'node:module';
import { readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
function resolveSharp() {
  try { return require('sharp'); } catch {}
  const pnpmDir = join(root, 'node_modules/.pnpm');
  const m = readdirSync(pnpmDir).find((d) => /^sharp@/.test(d));
  return require(join(pnpmDir, m, 'node_modules/sharp'));
}
const sharp = resolveSharp();
const src = join(root, 'public/images');
const out = join(root, 'public/images/cards');
mkdirSync(out, { recursive: true });

const grades = {
  neutral: {},
  warm: { brightness: 1.03, saturation: 1.1, hue: 8 },
  cool: { brightness: 1.0, saturation: 0.94, hue: -8 },
  bright: { brightness: 1.07, saturation: 1.02 },
};

// [outName, baseFile, cropPosition, grade]
const jobs = [
  // suburban / metro
  ['suburb-1', 'suburb-home.jpg', 'centre', 'warm'],
  ['suburb-2', 'suburb-home.jpg', 'top', 'cool'],
  ['suburb-3', 'metro-atlanta.jpg', 'centre', 'neutral'],
  ['suburb-4', 'metro-atlanta.jpg', 'left', 'warm'],
  ['suburb-5', 'neighborhood-default.jpg', 'centre', 'cool'],
  ['suburb-6', 'neighborhood-default.jpg', 'right', 'bright'],
  // mountains
  ['mtn-1', 'north-georgia.jpg', 'centre', 'neutral'],
  ['mtn-2', 'north-georgia.jpg', 'top', 'warm'],
  ['mtn-3', 'north-georgia.jpg', 'bottom', 'cool'],
  // lake
  ['lake-1', 'lake-lanier.jpg', 'centre', 'neutral'],
  ['lake-2', 'lake-lanier.jpg', 'top', 'warm'],
  ['lake-3', 'lake-lanier.jpg', 'right', 'cool'],
  // coast
  ['coast-1', 'georgia-coast.jpg', 'centre', 'neutral'],
  ['coast-2', 'georgia-coast.jpg', 'left', 'warm'],
  ['coast-3', 'savannah.jpg', 'centre', 'neutral'],
  ['coast-4', 'savannah.jpg', 'top', 'cool'],
  // georgia cities
  ['city-1', 'georgia-city.jpg', 'centre', 'neutral'],
  ['city-2', 'georgia-city.jpg', 'right', 'warm'],
  ['city-3', 'athens-ga.jpg', 'centre', 'neutral'],
  ['city-4', 'athens-ga.jpg', 'left', 'cool'],
];

for (const [name, base, position, grade] of jobs) {
  let p = sharp(join(src, base)).resize(800, 600, { fit: 'cover', position });
  const g = grades[grade];
  if (g && Object.keys(g).length) p = p.modulate(g);
  await p.jpeg({ quality: 82, mozjpeg: true }).toFile(join(out, `${name}.jpg`));
  console.log('tile ✓', name);
}
console.log('done:', jobs.length, 'tiles');
