import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { site } from '../../config/site';
import { sendLead } from '../../lib/leads';

/**
 * The one lead form the whole site runs on — hero (PageHero) and in-page bands
 * (ServiceFormBand), ~900 pages.
 *
 * `variant` fits the questions to what the page actually sells. 'short-term' is
 * the DEFAULT and is deliberately byte-identical to the original form: every
 * existing page relies on it, so its copy, fields, markup, validation and
 * submitted payload must never drift. New variants branch alongside it; they
 * never edit the short-term branch.
 *
 * `serviceName` (optional) is submitted as "Service Interest" so the owner can
 * see which service page a lead came from.
 */
export type ProjectionFormVariant = 'short-term' | 'long-term' | 'commercial' | 'hoa';

export interface ProjectionFormProps {
  variant?: ProjectionFormVariant;
  serviceName?: string;
}

type Priority = '' | 'income' | 'passive' | 'exploring';
type Listed = '' | 'yes' | 'no';

interface FormData {
  address: string;
  bedrooms: string;
  bathrooms: string;
  propertyType: string;
  sqft: string;
  currentlyListed: Listed;
  platforms: string[];
  listingUrl: string;
  monthsAvailable: string;
  priority: Priority;
  // long-term
  tenantInPlace: Listed;
  currentRent: string;
  availableFrom: string;
  // commercial
  assetType: string;
  unitCount: string;
  occupancy: string;
  // commercial + hoa
  currentlyManaged: Listed;
  // hoa
  doors: string;
  associationType: string;
  contractEnd: string;
  changeReason: string;
  firstName: string;
  email: string;
  phone: string;
  company: string; // honeypot
}

const initial: FormData = {
  address: '', bedrooms: '', bathrooms: '', propertyType: '', sqft: '',
  currentlyListed: '', platforms: [], listingUrl: '', monthsAvailable: '12', priority: '',
  tenantInPlace: '', currentRent: '', availableFrom: '',
  assetType: '', unitCount: '', occupancy: '',
  currentlyManaged: '',
  doors: '', associationType: '', contractEnd: '', changeReason: '',
  firstName: '', email: '', phone: '', company: '',
};

const TOTAL = 4;
const stepLabels = ['Address', 'Property', 'Goals', 'Contact'];
const bedroomOpts = ['Studio', '1', '2', '3', '4', '5+'];
const bathroomOpts = ['1', '1.5', '2', '2.5', '3', '3+'];
const propertyTypes = ['House', 'Condo', 'Townhouse', 'Cabin', 'Other'];
const platformOpts = ['Airbnb', 'Vrbo', 'Booking.com', 'Other'];
const priorities: { value: Priority; label: string; desc: string }[] = [
  { value: 'income', label: 'Maximize income', desc: 'Earn as much as the home can' },
  { value: 'passive', label: 'Truly passive', desc: 'Hands-off — handled for me' },
  { value: 'exploring', label: 'Just exploring', desc: 'Curious what it could earn' },
];
// 'Multi-family' matters: the multi-family service line uses the commercial
// question set, and without it an owner of a fourplex has nothing to pick.
const assetTypes = ['Multi-family', 'Office', 'Retail', 'Flex or industrial', 'Mixed-use', 'Medical office', 'Other'];
const occupancyOpts = ['Fully leased', 'Partly leased', 'Vacant', 'Not sure'];
const associationTypes = ['HOA', 'Condominium', 'Townhome', 'Mixed'];
const changeReasons = [
  'Financials & reporting',
  'Vendor and maintenance response',
  'Covenant enforcement',
  'Just comparing options',
];

interface VariantCopy {
  stepLabels: string[];
  addressHeading: string;
  addressSub: string;
  addressPlaceholder: string;
  addressError: string;
  step2Heading: string;
  step3Heading: string;
  step4Heading: string;
  step4Note: string;
  startLabel: string;
  submitLabel: string;
  successHeading: string;
  formName: string;
  subject: (address: string) => string;
  priorities: { value: Priority; label: string; desc: string }[];
}

// The short-term entry is the original form's copy, verbatim. Do not edit it.
const COPY: Record<ProjectionFormVariant, VariantCopy> = {
  'short-term': {
    stepLabels,
    addressHeading: 'What’s the address of your property?',
    addressSub: 'We’ll pull real, comparable Atlanta listings to build your projection.',
    addressPlaceholder: '123 Peachtree St NE, Atlanta, GA',
    addressError: 'Please enter your property address.',
    step2Heading: 'Tell us about the home',
    step3Heading: 'A couple quick questions',
    step4Heading: 'Where should we send your projection?',
    step4Note: 'We’ll reply within one business day with your custom projection.',
    startLabel: 'Start my projection',
    submitLabel: 'Send me my free projection',
    successHeading: 'Your projection is in the works',
    formName: 'ATLStay Rental Projection',
    subject: (address) => `New projection request — ${address || 'Atlanta property'}`,
    priorities,
  },
  'long-term': {
    stepLabels,
    addressHeading: 'What’s the address of your rental property?',
    addressSub: 'We’ll pull real, comparable Atlanta rents to build your projection.',
    addressPlaceholder: '123 Peachtree St NE, Atlanta, GA',
    addressError: 'Please enter your property address.',
    step2Heading: 'Tell us about the home',
    step3Heading: 'A couple quick questions',
    step4Heading: 'Where should we send your projection?',
    step4Note: 'We’ll reply within one business day with your custom projection.',
    startLabel: 'Start my projection',
    submitLabel: 'Send me my free projection',
    successHeading: 'Your projection is in the works',
    formName: 'ATLStay Rental Projection',
    subject: (address) => `New projection request — ${address || 'Atlanta property'}`,
    priorities: [
      { value: 'income', label: 'Maximize rent', desc: 'Get the strongest rent the home will hold' },
      { value: 'passive', label: 'Truly passive', desc: 'Hands-off — handled for me' },
      { value: 'exploring', label: 'Just exploring', desc: 'Curious what it could rent for' },
    ],
  },
  commercial: {
    stepLabels,
    addressHeading: 'What’s the address of the property?',
    addressSub: 'We’ll pull real, comparable Atlanta space to build your numbers.',
    addressPlaceholder: '123 Peachtree St NE, Atlanta, GA',
    addressError: 'Please enter the property address.',
    step2Heading: 'Tell us about the property',
    step3Heading: 'A couple quick questions',
    step4Heading: 'Where should we send your projection?',
    step4Note: 'We’ll reply within one business day with your custom projection.',
    startLabel: 'Start my projection',
    submitLabel: 'Send me my free projection',
    successHeading: 'Your projection is in the works',
    formName: 'ATLStay Commercial Projection',
    subject: (address) => `New projection request — ${address || 'Atlanta property'}`,
    priorities: [
      { value: 'income', label: 'Maximize NOI', desc: 'Push net operating income as high as it goes' },
      { value: 'passive', label: 'Truly passive', desc: 'Hands-off — handled for me' },
      { value: 'exploring', label: 'Just exploring', desc: 'Curious what it could perform at' },
    ],
  },
  hoa: {
    stepLabels: ['Community', 'Details', 'Situation', 'Contact'],
    addressHeading: 'Where is the community?',
    addressSub: 'We’ll build a written management proposal around your community.',
    addressPlaceholder: 'Community name & address, Alpharetta, GA',
    addressError: 'Please enter the community’s name or address.',
    step2Heading: 'Tell us about the community',
    step3Heading: 'A couple quick questions',
    step4Heading: 'Where should we send your proposal?',
    step4Note: 'We’ll reply within one business day with a written proposal for your board.',
    startLabel: 'Start my request',
    submitLabel: 'Send my proposal request',
    successHeading: 'Your proposal is in the works',
    formName: 'ATLStay Management Proposal',
    subject: (address) => `New management proposal request — ${address || 'Atlanta community'}`,
    priorities: [],
  },
};

const inputCls =
  'w-full rounded-lg border border-line bg-white px-4 py-3 text-ink placeholder:text-stone/60 focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/30';

export default function ProjectionForm({ variant, serviceName }: ProjectionFormProps = {}) {
  // `?? 'short-term'` (not just a default param) so a serialized `null` prop
  // from Astro can never knock the form off its default behaviour.
  const kind: ProjectionFormVariant = variant ?? 'short-term';
  // Service pages render this island up to three times (hero + two bands), so
  // fixed element ids would collide and a <label> click would focus the FIRST
  // form's input instead of its own. useId() gives each instance its own prefix.
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;
  const copy = COPY[kind] ?? COPY['short-term'];
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initial);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listingRef = useRef<HTMLTextAreaElement>(null);
  const startedAt = useRef<number>(Date.now());

  useEffect(() => {
    headingRef.current?.focus();
  }, [step, done]);

  // Auto-grow the listing-links textarea as lines are added.
  useEffect(() => {
    const el = listingRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [data.listingUrl, data.currentlyListed, step]);

  const set = (patch: Partial<FormData>) => setData((d) => ({ ...d, ...patch }));
  const fail = (m: string) => {
    setError(m);
    return false;
  };

  const togglePlatform = (p: string) =>
    set({ platforms: data.platforms.includes(p) ? data.platforms.filter((x) => x !== p) : [...data.platforms, p] });

  const validate = (): boolean => {
    setError('');
    if (step === 1 && !data.address.trim()) return fail(copy.addressError);
    if (step === 2) {
      if (kind === 'commercial') {
        if (!data.assetType) return fail('Select the asset type.');
      } else if (kind === 'hoa') {
        if (!data.doors.trim()) return fail('Tell us roughly how many doors the community has.');
        if (!data.associationType) return fail('Select the association type.');
      } else {
        if (!data.bedrooms) return fail('Select the number of bedrooms.');
        if (!data.bathrooms) return fail('Select the number of bathrooms.');
        if (!data.propertyType) return fail('Select your property type.');
      }
    }
    if (step === 3) {
      if (kind === 'long-term') {
        if (!data.tenantInPlace) return fail('Let us know if there’s a tenant in place.');
      } else if (kind === 'commercial') {
        if (!data.occupancy) return fail('Let us know roughly how occupied it is.');
      } else if (kind === 'hoa') {
        if (!data.currentlyManaged) return fail('Let us know if you have a management company today.');
      } else if (!data.currentlyListed) {
        return fail('Let us know if it’s currently listed.');
      }
    }
    if (step === 4) {
      if (!data.firstName.trim()) return fail('Please enter your first name.');
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) return fail('Please enter a valid email address.');
    }
    return true;
  };

  const next = () => validate() && setStep((s) => Math.min(TOTAL, s + 1));
  const back = () => {
    setError('');
    setStep((s) => Math.max(1, s - 1));
  };

  const yesNo = (v: Listed) => (v === 'yes' ? 'Yes' : v === 'no' ? 'No' : '');

  /**
   * Only the fields the visitor was actually shown are submitted. Keys are
   * snake_case because src/lib/leads.ts humanizes on `_`/`-` only — a camelCase
   * key would arrive in the owner's email as "AssociationType".
   */
  const leadFields = (priorityLabel: string): Record<string, string | string[]> => {
    if (kind === 'commercial') {
      return {
        name: data.firstName,
        email: data.email,
        phone: data.phone,
        property_address: data.address,
        asset_type: data.assetType,
        unit_count: data.unitCount,
        square_feet: data.sqft,
        occupancy: data.occupancy,
        currently_managed: yesNo(data.currentlyManaged),
        owner_priority: priorityLabel,
      };
    }
    if (kind === 'hoa') {
      return {
        name: data.firstName,
        email: data.email,
        phone: data.phone,
        community_address: data.address,
        doors: data.doors,
        association_type: data.associationType,
        currently_managed: yesNo(data.currentlyManaged),
        contract_ends: data.contractEnd,
        reason_for_change: data.changeReason,
      };
    }
    if (kind === 'long-term') {
      return {
        name: data.firstName,
        email: data.email,
        phone: data.phone,
        property_address: data.address,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        property_type: data.propertyType,
        square_feet: data.sqft,
        tenant_in_place: yesNo(data.tenantInPlace),
        current_rent: data.currentRent,
        available_from: data.availableFrom,
        owner_priority: priorityLabel,
      };
    }
    return {
      name: data.firstName,
      email: data.email,
      phone: data.phone,
      property_address: data.address,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      property_type: data.propertyType,
      square_feet: data.sqft,
      currently_listed: yesNo(data.currentlyListed),
      listed_on: data.platforms,
      listing_url: data.listingUrl,
      months_available_per_year: data.monthsAvailable,
      owner_priority: priorityLabel,
    };
  };

  const submit = async () => {
    if (!validate()) return;
    // Bot defenses: honeypot field + implausibly fast completion. Either one
    // shows the visitor a normal success but sends nothing.
    const tooFast = Date.now() - startedAt.current < 3000;
    if (data.company || tooFast) {
      setDone(true);
      return;
    }
    setSubmitting(true);
    try {
      const priorityLabel = copy.priorities.find((p) => p.value === data.priority)?.label ?? '';
      const fields = leadFields(priorityLabel);
      if (serviceName) fields.service_interest = serviceName;
      const result = await sendLead(fields, {
        subject: copy.subject(data.address),
        formName: copy.formName,
      });
      if (result.ok) {
        setDone(true);
      } else {
        setError('Something went wrong sending your details. Please call us and we’ll take care of it.');
      }
    } catch {
      setError('Something went wrong sending your details. Please call us and we’ll take care of it.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brass/15 text-brass-600">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 ref={headingRef} tabIndex={-1} className="mt-5 font-display text-2xl text-forest outline-none sm:text-3xl">
          {copy.successHeading}
        </h2>
        {kind === 'hoa' ? (
          <p className="mx-auto mt-3 max-w-md text-ink/75">
            Thanks, {data.firstName || 'there'} — we’re putting together a written management proposal for your
            community and will send it to your board within
            {' '}<strong className="text-forest">one business day</strong>.
          </p>
        ) : kind === 'commercial' ? (
          <p className="mx-auto mt-3 max-w-md text-ink/75">
            Thanks, {data.firstName || 'there'} — we’re pulling real comparable data for your
            {' '}{data.assetType && data.assetType !== 'Other' ? `${data.assetType.toLowerCase()} property` : 'property'} and will send your custom projection within
            {' '}<strong className="text-forest">one business day</strong>.
          </p>
        ) : (
          <p className="mx-auto mt-3 max-w-md text-ink/75">
            Thanks, {data.firstName || 'there'} — we’re pulling real comparable data for your
            {' '}{data.propertyType ? data.propertyType.toLowerCase() : 'home'} and will send your custom projection within
            {' '}<strong className="text-forest">one business day</strong>.
          </p>
        )}
        <p className="mt-6 text-sm text-stone">
          Questions now? Call{' '}
          <a href={site.contact.phoneHref} className="font-medium text-brass-600 hover:text-brass">
            {site.contact.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
      {/* Progress */}
      <div className="mb-7">
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${i < step ? 'bg-brass' : 'bg-line'}`}
            />
          ))}
        </div>
        <p className="mt-2 text-center text-xs font-medium uppercase tracking-wider text-stone sm:text-left" role="status" aria-live="polite">
          Step {step} of {TOTAL} · {copy.stepLabels[step - 1]}
        </p>
      </div>

      {/* Step 1 — Address */}
      {step === 1 && (
        <div>
          <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl text-forest outline-none">
            {copy.addressHeading}
          </h2>
          <p className="mt-2 text-sm text-ink/70">{copy.addressSub}</p>
          {site.forms.geoapifyKey ? (
            <AddressAutocomplete value={data.address} onChange={(v) => set({ address: v })} onEnter={next} placeholder={copy.addressPlaceholder} />
          ) : (
            <input
              type="text"
              autoComplete="street-address"
              className={`mt-5 ${inputCls}`}
              placeholder={copy.addressPlaceholder}
              value={data.address}
              onChange={(e) => set({ address: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && next()}
            />
          )}
        </div>
      )}

      {/* Step 2 — Property details */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl text-forest outline-none">
            {copy.step2Heading}
          </h2>
          {kind === 'commercial' ? (
            <>
              {/* Square footage leads here — it drives the numbers more than anything else on this step. */}
              <div>
                <label htmlFor={fid('sqft')} className="mb-2 block text-sm font-medium text-forest">
                  Approximate square footage <span className="font-normal text-stone">(optional)</span>
                </label>
                <input id={fid('sqft')} type="number" inputMode="numeric" className={inputCls} placeholder="e.g. 12,000"
                  value={data.sqft} onChange={(e) => set({ sqft: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && next()} />
                <p className="mt-1.5 text-xs text-stone">Rentable square feet, near enough — it’s the biggest single driver of the number we come back with.</p>
              </div>
              <Pills label="Asset type" options={assetTypes} value={data.assetType} onSelect={(v) => set({ assetType: v })} />
              <div>
                <label htmlFor={fid('unitCount')} className="mb-2 block text-sm font-medium text-forest">
                  Number of units or suites <span className="font-normal text-stone">(optional)</span>
                </label>
                <input id={fid('unitCount')} type="number" inputMode="numeric" className={inputCls} placeholder="e.g. 8"
                  value={data.unitCount} onChange={(e) => set({ unitCount: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && next()} />
              </div>
            </>
          ) : kind === 'hoa' ? (
            <>
              <div>
                <label htmlFor={fid('doors')} className="mb-2 block text-sm font-medium text-forest">How many doors?</label>
                <input id={fid('doors')} type="number" inputMode="numeric" className={inputCls} placeholder="e.g. 180"
                  value={data.doors} onChange={(e) => set({ doors: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && next()} />
                <p className="mt-1.5 text-xs text-stone">Units in the association — homes, condos, or townhomes.</p>
              </div>
              <Pills label="Association type" options={associationTypes} value={data.associationType} onSelect={(v) => set({ associationType: v })} />
            </>
          ) : (
            <>
              <Pills label="Bedrooms" options={bedroomOpts} value={data.bedrooms} onSelect={(v) => set({ bedrooms: v })} />
              <Pills label="Bathrooms" options={bathroomOpts} value={data.bathrooms} onSelect={(v) => set({ bathrooms: v })} />
              <div>
                <span className="mb-2 block text-sm font-medium text-forest">Property type</span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {propertyTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set({ propertyType: t })}
                      className={`whitespace-nowrap rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                        data.propertyType === t
                          ? 'border-brass bg-brass-50 text-forest'
                          : 'border-line bg-white text-ink/80 hover:border-brass/50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor={fid('sqft')} className="mb-2 block text-sm font-medium text-forest">
                  Square footage <span className="font-normal text-stone">(optional)</span>
                </label>
                <input id={fid('sqft')} type="number" inputMode="numeric" className={inputCls} placeholder="e.g. 1,800"
                  value={data.sqft} onChange={(e) => set({ sqft: e.target.value })} />
              </div>
            </>
          )}
        </div>
      )}

      {/* Step 3 — Goals / intent */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl text-forest outline-none">
            {copy.step3Heading}
          </h2>
          {kind === 'commercial' ? (
            <>
              <Pills label="Roughly how occupied is it?" options={occupancyOpts} value={data.occupancy} onSelect={(v) => set({ occupancy: v })} />
              <YesNo label="Is it managed by someone today?" value={data.currentlyManaged} onSelect={(v) => set({ currentlyManaged: v })} />
            </>
          ) : kind === 'hoa' ? (
            <>
              <YesNo
                label="Do you have a management company today?"
                value={data.currentlyManaged}
                onSelect={(v) => set({ currentlyManaged: v, ...(v === 'no' ? { contractEnd: '' } : {}) })}
              />
              {data.currentlyManaged === 'yes' && (
                <div>
                  <label htmlFor={fid('contractEnd')} className="mb-2 block text-sm font-medium text-forest">
                    When does the current contract end? <span className="font-normal text-stone">(optional)</span>
                  </label>
                  <input id={fid('contractEnd')} type="text" autoComplete="off" className={inputCls} placeholder="e.g. December, or month-to-month"
                    value={data.contractEnd} onChange={(e) => set({ contractEnd: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && next()} />
                </div>
              )}
              <Pills label="What’s prompting the change?" options={changeReasons} value={data.changeReason} onSelect={(v) => set({ changeReason: v })} />
            </>
          ) : kind === 'long-term' ? (
            <>
              <YesNo label="Is there a tenant in place right now?" value={data.tenantInPlace} onSelect={(v) => set({ tenantInPlace: v })} />
              <div>
                <label htmlFor={fid('currentRent')} className="mb-2 block text-sm font-medium text-forest">
                  What’s it renting for today? <span className="font-normal text-stone">(optional)</span>
                </label>
                <input id={fid('currentRent')} type="text" autoComplete="off" className={inputCls} placeholder="e.g. $2,400/mo"
                  value={data.currentRent} onChange={(e) => set({ currentRent: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && next()} />
              </div>
              <div>
                <label htmlFor={fid('availableFrom')} className="mb-2 block text-sm font-medium text-forest">
                  When is it available? <span className="font-normal text-stone">(optional)</span>
                </label>
                <input id={fid('availableFrom')} type="text" autoComplete="off" className={inputCls} placeholder="e.g. Now, or March"
                  value={data.availableFrom} onChange={(e) => set({ availableFrom: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && next()} />
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="mb-2 block text-sm font-medium text-forest">Is it currently listed on Airbnb or Vrbo?</span>
                <div className="flex gap-2">
                  {(['yes', 'no'] as const).map((v) => (
                    <button key={v} type="button" onClick={() => set({ currentlyListed: v })}
                      className={`flex-1 rounded-lg border px-4 py-2.5 text-sm capitalize transition-colors ${
                        data.currentlyListed === v ? 'border-brass bg-brass-50 text-forest' : 'border-line text-ink/80 hover:border-brass/50'
                      }`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              {data.currentlyListed === 'yes' && (
                <div className="space-y-4">
                  <div>
                    <span className="mb-2 block text-sm font-medium text-forest">Where is it listed?</span>
                    <div className="flex flex-wrap gap-2">
                      {platformOpts.map((p) => (
                        <button key={p} type="button" onClick={() => togglePlatform(p)}
                          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                            data.platforms.includes(p) ? 'border-brass bg-brass-50 text-forest' : 'border-line text-ink/80 hover:border-brass/50'
                          }`}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor={fid('listingUrl')} className="mb-2 block text-sm font-medium text-forest">
                      Listing link(s) <span className="font-normal text-stone">(optional)</span>
                    </label>
                    <textarea id={fid('listingUrl')} ref={listingRef} rows={1} autoComplete="off"
                      className={`${inputCls} resize-none overflow-hidden`}
                      placeholder="Paste a link — Airbnb, Vrbo, or Booking.com"
                      value={data.listingUrl} onChange={(e) => set({ listingUrl: e.target.value })} />
                    <p className="mt-1.5 text-xs text-stone">Listing on more than one site, or have multiple units? Add each link on its own line.</p>
                  </div>
                </div>
              )}
            </>
          )}
          {kind !== 'hoa' && (
            <div>
              <span className="mb-2 block text-sm font-medium text-forest">What matters most to you?</span>
              <div className="grid gap-2">
                {copy.priorities.map((p) => (
                  <button key={p.value} type="button" onClick={() => set({ priority: p.value })}
                    className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors ${
                      data.priority === p.value ? 'border-brass bg-brass-50' : 'border-line hover:border-brass/50'
                    }`}>
                    <span>
                      <span className="block text-sm font-medium text-forest">{p.label}</span>
                      <span className="block text-xs text-stone">{p.desc}</span>
                    </span>
                    <span className={`h-4 w-4 flex-none rounded-full border-2 ${data.priority === p.value ? 'border-brass bg-brass' : 'border-line'}`} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 4 — Contact */}
      {step === 4 && (
        <div className="space-y-5">
          <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl text-forest outline-none">
            {copy.step4Heading}
          </h2>
          <div>
            <label htmlFor={fid('firstName')} className="mb-2 block text-sm font-medium text-forest">First name</label>
            <input id={fid('firstName')} type="text" autoComplete="given-name" className={inputCls} placeholder="Jordan"
              value={data.firstName} onChange={(e) => set({ firstName: e.target.value })} />
          </div>
          <div>
            <label htmlFor={fid('email')} className="mb-2 block text-sm font-medium text-forest">Email</label>
            <input id={fid('email')} type="email" autoComplete="email" className={inputCls} placeholder="you@email.com"
              value={data.email} onChange={(e) => set({ email: e.target.value })} />
          </div>
          <div>
            <label htmlFor={fid('phone')} className="mb-2 block text-sm font-medium text-forest">
              Phone <span className="font-normal text-stone">(optional — lets us deliver it faster)</span>
            </label>
            <input id={fid('phone')} type="tel" autoComplete="tel" className={inputCls} placeholder="(404) 555-0123"
              value={data.phone} onChange={(e) => set({ phone: e.target.value })} />
          </div>
          {/* Honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0" value={data.company}
            onChange={(e) => set({ company: e.target.value })} />
          <p className="text-xs leading-relaxed text-stone">
            {copy.step4Note}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      {/* Nav */}
      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
        {step > 1 && (
          <button type="button" onClick={back}
            className="self-center rounded-full px-4 py-3 text-sm font-medium text-stone transition-colors hover:text-forest sm:self-auto">
            ← Back
          </button>
        )}
        <div className="hidden flex-1 sm:block" />
        {step < TOTAL ? (
          <button type="button" onClick={next}
            className="w-full rounded-full bg-brass px-7 py-3 text-sm font-medium text-forest-900 shadow-sm transition-all hover:bg-brass-600 hover:shadow-md sm:w-auto">
            {step === 1 ? copy.startLabel : 'Next'}
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={submitting}
            className="w-full rounded-full bg-brass px-7 py-3 text-sm font-medium text-forest-900 shadow-sm transition-all hover:bg-brass-600 hover:shadow-md disabled:opacity-60 sm:w-auto">
            {submitting ? 'Sending…' : copy.submitLabel}
          </button>
        )}
      </div>

      {step === TOTAL && (
        <p className="mt-3 text-center text-xs text-stone">
          Rather talk now?{' '}
          <a href={site.contact.phoneHref} className="font-medium text-brass-600 hover:text-brass">Call {site.contact.phone}</a>
        </p>
      )}
    </div>
  );
}

// Address autocomplete via Geoapify (OpenAddresses + OSM — strong US
// house-number coverage). Only mounted when site.forms.geoapifyKey is set;
// otherwise the address step renders a plain text input. Biased to Atlanta,
// filtered to the US. Degrades to plain typing if the service is unreachable.
function AddressAutocomplete({
  value, onChange, onEnter, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
  placeholder: string;
}) {
  const GEOAPIFY_KEY = site.forms.geoapifyKey;
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const debounce = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const seq = useRef(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const format = (r: Record<string, string>): string => {
    const line1 = [r.housenumber, r.street].filter(Boolean).join(' ') || r.address_line1 || r.name || '';
    const city = r.city || r.county || '';
    const region = [r.state_code || r.state, r.postcode].filter(Boolean).join(' ');
    return [line1, city, region].filter(Boolean).join(', ');
  };

  const fetchSuggestions = (q: string) => {
    if (q.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const my = ++seq.current;
    const url =
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(q)}` +
      `&apiKey=${GEOAPIFY_KEY}&filter=countrycode:us&bias=proximity:-84.388,33.749&limit=6&format=json`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (my !== seq.current) return; // ignore stale responses
        const results = Array.isArray(data?.results) ? data.results : [];
        const list = results
          .map((r: Record<string, string>) => format(r))
          .filter((s: string, i: number, arr: string[]) => s && arr.indexOf(s) === i)
          .slice(0, 6);
        setSuggestions(list);
        setOpen(list.length > 0);
        setActive(-1);
      })
      .catch(() => {
        /* silent — field still works as plain text input */
      });
  };

  const onInput = (v: string) => {
    onChange(v);
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => fetchSuggestions(v), 280);
  };

  const choose = (s: string) => {
    onChange(s);
    setSuggestions([]);
    setOpen(false);
    setActive(-1);
  };

  const onKey = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (open && suggestions.length) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(suggestions.length - 1, a + 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
        return;
      }
      if (e.key === 'Enter') {
        if (active >= 0) {
          e.preventDefault();
          choose(suggestions[active]);
          return;
        }
        setOpen(false);
        onEnter();
        return;
      }
      if (e.key === 'Escape') {
        setOpen(false);
        setActive(-1);
        return;
      }
    } else if (e.key === 'Enter') {
      onEnter();
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={boxRef} className="relative mt-5">
      <input
        type="text"
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls="address-suggestions"
        className={inputCls}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onInput(e.target.value)}
        onKeyDown={onKey}
        onFocus={() => suggestions.length && setOpen(true)}
      />
      {open && suggestions.length > 0 && (
        <ul
          id="address-suggestions"
          role="listbox"
          className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-line bg-white py-1 shadow-lg"
        >
          {suggestions.map((s, i) => (
            <li
              key={s}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault();
                choose(s);
              }}
              onMouseEnter={() => setActive(i)}
              className={`cursor-pointer px-4 py-2.5 text-sm ${i === active ? 'bg-brass-50 text-forest' : 'text-ink/80 hover:bg-cream'}`}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Pills({
  label, options, value, onSelect,
}: {
  label: string;
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-forest">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} type="button" onClick={() => onSelect(o)}
            className={`min-w-[3.25rem] rounded-lg border px-3.5 py-2.5 text-sm transition-colors ${
              value === o ? 'border-brass bg-brass-50 text-forest' : 'border-line text-ink/80 hover:border-brass/50'
            }`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

// Yes/no pair — same markup as the original "currently listed" control, reused
// by the long-term, commercial and HOA variants.
function YesNo({
  label, value, onSelect,
}: {
  label: string;
  value: Listed;
  onSelect: (v: 'yes' | 'no') => void;
}) {
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-forest">{label}</span>
      <div className="flex gap-2">
        {(['yes', 'no'] as const).map((v) => (
          <button key={v} type="button" onClick={() => onSelect(v)}
            className={`flex-1 rounded-lg border px-4 py-2.5 text-sm capitalize transition-colors ${
              value === v ? 'border-brass bg-brass-50 text-forest' : 'border-line text-ink/80 hover:border-brass/50'
            }`}>
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
