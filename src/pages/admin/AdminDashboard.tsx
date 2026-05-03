import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Inbox, CheckCircle2, FileText, Clock, Sparkles, Eye, Mail, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATUS_LABEL: Record<string, string> = {
  new: "Nieuw",
  in_review: "In behandeling",
  contacted: "Contact gehad",
  not_reached: "Niet bereikbaar",
  documents_needed: "Documenten nodig",
  matched: "Gematcht",
  rejected: "Afgewezen",
  hired: "Aangenomen",
  archived: "Gearchiveerd",
};

type RecentApp = {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  status: string;
  profile: string | null;
  vacancies?: { title: string } | null;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    applications: 0,
    new7days: 0,
    newStatus: 0,
  });
  const [recent, setRecent] = useState<RecentApp[]>([]);

  useEffect(() => {
    (async () => {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const [v, p, d, a, n7, ns, last] = await Promise.all([
        supabase.from("vacancies").select("id", { count: "exact", head: true }),
        supabase.from("vacancies").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("vacancies").select("id", { count: "exact", head: true }).eq("status", "draft"),
        supabase.from("job_applications").select("id", { count: "exact", head: true }),
        supabase.from("job_applications").select("id", { count: "exact", head: true }).gte("created_at", sevenDaysAgo),
        supabase.from("job_applications").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase
          .from("job_applications")
          .select("id, name, email, phone, created_at, status, profile, vacancies(title)")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);
      setStats({
        total: v.count || 0,
        published: p.count || 0,
        drafts: d.count || 0,
        applications: a.count || 0,
        new7days: n7.count || 0,
        newStatus: ns.count || 0,
      });
      setRecent((last.data as any) || []);
    })();
  }, []);

  const items = [
    { label: "Vacatures", value: stats.total, icon: Briefcase, to: "/admin/vacatures" },
    { label: "Gepubliceerd", value: stats.published, icon: CheckCircle2, to: "/admin/vacatures" },
    { label: "Concepten", value: stats.drafts, icon: FileText, to: "/admin/vacatures" },
    { label: "Sollicitaties", value: stats.applications, icon: Inbox, to: "/admin/sollicitaties" },
    { label: "Nieuw (7d)", value: stats.new7days, icon: Sparkles, to: "/admin/sollicitaties" },
    { label: "Status: Nieuw", value: stats.newStatus, icon: Clock, to: "/admin/sollicitaties" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl text-[#0d3b2e]">Dashboard</h1>
        <p className="text-[#6c757d]">Overzicht van vacatures en sollicitaties.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
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
        <CardHeader>
          <CardTitle className="text-lg text-[#0d3b2e]">Laatste sollicitaties</CardTitle>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="text-[#6c757d] text-sm">Nog geen sollicitaties.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {recent.map((r) => (
                <li key={r.id} className="py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#0d3b2e] font-medium break-words">{r.name}</span>
                      <Badge variant="secondary" className="shrink-0">{STATUS_LABEL[r.status] || r.status}</Badge>
                    </div>
                    <div className="text-xs text-[#6c757d] mt-0.5 break-words">
                      {r.vacancies?.title || r.profile || "Open sollicitatie"} · {new Date(r.created_at).toLocaleDateString("nl-NL")}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button asChild size="sm" variant="outline" className="min-h-[44px]">
                      <Link to="/admin/sollicitaties"><Eye className="w-4 h-4 mr-1" /> Bekijken</Link>
                    </Button>
                    {r.phone && (
                      <Button asChild size="sm" variant="outline" className="min-h-[44px]">
                        <a href={`tel:${r.phone}`} aria-label={`Bel ${r.name}`}><Phone className="w-4 h-4 mr-1" /> Bellen</a>
                      </Button>
                    )}
                    {r.email && (
                      <Button asChild size="sm" variant="outline" className="min-h-[44px]">
                        <a href={`mailto:${r.email}`} aria-label={`Mail ${r.name}`}><Mail className="w-4 h-4 mr-1" /> Mailen</a>
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
