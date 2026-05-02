import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Inbox, CheckCircle2, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, applications: 0 });

  useEffect(() => {
    (async () => {
      const [v, p, d, a] = await Promise.all([
        supabase.from("vacancies").select("id", { count: "exact", head: true }),
        supabase.from("vacancies").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("vacancies").select("id", { count: "exact", head: true }).eq("status", "draft"),
        supabase.from("job_applications").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        total: v.count || 0,
        published: p.count || 0,
        drafts: d.count || 0,
        applications: a.count || 0,
      });
    })();
  }, []);

  const items = [
    { label: "Vacatures", value: stats.total, icon: Briefcase, to: "/admin/vacatures" },
    { label: "Gepubliceerd", value: stats.published, icon: CheckCircle2, to: "/admin/vacatures" },
    { label: "Concepten", value: stats.drafts, icon: FileText, to: "/admin/vacatures" },
    { label: "Sollicitaties", value: stats.applications, icon: Inbox, to: "/admin/sollicitaties" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-[#0d3b2e]">Dashboard</h1>
        <p className="text-[#6c757d]">Overzicht van vacatures en sollicitaties.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <Link key={it.label} to={it.to}>
              <Card className="hover:border-[#9ed42e] transition">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm text-[#6c757d]">{it.label}</CardTitle>
                  <Icon className="w-4 h-4 text-[#9ed42e]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-[#0d3b2e]">{it.value}</div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
