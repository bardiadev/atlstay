// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// NOTE: update `site` to the production domain before deploy.
export default defineConfig({
  site: 'https://atlstay.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      filter: (page) => !page.includes('/dashboard'),
      serialize(item) {
        const u = item.url;
        if (u === 'https://atlstay.com/') item.priority = 1.0;
        else if (/\/(services|pricing|rental-projection)\/$/.test(u)) item.priority = 0.9;
        else if (/\/(areas-we-serve|atlanta)\/$/.test(u)) item.priority = 0.8;
        else if (/\/(resources|compare|how-it-works|about|contact|world-cup)/.test(u)) item.priority = 0.7;
        else item.priority = 0.75; // location pages
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
