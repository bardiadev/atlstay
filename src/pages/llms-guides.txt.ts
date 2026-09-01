// Generated /llms-guides.txt — every guide this site publishes, with its
// description, grouped by topic.
//
// Split out of /llms.txt so that file could stay short. Grouped by category
// rather than listed flat, because an assistant looking for "Georgia short-term
// rental rules" should be able to find the regulation guides without reading
// the investing ones.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';

const u = (path: string) => new URL(path, site.domain).href;

export const GET: APIRoute = async () => {
  const resources = await getCollection('resources', (r) => !r.data.draft);

  const groups = new Map<string, typeof resources>();
  for (const r of resources) {
    const k = r.data.category || 'Guide';
    groups.set(k, [...(groups.get(k) ?? []), r]);
  }
  // Largest topic first, so the densest material is read before any truncation.
  const ordered = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);

  const L: string[] = [];
  L.push(`# ${site.brandName} — guides`);
  L.push('');
  L.push(
    `> ${resources.length} guides on hosting, regulation, pricing, investing and specific Georgia markets. Concise site overview: ${u('/llms.txt')}. Locations: ${u('/llms-markets.txt')}.`,
  );
  L.push('');

  const featured = resources.filter((r) => r.data.featured);
  if (featured.length) {
    L.push('## Start here');
    for (const r of featured) {
      L.push(`- [${r.data.title}](${u(`/resources/${r.id}/`)}): ${r.data.description}`);
    }
    L.push('');
  }

  for (const [category, items] of ordered) {
    L.push(`## ${category} (${items.length})`);
    // Newest first: regulation and market guides go stale, and the most
    // recently updated one is the one worth quoting.
    const sorted = [...items].sort(
      (a, b) =>
        +(b.data.updatedDate ?? b.data.publishDate) - +(a.data.updatedDate ?? a.data.publishDate),
    );
    for (const r of sorted) {
      const when = r.data.updatedDate ?? r.data.publishDate;
      const stamp = when ? ` (updated ${when.toISOString().slice(0, 10)})` : '';
      L.push(`- [${r.data.title}](${u(`/resources/${r.id}/`)})${stamp}: ${r.data.description}`);
    }
    L.push('');
  }

  L.push(`Questions and answers: ${u('/llms-faq.txt')} · Overview: ${u('/llms.txt')}`);

  return new Response(L.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
