// Generated /llms.txt — concise AI-crawler index (https://llmstxt.org).
// Built from real config + content collections so it never drifts as markets
// grow. The exhaustive knowledge base lives at /llms-full.txt.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';

const u = (path: string) => new URL(path, site.domain).href;

export const GET: APIRoute = async () => {
  const cities = await getCollection('cities', (c) => c.data.published !== false);
  const resources = await getCollection('resources', (r) => !r.data.draft);

  // Curated headline markets for the concise index (full list: sitemap + llms-full).
  const topSlugs = [
    'atlanta', 'sandy-springs', 'roswell', 'alpharetta', 'marietta', 'smyrna',
    'brookhaven', 'decatur', 'savannah', 'tybee-island', 'blue-ridge', 'helen',
  ];
  const top = topSlugs
    .map((s) => cities.find((c) => c.data.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const L: string[] = [];
  L.push(`# ${site.brandName}`);
  L.push('');
  L.push(
    `> ${site.description} ${site.scale.ratingPhrase}; ${site.stats.homes} homes managed over ${site.stats.years} years. Transparent all-inclusive pricing from ${site.pricing.rate} of booking revenue — no hidden fees.`,
  );
  L.push('');
  L.push('## Core pages');
  L.push(`- [Short-term rental management services](${u('/services/')}): Everything included in full-service Airbnb & Vrbo management — listing, dynamic pricing, 24/7 guest care, cleaning, maintenance, and review management.`);
  L.push(`- [Pricing](${u('/pricing/')}): One transparent, all-inclusive management fee from ${site.pricing.rate} of booking revenue — no hidden charges, no long-term contract.`);
  L.push(`- [Dynamic pricing](${u('/dynamic-pricing/')}): Daily, demand-driven rate optimization around Atlanta conventions, concerts, and sports — the most overlooked driver of STR revenue.`);
  L.push(`- [Free rental projection](${u('/rental-projection/')}): Request a custom, comps-based estimate of what your home could earn, delivered by a local expert within one business day.`);
  L.push(`- [How it works](${u('/how-it-works/')}): The owner journey from projection to onboarding to monthly payouts.`);
  L.push(`- [About ${site.brandName}](${u('/about/')}): The local authority on Atlanta short-term rentals.`);
  L.push(`- [Contact](${u('/contact/')}): Phone ${site.contact.phone}, email ${site.contact.email}.`);
  L.push('');
  L.push('## Service areas');
  L.push(`- [Areas we serve](${u('/areas-we-serve/')}): Full coverage map — intown Atlanta, metro Atlanta, and Georgia destination markets (${cities.length}+ markets).`);
  for (const c of top) {
    L.push(`- [${c.data.name} STR management](${u(`/${c.data.slug}/`)})`);
  }
  L.push('');
  L.push('## Resources');
  for (const r of resources) {
    L.push(`- [${r.data.title}](${u(`/resources/${r.id}/`)}): ${r.data.description}`);
  }
  L.push('');
  L.push('## Special');
  L.push(`- [FIFA World Cup 2026 hosting in Atlanta](${u('/world-cup-2026-atlanta/')}): Capturing the biggest demand surge Atlanta has seen — hosting for owners during the 2026 World Cup.`);
  L.push('');
  L.push('## Notes');
  L.push(`- ${site.brandName} manages other owners' short-term rentals full-service for a fee; we also operate select properties directly.`);
  L.push(`- Full market list: XML sitemap at ${u('/sitemap-index.xml')}. Complete knowledge base: ${u('/llms-full.txt')}.`);

  return new Response(L.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
