// Generates brand raster assets from the source SVGs. Run locally and commit
// the output (the PNGs are static and served as-is by Cloudflare Pages):
//   node scripts/generate-assets.mjs
//
// Produces: apple-touch-icon.png, icon-192/512.png, favicon-32.png (from
// favicon.svg) and a branded /images/og-default.jpg (logo + wordmark +
// tagline + real stats composited over the Atlanta skyline).
//
// Brand facts below mirror src/config/site.ts — keep them in sync.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Resolve sharp (it's a transitive dep under pnpm's store).
function resolveSharp() {
  try { return require('sharp'); } catch {}
  const pnpmDir = join(root, 'node_modules/.pnpm');
  const match = readdirSync(pnpmDir).find((d) => /^sharp@/.test(d));
  if (!match) throw new Error('sharp not found under node_modules/.pnpm');
  return require(join(pnpmDir, match, 'node_modules/sharp'));
}
const sharp = resolveSharp();

const pub = join(root, 'public');
const FOREST = '#14342B';
const CREAM = '#F7F4EC';
const BRASS = '#C9A24B';

// ── App icons from the shape-only favicon (renders reliably in sharp) ──
const favicon = readFileSync(join(pub, 'favicon.svg'));
const iconJobs = [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['favicon-32.png', 32],
];
for (const [name, size] of iconJobs) {
  await sharp(favicon, { density: 384 })
    .resize(size, size, { fit: 'contain', background: FOREST })
    .png()
    .toFile(join(pub, name));
  console.log('icon  ✓', name, `${size}x${size}`);
}

// ── Branded Open Graph image (1200x630) ──
const W = 1200, H = 630;
// The logo mark from favicon.svg, minus the rounded background, as cream+gold.
const mark = `
  <g transform="translate(86,150) scale(0.92)">
    <g transform="translate(0,14)">
      <path d="M60 6 L112 90 L90 90 L60 33 L30 90 L8 90 Z" fill="${CREAM}" />
      <path d="M10 84 L60 50 L110 84" fill="none" stroke="${BRASS}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
      <g fill="${BRASS}">
        <rect x="52" y="69" width="7" height="7" /><rect x="61" y="69" width="7" height="7" />
        <rect x="52" y="78" width="7" height="7" /><rect x="61" y="78" width="7" height="7" />
      </g>
    </g>
  </g>`;

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${FOREST}" stop-opacity="0.97" />
      <stop offset="0.45" stop-color="${FOREST}" stop-opacity="0.86" />
      <stop offset="0.78" stop-color="${FOREST}" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="base" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${FOREST}" stop-opacity="0.55" />
      <stop offset="0.5" stop-color="${FOREST}" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#base)" />
  <rect width="${W}" height="${H}" fill="url(#scrim)" />
  ${mark}
  <text x="208" y="248" font-family="Georgia,'Times New Roman',serif" font-size="92" font-weight="700" fill="${CREAM}">ATLStay</text>
  <text x="88" y="322" font-family="'Helvetica Neue',Arial,sans-serif" font-size="33" fill="${CREAM}" fill-opacity="0.92">Atlanta&#8217;s home for effortless hosting.</text>
  <rect x="90" y="352" width="132" height="6" rx="3" fill="${BRASS}" />
  <text x="90" y="430" font-family="'Helvetica Neue',Arial,sans-serif" font-size="30" font-weight="600" fill="${CREAM}" fill-opacity="0.9">4.9-star rating &#183; 10,000+ five-star reviews &#183; 450+ homes managed</text>
  <text x="90" y="476" font-family="'Helvetica Neue',Arial,sans-serif" font-size="27" fill="${CREAM}" fill-opacity="0.75">Premium short-term rental management across Atlanta &amp; Georgia</text>
  <text x="90" y="556" font-family="'Helvetica Neue',Arial,sans-serif" font-size="28" font-weight="700" fill="${BRASS}" letter-spacing="0.5">atlstay.com</text>
</svg>`);

await sharp(join(pub, 'images/atlanta-skyline.jpg'))
  .resize(W, H, { fit: 'cover', position: 'attention' })
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(join(pub, 'images/og-default.jpg'));
console.log('og    ✓ images/og-default.jpg', `${W}x${H}`);
console.log('done.');
