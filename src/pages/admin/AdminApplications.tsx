import { useEffect, useMemo, useState } from "react";
import { Loader2, Mail, Phone, MapPin, FileDown, Search, X, MessageCircle, Save, CalendarCheck, Download } from "lucide-react";
import { CopyButton } from "@/components/terrevolt/CopyableContactLink";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { whatsappLink } from "@/lib/whatsapp";
import { waTemplates, inDateRange, type DateRange } from "@/lib/adminUtils";
import { downloadCsv } from "@/lib/csvExport";

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
  profile: string | null;
  admin_notes: string | null;
  last_contacted_at: string | null;
  vacancies?: { title: string; slug: string } | null;
};

const STATUSES = [
  { value: "new", label: "Nieuw" },
  { value: "in_review", label: "In behandeling" },
  { value: "contacted", label: "Contact gehad" },
  { value: "not_reached", label: "Niet bereikbaar" },
  { value: "documents_needed", label: "Documenten nodig" },
  { value: "matched", label: "Gematcht" },
  { value: "rejected", label: "Afgewezen" },
  { value: "hired", label: "Aangenomen" },
  { value: "archived", label: "Gearchiveerd" },
];
const STATUS_LABEL = (v: string) => STATUSES.find((s) => s.value === v)?.label || v;

export default function AdminApplications() {
  const [rows, setRows] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [vacancyFilter, setVacancyFilter] = useState<string>("all");
  const [profileFilter, setProfileFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange>("all");

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

  async function saveNote(id: string, admin_notes: string) {
    const { error } = await supabase.from("job_applications").update({ admin_notes }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Notitie opgeslagen");
    load();
  }

  async function logContact(id: string) {
    const { error } = await supabase
      .from("job_applications")
      .update({ last_contacted_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Contactmoment vastgelegd");
    load();
  }

  async function downloadCv(path: string) {
    const { data, error } = await supabase.storage.from("job-applications").createSignedUrl(path, 60);
    if (error || !data) {
      return toast.error("Bestand kon niet worden geopend. Controleer of het bestand nog bestaat.");
    }
    window.open(data.signedUrl, "_blank");
  }

  const vacancies = useMemo(() => {
    const map = new Map<string, string>();
    rows.forEach((r) => {
      if (r.vacancies?.title && r.vacancy_id) map.set(r.vacancy_id, r.vacancies.title);
    });
    return Array.from(map.entries()).sort((a, b) => a[1].localeCompare(b[1], "nl"));
  }, [rows]);

  const profiles = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => { if (r.profile) set.add(r.profile); });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "nl"));
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (q) {
        const hay = `${r.name} ${r.email} ${r.phone} ${r.region ?? ""} ${r.vacancies?.title ?? ""} ${r.profile ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (vacancyFilter !== "all" && r.vacancy_id !== vacancyFilter) return false;
      if (profileFilter !== "all" && (r.profile ?? "") !== profileFilter) return false;
      if (!inDateRange(r.created_at, dateRange)) return false;
      return true;
    });
  }, [rows, query, statusFilter, vacancyFilter, profileFilter, dateRange]);

  const hasActiveFilters = query !== "" || statusFilter !== "all" || vacancyFilter !== "all" || profileFilter !== "all" || dateRange !== "all";
  function resetFilters() {
    setQuery("");
    setStatusFilter("all");
    setVacancyFilter("all");
    setProfileFilter("all");
    setDateRange("all");
  }

  function exportCsv() {
    downloadCsv(
      `sollicitaties-${new Date().toISOString().slice(0, 10)}.csv`,
      ["datum", "naam", "telefoon", "email", "profiel/vacature", "regio", "beschikbaarheid", "status", "notitie"],
      filtered.map((r) => [
        new Date(r.created_at).toLocaleDateString("nl-NL"),
        r.name, r.phone, r.email,
        r.vacancies?.title || r.profile || "",
        r.region ?? "", r.availability ?? "",
        STATUS_LABEL(r.status), r.admin_notes ?? "",
      ]),
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl text-[#0d3b2e]">Sollicitaties</h1>
          <p className="text-[#6c757d]">Alle binnengekomen aanmeldingen.</p>
        </div>
        <Button variant="outline" onClick={exportCsv} className="min-h-[44px] w-full sm:w-auto" disabled={filtered.length === 0}>
          <Download className="w-4 h-4 mr-1.5" /> Export CSV
        </Button>
      </div>

      {/* Zoek- en filterbalk */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-12 lg:col-span-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6c757d]" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek naam, e-mail, telefoon, regio of vacature…"
              className="pl-9 min-h-[44px]"
              aria-label="Zoek sollicitaties"
            />
          </div>
          <div className="md:col-span-6 lg:col-span-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="min-h-[44px]" aria-label="Filter op status"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle statussen</SelectItem>
                {STATUSES.map((s) => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-6 lg:col-span-2">
            <Select value={vacancyFilter} onValueChange={setVacancyFilter}>
              <SelectTrigger className="min-h-[44px]" aria-label="Filter op vacature"><SelectValue placeholder="Vacature" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle vacatures</SelectItem>
                {vacancies.map(([id, title]) => (<SelectItem key={id} value={id}>{title}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-6 lg:col-span-2">
            <Select value={profileFilter} onValueChange={setProfileFilter}>
              <SelectTrigger className="min-h-[44px]" aria-label="Filter op profiel"><SelectValue placeholder="Profiel" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle profielen</SelectItem>
                {profiles.map((p) => (<SelectItem key={p} value={p}>{p}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-6 lg:col-span-2">
            <Select value={dateRange} onValueChange={(v) => setDateRange(v as DateRange)}>
              <SelectTrigger className="min-h-[44px]" aria-label="Filter op datum"><SelectValue placeholder="Datum" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alles</SelectItem>
                <SelectItem value="today">Vandaag</SelectItem>
                <SelectItem value="7d">Laatste 7 dagen</SelectItem>
                <SelectItem value="30d">Laatste 30 dagen</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-[#6c757d]">
          <span>{filtered.length} van {rows.length} sollicitaties</span>
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
            {rows.length === 0 ? "Nog geen sollicitaties." : "Geen sollicitaties gevonden met deze filters."}
          </div>
        ) : (
          <>
            {/* Mobile card view */}
            <ul className="md:hidden divide-y divide-gray-200">
              {filtered.map((a) => (
                <li key={a.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-[#0d3b2e] font-medium break-words">{a.name}</div>
                      <div className="text-xs text-[#6c757d] mt-0.5">
                        {new Date(a.created_at).toLocaleDateString("nl-NL")}
                        {a.vacancies?.title ? ` · ${a.vacancies.title}` : a.profile ? ` · ${a.profile}` : ""}
                        {a.region ? ` · ${a.region}` : ""}
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">{STATUS_LABEL(a.status)}</Badge>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center gap-1 min-w-0">
                      <a href={`tel:${a.phone}`} aria-label={`Bel ${a.phone}.`} className="inline-flex items-center gap-1.5 min-h-[40px] py-1 hover:text-[#9ed42e] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] rounded-md transition-colors min-w-0"><Phone className="w-4 h-4 shrink-0" /> <span className="break-all">{a.phone}</span></a>
                      <CopyButton type="tel" value={a.phone} />
                    </div>
                    <div className="flex items-center gap-1 min-w-0">
                      <a href={`mailto:${a.email}`} aria-label={`Mail ${a.email}.`} className="inline-flex items-center gap-1.5 min-h-[40px] py-1 hover:text-[#9ed42e] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ed42e] rounded-md transition-colors min-w-0"><Mail className="w-4 h-4 shrink-0" /> <span className="break-all">{a.email}</span></a>
                      <CopyButton type="mail" value={a.email} />
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full min-h-[44px]">Bekijken</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl w-[calc(100vw-2rem)] sm:w-full max-h-[90vh] overflow-y-auto">
                      <Detail a={a} setStatus={setStatus} downloadCv={downloadCv} saveNote={saveNote} logContact={logContact} />
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
                  {filtered.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="text-sm text-[#6c757d]">{new Date(a.created_at).toLocaleDateString("nl-NL")}</TableCell>
                      <TableCell className="text-[#0d3b2e]">{a.name}</TableCell>
                      <TableCell>{a.vacancies?.title || a.profile || "—"}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1">
                          <a href={`tel:${a.phone}`} className="inline-flex items-center min-h-[40px] py-1 hover:text-[#9ed42e] hover:underline underline-offset-4 rounded-md transition-colors">{a.phone}</a>
                          <CopyButton type="tel" value={a.phone} />
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1">
                          <a href={`mailto:${a.email}`} className="inline-flex items-center min-h-[40px] py-1 break-all hover:text-[#9ed42e] hover:underline underline-offset-4 rounded-md transition-colors">{a.email}</a>
                          <CopyButton type="mail" value={a.email} />
                        </span>
                      </TableCell>
                      <TableCell>{a.region || "—"}</TableCell>
                      <TableCell><Badge variant="secondary">{STATUS_LABEL(a.status)}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">Bekijken</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl w-[calc(100vw-2rem)] sm:w-full max-h-[90vh] overflow-y-auto">
                            <Detail a={a} setStatus={setStatus} downloadCv={downloadCv} saveNote={saveNote} logContact={logContact} />
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

function Detail({
  a, setStatus, downloadCv, saveNote, logContact,
}: {
  a: App;
  setStatus: (id: string, status: string) => void;
  downloadCv: (path: string) => void;
  saveNote: (id: string, notes: string) => void;
  logContact: (id: string) => void;
}) {
  const [notes, setNotes] = useState(a.admin_notes || "");
  const wa = whatsappLink(a.phone);
  return (
    <>
      <DialogHeader>
        <DialogTitle className="break-words">{a.name}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 text-sm">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 text-[#0d3b2e]">
          <span className="flex items-center gap-1 min-w-0">
            <a href={`mailto:${a.email}`} className="flex items-center gap-1.5 min-h-[44px] py-2 hover:text-[#9ed42e] hover:underline underline-offset-4 rounded-md transition-colors min-w-0"><Mail className="w-4 h-4 shrink-0" /> <span className="break-all">{a.email}</span></a>
            <CopyButton type="mail" value={a.email} />
          </span>
          <span className="flex items-center gap-1 min-w-0">
            <a href={`tel:${a.phone}`} className="flex items-center gap-1.5 min-h-[44px] py-2 hover:text-[#9ed42e] hover:underline underline-offset-4 rounded-md transition-colors min-w-0"><Phone className="w-4 h-4 shrink-0" /> <span className="break-all">{a.phone}</span></a>
            <CopyButton type="tel" value={a.phone} />
          </span>
          {a.region && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 shrink-0" /> {a.region}</span>}
        </div>

        {/* Snelle acties */}
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" variant="outline" className="min-h-[44px]">
            <a href={`tel:${a.phone}`}><Phone className="w-4 h-4 mr-1.5" /> Bellen</a>
          </Button>
          <Button asChild size="sm" variant="outline" className="min-h-[44px]">
            <a href={`mailto:${a.email}`}><Mail className="w-4 h-4 mr-1.5" /> Mailen</a>
          </Button>
          {wa ? (
            <>
              <Button asChild size="sm" variant="outline" className="min-h-[44px]">
                <a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="w-4 h-4 mr-1.5" /> WhatsApp</a>
              </Button>
              <Button asChild size="sm" variant="outline" className="min-h-[44px]">
                <a href={whatsappLink(a.phone, waTemplates.application(a.name))!} target="_blank" rel="noreferrer"><MessageCircle className="w-4 h-4 mr-1.5" /> WhatsApp-template</a>
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" disabled title="Geen geldig telefoonnummer" className="min-h-[44px]">
              <MessageCircle className="w-4 h-4 mr-1.5" /> WhatsApp
            </Button>
          )}
        </div>

        {a.vacancies && (<div className="break-words"><b>Vacature:</b> {a.vacancies.title}</div>)}
        {!a.vacancies && a.profile && (<div className="break-words"><b>Profiel:</b> {a.profile}</div>)}
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
            <FileDown className="w-4 h-4 mr-1" /> CV / certificaten openen
          </Button>
        )}

        {/* Interne notitie */}
        <div className="pt-4 border-t space-y-2">
          <label className="text-sm font-medium text-[#0d3b2e]" htmlFor={`notes-${a.id}`}>Interne notitie</label>
          <Textarea
            id={`notes-${a.id}`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Alleen zichtbaar voor beheerders…"
          />
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="min-h-[44px]" onClick={() => saveNote(a.id, notes)}>
              <Save className="w-4 h-4 mr-1.5" /> Notitie opslaan
            </Button>
            <Button size="sm" variant="outline" className="min-h-[44px]" onClick={() => logContact(a.id)}>
              <CalendarCheck className="w-4 h-4 mr-1.5" /> Contactmoment vastleggen
            </Button>
          </div>
          {a.last_contacted_at && (
            <p className="text-xs text-[#6c757d]">
              Laatste contact: {new Date(a.last_contacted_at).toLocaleString("nl-NL")}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-4 border-t">
          <span className="text-sm">Status:</span>
          <Select value={a.status} onValueChange={(v) => setStatus(a.id, v)}>
            <SelectTrigger className="w-full sm:w-[220px] min-h-[44px]"><SelectValue /></SelectTrigger>
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
