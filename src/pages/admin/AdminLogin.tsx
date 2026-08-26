import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Logo } from "@/components/terrevolt/Logo";

const schema = z.object({
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
  password: z.string().min(8, "Minimaal 8 tekens").max(72),
});

export default function AdminLogin() {
  usePageMeta({ title: "Admin login | TerreVolt", description: "Inloggen voor TerreVolt beheerders.", noindex: true });
  const { user, loading } = useAuth();
  const location = useLocation() as { state?: { from?: { pathname?: string } } };
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  if (!loading && user) {
    return <Navigate to={location.state?.from?.pathname || "/admin"} replace />;
  }

  async function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      email: String(fd.get("email") || ""),
      password: String(fd.get("password") || ""),
    });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      if (error) throw error;
      toast.success("Ingelogd");
      navigate("/admin", { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Inloggen mislukt";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-6">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo mark="icon" className="h-10 w-auto" alt="TerreVolt BV" title="TerreVolt Beheer" />
          </div>
          <h1 className="text-2xl text-[#0d3b2e]">Beheer</h1>
          <p className="text-xs text-[#6c757d] mt-2">
            Geen account? Neem contact op met de beheerder.
          </p>
        </div>

        <form onSubmit={handle} className="space-y-4">
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required maxLength={255} />
          </div>
          <div>
            <Label htmlFor="password">Wachtwoord</Label>
            <Input id="password" name="password" type="password" autoComplete="current-password" required minLength={8} maxLength={72} />
          </div>
          <Button
            type="submit"
            disabled={busy}
            className="w-full bg-[#9ed42e] text-[#0d3b2e] hover:bg-[#8bc41f]"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Inloggen"}
          </Button>
        </form>
      </div>
    </div>
  );
}
