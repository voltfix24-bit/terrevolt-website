import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { usePageMeta } from "@/hooks/usePageMeta";
import { company } from "@/config/company";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "checking" | "valid" | "invalid" | "submitting" | "done" | "error";

const Unsubscribe = () => {
  usePageMeta({
    title: "Afmelden voor e-mails | TerreVolt",
    description: "Meld je af voor e-mails van TerreVolt.",
    canonical: "/unsubscribe",
    noindex: true,
  });

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [state, setState] = useState<State>("checking");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_KEY } },
        );
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (res.ok && (data.valid ?? true)) {
          setEmail(typeof data.email === "string" ? data.email : "");
          setState("valid");
        } else {
          setState("invalid");
        }
      } catch {
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const confirm = async () => {
    setState("submitting");
    const { error } = await supabase.functions.invoke("handle-email-unsubscribe", {
      body: { token },
    });
    setState(error ? "error" : "done");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-5 py-16">
      <main id="main-content" className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="mb-6 text-lg tracking-wide text-[#0d3b2e]">
          Terre<span className="text-[#9ed42e]">Volt</span>
        </p>

        {state === "checking" && (
          <p className="flex items-center gap-2 text-[#6c757d]">
            <Loader2 className="h-5 w-5 animate-spin" /> Bezig met controleren…
          </p>
        )}

        {(state === "valid" || state === "submitting") && (
          <>
            <h1 className="mb-3 text-2xl text-[#0d3b2e]">Afmelden bevestigen</h1>
            <p className="mb-6 text-sm leading-relaxed text-[#6c757d]">
              {email ? `${email} ontvangt` : "Je ontvangt"} daarna geen e-mails meer van TerreVolt.
              Aanvragen die je zelf indient, blijven wel gewoon werken.
            </p>
            <button
              type="button"
              onClick={confirm}
              disabled={state === "submitting"}
              className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-[#9ed42e] px-6 text-[#0d3b2e] transition hover:bg-[#8bc41f] disabled:opacity-60"
            >
              {state === "submitting" ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              Ja, meld mij af
            </button>
          </>
        )}

        {state === "done" && (
          <>
            <h1 className="mb-3 flex items-center gap-2 text-2xl text-[#0d3b2e]">
              <CheckCircle2 className="h-6 w-6 text-[#9ed42e]" /> Je bent afgemeld
            </h1>
            <p className="text-sm leading-relaxed text-[#6c757d]">
              We sturen je geen e-mails meer. Wil je dit ongedaan maken? Mail ons op {company.email}.
            </p>
          </>
        )}

        {(state === "invalid" || state === "error") && (
          <>
            <h1 className="mb-3 flex items-center gap-2 text-2xl text-[#0d3b2e]">
              <AlertCircle className="h-6 w-6 text-red-600" />
              {state === "invalid" ? "Link is niet geldig" : "Er ging iets mis"}
            </h1>
            <p className="text-sm leading-relaxed text-[#6c757d]">
              {state === "invalid"
                ? "Deze afmeldlink is verlopen of al gebruikt."
                : "Probeer het later opnieuw."}{" "}
              Mail ons gerust op {company.email}.
            </p>
          </>
        )}

        <Link to="/" className="mt-8 inline-block text-sm text-[#0d3b2e] underline underline-offset-2">
          Terug naar terrevolt.nl
        </Link>
      </main>
    </div>
  );
};

export default Unsubscribe;
