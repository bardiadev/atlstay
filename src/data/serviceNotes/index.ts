// Barrel for per city × service local substance. See ./types.ts for the rules
// every entry must satisfy — the short version: verifiable local fact only, and
// an absent entry is always better than a padded one.
import type { ServiceNotes } from './types';
import { residentialNotes } from './residential';
import { commercialNotes } from './commercial';
import { specialtyNotes } from './specialty';
import { furnishedNotes } from './furnished';
import { platformNotes } from './platform';
import { generatedNotes } from './generated';

export type { ServiceNotes, ServiceNoteKey } from './types';

export const serviceNotes: ServiceNotes = {
  // Generated entries spread FIRST so any hand-researched entry below overrides
  // one for the same key. Improving a page means writing a researched entry in
  // the hand-maintained file, not editing generated.ts.
  ...generatedNotes,
  ...residentialNotes,
  ...commercialNotes,
  ...specialtyNotes,
  ...furnishedNotes,
  ...platformNotes,
};

export function notesFor(serviceSlug: string, citySlug: string): string[] {
  return serviceNotes[`${serviceSlug}:${citySlug}`] ?? [];
}
