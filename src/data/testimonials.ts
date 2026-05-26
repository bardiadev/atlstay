// ⚠️ PLACEHOLDER testimonials — representative of the owner experience but NOT
// real customer quotes. Replace every entry with genuine, attributable owner
// reviews (with permission) BEFORE the site goes live. Do not publish as-is.
export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  rating: number;
  placeholder: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'I went from spending every weekend managing messages and cleaners to literally doing nothing. The income went up, not down. I should have done this a year ago.',
    name: 'Marcus T.',
    location: 'Buckhead',
    rating: 5,
    placeholder: true,
  },
  {
    quote:
      'They actually know Atlanta. They priced around a big convention weekend I didn’t even know about and my place was booked solid at top rates.',
    name: 'Priya S.',
    location: 'Midtown',
    rating: 5,
    placeholder: true,
  },
  {
    quote:
      'What sold me was the honesty — they showed me the fee up front and there were no surprises. Reviews on my listing have never been higher.',
    name: 'Dwayne & Lori R.',
    location: 'Decatur',
    rating: 5,
    placeholder: true,
  },
];
