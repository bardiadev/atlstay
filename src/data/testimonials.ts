// Genuine, attributable owner testimonials only. Add entries here once you
// have real owner quotes (with permission) — then render them with
// TestimonialCard. Until then this stays empty and the site shows honest
// aggregate proof (4.9★ across 10,000+ reviews) via ReviewProof instead.
// Never add fabricated or representative-but-fake quotes.
export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  rating: number;
}

export const testimonials: Testimonial[] = [];
