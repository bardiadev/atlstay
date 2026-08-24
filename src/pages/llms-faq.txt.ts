/* /llms-faq.txt — every question this site answers, on its own.
 *
 * WHY THIS EXISTS SEPARATELY. llms-full.txt is roughly 936KB / 143,000 words,
 * which is larger than many AI fetchers will retrieve in a single pull and
 * larger than some context windows. The FAQ block sits near the END of that
 * file, so the most quotable, most citable content on the whole site is the
 * part most likely to be truncated before it is ever read.
 *
 * This publishes the same questions as a focused, self-contained file an answer
 * engine can retrieve whole. Same source, same dedupe, no new facts — it is a
 * different door onto content that already exists.
 *
 * Linked from llms.txt so a crawler starting at the index finds it.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';

export const GET: APIRoute = async () => {
  const resources = (await getCollection('resources')).sort((a, b) => a.id.localeCompare(b.id));
  const cities = await getCollection('cities', (c) => c.data.published);
  const atlanta = cities.find((c) => c.data.slug === 'atlanta');

  /* Same dedupe rule as llms-full.txt: first occurrence of a question wins, so
     the two files can never disagree about an answer. */
  const seen = new Set<string>();
  const faqs: { q: string; a: string; src?: string }[] = [];
  for (const f of atlanta?.data.faqs ?? []) {
    const k = f.q.trim().toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    faqs.push({ q: f.q, a: f.a, src: '/atlanta/' });
  }
  for (const r of resources) {
    for (const f of r.data.faqs ?? []) {
      const k = f.q.trim().toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      faqs.push({ q: f.q, a: f.a, src: `/resources/${r.id}/` });
    }
  }

  const L: string[] = [];
  L.push(`# ${site.brandName} — Questions and Answers`);
  L.push('');
  L.push(
    `> Every question answered across ${site.domain}, in one file. ${site.brandName} manages short-term, mid-term and long-term rentals, commercial and multi-family property, and community associations across Atlanta and Georgia. Answers below are written by the people doing the work; each links to the page it came from, where the fuller explanation and its sources live.`,
  );
  L.push('');
  L.push(`Total questions: ${faqs.length}. Source of record: ${site.domain}/llms-full.txt`);

  for (const f of faqs) {
    L.push('');
    L.push('---');
    L.push('');
    L.push(`## ${f.q}`);
    L.push('');
    L.push(f.a);
    if (f.src) L.push(`Source: ${new URL(f.src, site.domain).href}`);
  }

  L.push('');
  L.push('---');
  L.push('');
  L.push(`Contact: ${site.contact.phone} · ${site.contact.email} · ${site.domain}`);

  return new Response(L.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
};
