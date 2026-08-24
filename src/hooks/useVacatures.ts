import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  ARBEIDSVOORWAARDEN, CONTRACT_LABEL_LANG, REGIO_LABEL, UREN_LABEL,
  DIENSTVERBAND_LABEL, type Vacature, vacatures as staticVacatures,
} from "@/data/vacatures";

type IconKey = Vacature["iconKey"];

const ICON_KEYS: IconKey[] = ["ls", "ms", "schakel", "aarding", "huisaansluiting", "wv"];

const toList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === "string" && v.trim().length > 0) : [];

/** Databaserij → publieke vacature. Ontbrekende velden vallen terug op de statische basis. */
function toVacature(row: Record<string, unknown>): Vacature {
  const slug = String(row.slug);
  const base = staticVacatures.find((v) => v.slug === slug);
  const iconKey = ICON_KEYS.includes(row.icon_key as IconKey)
    ? (row.icon_key as IconKey)
    : base?.iconKey ?? "ls";

  return {
    slug,
    aliases: toList(row.aliases).length ? toList(row.aliases) : base?.aliases,
    title: (row.title as string) || base?.title || slug,
    h1: (row.h1 as string) || base?.h1,
    keywords: toList(row.keywords).length ? toList(row.keywords) : base?.keywords,
    shortLabel: (row.short_label as string) || base?.shortLabel || (row.title as string) || slug,
    iconKey,
    datePosted: (row.date_posted as string) || base?.datePosted || new Date().toISOString().slice(0, 10),
    salaris: {
      min: Number(row.salary_min ?? base?.salaris.min ?? 0),
      max: Number(row.salary_max ?? base?.salaris.max ?? 0),
    },
    intro: (row.intro as string) || base?.intro || "",
    samenvatting: (row.summary as string) || base?.samenvatting || (row.intro as string) || "",
    meta: {
      regio: (row.region as string) || base?.meta.regio || REGIO_LABEL,
      uren: (row.hours as string) || base?.meta.uren || UREN_LABEL,
      dienstverband: (row.employment_type as string) || base?.meta.dienstverband || DIENSTVERBAND_LABEL,
      contract: base?.meta.contract || CONTRACT_LABEL_LANG,
      niveau: (row.level as string) || base?.meta.niveau || "MBO / praktijkervaring",
      werkgebied: (row.work_area as string) || base?.meta.werkgebied || "",
      bevoegdheden: (row.authorizations as string) || base?.meta.bevoegdheden || "",
    },
    taken: toList(row.what_you_do).length ? toList(row.what_you_do) : base?.taken ?? [],
    meebrengen: toList(row.requirements).length ? toList(row.requirements) : base?.meebrengen ?? [],
    veiligheid: (row.safety_text as string) || base?.veiligheid || "",
  };
}

/** Arbeidsvoorwaarden zoals in admin beheerd; valt terug op de sitebrede lijst. */
export function arbeidsvoorwaardenVan(row?: { offer?: unknown }): string[] {
  const offer = toList(row?.offer);
  return offer.length ? offer : ARBEIDSVOORWAARDEN;
}

/** Cache zodat navigeren tussen pagina's niet flikkert. */
let cache: Vacature[] | null = null;

/**
 * Publieke vacatures uit het beheer (alleen gepubliceerd, op sorteervolgorde).
 * Zolang de data laadt of bij een fout tonen we de statische set, zodat de
 * pagina en het JobPosting-schema nooit leeg zijn.
 */
export function useVacatures() {
  const [vacatures, setVacatures] = useState<Vacature[]>(cache ?? staticVacatures);
  const [isLoading, setIsLoading] = useState(cache === null);

  useEffect(() => {
    let active = true;
    void (async () => {
      const { data, error } = await supabase
        .from("vacancies")
        .select("*")
        .eq("status", "published")
        .order("sort_order", { ascending: true });

      if (!active) return;
      if (!error && data && data.length > 0) {
        cache = data.map((row) => toVacature(row as Record<string, unknown>));
        setVacatures(cache);
      } else if (error) {
        console.warn("[vacatures] kon vacatures niet laden, statische set gebruikt", error);
      } else {
        cache = [];
        setVacatures([]);
      }
      setIsLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  return { vacatures, isLoading };
}

export const findVacatureIn = (list: Vacature[], slug?: string) =>
  list.find((v) => v.slug === slug);

export const findVacatureByAliasIn = (list: Vacature[], slug?: string) =>
  slug ? list.find((v) => v.aliases?.includes(slug)) : undefined;
