import { useState } from "react";
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
  Upload,
  ListChecks,
  Award,
  Gift,
  ShieldAlert,
  UserPlus,
  Coffee,
  FileCheck2,
  Layers,
  PlayCircle,
} from "lucide-react";
import { z } from "zod";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { usePageMeta } from "../hooks/usePageMeta";
import { findVacature } from "@/data/vacatures";

const formSchema = z.object({
  name: z.string().trim().min(2, "Naam is verplicht").max(100),
  phone: z.string().trim().min(6, "Telefoonnummer is verplicht").max(30),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
  profile: z.string().trim().max(150).optional(),
  region: z.string().trim().max(100).optional(),
  availability: z.string().trim().max(200).optional(),
  certifications: z.string().trim().max(1000).optional(),
  message: z.string().trim().max(2000).optional(),
});

const proces = [
  { icon: UserPlus, title: "Aanmelden", text: "Je stuurt het formulier in met je gegevens en certificaten." },
  { icon: Coffee, title: "Kennismaken", text: "Korte (telefonische) kennismaking over werk en wensen." },
  { icon: FileCheck2, title: "Documenten / check", text: "Controle van bevoegdheden, VCA en eventueel VOG." },
  { icon: Layers, title: "Projectmatch", text: "We koppelen jou aan een passend project en planning." },
  { icon: PlayCircle, title: "Start", text: "Inwerken op locatie, daarna zelfstandig aan de slag." },
];

const VacatureDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const vacature = findVacature(slug);

  if (!vacature) return <Navigate to="/werken-bij" replace />;

  usePageMeta(
    `${vacature.title} | Vacature TerreVolt BV`,
    `${vacature.title} bij TerreVolt: ${vacature.intro.slice(0, 140)}`
  );

  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const meta = [
    { icon: MapPin, label: "Regio", value: vacature.meta.regio },
    { icon: Clock, label: "Uren", value: vacature.meta.uren },
    { icon: Briefcase, label: "Dienstverband", value: vacature.meta.dienstverband },
    { icon: GraduationCap, label: "Niveau", value: vacature.meta.niveau },
    { icon: Globe2, label: "Werkgebied", value: vacature.meta.werkgebied },
    { icon: ShieldCheck, label: "Bevoegdheden", value: vacature.meta.bevoegdheden },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const raw = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      profile: String(formData.get("profile") || ""),
      region: String(formData.get("region") || ""),
      availability: String(formData.get("availability") || ""),
      certifications: String(formData.get("certifications") || ""),
      message: String(formData.get("message") || ""),
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

      const messagePrefix = `Vacature: ${vacature.title}${parsed.data.profile ? ` | Profiel: ${parsed.data.profile}` : ""}`;
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
      }]);
      if (insErr) throw insErr;

      toast.success("Sollicitatie verstuurd. We nemen zo snel mogelijk contact op.");
      (e.target as HTMLFormElement).reset();
      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Er ging iets mis. Probeer het later opnieuw.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main className="pt-16 sm:pt-20">
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

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight break-words">
                {vacature.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
                {vacature.intro}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#solliciteer"
                  className="group bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Solliciteer / Meld je aan</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/contact"
                  className="border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 text-center"
                >
                  Vraag stellen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* META */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
              {meta.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.label} className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 bg-[#f0f7e6] rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#0d3b2e]" strokeWidth={2} />
                    </div>
                    <div className="text-xs uppercase tracking-wider text-[#6c757d]">{m.label}</div>
                    <div className="text-[#0d3b2e] text-sm">{m.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WAT GA JE DOEN + DIT BRENG JE MEE */}
        <section className="py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <ListChecks className="w-7 h-7 text-[#9ed42e]" strokeWidth={2.5} />
                  <h2 className="text-2xl text-[#0d3b2e]">Wat ga je doen?</h2>
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

              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-7 h-7 text-[#9ed42e]" strokeWidth={2.5} />
                  <h2 className="text-2xl text-[#0d3b2e]">Dit breng je mee</h2>
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
            </div>
          </div>
        </section>

        {/* WAT BIEDEN WIJ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                <Gift className="w-4 h-4" />
                Wat bieden wij?
              </div>
              <h2 className="text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Heldere voordelen</h2>
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
        <section className="py-20 bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-[#9ed42e] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldAlert className="w-8 h-8 text-[#0d3b2e]" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl lg:text-4xl text-white mb-6">Veiligheid voorop</h2>
              <p className="text-lg text-gray-300 leading-relaxed">{vacature.veiligheid}</p>
            </div>
          </div>
        </section>

        {/* PROCES */}
        <section className="py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Zo verloopt het proces</h2>
              <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
                Van aanmelding tot start op het project — duidelijk en kort.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {proces.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="relative bg-white rounded-xl p-6 border border-gray-200 hover:border-[#9ed42e] hover:shadow-lg transition-all"
                  >
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#9ed42e] text-[#0d3b2e] rounded-full flex items-center justify-center text-sm">
                      {i + 1}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg text-[#0d3b2e] mb-2">{p.title}</h3>
                    <p className="text-sm text-[#6c757d] leading-relaxed">{p.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FORMULIER */}
        <section id="solliciteer" className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                  Solliciteren
                </div>
                <h2 className="text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Meld je aan voor: {vacature.title}</h2>
                <p className="text-xl text-[#6c757d]">Vul het formulier in. Wij reageren snel.</p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-[#f8f9fa] rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-[#0d3b2e] mb-2">Naam *</label>
                    <input id="name" name="name" required maxLength={100}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm text-[#0d3b2e] mb-2">Telefoon *</label>
                    <input id="phone" name="phone" type="tel" required maxLength={30}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-[#0d3b2e] mb-2">E-mail *</label>
                    <input id="email" name="email" type="email" required maxLength={255}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="profile" className="block text-sm text-[#0d3b2e] mb-2">Profiel</label>
                    <input id="profile" name="profile" maxLength={150}
                      placeholder="Bijv. LS-monteur, MS-schakelmonteur"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="region" className="block text-sm text-[#0d3b2e] mb-2">Regio</label>
                    <input id="region" name="region" maxLength={100}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="availability" className="block text-sm text-[#0d3b2e] mb-2">Beschikbaarheid</label>
                    <input id="availability" name="availability" maxLength={200}
                      placeholder="Bijv. fulltime per direct"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                </div>

                <div>
                  <label htmlFor="certifications" className="block text-sm text-[#0d3b2e] mb-2">Certificaten</label>
                  <input id="certifications" name="certifications" maxLength={1000}
                    placeholder="Bijv. VCA, BEI BLS/BHS, NEN 3140 VOP"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-[#0d3b2e] mb-2">Bericht</label>
                  <textarea id="message" name="message" rows={4} maxLength={2000}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition resize-y" />
                </div>

                <div>
                  <label htmlFor="cv" className="block text-sm text-[#0d3b2e] mb-2">Certificaten / CV uploaden (PDF, DOC, max 10MB)</label>
                  <label
                    htmlFor="cv"
                    className="flex items-center justify-center gap-3 w-full px-4 py-6 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#9ed42e] hover:bg-[#f0f7e6]/40 cursor-pointer transition bg-white"
                  >
                    <Upload className="w-5 h-5 text-[#0d3b2e]" />
                    <span className="text-[#6c757d] text-sm">
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
                  className="group w-full bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Versturen...</span>
                    </>
                  ) : (
                    <>
                      <span>Verstuur sollicitatie</span>
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

export default VacatureDetail;
