import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin, Upload, Loader2, Network, HardHat, Factory, Briefcase, Users, ShieldCheck, ClipboardCheck, MessageSquare, Cable, BadgeCheck, CheckCircle2, AlertCircle, X, Zap } from "lucide-react";
import { z } from "zod";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { usePageMeta } from "../hooks/usePageMeta";
import { company, addressOneLine, telHref, mailHref } from "@/config/company";
import { CopyButton } from "@/components/terrevolt/CopyableContactLink";

const contactCards = [
  { icon: Phone, title: "Bel ons", value: company.phone.display, href: telHref },
  { icon: Mail, title: "Mail ons", value: company.email, href: mailHref },
  { icon: MapPin, title: "Werkgebied", value: addressOneLine, href: null },
];

const requestTypes = [
  "LS/MS Netmontage",
  "Stationsrenovatie",
  "Schakelwerk & veiligstellen",
  "Aardingsoplossingen",
  "Meten & beproeven",
  "Huisaansluitingen",
  "Monteur / ploeg nodig",
  "Sollicitatie",
  "Anders",
];

const AARDING_WERKZAAMHEDEN = [
  "Aardpen slaan",
  "Aarding meten",
  "Meetrapport nodig",
  "Laadpaal / zonnepanelen",
  "Meterkast / oude woning",
] as const;

const ALLOWED_EXT = ["pdf", "jpg", "jpeg", "png", "dwg"] as const;
const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

const voorWie = [
  { icon: Network, title: "Netbeheerders", description: "Ondersteuning bij LS/MS-netmontage, stationswerk en aarding." },
  { icon: HardHat, title: "Hoofdaannemers", description: "Vakbekwame inzet binnen grotere infra- en bouwprojecten." },
  { icon: Factory, title: "Industrie & grootverbruik", description: "Aansluitingen, aarding en uitvoering binnen industriële omgevingen." },
];

const schema = z.object({
  name: z.string().trim().min(2, "Naam is verplicht").max(100),
  company: z.string().trim().max(150).optional(),
  phone: z.string().trim().min(6, "Telefoonnummer is verplicht").max(30),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
  request_type: z.string().trim().min(1, "Kies een type aanvraag").max(100),
  location: z.string().trim().max(150).optional(),
  start_date: z.string().trim().max(50).optional(),
  description: z.string().trim().min(5, "Geef een korte omschrijving").max(3000),
});

const aardingSchema = schema.extend({
  location: z.string().trim().min(2, "Vul uw postcode of plaats in").max(150),
  description: z.string().trim().max(3000).optional(),
});

const intentToRequestType: Record<"project" | "monteur" | "sollicitatie", string> = {
  project: "LS/MS Netmontage",
  monteur: "Monteur / ploeg nodig",
  sollicitatie: "Sollicitatie",
};

const Contact = () => {
  usePageMeta("Contact | Project bespreken met TerreVolt BV", "Neem contact op met TerreVolt voor LS/MS-infrastructuur, schakelwerk, stationsrenovatie, netmontage, aarding en metingen.", "/contact");

  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [requestType, setRequestType] = useState<string>("");
  const [searchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  const initialIntent = (() => {
    const v = searchParams.get("intent");
    return v === "monteur" || v === "sollicitatie" || v === "project" ? v : "project";
  })();
  const typeParam = searchParams.get("type") || "";
  const isAarding = typeParam.toLowerCase() === "aarding" || typeParam === "Aardingsoplossingen";
  const initialType = isAarding ? "Aardingsoplossingen" : typeParam;
  const [intent, setIntent] = useState<"project" | "monteur" | "sollicitatie">(initialIntent);
  const [werkzaamheden, setWerkzaamheden] = useState<string[]>([]);

  const toggleWerkzaamheid = (label: string) =>
    setWerkzaamheden((curr) => (curr.includes(label) ? curr.filter((w) => w !== label) : [...curr, label]));

  // Sync request_type met de gekozen intent (alleen als gebruiker nog niets handmatig koos).
  useEffect(() => {
    if (initialType) {
      setRequestType(initialType);
      return;
    }
    setRequestType((curr) => (curr ? curr : intentToRequestType[intent]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIntentChange = (id: "project" | "monteur" | "sollicitatie") => {
    setIntent(id);
    setRequestType(intentToRequestType[id]);
    const label =
      id === "project" ? "Project bespreken" : id === "monteur" ? "Monteur / ploeg nodig" : "Sollicitatie";
    import("@/lib/analytics").then((m) => m.trackCTA(label, { intent: id }));
  };

  const intents: {
    id: "project" | "monteur" | "sollicitatie";
    label: string;
    icon: typeof Briefcase;
    helper: string;
  }[] = [
    { id: "project", label: "Project bespreken", icon: Cable, helper: "Voor LS/MS-netmontage, stationsrenovatie, schakelwerk, aarding of metingen." },
    { id: "monteur", label: "Monteur / ploeg nodig", icon: Users, helper: "Voor projectmatige inzet van vakbekwame monteurs of complete ploegen." },
    { id: "sollicitatie", label: "Sollicitatie", icon: BadgeCheck, helper: "Voor monteurs en werkverantwoordelijken die bij TerreVolt willen werken." },
  ];

  const validateFile = (f: File): string | null => {
    const ext = (f.name.split(".").pop() || "").toLowerCase();
    if (!ALLOWED_EXT.includes(ext as typeof ALLOWED_EXT[number])) {
      return "Bestandstype niet toegestaan. Gebruik PDF, JPG, PNG of DWG.";
    }
    if (f.size > MAX_UPLOAD_BYTES) {
      return "Bestand mag maximaal 25MB zijn.";
    }
    return null;
  };

  const handleFileChange = (next: File | null) => {
    if (!next) {
      setFile(null);
      setFileError(null);
      return;
    }
    const err = validateFile(next);
    if (err) {
      setFile(null);
      setFileError(err);
      return;
    }
    setFile(next);
    setFileError(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFileChange(f);
  };

  const resetForm = () => {
    formRef.current?.reset();
    setFile(null);
    setFileError(null);
    setRequestType(intentToRequestType[intent]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      request_type: String(fd.get("request_type") || requestType || ""),
      location: String(fd.get("location") || ""),
      start_date: String(fd.get("start_date") || ""),
      description: String(fd.get("description") || ""),
    };

    if (isAarding) {
      raw.request_type = "Aardingsoplossingen";
      const gekozen = werkzaamheden.length ? `Gewenste werkzaamheden: ${werkzaamheden.join(", ")}.` : "";
      const termijn = String(fd.get("start_date") || "");
      raw.description = [gekozen, raw.description, termijn ? `Gewenste termijn: ${termijn}.` : ""]
        .filter(Boolean)
        .join("\n")
        .trim() || "Aanvraag prijsindicatie aarding.";
    }

    const parsed = (isAarding ? aardingSchema : schema).safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message || "Controleer het formulier");
      return;
    }

    if (file) {
      const fileErr = validateFile(file);
      if (fileErr) {
        setFileError(fileErr);
        toast.error(fileErr);
        return;
      }
    }

    setSubmitting(true);
    try {
      let attachment_url: string | null = null;
      if (file) {
        const ext = (file.name.split(".").pop() || "bin").toLowerCase();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("contact-attachments")
          .upload(path, file, { contentType: file.type || undefined });
        if (upErr) throw upErr;
        attachment_url = path;
      }

      const intentLabel =
        intent === "project" ? "Project bespreken" :
        intent === "monteur" ? "Monteur/ploeg nodig" : "Sollicitatie";

      const { error: insErr } = await supabase.from("contact_requests").insert([{
        name: parsed.data.name,
        company: parsed.data.company || null,
        phone: parsed.data.phone || null,
        email: parsed.data.email,
        request_type: parsed.data.request_type || null,
        location: parsed.data.location || null,
        start_date: parsed.data.start_date || null,
        description: parsed.data.description || "Aanvraag prijsindicatie aarding.",
        attachment_url,
        intent,
        intent_label: intentLabel,
      } as any]);
      if (insErr) throw insErr;

      import("@/lib/analytics").then((m) =>
        m.trackFormSubmit("contact_form", { aanvraag_type: intent })
      );
      setSubmitSuccess(true);
      resetForm();
    } catch (err) {
      console.error(err);
      setSubmitError(`Er ging iets mis. Probeer het later opnieuw of mail ons op ${company.email}.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main id="main-content" className="pt-16 sm:pt-20">
        {/* HERO — donker, technisch, met overlappende keuzecards */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] py-16 sm:py-24 md:py-32 pb-24 sm:pb-32 md:pb-40">
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
            <div className="max-w-3xl">
              <div className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-4 py-1.5 rounded-full text-xs sm:text-sm mb-5 tracking-wider uppercase">
                Aanvraag
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight hyphens-nl">
                Stuur een <span className="text-[#9ed42e]">aanvraag</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-2xl leading-relaxed">
                Vul het formulier in voor een projectaanvraag, technische vraag of capaciteitsaanvraag binnen LS/MS, stationswerk, schakelwerk, aarding of metingen. We nemen zo snel mogelijk contact op.
              </p>
            </div>
          </div>
        </section>

        {/* KEUZEHULP — 3 grote intent-cards die over de hero heen vallen */}
        <section id="keuzehulp" aria-labelledby="keuzehulp-heading" className="bg-transparent scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="relative -mt-16 sm:-mt-20 md:-mt-24 z-20">
              <div id="keuzehulp-heading" className="sr-only">
                Waar wilt u het over hebben?
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {intents.map((it) => {
                  const Icon = it.icon;
                  const active = intent === it.id;
                  return (
                    <button
                      key={it.id}
                      type="button"
                      onClick={() => handleIntentChange(it.id)}
                      aria-pressed={active}
                      className={`group text-left rounded-xl border p-6 sm:p-7 md:p-8 min-h-[140px] transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 ${
                        active
                          ? "bg-white border-gray-200 border-b-4 border-b-[#9ed42e] shadow-xl"
                          : "bg-white border-gray-200 hover:border-[#9ed42e] hover:shadow-xl shadow-sm"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                          active ? "bg-[#9ed42e]" : "bg-[#f0f7e6] group-hover:bg-[#9ed42e]"
                        }`}>
                          <Icon className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-base sm:text-lg text-[#0d3b2e] mb-1">{it.label}</div>
                          <p className="text-sm text-[#6c757d] leading-relaxed">{it.helper}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {intent === "sollicitatie" && (
                <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#f0f7e6] border border-[#9ed42e] rounded-xl p-4 sm:p-5">
                  <div className="flex items-start gap-3 min-w-0">
                    <BadgeCheck className="w-5 h-5 text-[#0d3b2e] flex-shrink-0 mt-0.5" strokeWidth={2.2} />
                    <p className="text-sm text-[#0d3b2e] min-w-0">
                      Voor sollicitaties heeft TerreVolt een apart sollicitatieformulier op de pagina Werken bij. Je kunt hieronder ook gewoon dit formulier invullen als je dat liever hebt.
                    </p>
                  </div>
                  <Link
                    to="/werken-bij"
                    className="inline-flex items-center justify-center gap-1.5 bg-[#0d3b2e] text-[#9ed42e] px-4 py-2.5 min-h-[44px] rounded-lg text-sm hover:bg-[#1a4a36] transition-colors flex-shrink-0"
                  >
                    Ga naar Werken bij TerreVolt <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* HOOFDSECTIE — links trust-kolom, rechts formulier */}
        <section id="formulier" className="relative pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20 bg-[#f8f9fa] overflow-hidden scroll-mt-24">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(13, 59, 46, 0.6) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(13, 59, 46, 0.6) 1px, transparent 1px)
                `,
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* LINKS — trust-kolom */}
              <aside className="lg:col-span-4 space-y-4">
                {[
                  { icon: ShieldCheck, title: "Veiligheid voorop", text: "We doen het veilig, of we doen het niet." },
                  { icon: ClipboardCheck, title: "Duidelijke oplevering", text: "Controle, rapportage en documentatie waar nodig als onderdeel van de uitvoering." },
                  { icon: MessageSquare, title: "Korte lijnen", text: "Direct contact met uitvoering en planning. Praktisch, duidelijk en zonder onnodige schakels." },
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <div key={t.title} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5">
                      <div className="w-11 h-11 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#0d3b2e]" strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-base text-[#0d3b2e] mb-1">{t.title}</div>
                        <p className="text-sm text-[#6c757d] leading-relaxed">{t.text}</p>
                      </div>
                    </div>
                  );
                })}

                {/* Abstract technisch grid-kaartje (geen stockfoto) */}
                <div className="hidden lg:block relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] p-6 min-h-[160px]">
                  <div className="absolute inset-0 opacity-[0.18]">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(158, 212, 46, 0.6) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(158, 212, 46, 0.6) 1px, transparent 1px)
                        `,
                        backgroundSize: "32px 32px",
                      }}
                    />
                  </div>
                  <div className="absolute inset-x-6 top-1/2 h-px bg-[#9ed42e]/40" aria-hidden="true" />
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 flex items-center justify-between" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9ed42e]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9ed42e]/70" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9ed42e]/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9ed42e]" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-xs tracking-wider uppercase text-[#9ed42e] mb-1">TerreVolt BV</div>
                    <p className="text-sm text-white/90 leading-relaxed max-w-[24ch]">
                      Specialist in LS/MS, schakelwerk en aardingsoplossingen.
                    </p>
                  </div>
                </div>
              </aside>

              {/* RECHTS — formulier */}
              <div className="lg:col-span-8">
                {submitSuccess ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#f0f7e6] rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-7 h-7 text-[#0d3b2e]" strokeWidth={2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-xl sm:text-2xl text-[#0d3b2e] mb-2">Aanvraag ontvangen</h2>
                        <p className="text-[#6c757d] leading-relaxed">
                          Bedankt. We hebben uw aanvraag ontvangen en nemen zo snel mogelijk contact op.
                        </p>
                        <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
                          <button
                            type="button"
                            onClick={() => setSubmitSuccess(false)}
                            className="inline-flex items-center justify-center gap-2 bg-[#9ed42e] text-[#0d3b2e] px-5 py-3 min-h-[44px] rounded-lg hover:bg-[#8bc41f] transition-colors"
                          >
                            Nieuwe aanvraag
                          </button>
                          <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-[#0d3b2e] px-5 py-3 min-h-[44px] rounded-lg hover:border-[#9ed42e] transition-colors"
                          >
                            Terug naar home
                          </Link>
                        </div>
                      </div>
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
                          m.trackFormStart("contact_form", { aanvraag_type: intent })
                        );
                      }
                    }}
                    className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-200 shadow-sm space-y-8"
                  >
                    <input type="hidden" name="intent" value={intent} readOnly />

                    {submitError && (
                      <div role="alert" className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" strokeWidth={2.2} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-red-700 leading-relaxed">{submitError}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSubmitError(null)}
                          aria-label="Foutmelding sluiten"
                          className="text-red-600 hover:text-red-800 p-1 -m-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Groep 1 — Contactgegevens */}
                    <fieldset className="space-y-5">
                      <legend className="text-base sm:text-lg text-[#0d3b2e] mb-1">Contactgegevens</legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-sm text-[#0d3b2e] mb-2">Naam *</label>
                          <input id="name" name="name" required maxLength={100} autoComplete="name"
                            className="w-full px-4 py-3 min-h-[48px] rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-sm text-[#0d3b2e] mb-2">Bedrijf</label>
                          <input id="company" name="company" maxLength={150} autoComplete="organization"
                            className="w-full px-4 py-3 min-h-[48px] rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm text-[#0d3b2e] mb-2">Telefoon *</label>
                          <input id="phone" name="phone" type="tel" required maxLength={30} autoComplete="tel"
                            className="w-full px-4 py-3 min-h-[48px] rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm text-[#0d3b2e] mb-2">E-mail *</label>
                          <input id="email" name="email" type="email" required maxLength={255} autoComplete="email"
                            className="w-full px-4 py-3 min-h-[48px] rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                        </div>
                      </div>
                    </fieldset>

                    {/* Groep 2 — Projectdetails */}
                    <fieldset className="space-y-5 pt-2 border-t border-gray-100">
                      <legend className="text-base sm:text-lg text-[#0d3b2e] mb-1 pt-4">Projectdetails</legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="request_type" className="block text-sm text-[#0d3b2e] mb-2">Type aanvraag *</label>
                          <select
                            id="request_type"
                            name="request_type"
                            required
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
                            className="w-full px-4 py-3 min-h-[48px] rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition"
                          >
                            <option value="" disabled>Kies een optie</option>
                            {requestTypes.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="location" className="block text-sm text-[#0d3b2e] mb-2">Locatie / regio</label>
                          <input id="location" name="location" maxLength={150}
                            placeholder="Bijv. Utrecht, regio Midden-Nederland"
                            className="w-full px-4 py-3 min-h-[48px] rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="start_date" className="block text-sm text-[#0d3b2e] mb-2">Gewenste startdatum</label>
                          <input id="start_date" name="start_date" maxLength={50}
                            placeholder="Bijv. zo snel mogelijk, of week 12"
                            className="w-full px-4 py-3 min-h-[48px] rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="description" className="block text-sm text-[#0d3b2e] mb-2">Korte omschrijving *</label>
                          <textarea id="description" name="description" rows={5} required maxLength={3000}
                            placeholder="Vertel kort over het project, scope en eventuele randvoorwaarden."
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition resize-y" />
                        </div>
                      </div>
                    </fieldset>

                    {/* Groep 3 — Bijlage */}
                    <fieldset className="space-y-3 pt-2 border-t border-gray-100">
                      <legend className="text-base sm:text-lg text-[#0d3b2e] mb-1 pt-4">Bijlage</legend>
                      <label
                        htmlFor="attachment"
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        className={`flex flex-col sm:flex-row items-center justify-center gap-3 w-full px-4 py-5 sm:py-6 rounded-lg border-2 border-dashed cursor-pointer transition text-center ${
                          dragOver
                            ? "border-[#9ed42e] bg-[#f0f7e6]"
                            : file
                              ? "border-[#9ed42e] bg-[#f0f7e6]/50"
                              : "border-gray-300 hover:border-[#9ed42e] hover:bg-[#f0f7e6]/40"
                        }`}
                      >
                        <Upload className="w-5 h-5 text-[#0d3b2e] flex-shrink-0" />
                        <span className="text-[#0d3b2e] text-sm sm:text-base min-w-0 break-words">
                          {file ? file.name : "Sleep bestanden hierheen of blader door mappen"}
                        </span>
                      </label>
                      <input
                        id="attachment"
                        name="attachment"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.dwg"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6c757d]">
                        <span>PDF, JPG, PNG of DWG — maximaal 25MB</span>
                        {file && (
                          <button
                            type="button"
                            onClick={() => handleFileChange(null)}
                            className="inline-flex items-center gap-1 text-[#0d3b2e] underline underline-offset-2 hover:text-[#1a4a36]"
                          >
                            <X className="w-3 h-3" /> Bestand verwijderen
                          </button>
                        )}
                      </div>
                      {fileError && (
                        <p role="alert" className="text-xs text-red-600">{fileError}</p>
                      )}
                    </fieldset>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group w-full bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 min-h-[54px] rounded-lg hover:bg-[#8bc41f] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Aanvraag versturen…</span>
                        </>
                      ) : (
                        <>
                          <span>Verstuur aanvraag</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-[#6c757d] leading-relaxed">
                      Liever direct bellen of mailen? Onderaan deze pagina staan onze contactgegevens.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* DIRECT CONTACT — 3 cards: Bel ons, Mail ons, Werkgebied */}
        <section id="direct-contact" className="py-14 md:py-20 bg-white border-t border-gray-100 scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#0d3b2e] mb-3 leading-tight">
                Liever <span className="text-[#9ed42e]">direct contact</span>?
              </h2>
              <p className="text-base sm:text-lg text-[#6c757d] leading-relaxed">
                Onze specialisten staan klaar om uw technische vraagstuk direct te bespreken.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl">
              {contactCards.map((c) => {
                const Icon = c.icon;
                const copyType: "tel" | "mail" | null =
                  c.href === telHref ? "tel" : c.href === mailHref ? "mail" : null;
                const Wrapper: any = c.href ? "a" : "div";
                return (
                  <div key={c.title} className="relative">
                    <Wrapper
                      {...(c.href ? { href: c.href, "aria-label": copyType ? `${c.title}: ${c.value}. Werkt de app niet? Gebruik de kopieerknop rechtsboven.` : `${c.title}: ${c.value}` } : {})}
                      className={`group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#9ed42e] hover:shadow-md transition-all duration-300 text-left flex items-start gap-4 min-h-[44px] ${c.href ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 active:scale-[0.99]" : ""}`}
                    >
                      <div className="w-11 h-11 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#9ed42e]" strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs tracking-wider uppercase text-[#6c757d] mb-1">{c.title}</div>
                        <div className={`text-base sm:text-lg text-[#0d3b2e] break-words ${c.href ? "group-hover:text-[#1a4a36] group-hover:underline underline-offset-4 decoration-[#9ed42e]" : ""}`}>{c.value}</div>
                      </div>
                    </Wrapper>
                    {copyType && (
                      <CopyButton
                        type={copyType}
                        value={c.value}
                        className="absolute top-2 right-2 inline-flex items-center justify-center min-h-[40px] min-w-[40px] p-2 rounded-md bg-white/0 hover:bg-[#f0f7e6] text-[#6c757d] hover:text-[#0d3b2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] transition-colors"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE: Voor wie werken wij */}
        <section id="doelgroepen" className="py-16 md:py-24 bg-[#f8f9fa] scroll-mt-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Voor wie werken wij?</h2>
              <p className="text-lg sm:text-xl text-[#6c757d] max-w-2xl mx-auto">
                TerreVolt werkt voor partijen binnen de netbeheerwereld.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {voorWie.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="group bg-white rounded-xl p-8 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <div className="w-16 h-16 bg-[#f0f7e6] rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#9ed42e] transition-colors duration-300">
                      <Icon className="w-8 h-8 text-[#0d3b2e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl text-[#0d3b2e] mb-3">{v.title}</h3>
                    <p className="text-[#6c757d] leading-relaxed">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
