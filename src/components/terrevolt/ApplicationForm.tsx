import { useRef, useState } from "react";
import { z } from "zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CvUploadField, validateCvFile } from "@/components/CvUploadField";
import { scrollToElement } from "@/lib/scrollToAnchor";
import { REGIOS } from "@/data/vacatures";
import { useVacatures } from "@/hooks/useVacatures";

import { notifySubmission } from "@/lib/notify";


/**
 * Compact sollicitatieformulier.
 * Persoonsgegevens gaan uitsluitend via een beveiligde POST (supabase-js insert /
 * storage upload) naar de backend — nooit via GET of queryparameters, en er worden
 * geen persoonsgegevens gelogd of naar analytics gestuurd.
 */

const schema = z.object({
  name: z.string().trim().min(2, "Vul je naam in").max(100, "Maximaal 100 tekens"),
  email: z.string().trim().email("Vul een geldig e-mailadres in").max(255),
  phone: z
    .string()
    .trim()
    .min(6, "Vul je telefoonnummer in")
    .max(30, "Maximaal 30 tekens")
    .regex(/^[0-9+()\s-]+$/, "Gebruik alleen cijfers, spaties, + of -"),
  profile: z.string().trim().min(1, "Kies een functie").max(120),
  region: z.string().trim().min(1, "Kies een regio").max(100),
  message: z.string().trim().max(1000, "Maximaal 1000 tekens").optional(),
  privacy: z.literal("on", { errorMap: () => ({ message: "Bevestig dat je de privacyverklaring hebt gelezen" }) }),
});

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "profile" | "region" | "message" | "privacy", string>>;

const THROTTLE_KEY = "tv_last_application_at";
const THROTTLE_MS = 60_000;

interface Props {
  /** Vooraf ingevulde functie (vacaturepagina). */
  defaultProfile?: string;
  /** Analytics-label (bevat nooit persoonsgegevens). */
  source?: string;
  id?: string;
}

export const ApplicationForm = ({ defaultProfile, source = "werken_bij_form", id = "sollicitatieformulier" }: Props) => {
  const { vacatures } = useVacatures();
  const formRef = useRef<HTMLFormElement>(null);

  const errorRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const inputBase =
    "w-full min-h-[48px] rounded-lg border bg-white px-4 py-3 text-[#0d3b2e] placeholder:text-[#9aa5a0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-1";
  const cls = (f: keyof FieldErrors) => `${inputBase} ${errors[f] ? "border-red-400" : "border-gray-200"}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // Stille spambeveiliging (honeypot) — bots vullen dit verborgen veld in.
    if (String(fd.get("company_website") || "").trim() !== "") {
      setSuccess(true);
      return;
    }

    const last = Number(window.localStorage.getItem(THROTTLE_KEY) || 0);
    if (last && Date.now() - last < THROTTLE_MS) {
      const msg = "Je hebt net al een aanmelding verstuurd. Wacht even of bel Tobesh direct.";
      setSubmitError(msg);
      toast.error(msg);
      return;
    }

    const parsed = schema.safeParse({
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      profile: String(fd.get("profile") || ""),
      region: String(fd.get("region") || ""),
      message: String(fd.get("message") || ""),
      privacy: fd.get("privacy") ? "on" : "",
    });

    setSubmitError(null);
    if (!parsed.success) {
      const fe: FieldErrors = {};
      parsed.error.errors.forEach((err) => {
        const k = err.path[0] as keyof FieldErrors;
        if (k && !fe[k]) fe[k] = err.message;
      });
      setErrors(fe);
      toast.error("Controleer de gemarkeerde velden");
      requestAnimationFrame(() => {
        if (errorRef.current) scrollToElement(errorRef.current);
        const first = Object.keys(fe)[0];
        formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      });
      return;
    }
    setErrors({});

    if (file) {
      const v = validateCvFile(file);
      if (!v.ok && v.message) {
        setFileError(v.message);
        setSubmitError(v.message);
        toast.error(v.message);
        return;
      }
    }

    setSubmitting(true);
    try {
      let cv_url: string | null = null;
      if (file) {
        setUploading(true);
        try {
          const ext = (file.name.split(".").pop() || "bin").toLowerCase();
          const path = `${crypto.randomUUID()}.${ext}`;
          const { error: upErr } = await supabase.storage
            .from("job-applications")
            .upload(path, file, { contentType: file.type || undefined });
          if (upErr) throw upErr;
          cv_url = path;
        } finally {
          setUploading(false);
        }
      }

      const bewaren = fd.get("retain") ? "ja" : "nee";
      const extras = `Functie: ${parsed.data.profile} | Regio: ${parsed.data.region} | Privacy akkoord: ja | Bewaren 12 maanden: ${bewaren}`;
      const fullMessage = parsed.data.message ? `${extras}\n\n${parsed.data.message}` : extras;

      const submissionId = crypto.randomUUID();
      const { error: insErr } = await supabase.from("job_applications").insert([
        {
          id: submissionId,
          name: parsed.data.name,
          phone: parsed.data.phone,
          email: parsed.data.email,
          region: parsed.data.region,
          message: fullMessage,
          cv_url,
          profile: parsed.data.profile,
          privacy_consent: true,
        },
      ]);
      if (insErr) throw insErr;

      window.localStorage.setItem(THROTTLE_KEY, String(Date.now()));

      // Melding naar kantoor + ontvangstbevestiging naar de sollicitant.
      void notifySubmission("application", submissionId);

      import("@/lib/analytics").then((m) => m.trackFormSubmit(source));

      formRef.current?.reset();
      setFile(null);
      setFileError(null);
      setSuccess(true);
      toast.success("Sollicitatie ontvangen. Tobesh neemt binnen twee werkdagen contact op.");
    } catch {
      const msg = "Versturen lukte niet. Controleer je verbinding en probeer het opnieuw, of bel Tobesh direct.";
      setSubmitError(msg);
      toast.error(msg);
      requestAnimationFrame(() => errorRef.current && scrollToElement(errorRef.current));
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-[#9ed42e] bg-[#f0f7e6] p-6 sm:p-8" role="status" aria-live="polite">
        <CheckCircle2 className="w-8 h-8 text-[#0d3b2e]" aria-hidden="true" />
        <h3 className="mt-3 text-xl font-semibold text-[#0d3b2e]">Sollicitatie ontvangen</h3>
        <p className="mt-2 text-[#0d3b2e]/80 leading-relaxed">
          Tobesh Haideri neemt binnen twee werkdagen contact met je op. Liever direct contact? Bel of app{" "}
          <a className="underline" href="tel:+31634487467">+31 6 34 48 74 67</a>.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-5 inline-flex min-h-[44px] items-center rounded-lg border border-[#0d3b2e] px-5 text-sm font-medium text-[#0d3b2e] hover:bg-[#0d3b2e] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e]"
        >
          Nog een sollicitatie versturen
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} id={id} onSubmit={handleSubmit} noValidate className="space-y-5">
      <p className="text-sm text-[#0d3b2e]/80 leading-relaxed">
        Geen cv bij de hand? Geen probleem. Laat je gegevens achter of bel of app Tobesh.
      </p>

      {submitError && (
        <div ref={errorRef} role="alert" className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" aria-hidden="true" />
          <p className="text-sm text-red-800">{submitError}</p>
        </div>
      )}

      {/* Honeypot — verborgen voor gebruikers en screenreaders */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${id}-company_website`}>Laat dit veld leeg</label>
        <input id={`${id}-company_website`} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-2 block text-sm text-[#0d3b2e]">Naam *</label>
          <input id={`${id}-name`} name="name" autoComplete="name" required aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-err` : undefined} className={cls("name")} />
          {errors.name && <p id={`${id}-name-err`} role="alert" className="mt-1.5 text-xs text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="mb-2 block text-sm text-[#0d3b2e]">E-mailadres *</label>
          <input id={`${id}-email`} name="email" type="email" inputMode="email" autoComplete="email" required
            aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id}-email-err` : undefined} className={cls("email")} />
          {errors.email && <p id={`${id}-email-err`} role="alert" className="mt-1.5 text-xs text-red-700">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="mb-2 block text-sm text-[#0d3b2e]">Telefoonnummer *</label>
          <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required
            aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id}-phone-err` : undefined} className={cls("phone")} />
          {errors.phone && <p id={`${id}-phone-err`} role="alert" className="mt-1.5 text-xs text-red-700">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-profile`} className="mb-2 block text-sm text-[#0d3b2e]">Gewenste functie *</label>
          <select id={`${id}-profile`} name="profile" required defaultValue={defaultProfile ?? ""}
            aria-invalid={!!errors.profile} aria-describedby={errors.profile ? `${id}-profile-err` : undefined} className={cls("profile")}>
            <option value="" disabled>Kies een functie</option>
            {vacatures.map((v) => (
              <option key={v.slug} value={v.title}>{v.title}</option>
            ))}
          </select>
          {errors.profile && <p id={`${id}-profile-err`} role="alert" className="mt-1.5 text-xs text-red-700">{errors.profile}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-region`} className="mb-2 block text-sm text-[#0d3b2e]">Gewenste regio *</label>
          <select id={`${id}-region`} name="region" required defaultValue=""
            aria-invalid={!!errors.region} aria-describedby={errors.region ? `${id}-region-err` : undefined} className={cls("region")}>
            <option value="" disabled>Kies een regio</option>
            {REGIOS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {errors.region && <p id={`${id}-region-err`} role="alert" className="mt-1.5 text-xs text-red-700">{errors.region}</p>}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="mb-2 block text-sm text-[#0d3b2e]">Korte toelichting (optioneel)</label>
        <textarea id={`${id}-message`} name="message" rows={4} maxLength={1000}
          aria-invalid={!!errors.message} className={`${cls("message")} resize-y`} />
        {errors.message && <p role="alert" className="mt-1.5 text-xs text-red-700">{errors.message}</p>}
      </div>

      <CvUploadField
        file={file}
        setFile={setFile}
        uploading={uploading}
        fileError={fileError}
        setFileError={setFileError}
        inputId={`${id}-cv`}
      />

      <label htmlFor={`${id}-retain`} className="flex items-start gap-3 text-sm text-[#0d3b2e]">
        <input id={`${id}-retain`} name="retain" type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300 accent-[#9ed42e]" />
        <span>Bewaar mijn gegevens maximaal twaalf maanden voor toekomstige vacatures (optioneel).</span>
      </label>

      <label htmlFor={`${id}-privacy`} className="flex items-start gap-3 text-sm text-[#0d3b2e]">
        <input id={`${id}-privacy`} name="privacy" type="checkbox" required
          aria-invalid={!!errors.privacy} aria-describedby={errors.privacy ? `${id}-privacy-err` : undefined}
          className="mt-1 h-5 w-5 rounded border-gray-300 accent-[#9ed42e]" />
        <span>
          Ik heb de <Link to="/privacy" className="underline">privacyverklaring</Link> gelezen. *
        </span>
      </label>
      {errors.privacy && <p id={`${id}-privacy-err`} role="alert" className="-mt-3 text-xs text-red-700">{errors.privacy}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-[#0d3b2e] px-6 font-medium text-white transition-colors hover:bg-[#0a2f24] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 sm:w-auto"
      >
        {submitting ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Send className="h-5 w-5" aria-hidden="true" />}
        {submitting ? "Versturen…" : "Verstuur sollicitatie"}
      </button>
    </form>
  );
};
