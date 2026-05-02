import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-[#0d3b2e]" /></div>
        ) : rows.length === 0 ? (
          <div className="p-12 text-center text-[#6c757d]">Nog geen vacatures.</div>
        ) : (
          <div className="overflow-x-auto">
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
                {rows.map((v) => (
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
        )}
      </div>
    </div>
  );
}
