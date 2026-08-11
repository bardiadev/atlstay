// Barrel for per city × service local substance. See ./types.ts for the rules
// every entry must satisfy — the short version: verifiable local fact only, and
// an absent entry is always better than a padded one.
import type { ServiceNotes } from './types';
import { residentialNotes } from './residential';
import { commercialNotes } from './commercial';
import { specialtyNotes } from './specialty';
import { furnishedNotes } from './furnished';
import { platformNotes } from './platform';

export type { ServiceNotes, ServiceNoteKey } from './types';

export const serviceNotes: ServiceNotes = {
  ...residentialNotes,
  ...commercialNotes,
  ...specialtyNotes,
  ...furnishedNotes,
  ...platformNotes,
};

export function notesFor(serviceSlug: string, citySlug: string): string[] {
  return serviceNotes[`${serviceSlug}:${citySlug}`] ?? [];
}
