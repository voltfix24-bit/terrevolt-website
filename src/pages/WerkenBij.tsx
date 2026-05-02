import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Zap, Cable, PlugZap, Power, ClipboardCheck, Users,
  Network, Layers, FileText, Briefcase, MessageSquare, ShieldAlert,
  Award, Loader2, CalendarCheck, Phone as PhoneIcon, HardHat,
  CheckCircle2, ClipboardList, UserCheck, Layers3, Rocket,
  Mail as MailIcon, HelpCircle, AlertCircle,
} from "lucide-react";
import { EarthSymbol } from "@/components/icons/EarthSymbol";
import { z } from "zod";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { CopyableContactLink } from "@/components/terrevolt/CopyableContactLink";
import { supabase } from "@/integrations/supabase/client";
import { CvUploadField, validateCvFile } from "@/components/CvUploadField";
import { toast } from "sonner";
import { usePageMeta } from "../hooks/usePageMeta";
import { vacatures as fallbackVacatures } from "@/data/vacatures";
import { company, telHref, mailHref } from "@/config/company";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const waLink = `https://wa.me/${company.phone.e164.replace("+", "")}?text=${encodeURIComponent(
  "Hallo TerreVolt, ik heb interesse om met jullie te werken.",
)}`;

const funnelNav: { label: string; href: string }[] = [
  { label: "Profielen", href: "#profielen" },
  { label: "ZZP & ploegen", href: "#zzp" },
  { label: "Hoe het werkt", href: "#hoe-het-werkt" },
  { label: "Veelgestelde vragen", href: "#faq" },
  { label: "Aanmelden", href: "#aanmelden" },
];

const stappen = [
  { icon: ClipboardList, title: "Aanmelden", text: "Je laat je gegevens, ervaring en beschikbaarheid achter. Een CV mag, maar is niet verplicht." },
  { icon: UserCheck, title: "Kennismaken & check", text: "We bellen je binnen 2 werkdagen op en bespreken je ervaring, certificaten, bevoegdheden en voorkeuren." },
  { icon: Layers3, title: "Projectmatch", text: "We kijken welke LS/MS-projecten, stationswerkzaamheden, schakelwerk of aardingswerk bij jou passen." },
  { icon: Rocket, title: "Start op project", text: "Je krijgt duidelijke projectinformatie, planning en afspraken voordat je start." },
];

const faqs: { q: string; a: string }[] = [
  { q: "Kan ik ook als ZZP'er reageren?", a: "Ja. TerreVolt werkt ook samen met zelfstandige monteurs en complete ploegen voor projectmatige inzet binnen LS/MS, stationswerk, kabelmontage, schakelwerk en aarding." },
  { q: "Moet ik BEI BLS of BEI BHS hebben?", a: "Dat hangt af van de rol en het project. Relevante aanwijzingen zijn vaak een pré of vereiste. We bespreken dit tijdens de kennismaking." },
  { q: "Is VCA verplicht?", a: "Voor veel projecten is VCA belangrijk of vereist. Heb je dit nog niet, dan kijken we samen wat mogelijk is." },
  { q: "Kan ik reageren zonder CV?", a: "Ja. Geen CV bij de hand? Laat gewoon je gegevens achter. Certificaten of documenten kunnen later worden aangevuld." },
  { q: "In welke regio's werken jullie?", a: "TerreVolt werkt projectmatig in Nederland. Per project stemmen we locatie, reistijd en beschikbaarheid af." },
  { q: "Hoe snel nemen jullie contact op?", a: "Na je aanmelding proberen we snel contact op te nemen om je ervaring, beschikbaarheid en mogelijke projectmatch te bespreken." },
  { q: "Werken jullie met losse monteurs of complete ploegen?", a: "Beide zijn mogelijk. We kijken per project of een losse specialist, vaste ploeg of ZZP-team passend is." },
  { q: "Welke documenten hebben jullie nodig?", a: "Dat verschilt per project, maar denk aan VCA, relevante BEI-aanwijzingen, certificaten, KvK-gegevens bij ZZP en eventueel verzekering of ID-check volgens projectvereisten." },
];

const slugIconMap: Record<string, typeof Zap> = {
  laagspanningsmonteur: Zap,
  middenspanningsmonteur: Cable,
  schakelmonteur: Power,
  kabelmonteur: Cable,
  aardingsmonteur: EarthSymbol,
  "monteur-huisaansluitingen": PlugZap,
  werkverantwoordelijke: ClipboardCheck,
  "zzp-ploegen": Users,
};

/** Vaste 1-regel-omschrijvingen per profiel. */
const slugDescriptionMap: Record<string, string> = {
  laagspanningsmonteur: "LS-rekken, aansluitingen, saneringen en kabelwerk.",
  middenspanningsmonteur: "MS-installaties, kabelafmontage en stationswerk.",
  schakelmonteur: "Vrijschakelen, veiligstellen en in-/uitbedrijf nemen.",
  kabelmonteur: "Kabelmontage, moffen, eindsluitingen en afwerking.",
  aardingsmonteur: "Aardelektroden, stationsaarding en metingen.",
  "monteur-huisaansluitingen": "Aanleg, wijziging en sanering van LS-aansluitingen.",
  werkverantwoordelijke: "Veilige voorbereiding, vrijgave en begeleiding.",
  "zzp-ploegen": "Projectmatige inzet met duidelijke scope en planning.",
};

/** Snelle keuzehulp — chips scrollen naar profiel-anker (data-slug). */
const quickNav: { label: string; slugs: string[] }[] = [
  { label: "LS/MS", slugs: ["laagspanningsmonteur", "middenspanningsmonteur"] },
  { label: "Schakelwerk", slugs: ["schakelmonteur"] },
  { label: "Aarding", slugs: ["aardingsmonteur"] },
  { label: "Huisaansluitingen", slugs: ["monteur-huisaansluitingen"] },
  { label: "Werkverantwoordelijke", slugs: ["werkverantwoordelijke"] },
  { label: "ZZP", slugs: ["zzp-ploegen"] },
];

type ProfielCard = { slug: string; label: string };

const trust = [
  { icon: CalendarCheck, label: "Duidelijke planning" },
  { icon: PhoneIcon, label: "Korte lijnen" },
  { icon: Briefcase, label: "Projectmatig werk" },
  { icon: ShieldAlert, label: "Veiligheid voorop" },
];

const waarom = [
  { icon: Network, title: "Werk binnen de netbeheerwereld", description: "Projecten voor professionele opdrachtgevers en hoofdaannemers." },
  { icon: Layers, title: "Afwisselende LS/MS-projecten", description: "Van stationsrenovaties tot aarding en netmontage." },
  { icon: FileText, title: "Duidelijke projectinformatie", description: "Heldere werkomschrijvingen, planning en afspraken vooraf." },
  { icon: Briefcase, title: "Professionele opdrachtgevers", description: "Partijen die kwaliteit en betrouwbaarheid waarderen." },
  { icon: ShieldAlert, title: "Veiligheidsgerichte werkomgeving", description: "Werken volgens BEI, NEN 3140 en VCA." },
  { icon: MessageSquare, title: "Korte lijnen", description: "Direct contact met planning en uitvoering." },
];

const vereisten = [
  "VCA",
  "Relevante ervaring",
  "Veiligheidsbewust",
  "Betrouwbaar",
  "Zelfstandig",
  "Communicatief",
  "Passende aanwijzingen waar nodig",
];

const profielOpties = [
  "Laagspanningsmonteur",
  "Middenspanningsmonteur",
  "Schakelmonteur",
  "Kabelmonteur",
  "Aardingsmonteur",
  "Monteur huisaansluitingen",
  "Werkverantwoordelijke",
  "ZZP-ploeg",
  "Anders",
];

const contactVoorkeurOpties = ["Bellen", "WhatsApp", "E-mail", "Maakt niet uit"];

const formSchema = z.object({
  name: z.string().trim().min(2, "Naam is verplicht").max(100),
  phone: z.string().trim().min(6, "Telefoonnummer is verplicht").max(30),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
  profile: z.string().trim().min(1, "Kies een profiel").max(100),
  region: z.string().trim().max(100).optional(),
  contact_pref: z.string().trim().max(50).optional(),
  experience: z.string().trim().max(2000).optional(),
  certifications: z.string().trim().max(1000).optional(),
  availability: z.string().trim().max(200).optional(),
  message: z.string().trim().max(2000).optional(),
  privacy: z.literal("on", { errorMap: () => ({ message: "Akkoord met privacyverklaring is verplicht" }) }),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>;

const WerkenBij = () => {
  usePageMeta(
    "Werken bij TerreVolt | Vacatures monteurs LS/MS, schakelwerk & aarding",
    "TerreVolt zoekt monteurs, werkverantwoordelijken en ZZP-ploegen voor LS/MS-projecten binnen de netbeheerwereld. Duidelijke planning, korte lijnen, veiligheid voorop.",
    "/werken-bij",
  );

  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [profielen, setProfielen] = useState<ProfielCard[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
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

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("vacancies")
        .select("slug,title")
        .eq("status", "published")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (!active) return;
      if (data && data.length > 0) {
        setProfielen(data.map((v: any) => ({ slug: v.slug, label: v.title })));
      } else {
        setProfielen(fallbackVacatures.map((v) => ({ slug: v.slug, label: v.shortLabel })));
      }
    })();
    return () => { active = false; };
  }, []);

  const focusFirstError = (errs: FieldErrors) => {
    const first = Object.keys(errs)[0];
    if (!first || !formRef.current) return;
    const el = formRef.current.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      profile: String(fd.get("profile") || ""),
      region: String(fd.get("region") || ""),
      contact_pref: String(fd.get("contact_pref") || ""),
      experience: String(fd.get("experience") || ""),
      certifications: String(fd.get("certifications") || ""),
      availability: String(fd.get("availability") || ""),
      message: String(fd.get("message") || ""),
      privacy: fd.get("privacy") ? "on" : "",
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
      // Scroll banner in beeld + focus eerste foute veld
      requestAnimationFrame(() => {
        errorBannerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        focusFirstError(fe);
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

      const extras = [
        `Profiel: ${parsed.data.profile}`,
        parsed.data.contact_pref ? `Contactvoorkeur: ${parsed.data.contact_pref}` : null,
        `Privacy akkoord: ja`,
      ].filter(Boolean).join(" | ");
      const fullMessage = parsed.data.message ? `${extras}\n\n${parsed.data.message}` : extras;

      const { error: insErr } = await supabase.from("job_applications").insert([{
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        region: parsed.data.region || null,
        experience: parsed.data.experience || null,
        certifications: parsed.data.certifications || null,
        availability: parsed.data.availability || null,
        message: fullMessage,
        cv_url,
        profile: parsed.data.profile,
        contact_preference: parsed.data.contact_pref || null,
        privacy_consent: true,
      } as any]);
      if (insErr) throw insErr;

      toast.success("Aanmelding verstuurd. We nemen zo snel mogelijk contact op.");
      formRef.current?.reset();
      setFile(null);
      setFileError(null);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      const msg = "Versturen lukte niet. Controleer je verbinding en probeer opnieuw, of bel ons direct.";
      setSubmitError(msg);
      toast.error(msg);
      requestAnimationFrame(() => {
        errorBannerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
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
    formRef.current?.reset();
    setTimeout(() => {
      document.getElementById("aanmelden")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const scrollToSlug = (slugs: string[]) => {
    const target = slugs.map((s) => document.getElementById(`profiel-${s}`)).find(Boolean);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    else document.getElementById("profielen")?.scrollIntoView({ behavior: "smooth" });
  };

  const profielCards = useMemo(() => profielen, [profielen]);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main id="main-content" className="pt-16 sm:pt-20">
        {/* HERO */}
        <section className="relative sm:min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] py-14 md:py-20">
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
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
              <div className="inline-flex items-center gap-2 bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                <HardHat className="w-4 h-4" /> Werken bij TerreVolt
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight hyphens-nl">
                Werk mee aan{" "}
                <span className="text-[#9ed42e]">LS/MS-projecten</span> binnen de netbeheerwereld
              </h1>
              <p className="text-base sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl leading-relaxed">
                Ben jij monteur, werkverantwoordelijke of ZZP'er met ervaring in laagspanning, middenspanning, kabelwerk, schakelwerk of aarding? TerreVolt zoekt vakmensen voor professionele projecten met duidelijke afspraken, korte lijnen en veiligheid voorop.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
                <a
                  href="#aanmelden"
                  className="group w-full sm:w-auto bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <span>Aanmelden als monteur</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#profielen"
                  className="w-full sm:w-auto border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 text-center min-h-[48px] flex items-center justify-center"
                >
                  Bekijk profielen
                </a>
              </div>

              {/* Trust-strip */}
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl">
                {trust.map((t) => {
                  const Icon = t.icon;
                  return (
                    <li
                      key={t.label}
                      className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white/90 text-sm"
                    >
                      <Icon className="w-4 h-4 text-[#9ed42e] flex-shrink-0" strokeWidth={2.2} />
                      <span className="leading-tight">{t.label}</span>
                    </li>
                  );
                })}
              </ul>

              <p className="text-gray-400 text-sm mt-4 max-w-xl">
                Tarieven en salaris bespreken we tijdens de kennismaking — afgestemd op jouw ervaring, bevoegdheden en de manier van samenwerken.
              </p>
            </div>
          </div>
        </section>

        {/* FUNNEL SUBNAV */}
        <nav
          aria-label="Werken bij — secties"
          className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur border-b border-gray-200"
        >
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="flex gap-2 sm:gap-3 overflow-x-auto py-3 -mx-1 px-1 scrollbar-hide">
              {funnelNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex-shrink-0 px-4 py-2.5 rounded-full border border-gray-200 bg-white text-[#0d3b2e] text-sm hover:border-[#9ed42e] hover:bg-[#f0f7e6] transition-all min-h-[44px] flex items-center"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* QUICK NAV CHIPS */}
        <section className="py-8 md:py-10 bg-white border-b border-gray-100">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-xs uppercase tracking-wider text-[#6c757d] mb-3 text-center sm:text-left">
                Snel naar profiel
              </div>
              <div role="group" aria-label="Snel naar profiel" className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                {quickNav.map((q) => (
                  <button
                    key={q.label}
                    type="button"
                    onClick={() => scrollToSlug(q.slugs)}
                    aria-label={`Scroll naar profiel: ${q.label}`}
                    className="px-4 py-2.5 rounded-full border border-gray-200 bg-[#f8f9fa] text-[#0d3b2e] text-sm hover:border-[#9ed42e] hover:bg-[#f0f7e6] active:scale-[0.98] transition-all min-h-[44px] inline-flex items-center focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 focus-visible:border-[#9ed42e]"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROFIELEN */}
        <section id="profielen" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Gezochte profielen</h2>
              <p className="text-base sm:text-xl text-[#6c757d] max-w-2xl mx-auto">
                Vakmensen voor uitvoering binnen LS/MS-infrastructuur, schakelwerk en aarding.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {profielCards.map((p) => {
                const Icon = slugIconMap[p.slug] || Briefcase;
                const desc = slugDescriptionMap[p.slug] || "Bekijk de volledige profielomschrijving.";
                const isZzp = p.slug === "zzp-ploegen";
                const labelTag = isZzp ? "Projectbasis" : "Loondienst / ZZP mogelijk";
                return (
                  <Link
                    key={p.slug}
                    id={`profiel-${p.slug}`}
                    to={`/vacatures/${p.slug}`}
                    aria-label={`Bekijk profiel: ${p.label}`}
                    className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center scroll-mt-24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 active:scale-[0.99]"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform flex-shrink-0">
                      <Icon className="w-7 h-7 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <div className="text-[#0d3b2e] text-base sm:text-lg mb-2 hyphens-nl max-w-full" lang="nl">{p.label}</div>
                    <p className="text-sm text-[#6c757d] leading-snug mb-3 hyphens-nl" lang="nl">{desc}</p>
                    <span className="inline-block text-[11px] tracking-wider uppercase text-[#0d3b2e] bg-[#f0f7e6] border border-[#9ed42e]/40 rounded-full px-2.5 py-1 mb-4">
                      {labelTag}
                    </span>
                    <div className="text-xs text-[#9ed42e] inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                      Bekijk profiel <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ZZP-BLOK */}
        <section id="zzp" className="py-14 md:py-20 bg-[#f0f7e6] scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl border-2 border-[#9ed42e] shadow-[0_8px_30px_-8px_rgba(13,59,46,0.15)] p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#0d3b2e] text-[#9ed42e] px-3 py-1.5 rounded-full text-xs mb-4 tracking-wider uppercase">
                  <Users className="w-3.5 h-3.5" /> ZZP & ploegen
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#0d3b2e] mb-4 leading-tight">
                  Beschikbaar als <span className="text-[#0d3b2e]">ZZP'er of complete ploeg</span>?
                </h2>
                <p className="text-[#6c757d] leading-relaxed mb-6">
                  TerreVolt werkt graag samen met betrouwbare zelfstandige monteurs en ploegen binnen LS/MS-netmontage, stationsrenovatie, schakelwerk, kabelmontage en aarding.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#aanmelden"
                    className="bg-[#0d3b2e] text-white px-6 py-3 rounded-lg hover:bg-[#1a4a36] transition-colors text-center min-h-[44px] flex items-center justify-center"
                  >
                    ZZP'er of ploeg aanmelden
                  </a>
                  <a
                    href="/contact"
                    className="border-2 border-[#0d3b2e] text-[#0d3b2e] px-6 py-3 rounded-lg hover:bg-[#0d3b2e] hover:text-white transition-colors text-center min-h-[44px] flex items-center justify-center"
                  >
                    Samenwerking bespreken
                  </a>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Duidelijke werkopdracht",
                  "Projectmatige inzet",
                  "Korte lijnen met planning en uitvoering",
                  "Heldere afspraken over scope, planning en uren",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 bg-[#f8f9fa] rounded-lg p-3 border border-gray-100">
                    <CheckCircle2 className="w-5 h-5 text-[#9ed42e] flex-shrink-0 mt-0.5" />
                    <span className="text-[#0d3b2e]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* HOE HET WERKT */}
        <section id="hoe-het-werkt" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
              <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Hoe het werkt
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Hoe werken via TerreVolt eruitziet</h2>
              <p className="text-base sm:text-lg text-[#6c757d]">
                Wij houden het graag duidelijk. Je weet vooraf waar je aan toe bent: welke werkzaamheden, welke locatie, welke planning en welke veiligheidsafspraken gelden.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {stappen.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="relative bg-[#f8f9fa] rounded-xl p-6 border border-gray-200 hover:border-[#9ed42e] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="absolute -top-3 -left-3 w-9 h-9 rounded-full bg-[#9ed42e] text-[#0d3b2e] flex items-center justify-center text-sm font-medium shadow-sm">
                      {i + 1}
                    </div>
                    <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg text-[#0d3b2e] mb-2 leading-snug">{s.title}</h3>
                    <p className="text-[#6c757d] text-sm leading-relaxed">{s.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WAAROM */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Waarom TerreVolt
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Waarom werken met TerreVolt?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {waarom.map((w) => {
                const Icon = w.icon;
                return (
                  <div
                    key={w.title}
                    className="group bg-[#f8f9fa] rounded-xl p-6 border border-gray-200 hover:border-[#9ed42e] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#9ed42e] transition-colors duration-300">
                      <Icon className="w-6 h-6 text-[#0d3b2e] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg text-[#0d3b2e] mb-2 leading-snug">{w.title}</h3>
                    <p className="text-[#6c757d] text-sm leading-relaxed">{w.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WAT WIJ BELANGRIJK VINDEN */}
        <section className="py-16 md:py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-10 md:mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Wat wij belangrijk vinden</h2>
              <p className="text-base sm:text-lg text-[#6c757d]">
                Niet alles hoeft perfect te zijn. We kijken vooral naar ervaring, houding, veiligheid en betrouwbaarheid.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {vereisten.map((v) => (
                <div
                  key={v}
                  className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#9ed42e] transition-colors duration-300 rounded-full px-4 py-2.5"
                >
                  <Award className="w-4 h-4 text-[#9ed42e]" strokeWidth={2.5} />
                  <span className="text-[#0d3b2e] text-sm">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AANSPREEKPUNT */}
        <section id="aanspreekpunt" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10 md:mb-12 max-w-3xl mx-auto">
                <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                  Direct contact
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Je vaste aanspreekpunt bij TerreVolt</h2>
                <p className="text-base sm:text-lg text-[#6c757d]">
                  Heb je interesse om met TerreVolt te werken? Dan houden we het simpel. Je laat je gegevens achter, wij nemen contact met je op en kijken samen welke rol of projectinzet past bij jouw ervaring.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {/* Bellen */}
                <div className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-5 sm:p-6 text-center hover:border-[#9ed42e] transition-colors">
                  <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <PhoneIcon className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2} />
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#6c757d] mb-1">Bellen</div>
                  <CopyableContactLink
                    type="tel"
                    value={company.phone.e164}
                    href={telHref}
                    className="text-[#0d3b2e] hover:text-[#9ed42e] transition-colors text-base sm:text-lg break-all"
                    wrapperClassName="inline-flex items-center gap-1 justify-center"
                  >
                    {company.phone.display}
                  </CopyableContactLink>
                </div>

                {/* WhatsApp */}
                <div className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-5 sm:p-6 text-center hover:border-[#9ed42e] transition-colors">
                  <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <MessageSquare className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2} />
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#6c757d] mb-1">WhatsApp</div>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0d3b2e] hover:text-[#9ed42e] transition-colors text-base sm:text-lg break-all"
                  >
                    Stuur een bericht
                  </a>
                </div>

                {/* E-mail */}
                <div className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-5 sm:p-6 text-center hover:border-[#9ed42e] transition-colors">
                  <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <MailIcon className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2} />
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#6c757d] mb-1">E-mail</div>
                  <CopyableContactLink
                    type="mail"
                    value={company.email}
                    href={mailHref}
                    className="text-[#0d3b2e] hover:text-[#9ed42e] transition-colors text-base sm:text-lg break-all"
                    wrapperClassName="inline-flex items-center gap-1 justify-center"
                  >
                    {company.email}
                  </CopyableContactLink>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#aanmelden"
                  className="w-full sm:w-auto bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
                >
                  Direct aanmelden
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="/contact"
                  className="w-full sm:w-auto border-2 border-[#0d3b2e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#0d3b2e] hover:text-white transition-all duration-300 text-center min-h-[48px] flex items-center justify-center"
                >
                  Eerst een vraag stellen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 md:py-24 bg-[#f8f9fa] scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10 md:mb-12">
                <div className="inline-flex items-center gap-2 bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                  <HelpCircle className="w-4 h-4" /> FAQ
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Veelgestelde vragen</h2>
                <p className="text-base sm:text-lg text-[#6c757d]">
                  Antwoorden op de vragen die we het vaakst krijgen van monteurs, werkverantwoordelijken en ZZP-ploegen.
                </p>
              </div>

              <Accordion type="single" collapsible className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-200 overflow-hidden">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b-0">
                    <AccordionTrigger className="px-5 sm:px-6 py-4 text-left text-[#0d3b2e] hover:no-underline hover:bg-[#f0f7e6]/40 min-h-[56px]">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-5 sm:px-6 pb-5 text-[#6c757d] leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* AANMELDFORMULIER */}
        <section id="aanmelden" className="py-16 md:py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10 md:mb-12">
                <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                  Open aanmelding
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Open aanmelding</h2>
                <p className="text-base sm:text-lg text-[#6c757d]">
                  Geen passende functie gezien, maar wel ervaring met elektrotechniek, infra, LS/MS, kabelwerk, aarding of aansluitingen? Meld je toch aan. We kijken graag of er een passende rol of projectinzet is.
                </p>
                <p className="text-sm text-[#6c757d] mt-3">
                  Geen CV bij de hand? Geen probleem. Laat je gegevens achter, dan nemen we contact met je op.
                </p>
              </div>

              {/* Vragen? — directe contactopties vóór het formulier */}
              <div className="mb-8 bg-[#f0f7e6] border border-[#9ed42e]/50 rounded-2xl p-5 sm:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <HelpCircle className="w-5 h-5 text-[#0d3b2e] flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-[#0d3b2e]">Liever eerst even bellen of appen?</div>
                    <p className="text-sm text-[#0d3b2e]/80 mt-1 leading-relaxed">
                      Korte lijnen — bel, WhatsApp of mail Team TerreVolt. We bespreken je ervaring en beschikbaarheid.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  <a href={telHref} className="inline-flex items-center justify-center gap-2 bg-[#0d3b2e] text-white px-4 py-3 min-h-[48px] rounded-lg hover:bg-[#1a4a36] transition-colors">
                    <PhoneIcon className="w-4 h-4 text-[#9ed42e]" /> Bel direct
                  </a>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#9ed42e] text-[#0d3b2e] px-4 py-3 min-h-[48px] rounded-lg hover:bg-[#8bc41f] transition-colors">
                    <MessageSquare className="w-4 h-4" /> WhatsApp
                  </a>
                  <a href={mailHref} className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#0d3b2e] text-[#0d3b2e] px-4 py-3 min-h-[48px] rounded-lg hover:bg-[#0d3b2e] hover:text-white transition-colors">
                    <MailIcon className="w-4 h-4" /> Mail ons
                  </a>
                </div>
              </div>

              {success ? (
                <div role="status" aria-live="polite" className="bg-[#f0f7e6] border border-[#9ed42e] rounded-2xl p-6 sm:p-10 shadow-sm text-center">
                  <div className="w-14 h-14 bg-[#9ed42e] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#0d3b2e]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl text-[#0d3b2e] mb-2">Aanmelding ontvangen</h3>
                  <p className="text-[#0d3b2e]/80 mb-6 max-w-md mx-auto">
                    Bedankt! We hebben je gegevens ontvangen. We nemen binnenkort telefonisch of per e-mail contact met je op.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="#profielen" className="bg-[#0d3b2e] text-white px-6 py-3 rounded-lg hover:bg-[#1a4a36] transition-colors min-h-[48px] flex items-center justify-center">
                      Terug naar profielen
                    </a>
                    <button type="button" onClick={resetForm} className="border-2 border-[#0d3b2e] text-[#0d3b2e] px-6 py-3 rounded-lg hover:bg-[#0d3b2e] hover:text-white transition-colors min-h-[48px] flex items-center justify-center">
                      Nog iemand aanmelden
                    </button>
                  </div>
                </div>
              ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                onChange={(e) => {
                  if (submitError) setSubmitError(null);
                  const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                  const name = target?.name as keyof FieldErrors | undefined;
                  if (name && errors[name]) clearFieldError(name);
                }}
                noValidate
                aria-describedby={submitError || Object.keys(errors).length > 0 ? "form-error-banner" : undefined}
                className="bg-[#f8f9fa] rounded-2xl p-5 sm:p-10 border border-gray-200 shadow-sm space-y-6"
              >
                {(submitError || Object.keys(errors).length > 0) && (
                  <div
                    ref={errorBannerRef}
                    id="form-error-banner"
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
                {/* Blok 1 — Contactgegevens */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#6c757d] mb-3 pb-2 border-b border-gray-200">Contactgegevens</h3>
                  <div className="flex flex-col gap-4 sm:gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm text-[#0d3b2e] mb-2">Naam *</label>
                      <input id="name" name="name" required maxLength={100} aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`w-full px-4 py-3 min-h-[48px] rounded-lg border bg-white focus:outline-none focus:ring-2 transition ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-[#9ed42e] focus:ring-[#9ed42e]/20"}`} />
                      {errors.name && <p id="name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm text-[#0d3b2e] mb-2">Telefoon *</label>
                      <input id="phone" name="phone" type="tel" required maxLength={30} inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={`w-full px-4 py-3 min-h-[48px] rounded-lg border bg-white focus:outline-none focus:ring-2 transition ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-[#9ed42e] focus:ring-[#9ed42e]/20"}`} />
                      {errors.phone && <p id="phone-error" className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-[#0d3b2e] mb-2">E-mail *</label>
                      <input id="email" name="email" type="email" required maxLength={255} inputMode="email" autoComplete="email" aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`w-full px-4 py-3 min-h-[48px] rounded-lg border bg-white focus:outline-none focus:ring-2 transition ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-[#9ed42e] focus:ring-[#9ed42e]/20"}`} />
                      {errors.email && <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>}
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
                      <input id="region" name="region" maxLength={100} autoComplete="address-level2"
                        className="w-full px-4 py-3 min-h-[48px] rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                    </div>
                  </div>
                </div>

                {/* Blok 2 — Profiel & ervaring */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#6c757d] mb-3 pb-2 border-b border-gray-200">Profiel &amp; ervaring</h3>
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <label htmlFor="profile" className="block text-sm text-[#0d3b2e] mb-2">Profiel waarvoor je je aanmeldt *</label>
                      <select id="profile" name="profile" required defaultValue="" aria-invalid={!!errors.profile}
                        aria-describedby={errors.profile ? "profile-error" : undefined}
                        className={`w-full px-4 py-3 min-h-[48px] rounded-lg border bg-white focus:outline-none focus:ring-2 transition ${errors.profile ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-[#9ed42e] focus:ring-[#9ed42e]/20"}`}>
                        <option value="" disabled>Maak een keuze</option>
                        {profielOpties.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                      {errors.profile && <p id="profile-error" className="mt-1 text-xs text-red-600">{errors.profile}</p>}
                    </div>
                    <div>
                      <label htmlFor="experience" className="block text-sm text-[#0d3b2e] mb-2">Ervaring</label>
                      <textarea id="experience" name="experience" rows={3} maxLength={2000}
                        placeholder="Bijv. 5 jaar ervaring in MS-stationsrenovaties en LS-aansluitwerk."
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition resize-y max-h-60" />
                    </div>
                    <div>
                      <label htmlFor="certifications" className="block text-sm text-[#0d3b2e] mb-2">Bevoegdheden / certificaten</label>
                      <input id="certifications" name="certifications" maxLength={1000}
                        placeholder="Bijv. VCA, BEI BLS/BHS, NEN 3140 VOP"
                        className="w-full px-4 py-3 min-h-[48px] rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                    </div>
                  </div>
                </div>

                {/* Blok 3 — Beschikbaarheid & documenten */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#6c757d] mb-3 pb-2 border-b border-gray-200">Beschikbaarheid &amp; documenten</h3>
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <label htmlFor="availability" className="block text-sm text-[#0d3b2e] mb-2">Beschikbaarheid</label>
                      <input id="availability" name="availability" maxLength={200}
                        placeholder="Bijv. fulltime per direct, of 3 dagen p/w"
                        className="w-full px-4 py-3 min-h-[48px] rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm text-[#0d3b2e] mb-2">Bericht</label>
                      <textarea id="message" name="message" rows={4} maxLength={2000}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition resize-y max-h-72" />
                    </div>
                    <CvUploadField
                      file={file}
                      setFile={setFile}
                      uploading={uploadingFile}
                      fileError={fileError}
                      setFileError={setFileError}
                    />
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
      </main>

      <Footer />
    </div>
  );
};

export default WerkenBij;
