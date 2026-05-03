import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().trim().min(2).max(150),
  slug: z.string().trim().regex(/^[a-z0-9-]+$/, "Alleen kleine letters, cijfers, koppelteken").max(150),
  category: z.string().trim().max(80).optional().or(z.literal("")),
  employment_type: z.string().trim().max(150).optional().or(z.literal("")),
  region: z.string().trim().max(150).optional().or(z.literal("")),
  hours: z.string().trim().max(80).optional().or(z.literal("")),
  level: z.string().trim().max(150).optional().or(z.literal("")),
  work_area: z.string().trim().max(150).optional().or(z.literal("")),
  intro: z.string().trim().max(2000).optional().or(z.literal("")),
  safety_text: z.string().trim().max(2000).optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
  sort_order: z.number().int().min(0).max(9999),
  is_featured: z.boolean(),
});

const linesToArray = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);
const arrayToLines = (a: any) => (Array.isArray(a) ? a.join("\n") : "");

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const defaultProcess = ["Aanmelden", "Kennismaken", "Documenten/check", "Projectmatch", "Start"];

export default function AdminVacancyForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    employment_type: "Loondienst, projectbasis of ZZP",
    region: "Nederland / projectlocaties",
    hours: "32–40 uur of projectbasis",
    level: "MBO / praktijkervaring",
    work_area: "",
    intro: "",
    safety_text: "Bij TerreVolt staat veilig werken voorop. We doen het veilig, of we doen het niet. Afhankelijk van project, opdrachtgever en werkgebied werken we met passende aanwijzingen, LMRA, VCA, BEI/VWI en projectafspraken.",
    status: "draft" as "draft" | "published",
    sort_order: 100,
    is_featured: false,
  });
  const [whatYouDo, setWhatYouDo] = useState("");
  const [requirements, setRequirements] = useState("");
  const [offer, setOffer] = useState("");
  const [processSteps, setProcessSteps] = useState(defaultProcess.join("\n"));
  const [originalSlug, setOriginalSlug] = useState<string>("");

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const { data, error } = await supabase.from("vacancies").select("*").eq("id", id!).maybeSingle();
      if (error || !data) {
        toast.error("Vacature niet gevonden");
        navigate("/admin/vacatures");
        return;
      }
      setForm({
        title: data.title,
        slug: data.slug,
        category: data.category || "",
        employment_type: data.employment_type || "",
        region: data.region || "",
        hours: data.hours || "",
        level: data.level || "",
        work_area: data.work_area || "",
        intro: data.intro || "",
        safety_text: data.safety_text || "",
        status: (data.status as any) || "draft",
        sort_order: data.sort_order ?? 100,
        is_featured: !!data.is_featured,
      });
      setWhatYouDo(arrayToLines(data.what_you_do));
      setRequirements(arrayToLines(data.requirements));
      setOffer(arrayToLines(data.offer));
      setProcessSteps(arrayToLines(data.process_steps) || defaultProcess.join("\n"));
      setOriginalSlug(data.slug);
      setLoading(false);
    })();
  }, [id, isEdit, navigate]);

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function validateForPublish(): string | null {
    if (!form.title.trim()) return "Titel ontbreekt.";
    if (!form.slug.trim()) return "Slug ontbreekt.";
    if (!form.intro.trim()) return "Intro ontbreekt.";
    if (linesToArray(whatYouDo).length < 3) return "Minimaal 3 taken vereist.";
    if (linesToArray(requirements).length < 3) return "Minimaal 3 eisen vereist.";
    if (linesToArray(offer).length < 3) return "Minimaal 3 voordelen vereist.";
    if (!form.safety_text.trim()) return "Veiligheidstekst ontbreekt.";
    return null;
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    if (form.status === "published") {
      const err = validateForPublish();
      if (err) {
        toast.error(`Deze vacature mist nog informatie om te publiceren. ${err}`);
        return;
      }
    }
    setSaving(true);
    const payload = {
      ...parsed.data,
      category: form.category || null,
      employment_type: form.employment_type || null,
      region: form.region || null,
      hours: form.hours || null,
      level: form.level || null,
      work_area: form.work_area || null,
      intro: form.intro || null,
      safety_text: form.safety_text || null,
      what_you_do: linesToArray(whatYouDo),
      requirements: linesToArray(requirements),
      offer: linesToArray(offer),
      process_steps: linesToArray(processSteps),
    };
    try {
      if (isEdit) {
        const { error } = await supabase.from("vacancies").update(payload).eq("id", id!);
        if (error) throw error;
        toast.success("Vacature bijgewerkt");
      } else {
        const { error } = await supabase.from("vacancies").insert([payload as any]);
        if (error) throw error;
        toast.success("Vacature aangemaakt");
      }
      navigate("/admin/vacatures");
    } catch (err: any) {
      toast.error(err.message || "Er ging iets mis");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-[#0d3b2e]" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/admin/vacatures"><ArrowLeft className="w-4 h-4 mr-1" /> Terug</Link>
        </Button>
        <div>
          <h1 className="text-3xl text-[#0d3b2e]">{isEdit ? "Vacature bewerken" : "Nieuwe vacature"}</h1>
        </div>
      </div>

      <form onSubmit={save} className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-gray-200">
        {form.slug && (
          <div className="rounded-md border border-[#9ed42e]/40 bg-[#9ed42e]/5 px-3 py-2 text-sm text-[#0d3b2e] break-all">
            <span className="text-[#6c757d]">Live URL:</span> /vacatures/{form.slug}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Titel *</Label>
            <Input id="title" value={form.title}
              onChange={(e) => {
                set("title", e.target.value);
                if (!isEdit && (!form.slug || form.slug === slugify(form.title))) {
                  set("slug", slugify(e.target.value));
                }
              }} required maxLength={150} />
          </div>
          <div>
            <Label htmlFor="slug">Slug (URL) *</Label>
            <Input id="slug" value={form.slug} onChange={(e) => set("slug", e.target.value)} required maxLength={150} />
            {isEdit && originalSlug && form.slug !== originalSlug && (
              <p className="text-xs text-amber-700 mt-1">Let op: wijzigen van de slug verandert de URL.</p>
            )}
          </div>
          <div>
            <Label htmlFor="category">Categorie</Label>
            <Input id="category" value={form.category} onChange={(e) => set("category", e.target.value)} maxLength={80} />
          </div>
          <div>
            <Label htmlFor="employment_type">Dienstverband</Label>
            <Input id="employment_type" value={form.employment_type} onChange={(e) => set("employment_type", e.target.value)} maxLength={150} />
          </div>
          <div>
            <Label htmlFor="region">Regio</Label>
            <Input id="region" value={form.region} onChange={(e) => set("region", e.target.value)} maxLength={150} />
          </div>
          <div>
            <Label htmlFor="hours">Uren</Label>
            <Input id="hours" value={form.hours} onChange={(e) => set("hours", e.target.value)} maxLength={80} />
          </div>
          <div>
            <Label htmlFor="level">Niveau</Label>
            <Input id="level" value={form.level} onChange={(e) => set("level", e.target.value)} maxLength={150} />
          </div>
          <div>
            <Label htmlFor="work_area">Werkgebied</Label>
            <Input id="work_area" value={form.work_area} onChange={(e) => set("work_area", e.target.value)} maxLength={150} />
          </div>
        </div>

        <div>
          <Label htmlFor="intro">Intro</Label>
          <Textarea id="intro" value={form.intro} onChange={(e) => set("intro", e.target.value)} rows={4} maxLength={2000} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="wyd">Wat ga je doen? (één per regel)</Label>
            <Textarea id="wyd" value={whatYouDo} onChange={(e) => setWhatYouDo(e.target.value)} rows={6} />
          </div>
          <div>
            <Label htmlFor="req">Dit breng je mee (één per regel)</Label>
            <Textarea id="req" value={requirements} onChange={(e) => setRequirements(e.target.value)} rows={6} />
          </div>
          <div>
            <Label htmlFor="off">Wat bieden wij? (één per regel)</Label>
            <Textarea id="off" value={offer} onChange={(e) => setOffer(e.target.value)} rows={6} />
          </div>
          <div>
            <Label htmlFor="proc">Proces stappen (één per regel)</Label>
            <Textarea id="proc" value={processSteps} onChange={(e) => setProcessSteps(e.target.value)} rows={6} />
          </div>
        </div>

        <div>
          <Label htmlFor="safety">Veiligheid voorop</Label>
          <Textarea id="safety" value={form.safety_text} onChange={(e) => set("safety_text", e.target.value)} rows={3} maxLength={2000} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={form.status} onValueChange={(v) => set("status", v as any)}>
              <SelectTrigger id="status"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Concept</SelectItem>
                <SelectItem value="published">Gepubliceerd</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort_order">Sorteervolgorde</Label>
            <Input id="sort_order" type="number" min={0} max={9999}
              value={form.sort_order}
              onChange={(e) => set("sort_order", Number(e.target.value) || 0)} />
          </div>
          <div className="flex items-center gap-3 pb-2">
            <Switch id="featured" checked={form.is_featured} onCheckedChange={(v) => set("is_featured", v)} />
            <Label htmlFor="featured" className="cursor-pointer">Uitgelicht</Label>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" asChild className="w-full sm:w-auto min-h-[44px]">
            <Link to="/admin/vacatures">Annuleren</Link>
          </Button>
          <Button type="submit" disabled={saving} className="w-full sm:w-auto min-h-[44px] bg-[#9ed42e] text-[#0d3b2e] hover:bg-[#8bc41f]">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            Opslaan
          </Button>
        </div>
      </form>
    </div>
  );
}
