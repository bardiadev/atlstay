// Per city × service local substance — the field that makes the programmatic
// service pages defensible rather than templated.
//
// WHY THIS EXISTS
// A live audit measured only ~16% of each service×city page as genuinely new
// (≈213 words on a 1,300-word page); the rest already appears on the service
// hub or the plain /{city}/ page. Google's spam policy calls mass-produced
// near-duplicate location pages "scaled content abuse" and "doorway abuse".
// The realistic outcome of that profile is not a penalty — it is being ignored
// ("Crawled – currently not indexed").
//
// Each entry below is 2–3 paragraphs of fact that is true ONLY for that service
// in that city. Not adjectives about the city. Facts an owner could verify:
// which magistrate court hears the dispossessory, what the county actually
// requires, which employers or hospitals or studios drive that specific demand,
// what the local housing stock is.
//
// RULES FOR ADDING ENTRIES
//  - Verifiable fact only. No invented statistics, rents, occupancy or dates.
//  - If a city has no genuine service-specific story, ADD NOTHING. A missing
//    entry renders nothing and is far better than padding, which is precisely
//    the thing this field exists to eliminate.
//  - No fee percentages — pricing renders from config via feeLine().
//  - Keyed `${serviceSlug}:${citySlug}`.

export type ServiceNoteKey = string;

/** 2–3 paragraphs, plain text. Rendered as its own section on the city page. */
export type ServiceNotes = Record<ServiceNoteKey, string[]>;
