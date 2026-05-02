import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin, Upload, Loader2, Network, HardHat, Factory, Briefcase, Users } from "lucide-react";
import { z } from "zod";
import { Header } from "@/components/terrevolt/Header";
import { Footer } from "@/components/terrevolt/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { usePageMeta } from "../hooks/usePageMeta";
import { company, addressOneLine, telHref, mailHref } from "@/config/company";
import { CopyButton } from "@/components/terrevolt/CopyableContactLink";

const contactCards = [
  { icon: Phone, title: "Telefoon", value: company.phone.display, href: telHref },
  { icon: Mail, title: "E-mail", value: company.email, href: mailHref },
  { icon: MapPin, title: "Adres", value: addressOneLine, href: null },
];

const requestTypes = [
  "LS/MS Netmontage",
  "Stationsrenovatie",
  "Schakelwerk",
  "Aardingsoplossingen",
  "Meten & beproeven",
  "Huisaansluitingen",
  "Monteurs/ploeg nodig",
  "Anders",
];

const voorWie = [
  { icon: Network, title: "Netbeheerders", description: "Ondersteuning bij LS/MS-netmontage, stationswerk en aarding." },
  { icon: HardHat, title: "Hoofdaannemers", description: "Vakbekwame inzet binnen grotere infra- en bouwprojecten." },
  { icon: Factory, title: "Industrie & grootverbruik", description: "Aansluitingen, aarding en uitvoering binnen industriële omgevingen." },
];

const schema = z.object({
  name: z.string().trim().min(2, "Naam is verplicht").max(100),
  company: z.string().trim().max(150).optional(),
  phone: z.string().trim().max(30).optional(),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
  request_type: z.string().trim().max(100).optional(),
  location: z.string().trim().max(150).optional(),
  start_date: z.string().trim().max(50).optional(),
  description: z.string().trim().max(3000).optional(),
});

const Contact = () => {
  usePageMeta("Contact | TerreVolt BV", "Neem contact op met TerreVolt voor LS/MS-projecten, stationsrenovatie, schakelwerk, aardingsoplossingen en metingen.");

  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [intent, setIntent] = useState<"project" | "monteur" | "sollicitatie">("project");

  const intents: { id: "project" | "monteur" | "sollicitatie"; label: string; icon: typeof Briefcase; helper: string }[] = [
    { id: "project", label: "Project bespreken", icon: Briefcase, helper: "Voor netbeheerders, hoofdaannemers en industrie." },
    { id: "monteur", label: "Monteur / ploeg nodig", icon: Users, helper: "Inhuur van vakbekwame uitvoering binnen jouw project." },
    { id: "sollicitatie", label: "Sollicitatie / ZZP", icon: HardHat, helper: "Aanmelden als monteur of ZZP'er." },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      request_type: String(fd.get("request_type") || ""),
      location: String(fd.get("location") || ""),
      start_date: String(fd.get("start_date") || ""),
      description: String(fd.get("description") || ""),
    };

    const parsed = schema.safeParse(raw);
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
      let attachment_url: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop() || "bin";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("contact-attachments")
          .upload(path, file, { contentType: file.type || undefined });
        if (upErr) throw upErr;
        attachment_url = path;
      }

      const intentLabel =
        intent === "project" ? "Project bespreken" :
        intent === "monteur" ? "Monteur/ploeg nodig" : "Sollicitatie/ZZP";
      const description = parsed.data.description || null;

      const { error: insErr } = await supabase.from("contact_requests").insert([{
        name: parsed.data.name,
        company: parsed.data.company || null,
        phone: parsed.data.phone || null,
        email: parsed.data.email,
        request_type: parsed.data.request_type || null,
        location: parsed.data.location || null,
        start_date: parsed.data.start_date || null,
        description,
        attachment_url,
        intent,
        intent_label: intentLabel,
      } as any]);
      if (insErr) throw insErr;

      toast.success("Aanvraag verstuurd. We nemen zo snel mogelijk contact op.");
      (e.target as HTMLFormElement).reset();
      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error(`Er ging iets mis. Probeer het later opnieuw of mail ons op ${company.email}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main className="pt-16 sm:pt-20">
        {/* HERO */}
        <section className="relative sm:min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] py-14 sm:py-20">
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
              <div className="inline-block bg-[#9ed42e] text-[#0d3b2e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                Contact
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight hyphens-nl">
                Een LS/MS-project of<br />
                <span className="text-[#9ed42e]">aardingsvraagstuk</span> bespreken?
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
                Neem contact op met TerreVolt voor ondersteuning bij netmontage, stationsrenovatie, schakelwerk, aardingsoplossingen, metingen of inzet van monteurs en ploegen.
              </p>

              <a
                href="#aanvraag"
                className="group inline-flex bg-[#9ed42e] text-[#0d3b2e] px-8 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 items-center justify-center gap-2"
              >
                <span>Stuur een aanvraag</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* SECTIE 1: Contactgegevens */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {contactCards.map((c) => {
                const Icon = c.icon;
                const copyType: "tel" | "mail" | null =
                  c.href === telHref ? "tel" : c.href === mailHref ? "mail" : null;
                const Wrapper: any = c.href ? "a" : "div";
                return (
                  <div key={c.title} className="relative">
                    <Wrapper
                      {...(c.href ? { href: c.href, "aria-label": copyType ? `${c.title}: ${c.value}. Werkt de app niet? Gebruik de kopieerknop rechtsboven.` : `${c.title}: ${c.value}` } : {})}
                      className={`group bg-white border border-gray-200 rounded-xl p-8 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 text-center block min-h-[44px] ${c.href ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] focus-visible:ring-offset-2 active:scale-[0.99]" : ""}`}
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-[#0d3b2e] to-[#1a4a36] rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform">
                        <Icon className="w-7 h-7 text-[#9ed42e]" strokeWidth={2} />
                      </div>
                      <h3 className="text-sm tracking-wider uppercase text-[#6c757d] mb-2">{c.title}</h3>
                      <p className={`text-lg sm:text-xl text-[#0d3b2e] break-words ${c.href ? "group-hover:text-[#1a4a36] group-hover:underline underline-offset-4 decoration-[#9ed42e]" : ""}`}>{c.value}</p>
                    </Wrapper>
                    {copyType && (
                      <CopyButton
                        type={copyType}
                        value={c.value}
                        className="absolute top-3 right-3 inline-flex items-center justify-center min-h-[40px] min-w-[40px] p-2 rounded-md bg-white/0 hover:bg-[#f0f7e6] text-[#6c757d] hover:text-[#0d3b2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] transition-colors"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTIE 2: Aanvraagformulier */}
        <section id="aanvraag" className="py-16 md:py-24 bg-[#f8f9fa]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-block bg-[#0d3b2e] text-[#9ed42e] px-4 py-2 rounded-full text-sm mb-6 tracking-wider uppercase">
                  Projectaanvraag
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Stuur een aanvraag</h2>
                <p className="text-xl text-[#6c757d]">
                  Vul het formulier in. We nemen zo snel mogelijk contact op.
                </p>
              </div>

              {/* Intentie-keuze */}
              <fieldset className="mb-6">
                <legend className="block text-sm text-[#0d3b2e] mb-3">Waar wil je het over hebben?</legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {intents.map((it) => {
                    const Icon = it.icon;
                    const active = intent === it.id;
                    return (
                      <button
                        key={it.id}
                        type="button"
                        onClick={() => setIntent(it.id)}
                        aria-pressed={active}
                        className={`flex items-start gap-2.5 text-left rounded-xl border px-3.5 py-3 min-h-[60px] transition-colors ${
                          active
                            ? "bg-[#f0f7e6] border-[#9ed42e] ring-1 ring-[#9ed42e]"
                            : "bg-white border-gray-200 hover:border-[#9ed42e]"
                        }`}
                      >
                        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${active ? "text-[#0d3b2e]" : "text-[#6c757d]"}`} strokeWidth={2} />
                        <span className="min-w-0">
                          <span className="block text-sm text-[#0d3b2e]">{it.label}</span>
                          <span className="block text-[11px] text-[#6c757d] leading-snug mt-0.5">{it.helper}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {intent === "sollicitatie" && (
                <div className="mb-6 flex items-start gap-3 bg-[#f0f7e6] border border-[#9ed42e] rounded-xl p-4">
                  <HardHat className="w-5 h-5 text-[#0d3b2e] flex-shrink-0 mt-0.5" strokeWidth={2.2} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-[#0d3b2e]">
                      Wil je je aanmelden als monteur of ZZP'er? Ga naar Werken bij TerreVolt voor het juiste aanmeldformulier en alle profielen.
                    </div>
                    <Link
                      to="/werken-bij"
                      className="inline-flex items-center gap-1.5 mt-2 text-sm text-[#0d3b2e] underline underline-offset-4 hover:text-[#1a4a36]"
                    >
                      Naar Werken bij TerreVolt <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-6"
              >
                <input type="hidden" name="intent" value={intent} readOnly />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-[#0d3b2e] mb-2">Naam *</label>
                    <input id="name" name="name" required maxLength={100}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm text-[#0d3b2e] mb-2">Bedrijf</label>
                    <input id="company" name="company" maxLength={150}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm text-[#0d3b2e] mb-2">Telefoon</label>
                    <input id="phone" name="phone" type="tel" maxLength={30}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-[#0d3b2e] mb-2">E-mail *</label>
                    <input id="email" name="email" type="email" required maxLength={255}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                  <div>
                    <label htmlFor="request_type" className="block text-sm text-[#0d3b2e] mb-2">Type aanvraag</label>
                    <select id="request_type" name="request_type" defaultValue=""
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition">
                      <option value="" disabled>Kies een optie</option>
                      {requestTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm text-[#0d3b2e] mb-2">Locatie / regio</label>
                    <input id="location" name="location" maxLength={150}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                  </div>
                </div>

                <div>
                  <label htmlFor="start_date" className="block text-sm text-[#0d3b2e] mb-2">Gewenste startdatum</label>
                  <input id="start_date" name="start_date" maxLength={50}
                    placeholder="Bijv. zo snel mogelijk, of week 12"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition" />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm text-[#0d3b2e] mb-2">Korte omschrijving</label>
                  <textarea id="description" name="description" rows={5} maxLength={3000}
                    placeholder="Vertel kort over het project, scope en eventuele randvoorwaarden."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#9ed42e] focus:outline-none focus:ring-2 focus:ring-[#9ed42e]/20 transition resize-y" />
                </div>

                <div>
                  <label htmlFor="attachment" className="block text-sm text-[#0d3b2e] mb-2">Bijlage (PDF, DOC, afbeelding — max 10MB)</label>
                  <label
                    htmlFor="attachment"
                    className="flex items-center justify-center gap-3 w-full px-4 py-6 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#9ed42e] hover:bg-[#f0f7e6]/40 cursor-pointer transition"
                  >
                    <Upload className="w-5 h-5 text-[#0d3b2e]" />
                    <span className="text-[#6c757d] text-sm">
                      {file ? file.name : "Klik om bestand te kiezen"}
                    </span>
                  </label>
                  <input
                    id="attachment"
                    name="attachment"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dwg"
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
                      <span>Verstuur aanvraag</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* SECTIE 3: Voor wie */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0d3b2e] mb-4">Voor wie werken wij?</h2>
              <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
                TerreVolt werkt voor partijen binnen de netbeheerwereld.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {voorWie.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="group bg-[#f8f9fa] rounded-xl p-8 border border-gray-200 hover:border-[#9ed42e] hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <div className="w-16 h-16 bg-[#f0f7e6] rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#9ed42e] transition-colors duration-300">
                      <Icon className="w-8 h-8 text-[#0d3b2e] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl text-[#0d3b2e] mb-3">{v.title}</h3>
                    <p className="text-[#6c757d] leading-relaxed">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#0d3b2e] via-[#1a4a36] to-[#0d3b2e] relative overflow-hidden">
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

          <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
                Liever <span className="text-[#9ed42e]">direct contact</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Bel of mail TerreVolt voor een snelle projectafstemming.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={telHref}
                  aria-label={`Bel TerreVolt op ${company.phone.display}. Werkt de bel-app niet? Gebruik de kopieerknop hiernaast.`}
                  className="inline-flex items-center gap-2 bg-[#9ed42e] text-[#0d3b2e] px-10 py-4 rounded-lg hover:bg-[#8bc41f] transition-all duration-300 text-lg"
                >
                  <Phone className="w-5 h-5" />
                  Bel TerreVolt
                </a>
                <CopyButton
                  type="tel"
                  value={company.phone.e164}
                  ariaLabel={`Telefoonnummer kopiëren: ${company.phone.display}`}
                  className="inline-flex items-center gap-2 px-5 py-3 min-h-[48px] rounded-lg border-2 border-[#9ed42e] text-[#9ed42e] hover:bg-[#9ed42e] hover:text-[#0d3b2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] transition-colors"
                />
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Geen bel-app op dit apparaat? Kopieer het nummer met de knop hiernaast.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
