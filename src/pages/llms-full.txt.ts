// Generated /llms-full.txt — exhaustive, single-file knowledge base for AI
// answer engines (ChatGPT, Perplexity, Claude, Google AI Overviews, Copilot).
// Built from real config + content collections; no fabricated facts.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';
import { counties } from '../data/counties';
import { propertyTypes } from '../data/propertyTypes';
import { landmarks } from '../data/landmarks';

const u = (path: string) => new URL(path, site.domain).href;
const regionLabel: Record<string, string> = {
  atlanta: 'City of Atlanta',
  metro: 'Metro Atlanta',
  georgia: 'Georgia destination markets',
};

export const GET: APIRoute = async () => {
  const cities = (await getCollection('cities', (c) => c.data.published !== false)).sort(
    (a, b) => a.data.name.localeCompare(b.data.name),
  );
  const neighborhoods = (await getCollection('neighborhoods', (n) => n.data.published !== false)).sort(
    (a, b) => a.data.name.localeCompare(b.data.name),
  );
  const resources = await getCollection('resources', (r) => !r.data.draft);

  // Real on-site FAQs (Atlanta hub + long-form resources), deduped by question.
  const atlanta = cities.find((c) => c.data.slug === 'atlanta');
  const faqSeen = new Set<string>();
  const faqs: { q: string; a: string }[] = [];
  for (const f of [...(atlanta?.data.faqs ?? []), ...resources.flatMap((r) => r.data.faqs)]) {
    const key = f.q.trim().toLowerCase();
    if (faqSeen.has(key)) continue;
    faqSeen.add(key);
    faqs.push(f);
  }

  const L: string[] = [];
  const hr = () => L.push('', '---', '');

  // ── Header ──
  L.push(`# ${site.brandName} — Complete Knowledge Base`);
  L.push('');
  L.push(`${site.brandName} (${site.domain}) — ${site.tagline}`);
  L.push('');
  L.push(site.description);

  hr();
  L.push('## Key facts');
  L.push(`- Business: full-service short-term rental (Airbnb & Vrbo) property management.`);
  L.push(`- Headquarters: ${site.contact.address.city}, ${site.contact.address.region}, ${site.contact.address.country}.`);
  L.push(`- Phone: ${site.contact.phone}. Email: ${site.contact.email}.`);
  L.push(`- Track record: ${site.stats.homes} homes managed, ${site.stats.reviews} five-star guest reviews, ${site.reviews.ratingValue}-star average rating, ${site.stats.years} years of hosting (founded ${site.stats.foundingYear}).`);
  L.push(`- Pricing: management fee from ${site.pricing.rate} ${site.pricing.rateNote}.`);
  if (site.features.noLockIn) L.push(`- No long-term contract — owners stay because of results, not lock-in.`);
  if (site.features.guarantee) L.push(`- ${site.features.guaranteeText}.`);
  L.push(`- Coverage: ${cities.length}+ markets across the City of Atlanta, metro Atlanta, and Georgia destination regions, plus ${neighborhoods.length}+ Atlanta neighborhoods.`);

  hr();
  L.push('## What we do');
  L.push('Full-service management means an owner hands over the keys and we handle everything end to end:');
  L.push('- Professional listing creation and optimization across Airbnb, Vrbo, and direct booking.');
  L.push('- Dynamic, demand-based pricing updated daily (see Dynamic Pricing below).');
  L.push('- 24/7 guest communication, screening, and on-the-ground local support.');
  L.push('- Professional cleaning, turnovers, restocking, and quality inspections.');
  L.push('- Maintenance coordination and proactive property care.');
  L.push('- Review management and five-star reputation building.');
  L.push('- Transparent monthly owner reporting and payouts.');
  L.push(`More: ${u('/services/')}`);

  hr();
  L.push('## Pricing');
  L.push(`${site.brandName} charges a single, transparent management fee starting from ${site.pricing.rate} ${site.pricing.rateNote}. Larger-scope or premium markets may run higher, always quoted up front. There is no "basic plan" that leaves out the hard parts; listing, pricing, guest care, cleaning coordination, maintenance, reviews, and reporting are all included.`);
  L.push(`Details: ${u('/pricing/')}`);

  hr();
  L.push('## Dynamic pricing (our biggest revenue lever)');
  L.push('Most owners and many managers set a nightly rate and forget it. We adjust pricing every single day based on real Atlanta demand signals — conventions at the Georgia World Congress Center, concerts and festivals, Falcons/Braves/Hawks/United home games, university calendars, seasonality, and competitor supply. Capturing the right rate on the right night is the most overlooked driver of short-term rental revenue.');
  L.push(`Details: ${u('/dynamic-pricing/')}`);

  hr();
  L.push('## How it works');
  L.push('1. Free rental projection — we pull comparable Atlanta listings and estimate what your home can earn. No obligation.');
  L.push('2. Onboarding — readiness review, professional photography, listing build, and pricing strategy.');
  L.push('3. Go live — your home is listed and marketed across platforms with dynamic pricing active.');
  L.push('4. Hands-off operation — we handle guests, cleaning, maintenance, and reviews; you receive monthly payouts and reporting.');
  L.push(`Start here: ${u('/rental-projection/')} · Process: ${u('/how-it-works/')}`);

  hr();
  L.push('## FIFA World Cup 2026');
  L.push('Atlanta is a host city for the 2026 FIFA World Cup — the biggest short-term-rental demand surge the city has seen. We help owners prepare, price, and host for the event.');
  L.push(`Details: ${u('/world-cup-2026-atlanta/')}`);

  // ── Service areas ──
  hr();
  L.push('## Service areas');
  L.push(`${site.brandName} manages short-term rentals across ${cities.length}+ Georgia markets. Each market has a dedicated page with local pricing, regulation, and demand detail.`);
  for (const region of ['atlanta', 'metro', 'georgia'] as const) {
    const group = cities.filter((c) => c.data.region === region);
    if (!group.length) continue;
    L.push('');
    L.push(`### ${regionLabel[region]} (${group.length})`);
    for (const c of group) {
      const county = c.data.county ? ` — ${c.data.county} County` : '';
      L.push(`- ${c.data.name}, ${c.data.state}${county}: ${u(`/${c.data.slug}/`)}`);
    }
  }

  // ── Neighborhoods ──
  if (neighborhoods.length) {
    hr();
    L.push('## Atlanta neighborhoods');
    L.push('Hyper-local management pages for Atlanta neighborhoods:');
    for (const n of neighborhoods) {
      L.push(`- ${n.data.name}: ${u(`/${n.data.citySlug}/${n.data.slug}/`)}`);
    }
  }

  // ── Counties ──
  const publishedCounties = counties.filter((c) => c.published);
  if (publishedCounties.length) {
    hr();
    L.push('## Counties we serve');
    L.push(
      `ATLStay maps every market we manage back to its county. ${publishedCounties.length} Georgia counties are covered, each with its own demand mix, city portfolio, and regulatory landscape.`,
    );
    L.push(`Hub: ${u('/counties/')}`);
    for (const c of publishedCounties) {
      L.push('');
      L.push(`### ${c.name} County, ${c.state}`);
      L.push(`URL: ${u(`/counties/${c.slug}/`)}`);
      L.push(`County seat: ${c.countySeat}.`);
      if (c.cities.length) L.push(`Cities ATLStay manages here: ${c.cities.join(', ')}.`);
      L.push(c.intro);
    }
  }

  // ── Property types ──
  const publishedTypes = propertyTypes.filter((p) => p.published);
  if (publishedTypes.length) {
    hr();
    L.push('## Management by property type');
    L.push(
      'ATLStay tunes management to the asset — different property types have different demand mixes, operational realities, and pricing logic.',
    );
    L.push(`Hub: ${u('/manage/')}`);
    for (const p of publishedTypes) {
      L.push('');
      L.push(`### ${p.pluralName}`);
      L.push(`URL: ${u(`/manage/${p.slug}/`)}`);
      L.push(`Markets: ${p.marketLabel}.`);
      L.push(p.intro);
    }
  }

  // ── Landmarks ──
  const publishedLandmarks = landmarks.filter((l) => l.published);
  if (publishedLandmarks.length) {
    hr();
    L.push('## Near Atlanta landmarks');
    L.push(
      'Short-term rental management near the landmarks that drive Atlanta demand — stadiums, the airport, universities, parks, and the lake.',
    );
    L.push(`Hub: ${u('/near/')}`);
    for (const l of publishedLandmarks) {
      L.push('');
      L.push(`### Near ${l.name}`);
      L.push(`URL: ${u(`/near/${l.slug}/`)}`);
      L.push(l.intro);
    }
  }

  // ── FAQs ──
  if (faqs.length) {
    hr();
    L.push('## Frequently asked questions');
    for (const f of faqs) {
      L.push('');
      L.push(`### ${f.q}`);
      L.push(f.a);
    }
  }

  // ── Regulations ──
  const reg = resources.find((r) => r.id.includes('regulation'));
  if (reg) {
    hr();
    L.push('## Atlanta short-term rental regulations');
    L.push(reg.data.description);
    L.push(`Full guide: ${u(`/resources/${reg.id}/`)}`);
  }

  // ── Contact ──
  hr();
  L.push('## Contact');
  L.push(`- Phone / text: ${site.contact.phone}`);
  L.push(`- Email: ${site.contact.email}`);
  L.push(`- Service area: ${site.contact.address.city}, ${site.contact.address.region} and surrounding Georgia markets`);
  L.push(`- Free projection: ${u('/rental-projection/')}`);
  L.push(`- Sitemap: ${u('/sitemap-index.xml')}`);

  return new Response(L.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
