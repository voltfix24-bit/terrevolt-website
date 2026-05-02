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
          <>
            {/* Mobile card view */}
            <ul className="md:hidden divide-y divide-gray-200">
              {rows.map((a) => (
                <li key={a.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-[#0d3b2e] font-medium break-words">{a.name}</div>
                      <div className="text-xs text-[#6c757d] mt-0.5">
                        {new Date(a.created_at).toLocaleDateString("nl-NL")}
                        {a.vacancies?.title ? ` · ${a.vacancies.title}` : ""}
                        {a.region ? ` · ${a.region}` : ""}
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {STATUSES.find((s) => s.value === a.status)?.label || a.status}
                    </Badge>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center gap-1 min-w-0">
                      <a href={`tel:${a.phone}`} aria-label={`Bel ${a.phone}. Werkt de bel-app niet? Gebruik de kopieerknop hiernaast.`} className="inline-flex items-center gap-1.5 min-h-[40px] py-1 hover:text-[#9ed42e] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] rounded-md transition-colors min-w-0"><Phone className="w-4 h-4 shrink-0" /> <span className="break-all">{a.phone}</span></a>
                      <CopyButton type="tel" value={a.phone} />
                    </div>
                    <div className="flex items-center gap-1 min-w-0">
                      <a href={`mailto:${a.email}`} aria-label={`Mail ${a.email}. Werkt de mail-app niet? Gebruik de kopieerknop hiernaast.`} className="inline-flex items-center gap-1.5 min-h-[40px] py-1 hover:text-[#9ed42e] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] rounded-md transition-colors min-w-0"><Mail className="w-4 h-4 shrink-0" /> <span className="break-all">{a.email}</span></a>
                      <CopyButton type="mail" value={a.email} />
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full min-h-[44px]">Bekijken</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl w-[calc(100vw-2rem)] sm:w-full max-h-[90vh] overflow-y-auto">
                      {renderDetail(a, setStatus, downloadCv)}
                    </DialogContent>
                  </Dialog>
                </li>
              ))}
            </ul>

            {/* Desktop table view */}
            <div className="hidden md:block overflow-x-auto">
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
                          <DialogContent className="max-w-2xl w-[calc(100vw-2rem)] sm:w-full max-h-[90vh] overflow-y-auto">
                            {renderDetail(a, setStatus, downloadCv)}
                          </DialogContent>
                        </Dialog>
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

function renderDetail(
  a: App,
  setStatus: (id: string, status: string) => void,
  downloadCv: (path: string) => void,
) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="break-words">{a.name}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 text-sm">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 text-[#0d3b2e]">
          <span className="flex items-center gap-1 min-w-0">
            <a href={`mailto:${a.email}`} aria-label={`Mail ${a.email}. Werkt de mail-app niet? Gebruik de kopieerknop hiernaast.`} className="flex items-center gap-1.5 min-h-[44px] py-2 hover:text-[#9ed42e] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] rounded-md transition-colors min-w-0"><Mail className="w-4 h-4 shrink-0" /> <span className="break-all">{a.email}</span></a>
            <CopyButton type="mail" value={a.email} />
          </span>
          <span className="flex items-center gap-1 min-w-0">
            <a href={`tel:${a.phone}`} aria-label={`Bel ${a.phone}. Werkt de bel-app niet? Gebruik de kopieerknop hiernaast.`} className="flex items-center gap-1.5 min-h-[44px] py-2 hover:text-[#9ed42e] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] rounded-md transition-colors min-w-0"><Phone className="w-4 h-4 shrink-0" /> <span className="break-all">{a.phone}</span></a>
            <CopyButton type="tel" value={a.phone} />
          </span>
          {a.region && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 shrink-0" /> {a.region}</span>}
        </div>

        {a.vacancies && (<div className="break-words"><b>Vacature:</b> {a.vacancies.title}</div>)}
        {a.availability && <div className="break-words"><b>Beschikbaarheid:</b> {a.availability}</div>}
        {a.certifications && <div className="break-words"><b>Certificaten:</b> {a.certifications}</div>}
        {a.experience && (
          <div>
            <b>Ervaring:</b>
            <p className="whitespace-pre-wrap break-words text-[#6c757d] mt-1">{a.experience}</p>
          </div>
        )}
        {a.message && (
          <div>
            <b>Bericht:</b>
            <p className="whitespace-pre-wrap break-words text-[#6c757d] mt-1">{a.message}</p>
          </div>
        )}
        {a.cv_url && (
          <Button size="sm" variant="outline" onClick={() => downloadCv(a.cv_url!)} className="w-full sm:w-auto min-h-[44px]">
            <FileDown className="w-4 h-4 mr-1" /> CV downloaden
          </Button>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-4 border-t">
          <span className="text-sm">Status:</span>
          <Select value={a.status} onValueChange={(v) => setStatus(a.id, v)}>
            <SelectTrigger className="w-full sm:w-[200px] min-h-[44px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
