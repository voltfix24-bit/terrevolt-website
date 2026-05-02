import { useEffect, useState } from "react";
import { Loader2, Mail, Phone, MapPin, FileDown } from "lucide-react";
import { CopyButton } from "@/components/terrevolt/CopyableContactLink";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type App = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  region: string | null;
  experience: string | null;
  certifications: string | null;
  availability: string | null;
  message: string | null;
  cv_url: string | null;
  status: string;
  vacancy_id: string | null;
  vacancies?: { title: string; slug: string } | null;
};

const STATUSES = [
  { value: "new", label: "Nieuw" },
  { value: "in_review", label: "In behandeling" },
  { value: "contacted", label: "Contact gehad" },
  { value: "rejected", label: "Afgewezen" },
  { value: "hired", label: "Aangenomen" },
];

export default function AdminApplications() {
  const [rows, setRows] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("job_applications")
      .select("*, vacancies(title, slug)")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as any) || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from("job_applications").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Status bijgewerkt");
    load();
  }

  async function downloadCv(path: string) {
    const { data, error } = await supabase.storage.from("job-applications").createSignedUrl(path, 60);
    if (error || !data) return toast.error("Kon CV niet ophalen");
    window.open(data.signedUrl, "_blank");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl text-[#0d3b2e]">Sollicitaties</h1>
        <p className="text-[#6c757d]">Alle binnengekomen aanmeldingen.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-[#0d3b2e]" /></div>
        ) : rows.length === 0 ? (
          <div className="p-12 text-center text-[#6c757d]">Nog geen sollicitaties.</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datum</TableHead>
                  <TableHead>Naam</TableHead>
                  <TableHead>Vacature</TableHead>
                  <TableHead>Telefoon</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Regio</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actie</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="text-sm text-[#6c757d]">
                      {new Date(a.created_at).toLocaleDateString("nl-NL")}
                    </TableCell>
                    <TableCell className="text-[#0d3b2e]">{a.name}</TableCell>
                    <TableCell>{a.vacancies?.title || "—"}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1">
                        <a href={`tel:${a.phone}`} aria-label={`Bel ${a.phone}. Werkt de bel-app niet? Gebruik de kopieerknop hiernaast.`} className="inline-flex items-center min-h-[40px] py-1 hover:text-[#9ed42e] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] rounded-md transition-colors">{a.phone}</a>
                        <CopyButton type="tel" value={a.phone} />
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1">
                        <a href={`mailto:${a.email}`} aria-label={`Mail ${a.email}. Werkt de mail-app niet? Gebruik de kopieerknop hiernaast.`} className="inline-flex items-center min-h-[40px] py-1 break-all hover:text-[#9ed42e] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] rounded-md transition-colors">{a.email}</a>
                        <CopyButton type="mail" value={a.email} />
                      </span>
                    </TableCell>
                    <TableCell>{a.region || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{STATUSES.find((s) => s.value === a.status)?.label || a.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">Bekijken</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{a.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 text-sm">
                            <div className="flex flex-wrap gap-4 text-[#0d3b2e]">
                              <a href={`mailto:${a.email}`} aria-label={`Mail ${a.email}`} className="flex items-center gap-1.5 min-h-[44px] py-2 break-all hover:text-[#9ed42e] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] rounded-md transition-colors"><Mail className="w-4 h-4 shrink-0" /> {a.email}</a>
                              <a href={`tel:${a.phone}`} aria-label={`Bel ${a.phone}`} className="flex items-center gap-1.5 min-h-[44px] py-2 hover:text-[#9ed42e] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] rounded-md transition-colors"><Phone className="w-4 h-4 shrink-0" /> {a.phone}</a>
                              {a.region && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {a.region}</span>}
                            </div>

                            {a.vacancies && (
                              <div><b>Vacature:</b> {a.vacancies.title}</div>
                            )}
                            {a.availability && <div><b>Beschikbaarheid:</b> {a.availability}</div>}
                            {a.certifications && <div><b>Certificaten:</b> {a.certifications}</div>}
                            {a.experience && (
                              <div>
                                <b>Ervaring:</b>
                                <p className="whitespace-pre-wrap text-[#6c757d] mt-1">{a.experience}</p>
                              </div>
                            )}
                            {a.message && (
                              <div>
                                <b>Bericht:</b>
                                <p className="whitespace-pre-wrap text-[#6c757d] mt-1">{a.message}</p>
                              </div>
                            )}
                            {a.cv_url && (
                              <Button size="sm" variant="outline" onClick={() => downloadCv(a.cv_url!)}>
                                <FileDown className="w-4 h-4 mr-1" /> CV downloaden
                              </Button>
                            )}

                            <div className="flex items-center gap-3 pt-4 border-t">
                              <span className="text-sm">Status:</span>
                              <Select value={a.status} onValueChange={(v) => setStatus(a.id, v)}>
                                <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  {STATUSES.map((s) => (
                                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
