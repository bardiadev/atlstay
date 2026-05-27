import { site } from '../config/site';

export interface Faq { q: string; a: string }

export const homeFaqs: Faq[] = [
  {
    q: 'How much does your management cost?',
    a: `Our management fee starts at ${site.pricing.rate} of booking revenue — all-inclusive, with no setup fees or hidden charges. Premium and larger-scope homes can run a little higher; either way, you’ll always see your exact rate before you sign anything.`,
  },
  {
    q: 'What exactly do you handle?',
    a: 'Everything. Listing creation and optimization, professional photography, nightly pricing, 24/7 guest communication, cleaning and turnovers, maintenance coordination, restocking, multi-platform distribution, reviews, and transparent owner reporting and payouts. You stay an owner — we do the hosting.',
  },
  {
    q: 'Do I keep control of my home?',
    a: 'Always. It’s your property — you set house rules, block dates for personal use anytime, and approve the big decisions. We handle the day-to-day so you don’t have to.',
  },
  {
    q: 'Am I locked into a long-term contract?',
    a: site.features.noLockIn
      ? 'No long-term contracts. We earn your business every month. If it’s ever not working for you, you can leave — we’re confident you won’t want to.'
      : 'We’ll walk you through the agreement in plain language before you commit — no surprises.',
  },
  {
    q: 'What makes you different from the big national companies?',
    a: 'We’re local. We know Atlanta’s neighborhoods, demand patterns, and events the way a national call center never will — and we pair that with transparent pricing and genuinely premium service. You get the polish of a big brand with the attention of a local team.',
  },
  {
    q: 'How do I get started?',
    a: 'Request a free, no-obligation rental projection. Tell us about your home and we’ll send a custom, comps-based estimate of what it could earn — built by a real person, not an algorithm — within one business day.',
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: 'Are there any hidden or upfront fees?',
    a: `No. Our pricing is all-inclusive — from ${site.pricing.rate} of revenue, with no onboarding fees, no markup on cleaning, and no surprise line items.`,
  },
  {
    q: 'What’s included in the management fee?',
    a: 'The full service — listing, photography, pricing, guest communication, cleaning coordination, maintenance, distribution, reviews, and reporting. There is no “basic vs. premium” tier game. You get everything.',
  },
  {
    q: 'When and how do I get paid?',
    a: 'Payouts are reliable and on a clear monthly schedule, with a simple statement showing exactly how your home performed. Total transparency, every month.',
  },
  {
    q: 'What if my home doesn’t perform?',
    a: site.features.guarantee
      ? `We stand behind our work with a ${site.features.guaranteeText}. We’re aligned with you — we only earn when you earn.`
      : 'Our fee is performance-based — we only earn when your home earns, so we’re fully aligned with your results.',
  },
];
