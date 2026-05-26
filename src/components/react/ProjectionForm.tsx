import { useEffect, useRef, useState } from 'react';
import { site } from '../../config/site';

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
  monthsAvailable: string;
  priority: Priority;
  firstName: string;
  email: string;
  phone: string;
  company: string; // honeypot
}

const initial: FormData = {
  address: '', bedrooms: '', bathrooms: '', propertyType: '', sqft: '',
  currentlyListed: '', platforms: [], monthsAvailable: '12', priority: '',
  firstName: '', email: '', phone: '', company: '',
};

const TOTAL = 4;
const stepLabels = ['Address', 'Property', 'Goals', 'Contact'];
const bedroomOpts = ['Studio', '1', '2', '3', '4', '5+'];
const bathroomOpts = ['1', '1.5', '2', '2.5', '3', '3+'];
const propertyTypes = ['Entire house', 'Condo / Apartment', 'Townhouse', 'Cabin / Unique', 'Other'];
const platformOpts = ['Airbnb', 'Vrbo', 'Booking.com', 'Other'];
const priorities: { value: Priority; label: string; desc: string }[] = [
  { value: 'income', label: 'Maximize income', desc: 'Earn as much as the home can' },
  { value: 'passive', label: 'Truly passive', desc: 'Hands-off — handled for me' },
  { value: 'exploring', label: 'Just exploring', desc: 'Curious what it could earn' },
];

const inputCls =
  'w-full rounded-lg border border-line bg-white px-4 py-3 text-ink placeholder:text-stone/60 focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/30';

export default function ProjectionForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initial);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step, done]);

  const set = (patch: Partial<FormData>) => setData((d) => ({ ...d, ...patch }));
  const fail = (m: string) => {
    setError(m);
    return false;
  };

  const togglePlatform = (p: string) =>
    set({ platforms: data.platforms.includes(p) ? data.platforms.filter((x) => x !== p) : [...data.platforms, p] });

  const validate = (): boolean => {
    setError('');
    if (step === 1 && !data.address.trim()) return fail('Please enter your property address.');
    if (step === 2) {
      if (!data.bedrooms) return fail('Select the number of bedrooms.');
      if (!data.bathrooms) return fail('Select the number of bathrooms.');
      if (!data.propertyType) return fail('Select your property type.');
    }
    if (step === 3 && !data.currentlyListed) return fail('Let us know if it’s currently listed.');
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

  const submit = async () => {
    if (!validate()) return;
    if (data.company) {
      setDone(true);
      return;
    } // honeypot
    setSubmitting(true);
    try {
      if (site.forms.projectionEndpoint) {
        const { company, ...payload } = data;
        await fetch(site.forms.projectionEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      setDone(true);
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
          Your projection is in the works
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink/75">
          Thanks, {data.firstName || 'there'} — we’re pulling real comparable data for your
          {' '}{data.propertyType ? data.propertyType.toLowerCase() : 'home'} and will send your custom projection within
          {' '}<strong className="text-forest">one business day</strong>. No sales call unless you want one.
        </p>
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
        <p className="mt-2 text-xs font-medium uppercase tracking-wider text-stone" role="status" aria-live="polite">
          Step {step} of {TOTAL} · {stepLabels[step - 1]}
        </p>
      </div>

      {/* Step 1 — Address */}
      {step === 1 && (
        <div>
          <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl text-forest outline-none">
            What’s the address of your property?
          </h2>
          <p className="mt-2 text-sm text-ink/70">We’ll pull real, comparable Atlanta listings to build your projection.</p>
          <input
            type="text"
            autoComplete="street-address"
            className={`mt-5 ${inputCls}`}
            placeholder="123 Peachtree St NE, Atlanta, GA"
            value={data.address}
            onChange={(e) => set({ address: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && next()}
          />
        </div>
      )}

      {/* Step 2 — Property details */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl text-forest outline-none">
            Tell us about the home
          </h2>
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
                  className={`rounded-lg border px-3 py-2.5 text-sm transition-colors ${
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
            <label htmlFor="sqft" className="mb-2 block text-sm font-medium text-forest">
              Square footage <span className="font-normal text-stone">(optional)</span>
            </label>
            <input id="sqft" type="number" inputMode="numeric" className={inputCls} placeholder="e.g. 1,800"
              value={data.sqft} onChange={(e) => set({ sqft: e.target.value })} />
          </div>
        </div>
      )}

      {/* Step 3 — Goals / intent */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl text-forest outline-none">
            A couple quick questions
          </h2>
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
          )}
          <div>
            <span className="mb-2 block text-sm font-medium text-forest">What matters most to you?</span>
            <div className="grid gap-2">
              {priorities.map((p) => (
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
        </div>
      )}

      {/* Step 4 — Contact */}
      {step === 4 && (
        <div className="space-y-5">
          <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl text-forest outline-none">
            Where should we send your projection?
          </h2>
          <div>
            <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-forest">First name</label>
            <input id="firstName" type="text" autoComplete="given-name" className={inputCls} placeholder="Jordan"
              value={data.firstName} onChange={(e) => set({ firstName: e.target.value })} />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-forest">Email</label>
            <input id="email" type="email" autoComplete="email" className={inputCls} placeholder="you@email.com"
              value={data.email} onChange={(e) => set({ email: e.target.value })} />
          </div>
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-forest">
              Phone <span className="font-normal text-stone">(optional — lets us deliver it faster)</span>
            </label>
            <input id="phone" type="tel" autoComplete="tel" className={inputCls} placeholder="(404) 555-0123"
              value={data.phone} onChange={(e) => set({ phone: e.target.value })} />
          </div>
          {/* Honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0" value={data.company}
            onChange={(e) => set({ company: e.target.value })} />
          <p className="text-xs leading-relaxed text-stone">
            No sales pitch. Just honest Atlanta data. No obligation — ever. We’ll reply within one business day.
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
      <div className="mt-7 flex items-center gap-3">
        {step > 1 && (
          <button type="button" onClick={back}
            className="rounded-full px-4 py-3 text-sm font-medium text-stone transition-colors hover:text-forest">
            ← Back
          </button>
        )}
        <div className="flex-1" />
        {step < TOTAL ? (
          <button type="button" onClick={next}
            className="rounded-full bg-brass px-7 py-3 text-sm font-medium text-forest-900 shadow-sm transition-all hover:bg-brass-600 hover:shadow-md">
            {step === 1 ? 'Start my projection' : 'Next'}
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={submitting}
            className="rounded-full bg-brass px-7 py-3 text-sm font-medium text-forest-900 shadow-sm transition-all hover:bg-brass-600 hover:shadow-md disabled:opacity-60">
            {submitting ? 'Sending…' : 'Send me my free projection'}
          </button>
        )}
      </div>
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
