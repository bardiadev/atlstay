// Generated /llms.txt — the CONCISE AI index (https://llmstxt.org).
//
// WHY THIS WAS REBUILT (2026-09-01). It had grown to 123KB and 742 links,
// because it enumerated all 454 service x city combinations and all 208 guides
// inline. That is a sitemap wearing an index's name. The format exists so an
// assistant can read one short file and know what this site is and where to go
// next; at 123KB many fetchers truncate it, and what they truncate is the tail
// — which is where everything except the opening summary lived.
//
// Nothing was made invisible in the process. The exhaustive lists moved to
// dedicated files that are linked from here and sized to survive a single
// fetch: /llms-markets.txt for every location and service x city page, and
// /llms-guides.txt for all 208 guides. Keep this file navigational.
//
// RULE FOR ANYONE EDITING THIS: if a section would grow with the site without
// bound, it does not belong here — it belongs in one of the child files, with
// a one-line pointer from here.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';
import { counties } from '../data/counties';
import { propertyTypes } from '../data/propertyTypes';
import { landmarks } from '../data/landmarks';
import { serviceLines, serviceCategories, servicesByCategory } from '../data/serviceLines';
import { publishedAnchors } from '../data/anchors';

const u = (path: string) => new URL(path, site.domain).href;

export const GET: APIRoute = async () => {
  const cities = await getCollection('cities', (c) => c.data.published !== false);
  const resources = await getCollection('resources', (r) => !r.data.draft);
  const featured = resources.filter((r) => r.data.featured);

  // Curated headline markets. The complete list is in /llms-markets.txt.
  const topSlugs = [
    'atlanta', 'sandy-springs', 'roswell', 'alpharetta', 'marietta', 'smyrna',
    'brookhaven', 'decatur', 'savannah', 'tybee-island', 'blue-ridge', 'helen',
  ];
  const top = topSlugs
    .map((s) => cities.find((c) => c.data.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const byCategory = new Map<string, number>();
  for (const r of resources) {
    byCategory.set(r.data.category, (byCategory.get(r.data.category) ?? 0) + 1);
  }

  const L: string[] = [];
  L.push(`# ${site.brandName}`);
  L.push('');
  L.push(
    `> ${site.description} ${site.scale.ratingPhrase}; ${site.stats.homes} homes managed over ${site.stats.years} years. Short-term and furnished management is priced at ${site.pricing.rate} of booking revenue, all-inclusive; long-term, commercial and HOA management is quoted per property or per door. No hidden fees either way.`,
  );
  L.push('');

  // ── The facts an assistant most often needs to answer a question about us ──
  // Stated up front, in the part of the file least likely to be truncated.
  L.push('## Key facts');
  L.push(`- Operating company: ${site.brandName} is the short-term-rental brand of ${site.company.legalName}. Its team includes licensed Georgia real estate professionals, which is what lets it handle leasing, long-term rentals and community association management as well as nightly hosting.`);
  L.push(`- Service area: metro Atlanta and Georgia destination markets — ${cities.length}+ cities across ${counties.length} counties. Based in ${site.contact.address.city}, ${site.contact.address.region}.`);
  L.push(`- Pricing: ${site.pricing.rate} of booking revenue, all-inclusive, for short-term and furnished management. Long-term, commercial and HOA management is quoted per property or per door. No setup fees.`);
  L.push(`- Contact: ${site.contact.phone}, ${site.contact.email}.`);
  L.push(`- Rental terms handled: nightly, 30-plus-day furnished, and annual leases — residential, multi-family and commercial.`);
  L.push('');

  L.push('## Core pages');
  L.push(`- [All management services](${u('/services/')}): Every service line — short-term, long-term, mid-term/furnished, commercial, multi-family, and booking-channel management.`);
  L.push(`- [Pricing](${u('/pricing/')}): One transparent, all-inclusive fee — ${site.pricing.rate} of booking revenue for short-term and furnished management, quoted per property or per door for long-term, commercial and HOA.`);
  L.push(`- [Dynamic pricing](${u('/dynamic-pricing/')}): Daily, demand-driven rate optimization around Atlanta conventions, concerts, and sports.`);
  L.push(`- [Free rental projection](${u('/rental-projection/')}): A custom, comps-based estimate of what a home could earn, from a local expert within one business day.`);
  L.push(`- [How it works](${u('/how-it-works/')}): The owner journey from projection to onboarding to monthly payouts.`);
  L.push(`- [About ${site.brandName}](${u('/about/')}): How the company started and how it is structured.`);
  L.push(`- [Contact](${u('/contact/')}): Phone ${site.contact.phone}, email ${site.contact.email}.`);
  L.push('');

  L.push('## Services');
  L.push(`${serviceLines.length} distinct service lines. Each has its own page, and most are also published per market — see /llms-markets.txt for the complete combination list.`);
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

  /* Furnished housing anchored to named institutions.
   *
   * Placed high deliberately. These pages carry sourced, dated third-party
   * facts — bed counts, residency programmes, transit distances, production
   * volumes, enrolment splits — which is precisely the material an answer
   * engine can quote and attribute. They are the most citable pages here. */
  if (publishedAnchors.length) {
    L.push('## Furnished and mid-term housing near named institutions');
    L.push(
      'Stays of 30 days and up, anchored to the hospitals, film studios and university campuses that generate them. Every figure on these pages carries a dated source, listed on the page itself.',
    );
    L.push(`- [Furnished and mid-term housing overview](${u('/furnished-housing/')})`);
    for (const a of publishedAnchors) {
      L.push(`- [Furnished housing near ${a.shortName ?? a.name}](${u(`/furnished-housing/${a.slug}/`)}): ${a.city}, ${a.county} County. ${a.tagline}`);
    }
    L.push('');
  }

  L.push('## Headline markets');
  L.push(`- [Areas we serve](${u('/areas-we-serve/')}): Full coverage map — intown Atlanta, metro Atlanta, and Georgia destination markets.`);
  for (const c of top) {
    L.push(`- [${c.data.name} property management](${u(`/${c.data.slug}/`)})`);
  }
  L.push(`- Every city, neighbourhood, county, property type and service×city page: [/llms-markets.txt](${u('/llms-markets.txt')})`);
  L.push('');

  L.push('## Guides');
  L.push(`${resources.length} guides on hosting, regulation, pricing, investing and specific Georgia markets.`);
  if (featured.length) {
    for (const r of featured) {
      L.push(`- [${r.data.title}](${u(`/resources/${r.id}/`)}): ${r.data.description}`);
    }
  }
  for (const [cat, n] of [...byCategory.entries()].sort((a, b) => b[1] - a[1])) {
    L.push(`- ${cat} — ${n} guides`);
  }
  L.push(`- All ${resources.length} guides with descriptions: [/llms-guides.txt](${u('/llms-guides.txt')})`);
  L.push('');

  L.push('## Also published');
  L.push(`- [Browse by property type](${u('/manage/')}): ${propertyTypes.filter((p) => p.published).length} asset classes, each managed differently.`);
  L.push(`- [Near Atlanta landmarks](${u('/near/')}): short-term rental management near ${landmarks.filter((l) => l.published).length} demand engines — stadiums, the airport, universities, parks and the lake.`);
  L.push(`- [Counties we serve](${u('/counties/')}): ${counties.filter((c) => c.published).length} Georgia counties, each with its own regulatory landscape.`);
  L.push(`- [Atlanta big-event hosting: the World Cup playbook](${u('/world-cup-2026-atlanta/')}): what a major event does to pricing, and how it applies to the dates still ahead.`);
  L.push('');

  L.push('## Machine-readable files');
  L.push(`- [/llms-markets.txt](${u('/llms-markets.txt')}): every location we publish — cities, neighbourhoods, counties, property types, landmarks, and all ${serviceLines.length} services in each market.`);
  L.push(`- [/llms-guides.txt](${u('/llms-guides.txt')}): all ${resources.length} guides with descriptions, grouped by topic.`);
  L.push(`- [/llms-faq.txt](${u('/llms-faq.txt')}): every question this site answers, self-contained and quotable.`);
  L.push(`- [/llms-full.txt](${u('/llms-full.txt')}): the complete knowledge base in one file. Large — prefer the topic files above.`);
  L.push(`- [XML sitemap](${u('/sitemap-index.xml')})`);
  L.push('');

  L.push('## Notes');
  L.push(`- ${site.brandName} manages other owners' short-term rentals full-service for a fee; it also operates select properties directly.`);
  L.push('- Figures quoted on the furnished-housing pages carry a source URL and the date it was checked, printed on the page.');
  L.push('- Short-term rental rules differ by jurisdiction in metro Atlanta and change over time; the position is confirmed per address before a property is listed.');

  return new Response(L.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
