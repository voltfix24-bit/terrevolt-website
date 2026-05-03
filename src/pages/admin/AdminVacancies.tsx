import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, ExternalLink, Search, X, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type Vacancy = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  region: string | null;
  employment_type: string | null;
  status: string;
  is_featured: boolean;
  updated_at: string;
};

export default function AdminVacancies() {
  const [rows, setRows] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [query, setQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<string>("all");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("vacancies")
      .select("id,title,slug,category,region,employment_type,status,is_featured,updated_at")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as Vacancy[]) || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function toggleStatus(v: Vacancy) {
    const next = v.status === "published" ? "draft" : "published";
    const { error } = await supabase.from("vacancies").update({ status: next }).eq("id", v.id);
    if (error) return toast.error(error.message);
    toast.success(next === "published" ? "Gepubliceerd" : "Gedepubliceerd");
    load();
  }

  async function remove(v: Vacancy) {
    const { error } = await supabase.from("vacancies").delete().eq("id", v.id);
    if (error) return toast.error(error.message);
    toast.success("Verwijderd");
    load();
  }

  async function duplicate(v: Vacancy) {
    // Haal volledige rij op (zonder id/timestamps)
    const { data, error } = await supabase.from("vacancies").select("*").eq("id", v.id).maybeSingle();
    if (error || !data) return toast.error("Kon vacature niet kopiëren");
    const { id: _id, created_at: _c, updated_at: _u, ...rest } = data as any;
    const payload = {
      ...rest,
      title: `${data.title} kopie`,
      slug: `${data.slug}-kopie`,
      status: "draft",
      is_featured: false,
    };
    const { error: insErr } = await supabase.from("vacancies").insert([payload]);
    if (insErr) return toast.error(insErr.message);
    toast.success("Vacature gekopieerd als concept.");
    load();
  }

  // Unieke regio's voor filter-dropdown
  const regions = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => { if (r.region) set.add(r.region); });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "nl"));
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((v) => {
      if (q) {
        const hay = `${v.title} ${v.slug} ${v.category ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (regionFilter !== "all" && (v.region ?? "") !== regionFilter) return false;
      if (statusFilter !== "all" && v.status !== statusFilter) return false;
      if (featuredFilter === "yes" && !v.is_featured) return false;
      if (featuredFilter === "no" && v.is_featured) return false;
      return true;
    });
  }, [rows, query, regionFilter, statusFilter, featuredFilter]);

  const hasActiveFilters =
    query !== "" || regionFilter !== "all" || statusFilter !== "all" || featuredFilter !== "all";

  function resetFilters() {
    setQuery("");
    setRegionFilter("all");
    setStatusFilter("all");
    setFeaturedFilter("all");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl text-[#0d3b2e]">Vacatures</h1>
          <p className="text-[#6c757d]">Beheer alle vacatures.</p>
        </div>
        <Button asChild className="bg-[#9ed42e] text-[#0d3b2e] hover:bg-[#8bc41f] w-full sm:w-auto">
          <Link to="/admin/vacatures/nieuw"><Plus className="w-4 h-4 mr-1" /> Nieuwe vacature</Link>
        </Button>
      </div>

      {/* Zoek- en filterbalk */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6c757d]" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek op titel, slug of categorie…"
              className="pl-9 min-h-[44px]"
              aria-label="Zoek vacatures"
            />
          </div>
          <div className="md:col-span-3">
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="min-h-[44px]" aria-label="Filter op regio"><SelectValue placeholder="Regio" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle regio's</SelectItem>
                {regions.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="min-h-[44px]" aria-label="Filter op status"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle statussen</SelectItem>
                <SelectItem value="published">Gepubliceerd</SelectItem>
                <SelectItem value="draft">Concept</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
              <SelectTrigger className="min-h-[44px]" aria-label="Filter op uitgelicht"><SelectValue placeholder="Uitgelicht" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle</SelectItem>
                <SelectItem value="yes">Alleen uitgelicht</SelectItem>
                <SelectItem value="no">Niet uitgelicht</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-[#6c757d]">
          <span>{filtered.length} van {rows.length} vacatures</span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8">
              <X className="w-3.5 h-3.5 mr-1" /> Filters wissen
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-[#0d3b2e]" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-[#6c757d]">
            {rows.length === 0 ? "Nog geen vacatures." : "Geen vacatures gevonden met deze filters."}
          </div>
        ) : (
          <>
            {/* Mobile card view */}
            <ul className="md:hidden divide-y divide-gray-200">
              {filtered.map((v) => (
                <li key={v.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-[#0d3b2e] break-words">{v.title}</span>
                        <a href={`/vacatures/${v.slug}`} target="_blank" rel="noreferrer" className="text-[#9ed42e] inline-flex items-center min-h-[32px]" aria-label="Open vacature in nieuw tabblad">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <div className="text-xs text-[#6c757d] mt-1 break-words">
                        {[v.category, v.region, v.employment_type].filter(Boolean).join(" · ") || "—"}
                      </div>
                    </div>
                    <Badge variant={v.status === "published" ? "default" : "secondary"}
                      className={`shrink-0 ${v.status === "published" ? "bg-[#9ed42e] text-[#0d3b2e] hover:bg-[#9ed42e]" : ""}`}>
                      {v.status === "published" ? "Gepubliceerd" : "Concept"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#6c757d]">
                    <span>{v.is_featured ? "★ Uitgelicht" : ""}</span>
                    <span>Bijgewerkt: {new Date(v.updated_at).toLocaleDateString("nl-NL")}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    <Button variant="outline" className="w-full min-h-[44px]" onClick={() => toggleStatus(v)}>
                      {v.status === "published" ? <><EyeOff className="w-4 h-4 mr-1.5" /> Depubliceren</> : <><Eye className="w-4 h-4 mr-1.5" /> Publiceren</>}
                    </Button>
                    <Button variant="outline" className="w-full min-h-[44px]" asChild>
                      <Link to={`/admin/vacatures/${v.id}/bewerken`}><Pencil className="w-4 h-4 mr-1.5" /> Bewerken</Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="w-full min-h-[44px] text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                          <Trash2 className="w-4 h-4 mr-1.5" /> Verwijderen
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Vacature verwijderen?</AlertDialogTitle>
                          <AlertDialogDescription>
                            "{v.title}" wordt definitief verwijderd. Dit kan niet ongedaan worden gemaakt.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuleren</AlertDialogCancel>
                          <AlertDialogAction onClick={() => remove(v)} className="bg-red-600 hover:bg-red-700">Verwijderen</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </li>
              ))}
            </ul>

            {/* Desktop table view */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titel</TableHead>
                    <TableHead>Categorie</TableHead>
                    <TableHead>Regio</TableHead>
                    <TableHead>Dienstverband</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uitgelicht</TableHead>
                    <TableHead>Laatst bijgewerkt</TableHead>
                    <TableHead className="text-right">Acties</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell className="font-medium text-[#0d3b2e]">
                        <div className="flex items-center gap-2">
                          {v.title}
                          <a href={`/vacatures/${v.slug}`} target="_blank" rel="noreferrer" className="text-[#9ed42e]">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>{v.category || "—"}</TableCell>
                      <TableCell>{v.region || "—"}</TableCell>
                      <TableCell>{v.employment_type || "—"}</TableCell>
                      <TableCell>
                        <Badge variant={v.status === "published" ? "default" : "secondary"}
                          className={v.status === "published" ? "bg-[#9ed42e] text-[#0d3b2e] hover:bg-[#9ed42e]" : ""}>
                          {v.status === "published" ? "Gepubliceerd" : "Concept"}
                        </Badge>
                      </TableCell>
                      <TableCell>{v.is_featured ? "Ja" : "—"}</TableCell>
                      <TableCell className="text-sm text-[#6c757d]">
                        {new Date(v.updated_at).toLocaleDateString("nl-NL")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="icon" variant="ghost" title={v.status === "published" ? "Depubliceren" : "Publiceren"} onClick={() => toggleStatus(v)}>
                            {v.status === "published" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button size="icon" variant="ghost" asChild title="Bewerken">
                            <Link to={`/admin/vacatures/${v.id}/bewerken`}><Pencil className="w-4 h-4" /></Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="icon" variant="ghost" title="Verwijderen"><Trash2 className="w-4 h-4 text-red-600" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Vacature verwijderen?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  "{v.title}" wordt definitief verwijderd. Dit kan niet ongedaan worden gemaakt.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuleren</AlertDialogCancel>
                                <AlertDialogAction onClick={() => remove(v)} className="bg-red-600 hover:bg-red-700">
                                  Verwijderen
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
