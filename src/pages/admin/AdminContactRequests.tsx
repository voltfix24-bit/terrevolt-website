import { useEffect, useMemo, useState } from "react";
import { Loader2, Mail, Phone, MapPin, FileDown, Search, X, MessageCircle, Save, CalendarCheck, Download, Archive } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { whatsappLink } from "@/lib/whatsapp";
import { waTemplates, inDateRange, type DateRange } from "@/lib/adminUtils";
import { downloadCsv } from "@/lib/csvExport";

type Req = {
  id: string;
  created_at: string;
  name: string;
  company: string | null;
  phone: string | null;
  email: string;
  request_type: string | null;
  intent_label: string | null;
  location: string | null;
  start_date: string | null;
  description: string | null;
  attachment_url: string | null;
  status: string;
  admin_notes: string | null;
  last_contacted_at: string | null;
  next_follow_up_at: string | null;
  safety_scope_flags: Record<string, boolean> | null;
};

const STATUSES = [
  { value: "new", label: "Nieuw" },
  { value: "in_review", label: "Scope beoordelen" },
  { value: "contacted", label: "Contact gehad" },
  { value: "quote_needed", label: "Offerte nodig" },
  { value: "planned", label: "Ingepland" },
  { value: "waiting_for_client", label: "Wacht op klant" },
  { value: "completed", label: "Afgerond" },
  { value: "rejected", label: "Afgewezen" },
  { value: "archived", label: "Gearchiveerd" },
];

const SAFETY_FLAGS: { key: string; label: string }[] = [
  { key: "schakelwerk", label: "Schakelwerk" },
  { key: "ms_ls_station", label: "MS/LS-station" },
  { key: "netmontage", label: "Netmontage" },
  { key: "aarding_meting", label: "Aarding/meting" },
  { key: "werken_langs_weg", label: "Werken langs weg" },
  { key: "afzetting_zichtbaarheid", label: "Afzetting/zichtbaarheid relevant" },
  { key: "scope_onvoldoende", label: "Onvoldoende scope" },
  { key: "bijlage_ontbreekt", label: "Bijlage/tekening ontbreekt" },
  { key: "wv_onduidelijk", label: "WV/opdrachtgever onduidelijk" },
];
const STATUS_LABEL = (v: string) => STATUSES.find((s) => s.value === v)?.label || v;

export default function AdminContactRequests() {
  const [rows, setRows] = useState<Req[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange>("all");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as any) || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from("contact_requests").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Status bijgewerkt");
    load();
  }
  async function saveNote(id: string, admin_notes: string) {
    const { error } = await supabase.from("contact_requests").update({ admin_notes }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Notitie opgeslagen");
    load();
  }
  async function logContact(id: string) {
    const { error } = await supabase.from("contact_requests").update({ last_contacted_at: new Date().toISOString() }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Contactmoment vastgelegd");
    load();
  }
  async function archive(id: string) {
    await setStatus(id, "archived");
  }
  async function saveScopeFlags(id: string, flags: Record<string, boolean>) {
    const { error } = await supabase.from("contact_requests").update({ safety_scope_flags: flags }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Veiligheid & scope opgeslagen");
    load();
  }
  async function setFollowUp(id: string, iso: string | null) {
    const { error } = await supabase.from("contact_requests").update({ next_follow_up_at: iso }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(iso ? "Opvolgdatum opgeslagen" : "Opvolgdatum verwijderd");
    load();
  }
  async function downloadAttachment(path: string) {
    const { data, error } = await supabase.storage.from("contact-attachments").createSignedUrl(path, 60);
    if (error || !data) return toast.error("Bestand kon niet worden geopend. Controleer of het bestand nog bestaat.");
    window.open(data.signedUrl, "_blank");
  }

  const types = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => { if (r.request_type) set.add(r.request_type); });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "nl"));
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (q) {
        const hay = `${r.name} ${r.email} ${r.phone ?? ""} ${r.company ?? ""} ${r.location ?? ""} ${r.request_type ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (typeFilter !== "all" && (r.request_type ?? "") !== typeFilter) return false;
      if (!inDateRange(r.created_at, dateRange)) return false;
      return true;
    });
  }, [rows, query, statusFilter, typeFilter, dateRange]);

  const hasActive = query !== "" || statusFilter !== "all" || typeFilter !== "all" || dateRange !== "all";
  function reset() {
    setQuery(""); setStatusFilter("all"); setTypeFilter("all"); setDateRange("all");
  }

  function exportCsv() {
    downloadCsv(
      `contactaanvragen-${new Date().toISOString().slice(0, 10)}.csv`,
      ["datum", "naam", "bedrijf", "telefoon", "email", "type aanvraag", "regio/locatie", "startdatum", "status", "notitie"],
      filtered.map((r) => [
        new Date(r.created_at).toLocaleDateString("nl-NL"),
        r.name, r.company ?? "", r.phone ?? "", r.email, r.request_type ?? "",
        r.location ?? "", r.start_date ?? "", STATUS_LABEL(r.status), r.admin_notes ?? "",
      ]),
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl text-[#0d3b2e]">Contactaanvragen</h1>
          <p className="text-[#6c757d]">Project- en serviceaanvragen via het contactformulier.</p>
        </div>
        <Button variant="outline" onClick={exportCsv} className="min-h-[44px] w-full sm:w-auto" disabled={filtered.length === 0}>
          <Download className="w-4 h-4 mr-1.5" /> Export CSV
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6c757d]" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Zoek naam, bedrijf, e-mail, telefoon, locatie…" className="pl-9 min-h-[44px]" aria-label="Zoek aanvragen" />
          </div>
          <div className="md:col-span-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="min-h-[44px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle statussen</SelectItem>
                {STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="min-h-[44px]"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle types</SelectItem>
                {types.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select value={dateRange} onValueChange={(v) => setDateRange(v as DateRange)}>
              <SelectTrigger className="min-h-[44px]"><SelectValue placeholder="Datum" /></SelectTrigger>
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
          <span>{filtered.length} van {rows.length} aanvragen</span>
          {hasActive && (
            <Button variant="ghost" size="sm" onClick={reset} className="h-8">
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
            {rows.length === 0 ? "Nog geen aanvragen." : "Geen aanvragen gevonden met deze filters."}
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <ul className="md:hidden divide-y divide-gray-200">
              {filtered.map((r) => (
                <li key={r.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-[#0d3b2e] font-medium break-words">{r.name}{r.company ? ` · ${r.company}` : ""}</div>
                      <div className="text-xs text-[#6c757d] mt-0.5 break-words">
                        {new Date(r.created_at).toLocaleDateString("nl-NL")}
                        {r.request_type ? ` · ${r.request_type}` : ""}
                        {r.location ? ` · ${r.location}` : ""}
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">{STATUS_LABEL(r.status)}</Badge>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full min-h-[44px]">Bekijken</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl w-[calc(100vw-2rem)] sm:w-full max-h-[90vh] overflow-y-auto">
                      <Detail r={r} setStatus={setStatus} saveNote={saveNote} logContact={logContact} archive={archive} downloadAttachment={downloadAttachment} saveScopeFlags={saveScopeFlags} setFollowUp={setFollowUp} />
                    </DialogContent>
                  </Dialog>
                </li>
              ))}
            </ul>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Datum</TableHead>
                    <TableHead>Naam</TableHead>
                    <TableHead>Bedrijf</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Locatie</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actie</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="text-sm text-[#6c757d]">{new Date(r.created_at).toLocaleDateString("nl-NL")}</TableCell>
                      <TableCell className="text-[#0d3b2e]">{r.name}</TableCell>
                      <TableCell>{r.company || "—"}</TableCell>
                      <TableCell>{r.request_type || "—"}</TableCell>
                      <TableCell>{r.location || "—"}</TableCell>
                      <TableCell><Badge variant="secondary">{STATUS_LABEL(r.status)}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild><Button size="sm" variant="outline">Bekijken</Button></DialogTrigger>
                          <DialogContent className="max-w-2xl w-[calc(100vw-2rem)] sm:w-full max-h-[90vh] overflow-y-auto">
                            <Detail r={r} setStatus={setStatus} saveNote={saveNote} logContact={logContact} archive={archive} downloadAttachment={downloadAttachment} saveScopeFlags={saveScopeFlags} setFollowUp={setFollowUp} />
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
  r, setStatus, saveNote, logContact, archive, downloadAttachment, saveScopeFlags, setFollowUp,
}: {
  r: Req;
  setStatus: (id: string, status: string) => void;
  saveNote: (id: string, notes: string) => void;
  logContact: (id: string) => void;
  archive: (id: string) => void;
  downloadAttachment: (path: string) => void;
  saveScopeFlags: (id: string, flags: Record<string, boolean>) => void;
  setFollowUp: (id: string, iso: string | null) => void;
}) {
  const [notes, setNotes] = useState(r.admin_notes || "");
  const [flags, setFlags] = useState<Record<string, boolean>>(
    (r.safety_scope_flags as Record<string, boolean>) || {},
  );
  const [followUp, setFollowUpState] = useState<string>(
    r.next_follow_up_at ? r.next_follow_up_at.slice(0, 10) : "",
  );
  const wa = whatsappLink(r.phone);
  const waTemplate = whatsappLink(r.phone, waTemplates.contact(r.name));
  return (
    <>
      <DialogHeader>
        <DialogTitle className="break-words">{r.name}{r.company ? ` — ${r.company}` : ""}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 text-sm">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 text-[#0d3b2e]">
          <span className="flex items-center gap-1 min-w-0">
            <a href={`mailto:${r.email}`} className="flex items-center gap-1.5 min-h-[44px] py-2 hover:text-[#9ed42e] hover:underline rounded-md min-w-0"><Mail className="w-4 h-4 shrink-0" /> <span className="break-all">{r.email}</span></a>
            <CopyButton type="mail" value={r.email} />
          </span>
          {r.phone && (
            <span className="flex items-center gap-1 min-w-0">
              <a href={`tel:${r.phone}`} className="flex items-center gap-1.5 min-h-[44px] py-2 hover:text-[#9ed42e] hover:underline rounded-md min-w-0"><Phone className="w-4 h-4 shrink-0" /> <span className="break-all">{r.phone}</span></a>
              <CopyButton type="tel" value={r.phone} />
            </span>
          )}
          {r.location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 shrink-0" /> {r.location}</span>}
        </div>

        {/* Snelle acties */}
        <div className="flex flex-wrap gap-2">
          {r.phone && (
            <Button asChild size="sm" variant="outline" className="min-h-[44px]">
              <a href={`tel:${r.phone}`}><Phone className="w-4 h-4 mr-1.5" /> Bellen</a>
            </Button>
          )}
          <Button asChild size="sm" variant="outline" className="min-h-[44px]">
            <a href={`mailto:${r.email}`}><Mail className="w-4 h-4 mr-1.5" /> Mailen</a>
          </Button>
          {wa ? (
            <>
              <Button asChild size="sm" variant="outline" className="min-h-[44px]">
                <a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="w-4 h-4 mr-1.5" /> WhatsApp</a>
              </Button>
              <Button asChild size="sm" variant="outline" className="min-h-[44px]">
                <a href={waTemplate!} target="_blank" rel="noreferrer"><MessageCircle className="w-4 h-4 mr-1.5" /> WhatsApp-template</a>
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" disabled title="Geen geldig telefoonnummer" className="min-h-[44px]">
              <MessageCircle className="w-4 h-4 mr-1.5" /> WhatsApp
            </Button>
          )}
        </div>

        {r.request_type && <div className="break-words"><b>Type:</b> {r.request_type}{r.intent_label ? ` (${r.intent_label})` : ""}</div>}
        {r.start_date && <div className="break-words"><b>Gewenste startdatum:</b> {r.start_date}</div>}
        {r.description && (
          <div>
            <b>Omschrijving:</b>
            <p className="whitespace-pre-wrap break-words text-[#6c757d] mt-1">{r.description}</p>
          </div>
        )}
        {r.attachment_url && (
          <Button size="sm" variant="outline" onClick={() => downloadAttachment(r.attachment_url!)} className="w-full sm:w-auto min-h-[44px]">
            <FileDown className="w-4 h-4 mr-1" /> Bijlage openen
          </Button>
        )}

        <div className="pt-4 border-t space-y-2">
          <label className="text-sm font-medium text-[#0d3b2e]" htmlFor={`notes-${r.id}`}>Interne notitie</label>
          <Textarea id={`notes-${r.id}`} value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Alleen zichtbaar voor beheerders…" />
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="min-h-[44px]" onClick={() => saveNote(r.id, notes)}>
              <Save className="w-4 h-4 mr-1.5" /> Notitie opslaan
            </Button>
            <Button size="sm" variant="outline" className="min-h-[44px]" onClick={() => logContact(r.id)}>
              <CalendarCheck className="w-4 h-4 mr-1.5" /> Contactmoment vastleggen
            </Button>
            <Button size="sm" variant="outline" className="min-h-[44px]" onClick={() => archive(r.id)}>
              <Archive className="w-4 h-4 mr-1.5" /> Archiveren
            </Button>
          </div>
          {r.last_contacted_at && (
            <p className="text-xs text-[#6c757d]">Laatste contact: {new Date(r.last_contacted_at).toLocaleString("nl-NL")}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-4 border-t">
          <span className="text-sm">Status:</span>
          <Select value={r.status} onValueChange={(v) => setStatus(r.id, v)}>
            <SelectTrigger className="w-full sm:w-[220px] min-h-[44px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
