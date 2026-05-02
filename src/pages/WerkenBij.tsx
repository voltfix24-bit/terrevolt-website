import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Zap, Cable, PlugZap, Power, ClipboardCheck, Users,
  Network, Layers, FileText, Briefcase, MessageSquare, ShieldAlert,
  Award, Loader2, Upload, CalendarCheck, Phone as PhoneIcon, HardHat,
  CheckCircle2, FileCheck2, X,
} from "lucide-react";
import { EarthSymbol } from "@/components/icons/EarthSymbol";
import { z } from "zod";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { usePageMeta } from "../hooks/usePageMeta";
import { vacatures as fallbackVacatures } from "@/data/vacatures";

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

const formSchema = z.object({
  name: z.string().trim().min(2, "Naam is verplicht").max(100),
  phone: z.string().trim().min(6, "Telefoonnummer is verplicht").max(30),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
  profile: z.string().trim().min(1, "Kies een profiel").max(100),
  region: z.string().trim().max(100).optional(),
  experience: z.string().trim().max(2000).optional(),
  certifications: z.string().trim().max(1000).optional(),
  availability: z.string().trim().max(200).optional(),
  message: z.string().trim().max(2000).optional(),
});

const WerkenBij = () => {
  usePageMeta(
    "Werken bij TerreVolt | Vacatures monteurs LS/MS, schakelwerk & aarding",
    "TerreVolt zoekt monteurs, werkverantwoordelijken en ZZP-ploegen voor LS/MS-projecten binnen de netbeheerwereld. Duidelijke planning, korte lijnen, veiligheid voorop.",
  );

  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [profielen, setProfielen] = useState<ProfielCard[]>([]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      profile: String(fd.get("profile") || ""),
      region: String(fd.get("region") || ""),
      experience: String(fd.get("experience") || ""),
      certifications: String(fd.get("certifications") || ""),
      availability: String(fd.get("availability") || ""),
      message: String(fd.get("message") || ""),
    };

    const parsed = formSchema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message || "Controleer het formulier");
      return;
    }
    if (file && file.size > 10 * 1024 * 1024) {
      toast.error("Bestand mag maximaal 10MB zijn");
      return;
    }

    setSubmitting(true);
    try {
      let cv_url: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop() || "bin";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("job-applications")
          .upload(path, file, { contentType: file.type || undefined });
        if (upErr) throw upErr;
        cv_url = path;
      }

      const fullMessage = `Profiel: ${parsed.data.profile}${parsed.data.message ? `\n\n${parsed.data.message}` : ""}`;

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
      }]);
      if (insErr) throw insErr;

      toast.success("Aanmelding verstuurd. We nemen zo snel mogelijk contact op.");
      (e.target as HTMLFormElement).reset();
      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Er ging iets mis. Probeer het later opnieuw.");
    } finally {
      setSubmitting(false);
    }
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

      <main className="pt-16 sm:pt-20">
        {/* HERO */}
        <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] py-14 md:py-20">
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
              <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight break-words">
                Werk mee aan{" "}
                <span className="text-[#9ed42e]">LS/MS-projecten</span> binnen de netbeheerwereld
              </h1>
              <p className="text-base sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl leading-relaxed">
                Ben jij monteur, werkverantwoordelijke of ZZP'er met ervaring in laagspanning, middenspanning, kabelwerk, schakelwerk of aarding? TerreVolt zoekt vakmensen voor professionele projecten met duidelijke afspraken, korte lijnen en veiligheid voorop.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
                <a
                  href="#profielen"
                  className="group w-full sm:w-auto bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <span>Bekijk profielen</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#aanmelden"
                  className="w-full sm:w-auto border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 text-center min-h-[48px] flex items-center justify-center"
                >
                  Direct aanmelden
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
            </div>
          </div>
        </section>

        {/* QUICK NAV CHIPS */}
        <section className="py-8 md:py-10 bg-white border-b border-gray-100">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-xs uppercase tracking-wider text-[#6c757d] mb-3 text-center sm:text-left">
                Snel naar profiel
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                {quickNav.map((q) => (
                  <button
                    key={q.label}
                    type="button"
                    onClick={() => scrollToSlug(q.slugs)}
                    className="px-4 py-2 rounded-full border border-gray-200 bg-[#f8f9fa] text-[#0d3b2e] text-sm hover:border-[#9ed42e] hover:bg-[#f0f7e6] active:scale-[0.98] transition-all min-h-[40px]"
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
                return (
                  <Link
                    key={p.slug}
                    id={`profiel-${p.slug}`}
                    to={`/vacatures/${p.slug}`}
                    className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center scroll-mt-24"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform flex-shrink-0">
                      <Icon className="w-7 h-7 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <div className="text-[#0d3b2e] text-base sm:text-lg mb-2 break-words max-w-full">{p.label}</div>
                    <p className="text-sm text-[#6c757d] leading-snug mb-4 break-words">{desc}</p>
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
        <section className="py-14 md:py-20 bg-[#f0f7e6]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-[#9ed42e]/40 shadow-sm p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
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
                    ZZP'er aanmelden
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

        {/* AANMELDFORMULIER */}
        <section id="aanmelden" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10 md:mb-12">
                <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                  Aanmelden
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Meld je aan</h2>
                <p className="text-base sm:text-xl text-[#6c757d]">
                  Vul het formulier in. Wij nemen zo snel mogelijk contact op.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-[#f8f9fa] rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm text-[#0d3b2e] mb-2">Naam *</label>
                    <input id="name" name="name" required maxLength={100}
                      className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm text-[#0d3b2e] mb-2">Telefoon *</label>
                    <input id="phone" name="phone" type="tel" required maxLength={30}
                      className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-[#0d3b2e] mb-2">E-mail *</label>
                    <input id="email" name="email" type="email" required maxLength={255}
                      className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="profile" className="block text-sm text-[#0d3b2e] mb-2">
                      Profiel waarvoor je je aanmeldt *
                    </label>
                    <select
                      id="profile"
                      name="profile"
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition"
                    >
                      <option value="" disabled>Maak een keuze</option>
                      {profielOpties.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="region" className="block text-sm text-[#0d3b2e] mb-2">Woonplaats / regio</label>
                    <input id="region" name="region" maxLength={100}
                      className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="availability" className="block text-sm text-[#0d3b2e] mb-2">Beschikbaarheid</label>
                    <input id="availability" name="availability" maxLength={200}
                      placeholder="Bijv. fulltime per direct, of 3 dagen p/w"
                      className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm text-[#0d3b2e] mb-2">Ervaring</label>
                  <textarea id="experience" name="experience" rows={3} maxLength={2000}
                    placeholder="Bijv. 5 jaar ervaring in MS-stationsrenovaties en LS-aansluitwerk."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition resize-y" />
                </div>

                <div>
                  <label htmlFor="certifications" className="block text-sm text-[#0d3b2e] mb-2">Bevoegdheden / certificaten</label>
                  <input id="certifications" name="certifications" maxLength={1000}
                    placeholder="Bijv. VCA, BEI BLS/BHS, NEN 3140 VOP"
                    className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-[#0d3b2e] mb-2">Bericht</label>
                  <textarea id="message" name="message" rows={4} maxLength={2000}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition resize-y" />
                </div>

                <div>
                  <label htmlFor="cv" className="block text-sm text-[#0d3b2e] mb-2">CV / certificaten (PDF, DOC, max 10MB)</label>
                  <label
                    htmlFor="cv"
                    className="flex items-center justify-center gap-3 w-full px-4 py-6 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#9ed42e] hover:bg-[#f0f7e6]/40 cursor-pointer transition bg-white"
                  >
                    <Upload className="w-5 h-5 text-[#0d3b2e]" />
                    <span className="text-[#6c757d] text-sm break-all">
                      {file ? file.name : "Klik om bestand te kiezen"}
                    </span>
                  </label>
                  <input
                    id="cv"
                    name="cv"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 min-h-[48px] rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WerkenBij;
