import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Clock,
  Briefcase,
  GraduationCap,
  Globe2,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  ListChecks,
  Award,
  Gift,
  ShieldAlert,
  UserPlus,
  Coffee,
  FileCheck2,
  Layers,
  PlayCircle,
  Sparkles,
  Phone as PhoneIcon,
  MessageCircle,
  Mail as MailIcon,
  Share2,
  LinkIcon,
  HelpCircle,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { z } from "zod";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { MetaTooltip } from "@/components/terrevolt/MetaTooltip";
import { Reveal } from "@/components/terrevolt/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { CvUploadField, validateCvFile } from "@/components/CvUploadField";
import { toast } from "sonner";
import { usePageMeta } from "../hooks/usePageMeta";
import { findVacature } from "@/data/vacatures";
import { company, telHref, mailHref, SITE_URL } from "@/config/company";
import { scrollToAnchor, scrollToElement } from "@/lib/scrollToAnchor";

const contactVoorkeurOpties = ["Bellen", "WhatsApp", "E-mail", "Maakt niet uit"];

const formSchema = z.object({
  name: z.string().trim().min(2, "Naam is verplicht").max(100),
  phone: z.string().trim().min(6, "Telefoonnummer is verplicht").max(30),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
  region: z.string().trim().max(100).optional(),
  contact_pref: z.string().trim().max(50).optional(),
  availability: z.string().trim().max(200).optional(),
  certifications: z.string().trim().max(1000).optional(),
  message: z.string().trim().max(2000).optional(),
  privacy: z.literal("on", { errorMap: () => ({ message: "Akkoord met privacyverklaring is verplicht" }) }),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>;

const proces = [
  { icon: UserPlus, title: "Je meldt je aan", text: "Je stuurt je gegevens in. Een CV of certificaat mag, maar is niet verplicht om te starten." },
  { icon: Coffee, title: "Kennismaking", text: "We nemen telefonisch of via WhatsApp contact op en bespreken je ervaring, wensen en beschikbaarheid." },
  { icon: FileCheck2, title: "Documenten/check", text: "We kijken naar VCA, BEI-aanwijzingen, certificaten en projectvereisten. Voor ZZP kijken we ook naar KvK en verzekering." },
  { icon: Layers, title: "Projectmatch", text: "We zoeken passende inzet binnen LS/MS, stationswerk, schakelwerk, kabelmontage of aarding." },
  { icon: PlayCircle, title: "Start op project", text: "Je krijgt duidelijke projectinformatie, planning en afspraken voordat je start." },
];

/** Fallback match-bullets per slug. ZZP krijgt eigen tekst. */
const matchByDefault = [
  "Je hebt ervaring met elektrotechniek, infra of LS/MS-werk",
  "Je werkt veilig en zelfstandig",
  "Je vindt duidelijke afspraken en projectmatig werk belangrijk",
  "Je bent beschikbaar voor projecten binnen de netbeheerwereld",
];
const matchZzp = [
  "Je bent als zelfstandige monteur of complete ploeg inzetbaar",
  "Je vindt duidelijke scope, planning en afspraken belangrijk",
  "Je hebt ervaring met LS/MS, kabelwerk, stationswerk of aarding",
];
function matchBulletsFor(slug?: string) {
  if (!slug) return matchByDefault;
  if (slug.includes("zzp")) return matchZzp;
  return matchByDefault;
}


type VacatureView = {
  id?: string;
  title: string;
  intro: string;
  meta: {
    regio: string;
    uren: string;
    dienstverband: string;
    niveau: string;
    werkgebied: string;
    bevoegdheden: string;
  };
  taken: string[];
  meebrengen: string[];
  bieden: string[];
  veiligheid: string;
  process_steps: string[];
};

const standaardProces = ["Je meldt je aan", "Kennismaking", "Documenten/check", "Projectmatch", "Start op project"];

const VacatureDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [vacature, setVacature] = useState<VacatureView | null | "missing">(null);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [noCv, setNoCv] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [expandedMeta, setExpandedMeta] = useState<Set<string>>(new Set());
  const toggleMeta = (label: string) =>
    setExpandedMeta((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  const formRef = useRef<HTMLFormElement>(null);
  const errorBannerRef = useRef<HTMLDivElement>(null);

  const clearFieldError = (field: keyof FieldErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };
  // Verberg de sticky bottom-CTA zodra het sollicitatieformulier OF de footer in beeld is.
  useEffect(() => {
    if (!vacature || vacature === "missing") return;
    if (typeof IntersectionObserver === "undefined") return;
    const formEl = document.getElementById("solliciteren");
    const footerEl = document.querySelector<HTMLElement>("footer");
    const targets: Element[] = [formEl, footerEl].filter((n): n is HTMLElement => !!n);
    if (targets.length === 0) return;

    const visible = new Set<Element>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        });
        setFormInView(visible.size > 0);
      },
      { threshold: 0.05 },
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, [vacature]);


  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("vacancies")
        .select("*")
        .eq("slug", slug || "")
        .eq("status", "published")
        .maybeSingle();
      if (!active) return;
      if (data) {
        setVacature({
          id: data.id,
          title: data.title,
          intro: data.intro || "",
          meta: {
            regio: data.region || "—",
            uren: data.hours || "—",
            dienstverband: data.employment_type || "—",
            niveau: data.level || "—",
            werkgebied: data.work_area || "—",
            bevoegdheden: "VCA, relevante aanwijzingen",
          },
          taken: Array.isArray(data.what_you_do) ? (data.what_you_do as string[]) : [],
          meebrengen: Array.isArray(data.requirements) ? (data.requirements as string[]) : [],
          bieden: Array.isArray(data.offer) ? (data.offer as string[]) : [],
          veiligheid: data.safety_text || "",
          process_steps: Array.isArray(data.process_steps) && data.process_steps.length > 0
            ? (data.process_steps as string[])
            : standaardProces,
        });
        return;
      }
      const fb = findVacature(slug);
      if (fb) {
        setVacature({
          title: fb.title,
          intro: fb.intro,
          meta: fb.meta,
          taken: fb.taken,
          meebrengen: fb.meebrengen,
          bieden: fb.bieden,
          veiligheid: fb.veiligheid,
          process_steps: standaardProces,
        });
      } else {
        setVacature("missing");
      }
    })();
    return () => { active = false; };
  }, [slug]);

  const seoTitle =
    vacature && vacature !== "missing"
      ? `${vacature.title}${vacature.meta.regio && vacature.meta.regio !== "—" ? ` – ${vacature.meta.regio}` : ""} | Vacature TerreVolt`
      : "Vacature | TerreVolt BV";

  const seoDescription =
    vacature && vacature !== "missing"
      ? (() => {
          const clean = (vacature.intro || "").replace(/\s+/g, " ").trim();
          const base = clean || `${vacature.title} bij TerreVolt. Meld je aan voor projectinzet.`;
          return base.length > 155 ? `${base.slice(0, 152).trimEnd()}…` : base;
        })()
      : undefined;

  usePageMeta(seoTitle, seoDescription);

  // JobPosting JSON-LD voor zoekmachines (Google for Jobs)
  useEffect(() => {
    if (!vacature || vacature === "missing") return;
    const SCRIPT_ID = "ld-json-jobposting";
    document.getElementById(SCRIPT_ID)?.remove();

    const url = `${SITE_URL}/vacatures/${slug}`;
    const description = [
      vacature.intro,
      vacature.taken.length ? `Taken: ${vacature.taken.join("; ")}.` : "",
      vacature.meebrengen.length ? `Wat je meebrengt: ${vacature.meebrengen.join("; ")}.` : "",
      vacature.bieden.length ? `Wij bieden: ${vacature.bieden.join("; ")}.` : "",
    ].filter(Boolean).join(" ");

    const employmentTypeMap: Record<string, string> = {
      "Vast": "FULL_TIME",
      "Vast dienstverband": "FULL_TIME",
      "Fulltime": "FULL_TIME",
      "Parttime": "PART_TIME",
      "ZZP": "CONTRACTOR",
      "Detachering": "CONTRACTOR",
    };
    const employmentType =
      employmentTypeMap[vacature.meta.dienstverband] || "FULL_TIME";

    // validThrough = vandaag + 90 dagen — voorkomt Google for Jobs waarschuwing
    const validThrough = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      .toISOString();

    const data = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: vacature.title,
      description: `<p>${description.replace(/</g, "&lt;")}</p>`,
      datePosted: new Date().toISOString().slice(0, 10),
      validThrough,
      employmentType,
      hiringOrganization: {
        "@type": "Organization",
        name: "TerreVolt B.V.",
        sameAs: SITE_URL,
        logo: `${SITE_URL}/og-image.jpg`,
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressRegion: vacature.meta.regio !== "—" ? vacature.meta.regio : "NL",
          addressCountry: "NL",
        },
      },
      url,
      directApply: true,
    };

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => { document.getElementById(SCRIPT_ID)?.remove(); };
  }, [vacature, slug]);


  if (vacature === "missing") return <Navigate to="/werken-bij" replace />;
  if (!vacature) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <Loader2 className="w-8 h-8 animate-spin text-[#0d3b2e]" />
      </div>
    );
  }

  const meta = [
    { icon: MapPin, label: "Regio", value: vacature.meta.regio },
    { icon: Clock, label: "Uren", value: vacature.meta.uren },
    { icon: Briefcase, label: "Dienstverband", value: vacature.meta.dienstverband },
    { icon: GraduationCap, label: "Niveau", value: vacature.meta.niveau },
    { icon: Globe2, label: "Werkgebied", value: vacature.meta.werkgebied },
    { icon: ShieldCheck, label: "Bevoegdheden", value: vacature.meta.bevoegdheden },
  ];

  const META_LONG_THRESHOLD = 40;
  const isLongMeta = (value: string) => (value?.length ?? 0) > META_LONG_THRESHOLD;

  const waText = `Hallo TerreVolt, ik heb een vraag over de functie "${vacature.title}".`;
  const waLink = `https://wa.me/${company.phone.e164.replace("+", "")}?text=${encodeURIComponent(waText)}`;
  const shareText = `Vacature bij TerreVolt: ${vacature.title}`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const waShareLink = `https://wa.me/?text=${encodeURIComponent(`${shareText} — ${shareUrl}`)}`;

  const copyShareLink = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const ta = document.createElement("textarea");
        ta.value = shareUrl;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      toast.success("Link gekopieerd");
    } catch {
      toast.error("Kopiëren lukte niet. Selecteer de URL handmatig.");
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const raw = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      contact_pref: String(formData.get("contact_pref") || ""),
      privacy: formData.get("privacy") ? "on" : "",
      region: String(formData.get("region") || ""),
      availability: String(formData.get("availability") || ""),
      certifications: String(formData.get("certifications") || ""),
      message: String(formData.get("message") || ""),
    };

    setSubmitError(null);
    const parsed = formSchema.safeParse(raw);
    if (!parsed.success) {
      const fe: FieldErrors = {};
      parsed.error.errors.forEach((err) => {
        const k = err.path[0] as keyof FieldErrors;
        if (k && !fe[k]) fe[k] = err.message;
      });
      setErrors(fe);
      const count = Object.keys(fe).length;
      toast.error(count === 1 ? parsed.error.errors[0]?.message ?? "Controleer het formulier" : `Controleer ${count} velden`);
      requestAnimationFrame(() => {
        if (errorBannerRef.current) scrollToElement(errorBannerRef.current);
        const first = Object.keys(fe)[0];
        if (first && formRef.current) {
          formRef.current.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        }
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
        setUploadingFile(true);
        try {
          const ext = file.name.split(".").pop() || "bin";
          const path = `${crypto.randomUUID()}.${ext}`;
          const { error: upErr } = await supabase.storage
            .from("job-applications")
            .upload(path, file, { contentType: file.type || undefined });
          if (upErr) throw upErr;
          cv_url = path;
        } finally {
          setUploadingFile(false);
        }
      }

      const prefixParts = [
        `Profiel: ${vacature.title}`,
        `Vacature: ${vacature.title}`,
        parsed.data.contact_pref ? `Contactvoorkeur: ${parsed.data.contact_pref}` : null,
        noCv ? `CV: nog niet beschikbaar (kandidaat levert later aan)` : null,
        `Privacy akkoord: ja`,
      ].filter(Boolean);
      const messagePrefix = prefixParts.join(" | ");
      const fullMessage = parsed.data.message
        ? `${messagePrefix}\n\n${parsed.data.message}`
        : messagePrefix;

      const { error: insErr } = await supabase.from("job_applications").insert([{
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        region: parsed.data.region || null,
        experience: null,
        certifications: parsed.data.certifications || null,
        availability: parsed.data.availability || null,
        message: fullMessage,
        cv_url,
        vacancy_id: vacature.id || null,
        profile: vacature.title,
        contact_preference: parsed.data.contact_pref || null,
        privacy_consent: true,
      } as any]);
      if (insErr) throw insErr;

      import("@/lib/analytics").then((m) =>
        m.trackFormSubmit("vacature_form", { vacature_slug: slug, vacature_id: vacature?.id })
      );
      toast.success("Aanmelding verstuurd. We nemen zo snel mogelijk contact op.");
      formRef.current?.reset();
      setFile(null);
      setFileError(null);
      setNoCv(false);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      const msg = "Versturen lukte niet. Controleer je verbinding en probeer opnieuw, of bel ons direct.";
      setSubmitError(msg);
      toast.error(msg);
      requestAnimationFrame(() => {
        if (errorBannerRef.current) scrollToElement(errorBannerRef.current);
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setErrors({});
    setFile(null);
    setFileError(null);
    setNoCv(false);
    formRef.current?.reset();
    setTimeout(() => {
      scrollToAnchor("solliciteren");
    }, 50);
  };


  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main id="main-content" className="pt-16 sm:pt-20 pb-20 lg:pb-0">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] py-20">
          <div className="absolute inset-0 opacity-[0.08]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(158, 212, 46, 0.4) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(158, 212, 46, 0.4) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl">
              <Link
                to="/werken-bij"
                className="inline-block text-[#9ed42e] text-sm mb-6 hover:underline"
              >
                ← Terug naar werken bij TerreVolt
              </Link>
              <div className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Vacature
              </div>
              <h1 className="text-[clamp(1.875rem,7vw,2.5rem)] sm:text-5xl lg:text-6xl text-white mb-6 leading-[1.1] sm:leading-tight hyphens-nl text-pretty" lang="nl">
                {vacature.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
                {vacature.intro}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#solliciteren"
                  data-cta="Direct aanmelden"
                  data-entity-type="vacancy"
                  data-entity-id={slug}
                  className="group bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Direct aanmelden</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#vragen"
                  data-cta="Eerst vraag stellen"
                  data-entity-type="vacancy"
                  data-entity-id={slug}
                  className="border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 text-center"
                >
                  Eerst vraag stellen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* META */}
        <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            {/* Mobile: compacte badges die wrappen — geen horizontale overflow */}
            <ul className="sm:hidden flex flex-wrap gap-2 max-w-full items-start">
              {meta.map((m) => {
                const Icon = m.icon;
                const long = isLongMeta(m.value);
                const open = expandedMeta.has(m.label);
                const baseClass =
                  "group inline-flex items-center gap-2 max-w-full bg-[#f0f7e6] border border-[#9ed42e] text-[#0d3b2e] rounded-full pl-2.5 pr-3 py-1.5 min-w-0 transition-all duration-200 hover:bg-[#e3f0c9] hover:border-[#0d3b2e] hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d3b2e] focus-visible:ring-offset-2 focus-visible:bg-[#e3f0c9] active:scale-[0.98]";
                const tooltipText = `${m.label}: ${m.value}`;

                if (!long) {
                  return (
                    <li key={m.label} className="max-w-full min-w-0">
                      <MetaTooltip label={tooltipText}>
                        <span
                          tabIndex={0}
                          aria-label={tooltipText}
                          className={`${baseClass} cursor-default`}
                        >
                          <Icon className="w-3.5 h-3.5 flex-shrink-0 text-[#0d3b2e]" strokeWidth={2.4} aria-hidden="true" />
                          <span className="text-[11px] uppercase tracking-wider text-[#0d3b2e]/80 flex-shrink-0">{m.label}:</span>
                          <span className="text-xs leading-snug truncate min-w-0 text-[#0d3b2e]">{m.value}</span>
                        </span>
                      </MetaTooltip>
                    </li>
                  );
                }

                return (
                  <li key={m.label} className={open ? "w-full" : "max-w-full min-w-0"}>
                    <MetaTooltip label={tooltipText} className={open ? "w-full" : ""}>
                      <button
                        type="button"
                        onClick={() => toggleMeta(m.label)}
                        aria-expanded={open}
                        aria-label={`${tooltipText}. ${open ? "Minder tonen" : "Lees meer"}`}
                        className={`${baseClass} cursor-pointer w-full text-left ${open ? "items-start rounded-2xl py-2" : ""}`}
                      >
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 text-[#0d3b2e] ${open ? "mt-0.5" : ""}`} strokeWidth={2.4} aria-hidden="true" />
                        <span className={`text-[11px] uppercase tracking-wider text-[#0d3b2e]/80 flex-shrink-0 ${open ? "mt-px" : ""}`}>{m.label}:</span>
                        <span className={`text-xs leading-snug min-w-0 text-[#0d3b2e] flex-1 ${open ? "whitespace-normal break-words" : "truncate"}`}>
                          {m.value}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 flex-shrink-0 text-[#0d3b2e] transition-transform duration-200 ${open ? "rotate-180 mt-0.5" : ""}`}
                          strokeWidth={2.4}
                          aria-hidden="true"
                        />
                      </button>
                    </MetaTooltip>
                  </li>
                );
              })}
            </ul>

            {/* Tablet/Desktop: gecentreerd grid */}
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto items-start">
              {meta.map((m) => {
                const Icon = m.icon;
                const long = isLongMeta(m.value);
                const open = expandedMeta.has(m.label);
                const tooltipText = `${m.label}: ${m.value}`;
                return (
                  <MetaTooltip key={m.label} label={tooltipText} className="w-full">
                    <div
                      tabIndex={0}
                      aria-label={tooltipText}
                      className="group flex flex-col items-center text-center gap-2 rounded-xl p-3 -m-3 border border-transparent transition-all duration-200 cursor-default hover:border-[#9ed42e] hover:bg-[#f8fbf0] hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d3b2e] focus-visible:ring-offset-2 focus-visible:border-[#9ed42e] focus-visible:bg-[#f8fbf0] active:scale-[0.98] w-full"
                    >
                      <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-[#9ed42e] group-focus-visible:bg-[#9ed42e]">
                        <Icon className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2} aria-hidden="true" />
                      </div>
                      <div className="min-w-0 w-full">
                        <div className="text-xs uppercase tracking-wider text-[#0d3b2e]/80">{m.label}</div>
                        <div className={`text-[#0d3b2e] text-sm break-words ${long && !open ? "line-clamp-2" : ""}`}>
                          {m.value}
                        </div>
                        {long && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMeta(m.label);
                            }}
                            aria-expanded={open}
                            aria-label={`${m.label}: ${open ? "minder tonen" : "lees meer"}`}
                            className="mt-1 inline-flex items-center gap-1 text-xs text-[#0d3b2e] underline decoration-[#9ed42e] decoration-2 underline-offset-2 hover:text-[#0d3b2e] hover:decoration-[#0d3b2e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d3b2e] focus-visible:ring-offset-2 rounded"
                          >
                            {open ? "Minder" : "Lees meer"}
                            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} strokeWidth={2.5} aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    </div>
                  </MetaTooltip>
                );
              })}
            </div>
          </div>
        </section>

        {/* MATCH-CARD: Deze functie past bij jou als… */}
        <section className="py-10 sm:py-14 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#f0f7e6] to-white border border-[#9ed42e]/40 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 bg-[#9ed42e] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-[#0d3b2e]" strokeWidth={2.5} />
                </div>
                <h2 className="text-xl sm:text-2xl text-[#0d3b2e] leading-tight">
                  Deze functie past bij jou als…
                </h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {matchBulletsFor(slug).map((m) => (
                  <li key={m} className="flex items-start gap-3 text-[#0d3b2e]">
                    <CheckCircle2 className="w-5 h-5 text-[#0d3b2e] flex-shrink-0 mt-0.5" />
                    <span className="text-[#0d3b2e]/90 text-[15px] leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* WAT DOE JE + WAT BRENG JE MEE */}
        <section className="py-16 md:py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Reveal>
                <div className="card-lift h-full bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <ListChecks className="w-7 h-7 text-[#9ed42e]" strokeWidth={2.5} />
                    <h2 className="text-2xl text-[#0d3b2e]">Wat doe je?</h2>
                  </div>
                  <ul className="space-y-3">
                    {vacature.taken.map((t) => (
                      <li key={t} className="flex items-start gap-3 text-[#0d3b2e]">
                        <CheckCircle2 className="w-5 h-5 text-[#9ed42e] flex-shrink-0 mt-0.5" />
                        <span className="text-[#6c757d]">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="card-lift h-full bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="w-7 h-7 text-[#9ed42e]" strokeWidth={2.5} />
                    <h2 className="text-2xl text-[#0d3b2e]">Wat breng je mee?</h2>
                  </div>
                  <ul className="space-y-3">
                    {vacature.meebrengen.map((t) => (
                      <li key={t} className="flex items-start gap-3 text-[#0d3b2e]">
                        <CheckCircle2 className="w-5 h-5 text-[#9ed42e] flex-shrink-0 mt-0.5" />
                        <span className="text-[#6c757d]">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* WAT BIEDEN WIJ */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                <Gift className="w-4 h-4" />
                Wat krijg je van ons?
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Heldere voorwaarden</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {vacature.bieden.map((b) => (
                <div
                  key={b}
                  className="flex items-start gap-4 p-6 bg-[#f8f9fa] rounded-xl border border-gray-200 hover:border-[#9ed42e] transition-colors"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#9ed42e] flex-shrink-0 mt-0.5" />
                  <span className="text-[#0d3b2e]">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VEILIGHEID VOOROP */}
        <section className="py-14 md:py-20 bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] relative overflow-hidden">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-[#9ed42e] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldAlert className="w-8 h-8 text-[#0d3b2e]" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-6">Veiligheid voorop</h2>
              <p className="text-lg text-gray-300 leading-relaxed">{vacature.veiligheid}</p>
            </div>
          </div>
        </section>

        {/* VRAGEN OVER DEZE FUNCTIE? — contactblok */}
        <section id="vragen" className="py-16 md:py-20 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-5 tracking-wider uppercase">
                  <HelpCircle className="w-4 h-4" />
                  Vragen?
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#0d3b2e] mb-4">
                  Liever eerst een vraag stellen?
                </h2>
                <p className="text-[#6c757d] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                  Je hoeft niet direct alles compleet te hebben. Bel, WhatsApp of mail ons gerust. We bespreken je ervaring, certificaten en beschikbaarheid en kijken samen of deze functie of projectinzet past.
                </p>
                <p className="text-sm text-[#6c757d] mt-3">— Team TerreVolt</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <a
                  href={telHref}
                  className="group flex items-center justify-center gap-3 bg-[#0d3b2e] text-white rounded-xl px-5 py-4 min-h-[56px] hover:bg-[#1a4a36] transition-colors"
                >
                  <PhoneIcon className="w-5 h-5 text-[#9ed42e]" strokeWidth={2.2} />
                  <span>Bel direct</span>
                </a>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 bg-[#9ed42e] text-[#0d3b2e] rounded-xl px-5 py-4 min-h-[56px] hover:bg-[#8bc41f] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" strokeWidth={2.2} />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={mailHref}
                  className="group flex items-center justify-center gap-3 bg-white border-2 border-[#0d3b2e] text-[#0d3b2e] rounded-xl px-5 py-4 min-h-[56px] hover:bg-[#0d3b2e] hover:text-white transition-colors"
                >
                  <MailIcon className="w-5 h-5" strokeWidth={2.2} />
                  <span>Mail ons</span>
                </a>
              </div>

              <div className="mt-6 flex justify-center">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-[#0d3b2e] text-white px-6 py-3 min-h-[48px] rounded-lg hover:bg-[#1a4a36] transition-colors"
                >
                  <span>Neem contact op</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="mt-5 text-center text-xs text-[#6c757d] break-words">
                {company.phone.display} · {company.email}
              </div>
            </div>
          </div>
        </section>

        {/* PROCES */}
        <section className="py-16 md:py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Zo verloopt je aanmelding</h2>
              <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
                Van aanmelding tot start op het project — duidelijk en kort.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {(vacature.process_steps.length > 0 ? vacature.process_steps : proces.map((p) => p.title)).map((step, i) => {
                const fallback = proces[i] || proces[proces.length - 1];
                const Icon = fallback.icon;
                const title = typeof step === "string" ? step : fallback.title;
                const text = (proces[i]?.text) || "";
                return (
                  <div
                    key={`${title}-${i}`}
                    className="relative bg-white rounded-xl p-6 border border-gray-200 hover:border-[#9ed42e] hover:shadow-lg transition-all"
                  >
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#9ed42e] text-[#0d3b2e] rounded-full flex items-center justify-center text-sm">
                      {i + 1}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg text-[#0d3b2e] mb-2">{title}</h3>
                    {text && <p className="text-sm text-[#6c757d] leading-relaxed">{text}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FORMULIER */}
        <section id="solliciteren" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10 md:mb-12">
                <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                  Aanmelden
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#0d3b2e] mb-4 break-words">
                  Meld je aan voor: <span className="text-[#1a4a36]">{vacature.title}</span>
                </h2>
                <p className="text-base sm:text-xl text-[#6c757d]">
                  Vul je gegevens in. We nemen contact op om je ervaring, beschikbaarheid en mogelijke projectmatch te bespreken.
                </p>
                <p className="text-sm text-[#6c757d] mt-3">
                  Geen CV bij de hand? Geen probleem. Laat je gegevens achter, dan nemen we contact met je op.
                </p>
              </div>

              {/* Vacature-badge */}
              <div className="mb-5 flex items-start gap-3 bg-[#f0f7e6] border border-[#9ed42e] rounded-xl px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-[#0d3b2e] flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-[#0d3b2e]/70">Je meldt je aan voor</div>
                  <div className="text-[#0d3b2e] break-words">{vacature.title}</div>
                </div>
              </div>

              {success ? (
                <div role="status" aria-live="polite" className="bg-[#f0f7e6] border border-[#9ed42e] rounded-2xl p-6 sm:p-10 shadow-sm text-center">
                  <div className="w-14 h-14 bg-[#9ed42e] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#0d3b2e]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl text-[#0d3b2e] mb-2">Aanmelding ontvangen</h3>
                  <p className="text-[#0d3b2e]/80 mb-6 max-w-md mx-auto">
                    Bedankt! We hebben je gegevens ontvangen. We nemen binnenkort contact met je op.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/werken-bij" className="bg-[#0d3b2e] text-white px-6 py-3 rounded-lg hover:bg-[#1a4a36] transition-colors min-h-[48px] flex items-center justify-center">
                      Terug naar profielen
                    </Link>
                    <button type="button" onClick={resetForm} className="border-2 border-[#0d3b2e] text-[#0d3b2e] px-6 py-3 rounded-lg hover:bg-[#0d3b2e] hover:text-white transition-colors min-h-[48px] flex items-center justify-center">
                      Nog iemand aanmelden
                    </button>
                  </div>
                </div>
              ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                onFocus={(e) => {
                  const t = e.target as HTMLElement;
                  if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) {
                    import("@/lib/analytics").then((m) =>
                      m.trackFormStart("vacature_form", { vacature_slug: slug })
                    );
                  }
                }}
                onChange={(e) => {
                  if (submitError) setSubmitError(null);
                  const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                  const name = target?.name as keyof FieldErrors | undefined;
                  if (name && errors[name]) clearFieldError(name);
                }}
                noValidate
                aria-describedby={submitError || Object.keys(errors).length > 0 ? "vacature-form-error-banner" : undefined}
                className="bg-[#f8f9fa] rounded-2xl p-5 sm:p-10 border border-gray-200 shadow-sm space-y-6"
              >
                {(submitError || Object.keys(errors).length > 0) && (
                  <div
                    ref={errorBannerRef}
                    id="vacature-form-error-banner"
                    role="alert"
                    aria-live="assertive"
                    className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-red-800 font-medium">
                        {submitError
                          ? "Versturen mislukt"
                          : Object.keys(errors).length === 1
                            ? "Controleer 1 veld hieronder"
                            : `Controleer ${Object.keys(errors).length} velden hieronder`}
                      </p>
                      <p className="text-xs text-red-700 mt-1 leading-relaxed">
                        {submitError ?? "De gemarkeerde velden zijn niet correct ingevuld. Pas ze aan en probeer opnieuw."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Hidden vacature-tag */}
                <input type="hidden" name="vacancy_title" value={vacature.title} readOnly />

                {/* Blok 1 — Contactgegevens */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#6c757d] mb-3 pb-2 border-b border-gray-200">Contactgegevens</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm text-[#0d3b2e] mb-2">Naam *</label>
                      <input id="name" name="name" required maxLength={100} aria-invalid={!!errors.name}
                        className={`w-full px-4 py-3 min-h-[48px] rounded-lg border bg-white focus:outline-none focus:ring-2 transition ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-[#9ed42e] focus:ring-[#9ed42e]/20"}`} />
                      {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm text-[#0d3b2e] mb-2">Telefoon *</label>
                      <input id="phone" name="phone" type="tel" required maxLength={30} inputMode="tel" aria-invalid={!!errors.phone}
                        className={`w-full px-4 py-3 min-h-[48px] rounded-lg border bg-white focus:outline-none focus:ring-2 transition ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-[#9ed42e] focus:ring-[#9ed42e]/20"}`} />
                      {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-sm text-[#0d3b2e] mb-2">E-mail *</label>
                      <input id="email" name="email" type="email" required maxLength={255} inputMode="email" autoComplete="email" aria-invalid={!!errors.email}
                        className={`w-full px-4 py-3 min-h-[48px] rounded-lg border bg-white focus:outline-none focus:ring-2 transition ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-[#9ed42e] focus:ring-[#9ed42e]/20"}`} />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact_pref" className="block text-sm text-[#0d3b2e] mb-2">Hoe wil je het liefst benaderd worden?</label>
                      <select id="contact_pref" name="contact_pref" defaultValue=""
                        className="w-full px-4 py-3 min-h-[48px] rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition">
                        <option value="">Maakt niet uit</option>
                        {contactVoorkeurOpties.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="region" className="block text-sm text-[#0d3b2e] mb-2">Woonplaats / regio</label>
                      <input id="region" name="region" maxLength={100}
                        className="w-full px-4 py-3 min-h-[48px] rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                    </div>
                  </div>
                </div>

                {/* Blok 2 — Profiel & ervaring */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#6c757d] mb-3 pb-2 border-b border-gray-200">Profiel &amp; ervaring</h3>
                  <div>
                    <label htmlFor="certifications" className="block text-sm text-[#0d3b2e] mb-2">Bevoegdheden / certificaten</label>
                    <input id="certifications" name="certifications" maxLength={1000}
                      placeholder="Bijv. VCA, BEI BLS/BHS, NEN 3140 VOP"
                      className="w-full px-4 py-3 min-h-[48px] rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                </div>

                {/* Blok 3 — Beschikbaarheid & documenten */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#6c757d] mb-3 pb-2 border-b border-gray-200">Beschikbaarheid &amp; documenten</h3>
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <label htmlFor="availability" className="block text-sm text-[#0d3b2e] mb-2">Beschikbaarheid</label>
                      <input id="availability" name="availability" maxLength={200}
                        placeholder="Bijv. fulltime per direct"
                        className="w-full px-4 py-3 min-h-[48px] rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm text-[#0d3b2e] mb-2">Bericht</label>
                      <textarea id="message" name="message" rows={4} maxLength={2000}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition resize-y max-h-72" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                        <span className="block text-sm text-[#0d3b2e]">CV (optioneel)</span>
                        <label className="inline-flex items-center gap-2 text-xs text-[#0d3b2e] cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={noCv}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setNoCv(checked);
                              if (checked) {
                                setFile(null);
                                setFileError(null);
                              }
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-[#9ed42e] focus:ring-[#9ed42e]"
                          />
                          <span>Ik heb (nog) geen CV</span>
                        </label>
                      </div>
                      {noCv ? (
                        <div className="rounded-lg border border-dashed border-[#9ed42e] bg-[#f0f7e6] px-4 py-3 text-sm text-[#0d3b2e] flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#0d3b2e] flex-shrink-0" />
                          <span>
                            Geen probleem — je kunt zonder CV solliciteren. We nemen contact op en bespreken je ervaring telefonisch of via WhatsApp.
                          </span>
                        </div>
                      ) : (
                        <CvUploadField
                          file={file}
                          setFile={setFile}
                          uploading={uploadingFile}
                          fileError={fileError}
                          setFileError={setFileError}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Privacy */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer text-sm text-[#0d3b2e] leading-relaxed">
                    <input type="checkbox" name="privacy" required aria-invalid={!!errors.privacy}
                      className="mt-0.5 h-6 w-6 rounded border-gray-300 text-[#9ed42e] focus:ring-[#9ed42e] flex-shrink-0" />
                    <span>
                      Ik ga akkoord dat TerreVolt mijn gegevens gebruikt om contact met mij op te nemen over werk, projecten of samenwerking.{" "}
                      <Link to="/privacy" className="underline hover:text-[#0d3b2e]/80">Privacyverklaring</Link>
                    </span>
                  </label>
                  {errors.privacy && <p className="mt-1 text-xs text-red-600">{errors.privacy}</p>}
                </div>

                <button type="submit" disabled={submitting}
                  className="group w-full bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 min-h-[48px] rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Versturen...</span>
                    </>
                  ) : (
                    <>
                      <span>Verstuur aanmelding</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
              )}

            </div>
          </div>
        </section>

        {/* DEELBLOK — Ken je iemand voor deze functie? */}
        <section className="py-14 md:py-20 bg-[#f8f9fa]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-12 h-12 bg-[#f0f7e6] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2.2} />
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-[#0d3b2e] mb-3">
                Ken je iemand voor deze functie?
              </h2>
              <p className="text-[#6c757d] mb-6 leading-relaxed">
                Stuur deze functie eenvoudig door naar een collega-monteur of iemand uit je netwerk.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={waShareLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#9ed42e] text-[#0d3b2e] px-6 py-3 min-h-[48px] rounded-lg hover:bg-[#8bc41f] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" strokeWidth={2.2} />
                  Deel via WhatsApp
                </a>
                <button
                  type="button"
                  onClick={copyShareLink}
                  data-cta="Kopieer link"
                  data-entity-type="vacancy"
                  data-entity-id={slug}
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#0d3b2e] text-[#0d3b2e] px-6 py-3 min-h-[48px] rounded-lg hover:bg-[#0d3b2e] hover:text-white transition-colors"
                >
                  <LinkIcon className="w-5 h-5" strokeWidth={2.2} />
                  Kopieer link
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky mobiele CTA — verbergt zodra het formulier of de footer in beeld is */}
      <div
        className={`lg:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 motion-reduce:transition-none bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] ${
          formInView ? "translate-y-full" : "translate-y-0"
        }`}
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom), 0px)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
        aria-hidden={formInView}
      >
        <div className="px-4 py-3">
          <a
            href="#solliciteren"
            tabIndex={formInView ? -1 : 0}
            data-cta="Aanmelden voor deze functie"
            data-entity-type="vacancy"
            data-entity-id={slug}
            className="group w-full bg-[#9ed42e] text-[#0d3b2e] px-6 py-3 min-h-[48px] rounded-lg hover:bg-[#8bc41f] transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d3b2e] focus-visible:ring-offset-2"
          >
            <span>Aanmelden voor deze functie</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>


      <Footer />
    </div>
  );
};

export default VacatureDetail;

