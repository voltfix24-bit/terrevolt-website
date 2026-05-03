import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Inbox, CheckCircle2, FileText, Clock, Sparkles, Eye, Mail, Phone, MessageSquare, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/whatsapp";

const APP_STATUS: Record<string, string> = {
  new: "Nieuw", in_review: "In behandeling", contacted: "Contact gehad",
  not_reached: "Niet bereikbaar", documents_needed: "Documenten nodig",
  matched: "Gematcht", rejected: "Afgewezen", hired: "Aangenomen", archived: "Gearchiveerd",
};
const REQ_STATUS: Record<string, string> = {
  new: "Nieuw", in_review: "In behandeling", contacted: "Contact gehad",
  quote_needed: "Offerte nodig", planned: "Ingepland", waiting_for_client: "Wacht op klant",
  rejected: "Afgewezen", archived: "Gearchiveerd",
};

type RecentApp = {
  id: string; name: string; email: string; phone: string;
  created_at: string; status: string; profile: string | null;
  vacancies?: { title: string } | null;
};
type RecentReq = {
  id: string; name: string; company: string | null; email: string; phone: string | null;
  created_at: string; status: string; request_type: string | null;
};

type ActionItem = {
  id: string;
  kind: "application" | "request" | "vacancy";
  title: string;
  reason: string;
  to: string;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0, published: 0, drafts: 0,
    applications: 0, appNew7: 0, appNewStatus: 0,
    requests: 0, reqNew7: 0, reqOpen: 0, reqNewStatus: 0,
  });
  const [recentApps, setRecentApps] = useState<RecentApp[]>([]);
  const [recentReqs, setRecentReqs] = useState<RecentReq[]>([]);
  const [actions, setActions] = useState<ActionItem[]>([]);

  useEffect(() => {
    (async () => {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const twoBizDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
      const [v, p, d, a, an7, ans, r, rn7, ro, rns, lastA, lastR,
        appNewAct, reqNewAct, appStaleAct, reqStaleAct, appDocsAct, reqWaitAct, draftsAct] = await Promise.all([
        supabase.from("vacancies").select("id", { count: "exact", head: true }),
        supabase.from("vacancies").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("vacancies").select("id", { count: "exact", head: true }).eq("status", "draft"),
        supabase.from("job_applications").select("id", { count: "exact", head: true }),
        supabase.from("job_applications").select("id", { count: "exact", head: true }).gte("created_at", sevenDaysAgo),
        supabase.from("job_applications").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("contact_requests").select("id", { count: "exact", head: true }),
        supabase.from("contact_requests").select("id", { count: "exact", head: true }).gte("created_at", sevenDaysAgo),
        supabase.from("contact_requests").select("id", { count: "exact", head: true }).not("status", "in", "(archived,rejected)"),
        supabase.from("contact_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("job_applications").select("id, name, email, phone, created_at, status, profile, vacancies(title)").order("created_at", { ascending: false }).limit(5),
        supabase.from("contact_requests").select("id, name, company, email, phone, created_at, status, request_type").order("created_at", { ascending: false }).limit(5),
        supabase.from("job_applications").select("id, name, vacancies(title), profile").eq("status", "new").order("created_at", { ascending: true }).limit(20),
        supabase.from("contact_requests").select("id, name, company").eq("status", "new").order("created_at", { ascending: true }).limit(20),
        supabase.from("job_applications").select("id, name, vacancies(title), profile").is("last_contacted_at", null).lt("created_at", twoBizDaysAgo).not("status", "in", "(archived,rejected,hired)").limit(20),
        supabase.from("contact_requests").select("id, name, company").is("last_contacted_at", null).lt("created_at", twoBizDaysAgo).not("status", "in", "(archived,rejected,completed)").limit(20),
        supabase.from("job_applications").select("id, name, vacancies(title), profile").eq("status", "documents_needed").limit(20),
        supabase.from("contact_requests").select("id, name, company").eq("status", "waiting_for_client").limit(20),
        supabase.from("vacancies").select("id, title").eq("status", "draft").limit(20),
      ]);
      setStats({
        total: v.count || 0, published: p.count || 0, drafts: d.count || 0,
        applications: a.count || 0, appNew7: an7.count || 0, appNewStatus: ans.count || 0,
        requests: r.count || 0, reqNew7: rn7.count || 0, reqOpen: ro.count || 0, reqNewStatus: rns.count || 0,
      });
      setRecentApps((lastA.data as any) || []);
      setRecentReqs((lastR.data as any) || []);

      const acc: ActionItem[] = [];
      ((appNewAct.data as any[]) || []).forEach((x) =>
        acc.push({ id: `an-${x.id}`, kind: "application", title: `${x.name} — ${x.vacancies?.title || x.profile || "Open sollicitatie"}`, reason: "Nieuwe sollicitatie", to: "/admin/sollicitaties" }));
      ((reqNewAct.data as any[]) || []).forEach((x) =>
        acc.push({ id: `rn-${x.id}`, kind: "request", title: `${x.name}${x.company ? ` · ${x.company}` : ""}`, reason: "Nieuwe contactaanvraag", to: "/admin/contactaanvragen" }));
      ((appStaleAct.data as any[]) || []).forEach((x) =>
        acc.push({ id: `as-${x.id}`, kind: "application", title: `${x.name} — ${x.vacancies?.title || x.profile || ""}`, reason: ">2 dagen zonder contact", to: "/admin/sollicitaties" }));
      ((reqStaleAct.data as any[]) || []).forEach((x) =>
        acc.push({ id: `rs-${x.id}`, kind: "request", title: `${x.name}${x.company ? ` · ${x.company}` : ""}`, reason: ">2 dagen zonder contact", to: "/admin/contactaanvragen" }));
      ((appDocsAct.data as any[]) || []).forEach((x) =>
        acc.push({ id: `ad-${x.id}`, kind: "application", title: `${x.name} — ${x.vacancies?.title || x.profile || ""}`, reason: "Documenten nodig", to: "/admin/sollicitaties" }));
      ((reqWaitAct.data as any[]) || []).forEach((x) =>
        acc.push({ id: `rw-${x.id}`, kind: "request", title: `${x.name}${x.company ? ` · ${x.company}` : ""}`, reason: "Wacht op klant", to: "/admin/contactaanvragen" }));
      ((draftsAct.data as any[]) || []).forEach((x) =>
        acc.push({ id: `dv-${x.id}`, kind: "vacancy", title: x.title, reason: "Conceptvacature", to: "/admin/vacatures" }));
      // Dedup by id
      const seen = new Set<string>();
      setActions(acc.filter((it) => (seen.has(it.id) ? false : (seen.add(it.id), true))));
    })();
  }, []);

  const items = [
    { label: "Vacatures", value: stats.total, icon: Briefcase, to: "/admin/vacatures" },
    { label: "Gepubliceerd", value: stats.published, icon: CheckCircle2, to: "/admin/vacatures" },
    { label: "Concepten", value: stats.drafts, icon: FileText, to: "/admin/vacatures" },
    { label: "Sollicitaties", value: stats.applications, icon: Inbox, to: "/admin/sollicitaties" },
    { label: "Sollicitaties (7d)", value: stats.appNew7, icon: Sparkles, to: "/admin/sollicitaties" },
    { label: "Sollicitaties: Nieuw", value: stats.appNewStatus, icon: Clock, to: "/admin/sollicitaties" },
    { label: "Contactaanvragen", value: stats.requests, icon: MessageSquare, to: "/admin/contactaanvragen" },
    { label: "Aanvragen (7d)", value: stats.reqNew7, icon: Sparkles, to: "/admin/contactaanvragen" },
    { label: "Open aanvragen", value: stats.reqOpen, icon: Clock, to: "/admin/contactaanvragen" },
    { label: "Aanvragen: Nieuw", value: stats.reqNewStatus, icon: Clock, to: "/admin/contactaanvragen" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl text-[#0d3b2e]">Dashboard</h1>
        <p className="text-[#6c757d]">Overzicht van vacatures, sollicitaties en contactaanvragen.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <Link key={it.label} to={it.to}>
              <Card className="hover:border-[#9ed42e] transition h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xs sm:text-sm text-[#6c757d] truncate">{it.label}</CardTitle>
                  <Icon className="w-4 h-4 text-[#9ed42e] shrink-0" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl text-[#0d3b2e]">{it.value}</div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle className="text-lg text-[#0d3b2e]">Vandaag opvolgen</CardTitle>
          {actions.length > 0 && (
            <span className="text-xs text-[#6c757d]">{actions.length} item{actions.length === 1 ? "" : "s"}</span>
          )}
        </CardHeader>
        <CardContent>
          {actions.length === 0 ? (
            <p className="text-[#6c757d] text-sm">Niets staat open. Alles afgehandeld.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {actions.slice(0, 12).map((it) => {
                  const kindLabel =
                    it.kind === "application" ? "Sollicitatie"
                    : it.kind === "request" ? "Aanvraag"
                    : "Vacature";
                  return (
                    <li key={it.id} className="py-3 flex items-start justify-between gap-3 flex-wrap">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="shrink-0 text-[10px] uppercase tracking-wide">{kindLabel}</Badge>
                          <span className="text-[#0d3b2e] font-medium break-words">{it.title}</span>
                        </div>
                        <div className="text-xs text-[#6c757d] mt-1">{it.reason}</div>
                      </div>
                      <Button asChild size="sm" variant="outline" className="min-h-[40px]">
                        <Link to={it.to}>Openen</Link>
                      </Button>
                    </li>
                  );
                })}
              </ul>
              {actions.length > 12 && (
                <div className="pt-3 flex flex-wrap gap-2 text-sm">
                  <Button asChild variant="ghost" size="sm"><Link to="/admin/sollicitaties">Alle sollicitaties</Link></Button>
                  <Button asChild variant="ghost" size="sm"><Link to="/admin/contactaanvragen">Alle aanvragen</Link></Button>
                  <Button asChild variant="ghost" size="sm"><Link to="/admin/vacatures">Alle vacatures</Link></Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-lg text-[#0d3b2e]">Laatste sollicitaties</CardTitle></CardHeader>
          <CardContent>
            {recentApps.length === 0 ? (
              <p className="text-[#6c757d] text-sm">Nog geen sollicitaties.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {recentApps.map((r) => {
                  const wa = whatsappLink(r.phone);
                  return (
                    <li key={r.id} className="py-3 space-y-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[#0d3b2e] font-medium break-words">{r.name}</span>
                          <Badge variant="secondary" className="shrink-0">{APP_STATUS[r.status] || r.status}</Badge>
                        </div>
                        <div className="text-xs text-[#6c757d] mt-0.5 break-words">
                          {r.vacancies?.title || r.profile || "Open sollicitatie"} · {new Date(r.created_at).toLocaleDateString("nl-NL")}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button asChild size="sm" variant="outline" className="min-h-[44px]"><Link to="/admin/sollicitaties"><Eye className="w-4 h-4 mr-1" /> Bekijken</Link></Button>
                        {r.phone && <Button asChild size="sm" variant="outline" className="min-h-[44px]"><a href={`tel:${r.phone}`}><Phone className="w-4 h-4 mr-1" /> Bellen</a></Button>}
                        {r.email && <Button asChild size="sm" variant="outline" className="min-h-[44px]"><a href={`mailto:${r.email}`}><Mail className="w-4 h-4 mr-1" /> Mailen</a></Button>}
                        {wa && <Button asChild size="sm" variant="outline" className="min-h-[44px]"><a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="w-4 h-4 mr-1" /> WhatsApp</a></Button>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg text-[#0d3b2e]">Laatste contactaanvragen</CardTitle></CardHeader>
          <CardContent>
            {recentReqs.length === 0 ? (
              <p className="text-[#6c757d] text-sm">Nog geen aanvragen.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {recentReqs.map((r) => {
                  const wa = whatsappLink(r.phone);
                  return (
                    <li key={r.id} className="py-3 space-y-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[#0d3b2e] font-medium break-words">{r.name}{r.company ? ` · ${r.company}` : ""}</span>
                          <Badge variant="secondary" className="shrink-0">{REQ_STATUS[r.status] || r.status}</Badge>
                        </div>
                        <div className="text-xs text-[#6c757d] mt-0.5 break-words">
                          {r.request_type || "Aanvraag"} · {new Date(r.created_at).toLocaleDateString("nl-NL")}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button asChild size="sm" variant="outline" className="min-h-[44px]"><Link to="/admin/contactaanvragen"><Eye className="w-4 h-4 mr-1" /> Bekijken</Link></Button>
                        {r.phone && <Button asChild size="sm" variant="outline" className="min-h-[44px]"><a href={`tel:${r.phone}`}><Phone className="w-4 h-4 mr-1" /> Bellen</a></Button>}
                        {r.email && <Button asChild size="sm" variant="outline" className="min-h-[44px]"><a href={`mailto:${r.email}`}><Mail className="w-4 h-4 mr-1" /> Mailen</a></Button>}
                        {wa && <Button asChild size="sm" variant="outline" className="min-h-[44px]"><a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="w-4 h-4 mr-1" /> WhatsApp</a></Button>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
