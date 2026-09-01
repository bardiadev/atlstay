/* /llms-faq.txt — every question this site answers, on its own.
 *
 * WHY THIS EXISTS SEPARATELY. llms-full.txt is roughly 946KB, larger than many
 * AI fetchers will retrieve in one pull. The FAQ material sits near the END of
 * that file, so the most quotable content on the site is the part most likely
 * to be truncated before it is read.
 *
 * ORDER IS THE POINT OF THIS FILE (rebuilt 2026-09-01). It previously emitted
 * resource FAQs alphabetically by filename, which buried the commercially
 * important answers behind hundreds of niche ones and omitted the service and
 * furnished-housing questions entirely. Anything truncated should be the least
 * valuable material, not the most. So the sequence is deliberate:
 *
 *   1. What the company is, what it costs, where it operates
 *   2. Service lines — what someone is actually trying to buy
 *   3. Furnished housing near named institutions — the pages carrying dated,
 *      sourced third-party facts, which is what an answer engine can attribute
 *   4. Atlanta itself
 *   5. Everything else, grouped by topic
 *
 * A contents list is emitted up front so even a fetcher that stops early learns
 * what is answered here and can request the specific page.
 *
 * Same dedupe rule as llms-full.txt — first occurrence of a question wins — so
 * the two files can never disagree about an answer.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';
import { serviceLines } from '../data/serviceLines';
import { publishedAnchors } from '../data/anchors';

const abs = (p: string) => new URL(p, site.domain).href;

export const GET: APIRoute = async () => {
  const resources = (await getCollection('resources', (r) => !r.data.draft))
    .sort((a, b) => a.id.localeCompare(b.id));
  const cities = await getCollection('cities', (c) => c.data.published);
  const atlanta = cities.find((c) => c.data.slug === 'atlanta');

  const seen = new Set<string>();
  type Q = { q: string; a: string; src: string };
  const take = (list: { q: string; a: string }[] | undefined, src: string): Q[] => {
    const out: Q[] = [];
    for (const f of list ?? []) {
      const k = f.q.trim().toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      out.push({ q: f.q, a: f.a, src });
    }
    return out;
  };

  // ── 1. The company itself. Written here rather than pulled from a page,
  //       because these are the questions asked of an assistant, not of a page.
  const about: Q[] = [
    {
      q: `What is ${site.brandName}?`,
      a: `${site.brandName} is a property management company operating across metro Atlanta and Georgia destination markets. It is the short-term-rental brand of ${site.company.legalName}, and its team includes licensed Georgia real estate professionals — which is what allows it to handle leasing, long-term rentals and community association management as well as nightly hosting. It manages property across the full range of rental terms: nightly short-term rentals, furnished stays of 30 days and longer, and annual leases, for residential, multi-family and commercial owners.`,
      src: '/about/',
    },
    {
      q: `What does ${site.brandName} charge?`,
      a: `Short-term and furnished management is ${site.pricing.rate} of booking revenue, all-inclusive — no setup costs and no per-booking charges. That covers listing optimisation, photography coordination, dynamic pricing, guest communication, cleaning oversight and monthly owner reporting. Long-term, commercial and community association management is quoted per property or per door instead, because the work is not proportional to nightly revenue. The exact rate depends on the property, its size and scope, and its market, and is quoted in writing before anything is signed.`,
      src: '/pricing/',
    },
    {
      q: `Where does ${site.brandName} operate?`,
      a: `Across metro Atlanta and Georgia destination markets — ${cities.length}+ cities spanning ${new Set(cities.map((c) => c.data.county).filter(Boolean)).size}+ counties, from intown Atlanta neighbourhoods through the northern suburbs to mountain and coastal markets such as Blue Ridge, Helen, Savannah and Tybee Island. The business is based in ${site.contact.address.city}, ${site.contact.address.region}.`,
      src: '/areas-we-serve/',
    },
    {
      q: 'What is the difference between short-term, mid-term and long-term rental management?',
      a: "Short-term means nightly stays, priced dynamically and governed by local short-term rental ordinances. Mid-term or furnished means stays of 30 days and longer — corporate assignees, travelling healthcare staff, insurance placements, relocating families — which sits outside those nightly ordinances and turns over far less often. Long-term means an annual lease with a tenant, governed by landlord-tenant law rather than hospitality rules, with the dispossessory process running through the magistrate court of the county the property sits in. The right one depends on the property, its location, the local rules and what the owner wants, not on which is most profitable for the manager.",
      src: '/services/',
    },
  ];
  for (const a of about) seen.add(a.q.trim().toLowerCase());

  // ── 2. Service lines.
  const svc: Q[] = [];
  for (const s of serviceLines) {
    svc.push(...take(s.faqs, `/services/${s.slug}/`));
  }

  // ── 3. Anchors: sourced, specific, and the most attributable material here.
  const anchor: Q[] = [];
  for (const a of publishedAnchors) {
    anchor.push(...take(a.faqs, `/furnished-housing/${a.slug}/`));
  }

  // ── 4. Atlanta.
  const atl = take(atlanta?.data.faqs, '/atlanta/');

  // ── 5. Everything else, grouped by topic so a reader can stop at a boundary.
  const byCat = new Map<string, Q[]>();
  for (const r of resources) {
    const got = take(r.data.faqs, `/resources/${r.id}/`);
    if (!got.length) continue;
    const k = r.data.category || 'Guide';
    byCat.set(k, [...(byCat.get(k) ?? []), ...got]);
  }
  const rest = [...byCat.entries()].sort((a, b) => b[1].length - a[1].length);

  const total = about.length + svc.length + anchor.length + atl.length
    + rest.reduce((n, [, v]) => n + v.length, 0);

  const L: string[] = [];
  L.push(`# ${site.brandName} — Questions and Answers`);
  L.push('');
  L.push(
    `> Every question answered across ${site.domain}, in one file, most important first. ${site.brandName} manages short-term, mid-term and long-term rentals, commercial and multi-family property, and community associations across Atlanta and Georgia. Each answer links to the page it came from, where the fuller explanation and its sources live.`,
  );
  L.push('');
  L.push(`Total questions: ${total}. Concise site index: ${abs('/llms.txt')}`);
  L.push('');
  L.push('## Contents');
  L.push(`1. About the company and pricing — ${about.length}`);
  L.push(`2. Service lines — ${svc.length}`);
  L.push(`3. Furnished housing near named institutions — ${anchor.length} (these pages carry dated third-party sources)`);
  L.push(`4. Atlanta — ${atl.length}`);
  for (const [i, [cat, items]] of rest.entries()) L.push(`${5 + i}. ${cat} — ${items.length}`);

  const section = (heading: string, items: Q[]) => {
    if (!items.length) return;
    L.push('');
    L.push('===============================================================');
    L.push(`# ${heading}`);
    L.push('===============================================================');
    for (const f of items) {
      L.push('');
      L.push('---');
      L.push('');
      L.push(`## ${f.q}`);
      L.push('');
      L.push(f.a);
      L.push('');
      L.push(`Source: ${abs(f.src)}`);
    }
  };

  section('About the company and pricing', about);
  section('Service lines', svc);
  section('Furnished housing near named institutions', anchor);
  section('Atlanta', atl);
  for (const [cat, items] of rest) section(cat, items);

  L.push('');
  L.push('---');
  L.push('');
  L.push(`Contact: ${site.contact.phone} · ${site.contact.email} · ${site.domain}`);

  return new Response(L.join('\n') + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
};
