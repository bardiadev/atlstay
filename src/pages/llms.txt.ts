// Generated /llms.txt — concise AI-crawler index (https://llmstxt.org).
// Built from real config + content collections so it never drifts as markets
// grow. The exhaustive knowledge base lives at /llms-full.txt.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';
import { counties } from '../data/counties';
import { propertyTypes } from '../data/propertyTypes';
import { landmarks } from '../data/landmarks';
import { serviceLines, serviceCategories, servicesByCategory } from '../data/serviceLines';

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
    `> ${site.description} ${site.scale.ratingPhrase}; ${site.stats.homes} homes managed over ${site.stats.years} years. Short-term and furnished management is priced at ${site.pricing.rate} of booking revenue, all-inclusive; long-term, commercial and HOA management is quoted per property or per door. No hidden fees either way.`,
  );
  L.push('');
  L.push('## Core pages');
  L.push(`- [All management services](${u('/services/')}): Every service line — short-term, long-term, mid-term/furnished, commercial, multi-family, and booking-channel management.`);
  L.push(`- [Pricing](${u('/pricing/')}): One transparent, all-inclusive fee — ${site.pricing.rate} of booking revenue for short-term and furnished management, quoted per property or per door for long-term, commercial and HOA. No hidden charges, no long-term contract.`);
  L.push(`- [Dynamic pricing](${u('/dynamic-pricing/')}): Daily, demand-driven rate optimization around Atlanta conventions, concerts, and sports — the most overlooked driver of STR revenue.`);
  L.push(`- [Free rental projection](${u('/rental-projection/')}): Request a custom, comps-based estimate of what your home could earn, delivered by a local expert within one business day.`);
  L.push(`- [How it works](${u('/how-it-works/')}): The owner journey from projection to onboarding to monthly payouts.`);
  L.push(`- [About ${site.brandName}](${u('/about/')}): The local authority on Atlanta short-term rentals.`);
  L.push(`- [Contact](${u('/contact/')}): Phone ${site.contact.phone}, email ${site.contact.email}.`);
  L.push('');
  L.push('## Services we provide');
  L.push(
    `${site.brandName} is the short-term-rental brand of ${site.company.legalName}, a licensed Georgia real estate brokerage. The business manages property across the full range of rental terms — nightly, 30-plus days, and annual leases — for residential, multi-family, and commercial owners. ${serviceLines.length} distinct service lines:`,
  );
  for (const cat of serviceCategories) {
    const lines = servicesByCategory(cat.key);
    if (lines.length === 0) continue;
    L.push('');
    L.push(`### ${cat.label} — ${cat.blurb}`);
    for (const s of lines) {
      L.push(`- [${s.name}](${u(`/services/${s.slug}/`)}): ${s.seoDescription}`);
    }
  }
  L.push('');
  L.push('## Service areas');
  L.push(`- [Areas we serve](${u('/areas-we-serve/')}): Full coverage map — intown Atlanta, metro Atlanta, and Georgia destination markets (${cities.length}+ markets).`);
  for (const c of top) {
    L.push(`- [${c.data.name} STR management](${u(`/${c.data.slug}/`)})`);
  }
  L.push('');
  L.push('## Counties we serve');
  L.push(`Each county has its own short-term-rental landscape — different employers, tourist draws, and city-by-city regulatory rules. ATLStay covers ${counties.length} Georgia counties.`);
  L.push(`- [Counties we serve overview](${u('/counties/')})`);
  for (const c of counties.filter((x) => x.published)) {
    L.push(`- [${c.name} County STR management](${u(`/counties/${c.slug}/`)}): ${c.tagline}`);
  }
  L.push('');
  L.push('## By property type');
  L.push('We tune management to the asset class — different demand mixes, operational realities, and pricing logic per property type.');
  L.push(`- [Browse by property type](${u('/manage/')})`);
  for (const p of propertyTypes.filter((x) => x.published)) {
    L.push(`- [${p.pluralName} STR management](${u(`/manage/${p.slug}/`)}): ${p.tagline}`);
  }
  L.push('');
  L.push('## Near Atlanta landmarks');
  L.push('Management near the demand engines that drive bookings — stadiums, the airport, universities, parks, and the lake.');
  L.push(`- [Near Atlanta landmarks](${u('/near/')})`);
  for (const l of landmarks.filter((x) => x.published)) {
    L.push(`- [Airbnb management near ${l.name}](${u(`/near/${l.slug}/`)}): ${l.tagline}`);
  }
  L.push('');
  L.push('## Resources');
  for (const r of resources) {
    L.push(`- [${r.data.title}](${u(`/resources/${r.id}/`)}): ${r.data.description}`);
  }
  L.push('');
  L.push('## Special');
  L.push(`- [Atlanta big-event hosting: the World Cup playbook](${u('/world-cup-2026-atlanta/')}): What hosting the 2026 FIFA World Cup taught us about pricing an Atlanta home for a major event, and how it applies to the dates still ahead.`);
  L.push('');
  L.push('## Notes');
  L.push(`- ${site.brandName} manages other owners' short-term rentals full-service for a fee; we also operate select properties directly.`);
  L.push(`- Full market list: XML sitemap at ${u('/sitemap-index.xml')}. Complete knowledge base: ${u('/llms-full.txt')}.`);

  return new Response(L.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
