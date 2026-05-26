import type { ImageKey } from './images';

export interface Service {
  title: string;
  short: string;
  description: string;
  imageKey?: ImageKey;
}

export const services: Service[] = [
  {
    title: 'Listing creation & optimization',
    short: 'A listing built to book.',
    description:
      'We write, design, and continuously tune your listing — title, photos, amenities, and description — then A/B test it against the market so it stays at the top of search and converts browsers into bookings.',
    imageKey: 'photography',
  },
  {
    title: 'Professional photography',
    short: 'Photos that sell the stay.',
    description:
      'Magazine-quality, wide-angle photography that makes your home impossible to scroll past. Great photos are the single biggest driver of bookings — so we treat them that way.',
    imageKey: 'photography',
  },
  {
    title: 'Revenue & dynamic pricing',
    short: 'The right price, every night.',
    description:
      'We price every single night using live demand, local events, and seasonality — capturing peak rates when Atlanta is busy and staying booked when it’s not. The goal is simple: more revenue, higher occupancy.',
    imageKey: 'pricingDashboard',
  },
  {
    title: '24/7 guest communication',
    short: 'We answer, so you don’t.',
    description:
      'Every inquiry, question, and 2 a.m. message handled by a real, responsive team. Fast, five-star communication drives better reviews — and better reviews drive everything.',
    imageKey: 'guestExperience',
  },
  {
    title: 'Cleaning & hotel-grade turnovers',
    short: 'Spotless, every time.',
    description:
      'Vetted local cleaners, a detailed turnover checklist, and quality checks between every stay. Fresh linens, restocked essentials, and a home that looks brand-new for each guest.',
    imageKey: 'cleaning',
  },
  {
    title: 'Maintenance & restocking',
    short: 'Small problems, solved fast.',
    description:
      'We coordinate trusted local vendors for anything that comes up and keep the home stocked with the essentials guests expect — so issues never become bad reviews.',
  },
  {
    title: 'Multi-platform distribution',
    short: 'Seen everywhere guests book.',
    description:
      'Your home, syndicated and synced across Airbnb, Vrbo, Booking.com, and more — with a single calendar so you’re never double-booked and never leaving money on the table.',
  },
  {
    title: 'Reviews & reputation',
    short: 'Protecting your five stars.',
    description:
      'We engineer the whole guest experience toward five-star reviews and manage feedback proactively, building the rating that keeps your calendar full.',
  },
  {
    title: 'Owner reporting & payouts',
    short: 'Total clarity, on time.',
    description:
      'A clean monthly statement, transparent numbers, and reliable payouts. You always know exactly how your home is performing — no guesswork, no hidden fees.',
  },
];
