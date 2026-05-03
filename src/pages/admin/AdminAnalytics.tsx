import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download, RefreshCcw } from "lucide-react";
import { downloadCsv } from "@/lib/csvExport";

type EventRow = {
  id: string;
  created_at: string;
  event_name: string;
  page_path: string | null;
  page_title: string | null;
  element_label: string | null;
  element_id: string | null;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown> | null;
};

type ContactRow = { id: string; created_at: string; request_type: string | null };
type AppRow = { id: string; created_at: string; vacancy_id: string | null };
type Vac = { id: string; title: string; slug: string };

const RANGE_DAYS = 7;

function sinceIso(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

function pct(num: number, denom: number) {
  if (!denom) return "—";
  return `${Math.round((num / denom) * 100)}%`;
}

export default function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [apps, setApps] = useState<AppRow[]>([]);
  const [vacs, setVacs] = useState<Vac[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const since = sinceIso(RANGE_DAYS);
      const [evRes, cRes, aRes, vRes] = await Promise.all([
        supabase
          .from("analytics_events")
          .select("id, created_at, event_name, page_path, page_title, element_label, element_id, entity_type, entity_id, metadata")
          .gte("created_at", since)
          .order("created_at", { ascending: false })
          .limit(5000),
        supabase
          .from("contact_requests")
          .select("id, created_at, request_type")
          .gte("created_at", since),
        supabase
          .from("job_applications")
          .select("id, created_at, vacancy_id")
          .gte("created_at", since),
        supabase.from("vacancies").select("id, title, slug"),
      ]);
      if (cancelled) return;
      setEvents((evRes.data ?? []) as EventRow[]);
      setContacts((cRes.data ?? []) as ContactRow[]);
      setApps((aRes.data ?? []) as AppRow[]);
      setVacs((vRes.data ?? []) as Vac[]);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const counts = useMemo(() => {
    const by = (name: string) => events.filter((e) => e.event_name === name).length;
    return {
      pageViews: by("page_view"),
      ctaClicks: by("cta_click"),
      formStarts: by("form_start"),
      formSubmits: by("form_submit"),
      contacts: contacts.length,
      apps: apps.length,
    };
  }, [events, contacts, apps]);

  // Werken bij funnel
  const funnel = useMemo(() => {
    const wbViews = events.filter(
      (e) => e.event_name === "page_view" && (e.page_path ?? "").startsWith("/werken-bij")
    ).length;
    const profileClicks = events.filter(
      (e) => e.event_name === "cta_click" && (e.element_label ?? "").toLowerCase().includes("profiel")
    ).length;
    const vacancyViews = events.filter(
      (e) => e.event_name === "page_view" && (e.page_path ?? "").startsWith("/vacatures/")
    ).length;
    const wbFormStarts = events.filter(
      (e) =>
        e.event_name === "form_start" &&
        ["werken_bij_form", "vacature_form"].includes(((e.metadata as { form_name?: string })?.form_name ?? ""))
    ).length;
    const wbFormSubmits = events.filter(
      (e) =>
        e.event_name === "form_submit" &&
        ["werken_bij_form", "vacature_form"].includes(((e.metadata as { form_name?: string })?.form_name ?? ""))
    ).length;
    const waClicks = events.filter(
      (e) => e.event_name === "cta_click" && (e.element_label ?? "").toLowerCase().includes("whatsapp")
    ).length;
    return { wbViews, profileClicks, vacancyViews, wbFormStarts, wbFormSubmits, waClicks };
  }, [events]);

  // Vacature performance
  const vacancyTable = useMemo(() => {
    const rows = vacs.map((v) => {
      const path = `/vacatures/${v.slug}`;
      const views = events.filter((e) => e.event_name === "page_view" && e.page_path === path).length;
      const directClicks = events.filter(
        (e) =>
          e.event_name === "cta_click" &&
          (e.entity_id === v.slug || e.entity_id === v.id) &&
          /aanmelden/i.test(e.element_label ?? "")
      ).length;
      const starts = events.filter(
        (e) =>
          e.event_name === "form_start" &&
          ((e.metadata as { vacature_slug?: string })?.vacature_slug === v.slug)
      ).length;
      const submits = apps.filter((a) => a.vacancy_id === v.id).length;
      const wa = events.filter(
        (e) =>
          e.event_name === "cta_click" &&
          /whatsapp/i.test(e.element_label ?? "") &&
          (e.entity_id === v.slug || e.entity_id === v.id)
      ).length;
      const conv = views ? Math.round((submits / views) * 100) : 0;
      return { v, views, directClicks, starts, submits, wa, conv };
    });
    return rows.sort((a, b) => b.submits - a.submits);
  }, [events, vacs, apps]);

  // Contact performance
  const contactPerf = useMemo(() => {
    const views = events.filter((e) => e.event_name === "page_view" && (e.page_path ?? "").startsWith("/contact")).length;
    const intent = (label: RegExp) =>
      events.filter(
        (e) =>
          e.event_name === "cta_click" &&
          (e.page_path ?? "").startsWith("/contact") &&
          label.test(e.element_label ?? "")
      ).length;
    const project = intent(/project bespreken/i);
    const monteur = intent(/monteur|ploeg/i);
    const sollicitatie = intent(/sollicitatie|zzp/i);
    const starts = events.filter(
      (e) => e.event_name === "form_start" && ((e.metadata as { form_name?: string })?.form_name === "contact_form")
    ).length;
    const submits = events.filter(
      (e) => e.event_name === "form_submit" && ((e.metadata as { form_name?: string })?.form_name === "contact_form")
    ).length;
    const phone = events.filter((e) => e.event_name === "cta_click" && /bel|telefoon/i.test(e.element_label ?? "")).length;
    const mail = events.filter((e) => e.event_name === "cta_click" && /mail/i.test(e.element_label ?? "")).length;
    return { views, project, monteur, sollicitatie, starts, submits, phone, mail };
  }, [events]);

  function exportCsv() {
    const headers = ["created_at", "event_name", "page_path", "element_label", "entity_type", "entity_id", "metadata"];
    const rows = events.map((e) => [
      e.created_at,
      e.event_name,
      e.page_path ?? "",
      e.element_label ?? "",
      e.entity_type ?? "",
      e.entity_id ?? "",
      e.metadata ? JSON.stringify(e.metadata) : "",
    ]);
    downloadCsv("analytics_events.csv", headers, rows);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-[#0d3b2e]" />
      </div>
    );
  }

  const cards: Array<{ label: string; value: number }> = [
    { label: "Pageviews (7d)", value: counts.pageViews },
    { label: "CTA clicks (7d)", value: counts.ctaClicks },
    { label: "Form starts (7d)", value: counts.formStarts },
    { label: "Form submits (7d)", value: counts.formSubmits },
    { label: "Contactaanvragen (7d)", value: counts.contacts },
    { label: "Sollicitaties (7d)", value: counts.apps },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl text-[#0d3b2e]">Analytics</h1>
          <p className="text-sm text-[#6c757d]">Laatste {RANGE_DAYS} dagen — privacyvriendelijk en intern.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="min-h-11" onClick={() => setRefreshKey((k) => k + 1)}>
            <RefreshCcw className="w-4 h-4 mr-2" /> Vernieuwen
          </Button>
          <Button className="min-h-11" onClick={exportCsv}>
            <Download className="w-4 h-4 mr-2" /> CSV export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="p-4">
              <div className="text-xs uppercase tracking-wide text-[#6c757d]">{c.label}</div>
              <div className="text-2xl font-semibold text-[#0d3b2e] mt-1">{c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#0d3b2e]">Werken bij funnel</CardTitle>
        </CardHeader>
        <CardContent>
          {funnel.wbViews + funnel.profileClicks + funnel.vacancyViews + funnel.wbFormStarts + funnel.wbFormSubmits === 0 ? (
            <p className="text-sm text-[#6c757d]">Nog onvoldoende data.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
              <Stat label="/werken-bij views" value={funnel.wbViews} />
              <Stat label="Profiel clicks" value={funnel.profileClicks} />
              <Stat label="Vacature views" value={funnel.vacancyViews} />
              <Stat label="Form starts" value={funnel.wbFormStarts} />
              <Stat label="Submits" value={funnel.wbFormSubmits} />
              <Stat label="WhatsApp clicks" value={funnel.waClicks} />
              <Stat label="View → profiel" value={pct(funnel.profileClicks, funnel.wbViews)} />
              <Stat label="Vacature → start" value={pct(funnel.wbFormStarts, funnel.vacancyViews)} />
              <Stat label="Start → submit" value={pct(funnel.wbFormSubmits, funnel.wbFormStarts)} />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#0d3b2e]">Vacature performance</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {vacancyTable.length === 0 ? (
            <p className="text-sm text-[#6c757d]">Nog geen vacatures.</p>
          ) : (
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-left text-[#6c757d] border-b">
                  <th className="py-2 pr-3">Vacature</th>
                  <th className="py-2 pr-3">Views</th>
                  <th className="py-2 pr-3">Aanmelden</th>
                  <th className="py-2 pr-3">Form starts</th>
                  <th className="py-2 pr-3">Submits</th>
                  <th className="py-2 pr-3">WhatsApp</th>
                  <th className="py-2">Conv.</th>
                </tr>
              </thead>
              <tbody>
                {vacancyTable.map((r) => (
                  <tr key={r.v.id} className="border-b last:border-0">
                    <td className="py-2 pr-3">
                      <div className="font-medium text-[#0d3b2e]">{r.v.title}</div>
                      <div className="text-xs text-[#6c757d]">/vacatures/{r.v.slug}</div>
                    </td>
                    <td className="py-2 pr-3">{r.views}</td>
                    <td className="py-2 pr-3">{r.directClicks}</td>
                    <td className="py-2 pr-3">{r.starts}</td>
                    <td className="py-2 pr-3">{r.submits}</td>
                    <td className="py-2 pr-3">{r.wa}</td>
                    <td className="py-2">{r.conv}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#0d3b2e]">Contact performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <Stat label="/contact views" value={contactPerf.views} />
            <Stat label="Project bespreken" value={contactPerf.project} />
            <Stat label="Monteur / ploeg" value={contactPerf.monteur} />
            <Stat label="Sollicitatie / ZZP" value={contactPerf.sollicitatie} />
            <Stat label="Form starts" value={contactPerf.starts} />
            <Stat label="Form submits" value={contactPerf.submits} />
            <Stat label="Bel-klikken" value={contactPerf.phone} />
            <Stat label="Mail-klikken" value={contactPerf.mail} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border bg-white p-3">
      <div className="text-xs text-[#6c757d]">{label}</div>
      <div className="text-lg font-semibold text-[#0d3b2e]">{value}</div>
    </div>
  );
}
