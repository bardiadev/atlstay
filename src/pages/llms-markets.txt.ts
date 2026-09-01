// Generated /llms-markets.txt — every location this site publishes.
//
// This file exists so /llms.txt can stay short. It holds the enumerations that
// grow without bound as the site grows: every city, neighbourhood, county,
// property type, landmark, and every service x city combination.
//
// The service x city list mirrors getStaticPaths() in
// src/pages/services/[service]/[city].astro EXACTLY (a service's marketCities
// intersected with published cities that have real intro copy), so this file
// can never advertise a URL that was not built. If that filter changes there,
// change it here in the same commit.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';
import { counties } from '../data/counties';
import { propertyTypes } from '../data/propertyTypes';
import { landmarks } from '../data/landmarks';
import { serviceCategories, servicesByCategory } from '../data/serviceLines';

const u = (path: string) => new URL(path, site.domain).href;

export const GET: APIRoute = async () => {
  const cities = await getCollection('cities', (c) => c.data.published !== false);
  const neighborhoods = await getCollection('neighborhoods', (n) => n.data.published !== false);
  const cityBySlug = new Map(cities.map((c) => [c.data.slug, c]));

  const L: string[] = [];
  L.push(`# ${site.brandName} — every market we publish`);
  L.push('');
  L.push(
    `> The complete location index for ${site.domain.replace(/^https?:\/\//, '')}. Concise overview: ${u('/llms.txt')}. Every combination below is a real published page with market-specific detail — local demand, regulation, and what the service means in that city.`,
  );
  L.push('');

  L.push('## Cities');
  L.push(`${cities.length} markets across metro Atlanta and Georgia destination areas.`);
  for (const c of cities) {
    L.push(`- [${c.data.name}, ${c.data.state}](${u(`/${c.data.slug}/`)})${c.data.county ? ` — ${c.data.county} County` : ''}`);
  }
  L.push('');

  if (neighborhoods.length) {
    L.push('## Neighbourhoods');
    for (const n of neighborhoods) {
      const parent = n.data.citySlug ?? 'atlanta';
      L.push(`- [${n.data.name}](${u(`/${parent}/${n.data.slug}/`)})`);
    }
    L.push('');
  }

  L.push('## Counties');
  L.push('Each county has its own short-term-rental landscape — different employers, tourist draws, and city-by-city rules.');
  L.push(`- [Counties overview](${u('/counties/')})`);
  for (const c of counties.filter((x) => x.published)) {
    L.push(`- [${c.name} County](${u(`/counties/${c.slug}/`)}): ${c.tagline}`);
  }
  L.push('');

  L.push('## By property type');
  L.push('Management is tuned to the asset class — different demand mixes, operations and pricing logic per type.');
  L.push(`- [Browse by property type](${u('/manage/')})`);
  for (const p of propertyTypes.filter((x) => x.published)) {
    L.push(`- [${p.pluralName}](${u(`/manage/${p.slug}/`)}): ${p.tagline}`);
  }
  L.push('');

  L.push('## Near Atlanta landmarks');
  L.push('Short-term rental management near the demand engines that drive bookings.');
  L.push(`- [Near Atlanta landmarks](${u('/near/')})`);
  for (const l of landmarks.filter((x) => x.published)) {
    L.push(`- [Near ${l.name}](${u(`/near/${l.slug}/`)}): ${l.tagline}`);
  }
  L.push('');

  L.push('## Every service, in every market');
  for (const cat of serviceCategories) {
    for (const s of servicesByCategory(cat.key)) {
      const built = s.marketCities
        .map((slug) => cityBySlug.get(slug))
        .filter((c): c is NonNullable<typeof c> => Boolean(c && c.data.intro));
      if (built.length === 0) continue;
      L.push('');
      L.push(`### ${s.name} by market`);
      L.push(`Hub: ${u(`/services/${s.slug}/`)}`);
      for (const c of built) {
        L.push(`- [${s.name} in ${c.data.name}, ${c.data.state}](${u(`/services/${s.slug}/${c.data.slug}/`)})`);
      }
    }
  }
  L.push('');
  L.push(`Guides: ${u('/llms-guides.txt')} · Questions and answers: ${u('/llms-faq.txt')} · Overview: ${u('/llms.txt')}`);

  return new Response(L.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
