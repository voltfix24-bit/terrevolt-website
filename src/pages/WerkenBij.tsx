import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Cable, Anchor, PlugZap, ShieldCheck, Home, ClipboardCheck, Users, Network, Layers, FileText, Briefcase, MessageSquare, ShieldAlert, Award, Loader2, Upload } from "lucide-react";
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
  schakelmonteur: ShieldCheck,
  kabelmonteur: PlugZap,
  aardingsmonteur: Anchor,
  "monteur-huisaansluitingen": Home,
  werkverantwoordelijke: ClipboardCheck,
  "zzp-ploegen": Users,
};

type ProfielCard = { slug: string; label: string };

const waarom = [
  { icon: Network, title: "Werk binnen de netbeheerwereld", description: "Projecten voor netbeheerders en hoofdaannemers binnen de Nederlandse energie-infrastructuur." },
  { icon: Layers, title: "Afwisselende LS/MS-projecten", description: "Van stationsrenovaties tot aarding, schakelwerk en netmontage." },
  { icon: FileText, title: "Duidelijke projectinformatie", description: "Heldere werkomschrijvingen, planningen en afspraken vooraf." },
  { icon: Briefcase, title: "Professionele opdrachtgevers", description: "Werken voor partijen die kwaliteit en betrouwbaarheid waarderen." },
  { icon: ShieldAlert, title: "Veiligheidsgerichte werkomgeving", description: "Werken volgens BEI, NEN 3140 en VCA met aandacht voor risico's." },
  { icon: MessageSquare, title: "Korte lijnen", description: "Direct contact met planning en uitvoering, geen onnodige bureaucratie." },
];

const vereisten = ["VCA", "Relevante ervaring", "Veiligheidsbewust", "Betrouwbaar", "Zelfstandig", "Communicatief", "Passende aanwijzingen waar nodig"];

const formSchema = z.object({
  name: z.string().trim().min(2, "Naam is verplicht").max(100),
  phone: z.string().trim().min(6, "Telefoonnummer is verplicht").max(30),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
  region: z.string().trim().max(100).optional(),
  experience: z.string().trim().max(2000).optional(),
  certifications: z.string().trim().max(1000).optional(),
  availability: z.string().trim().max(200).optional(),
  message: z.string().trim().max(2000).optional(),
});

const WerkenBij = () => {
  usePageMeta("Werken bij TerreVolt | TerreVolt BV", "Werk mee aan de energie-infrastructuur van Nederland. Vacatures en ZZP-mogelijkheden voor LS/MS-, schakel- en aardingsmonteurs.");

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
    const formData = new FormData(e.currentTarget);
    const raw = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      region: String(formData.get("region") || ""),
      experience: String(formData.get("experience") || ""),
      certifications: String(formData.get("certifications") || ""),
      availability: String(formData.get("availability") || ""),
      message: String(formData.get("message") || ""),
    };

    const parsed = formSchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.errors[0];
      toast.error(first?.message || "Controleer het formulier");
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

      const { error: insErr } = await supabase.from("job_applications").insert([{
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        region: parsed.data.region || null,
        experience: parsed.data.experience || null,
        certifications: parsed.data.certifications || null,
        availability: parsed.data.availability || null,
        message: parsed.data.message || null,
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

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main className="pt-16 sm:pt-20">
        {/* HERO */}
        <section className="relative min-h-[70vh] md:min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] py-16 md:py-20">
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
              <div className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Werken bij TerreVolt
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight break-words">
                Werk mee aan de{" "}
                <span className="text-[#9ed42e]">energie-infrastructuur</span> van Nederland
              </h1>
              <p className="text-base sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
                TerreVolt werkt aan laagspannings-, middenspannings- en aardingsprojecten binnen de netbeheerwereld. Wij zoeken vakmensen die veilig, zelfstandig en professioneel kunnen werken.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#aanmelden"
                  className="group w-full sm:w-auto bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Aanmelden als monteur</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/contact"
                  className="w-full sm:w-auto border-2 border-[#9ed42e] text-[#9ed42e] px-8 py-4 rounded-lg hover:bg-[#9ed42e] hover:text-[#0d3b2e] transition-all duration-300 text-center"
                >
                  Contact opnemen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTIE 1: Profielen */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Gezochte profielen</h2>
              <p className="text-base sm:text-xl text-[#6c757d] max-w-2xl mx-auto">
                Vakmensen voor uitvoering binnen LS/MS-infrastructuur en aarding.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {profielen.map((p) => {
                const Icon = slugIconMap[p.slug] || Briefcase;
                return (
                  <Link
                    key={p.slug}
                    to={`/vacatures/${p.slug}`}
                    className="group bg-white border border-gray-200 rounded-xl p-6 min-h-[44px] hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform flex-shrink-0">
                      <Icon className="w-7 h-7 text-[#9ed42e]" strokeWidth={2} />
                    </div>
                    <div className="text-[#0d3b2e] text-base sm:text-lg mb-2 break-words max-w-full">{p.label}</div>
                    <div className="text-xs text-[#9ed42e] inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                      Bekijk vacature <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE 2: Waarom TerreVolt */}
        <section className="py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Waarom TerreVolt
              </div>
              <h2 className="text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Waarom werken met TerreVolt?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {waarom.map((w) => {
                const Icon = w.icon;
                return (
                  <div
                    key={w.title}
                    className="group bg-white rounded-xl p-8 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-[#f0f7e6] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#9ed42e] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#0d3b2e] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl text-[#0d3b2e] mb-3">{w.title}</h3>
                    <p className="text-[#6c757d] leading-relaxed">{w.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE 3: Vereisten */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Wat wij belangrijk vinden</h2>
              <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
                De basis voor een prettige en veilige samenwerking.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {vereisten.map((v) => (
                <div
                  key={v}
                  className="flex items-center gap-2 bg-[#f8f9fa] border border-gray-200 hover:border-[#9ed42e] transition-colors duration-300 rounded-full px-5 py-3"
                >
                  <Award className="w-4 h-4 text-[#9ed42e]" strokeWidth={2.5} />
                  <span className="text-[#0d3b2e]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTIE 4: Aanmeldformulier */}
        <section id="aanmelden" className="py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                  Aanmelden
                </div>
                <h2 className="text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Meld je aan</h2>
                <p className="text-xl text-[#6c757d]">
                  Vul het formulier in. Wij nemen zo snel mogelijk contact op.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-[#0d3b2e] mb-2">Naam *</label>
                    <input id="name" name="name" required maxLength={100}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm text-[#0d3b2e] mb-2">Telefoon *</label>
                    <input id="phone" name="phone" type="tel" required maxLength={30}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-[#0d3b2e] mb-2">E-mail *</label>
                    <input id="email" name="email" type="email" required maxLength={255}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="region" className="block text-sm text-[#0d3b2e] mb-2">Woonplaats / regio</label>
                    <input id="region" name="region" maxLength={100}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm text-[#0d3b2e] mb-2">Ervaring</label>
                  <textarea id="experience" name="experience" rows={3} maxLength={2000}
                    placeholder="Bijv. 5 jaar ervaring in MS-stationsrenovaties en LS-aansluitwerk."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition resize-y" />
                </div>

                <div>
                  <label htmlFor="certifications" className="block text-sm text-[#0d3b2e] mb-2">Bevoegdheden / certificaten</label>
                  <input id="certifications" name="certifications" maxLength={1000}
                    placeholder="Bijv. VCA, BEI BLS/BHS, NEN 3140 VOP"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm text-[#0d3b2e] mb-2">Beschikbaarheid</label>
                  <input id="availability" name="availability" maxLength={200}
                    placeholder="Bijv. fulltime per direct, of 3 dagen p/w"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-[#0d3b2e] mb-2">Bericht</label>
                  <textarea id="message" name="message" rows={4} maxLength={2000}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition resize-y" />
                </div>

                <div>
                  <label htmlFor="cv" className="block text-sm text-[#0d3b2e] mb-2">CV / certificaten (PDF, DOC, max 10MB)</label>
                  <label
                    htmlFor="cv"
                    className="flex items-center justify-center gap-3 w-full px-4 py-6 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#9ed42e] hover:bg-[#f0f7e6]/40 cursor-pointer transition"
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
                      <span>Verstuur aanmelding</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(158, 212, 46, 0.3) 2px, transparent 2px),
                  linear-gradient(90deg, rgba(158, 212, 46, 0.3) 2px, transparent 2px)
                `,
                backgroundSize: "100px 100px",
              }}
            />
          </div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl text-white mb-6">
                Ook als <span className="text-[#9ed42e]">ZZP'er of ploeg</span> beschikbaar?
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Neem contact op — we bespreken graag de mogelijkheden.
              </p>
              <a
                href="/contact"
                className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-10 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 text-lg"
              >
                Neem contact op
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WerkenBij;
