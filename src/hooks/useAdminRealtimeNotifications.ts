import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

/**
 * Toont een live melding in het beheer zodra er een nieuwe sollicitatie of
 * contactaanvraag binnenkomt. Speelt ook een kort geluidssignaal af.
 */
export function useAdminRealtimeNotifications(enabled: boolean) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!enabled) return;

    const ping = () => {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
        osc.onended = () => ctx.close();
      } catch {
        /* geluid is optioneel */
      }
    };

    const channel = supabase
      .channel("admin-inbound")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "job_applications" },
        (payload) => {
          const row = payload.new as { full_name?: string | null; name?: string | null };
          ping();
          toast.success("Nieuwe sollicitatie ontvangen", {
            description: row?.full_name || row?.name || "Bekijk de details in het beheer.",
            duration: 15000,
            action: {
              label: "Bekijken",
              onClick: () => navigate("/admin/sollicitaties"),
            },
          });
        },
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "contact_requests" },
        (payload) => {
          const row = payload.new as { name?: string | null };
          ping();
          toast.success("Nieuwe contactaanvraag ontvangen", {
            description: row?.name || "Bekijk de details in het beheer.",
            duration: 15000,
            action: {
              label: "Bekijken",
              onClick: () => navigate("/admin/contactaanvragen"),
            },
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [enabled, navigate]);
}
