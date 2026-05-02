import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { usePageMeta } from "@/hooks/usePageMeta";

const schema = z.object({
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
  password: z.string().min(8, "Minimaal 8 tekens").max(72),
});

export default function AdminLogin() {
  usePageMeta("Admin login | TerreVolt", "Inloggen voor TerreVolt beheerders.");
  const { user, loading } = useAuth();
  const location = useLocation() as any;
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  if (!loading && user) {
    return <Navigate to={location.state?.from?.pathname || "/admin"} replace />;
  }

  async function handle(e: React.FormEvent<HTMLFormElement>, mode: "in" | "up") {
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
      const credentials = { email: parsed.data.email, password: parsed.data.password };
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword(credentials);
        if (error) throw error;
        toast.success("Ingelogd");
        navigate("/admin", { replace: true });
      } else {
        const { error } = await supabase.auth.signUp({
          ...credentials,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account aangemaakt. Je kunt nu inloggen.");
      }
    } catch (err: any) {
      toast.error(err.message || "Er ging iets mis");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-6">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="text-[#9ed42e] text-sm uppercase tracking-wider mb-2">TerreVolt</div>
          <h1 className="text-2xl text-[#0d3b2e]">Beheer</h1>
          <p className="text-sm text-[#6c757d] mt-2">
            Het eerste account dat zich registreert wordt automatisch admin.
          </p>
        </div>

        <Tabs defaultValue="in">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="in">Inloggen</TabsTrigger>
            <TabsTrigger value="up">Registreren</TabsTrigger>
          </TabsList>

          {(["in", "up"] as const).map((mode) => (
            <TabsContent key={mode} value={mode}>
              <form onSubmit={(e) => handle(e, mode)} className="space-y-4">
                <div>
                  <Label htmlFor={`email-${mode}`}>E-mail</Label>
                  <Input id={`email-${mode}`} name="email" type="email" required maxLength={255} />
                </div>
                <div>
                  <Label htmlFor={`password-${mode}`}>Wachtwoord</Label>
                  <Input id={`password-${mode}`} name="password" type="password" required minLength={8} maxLength={72} />
                </div>
                <Button
                  type="submit"
                  disabled={busy}
                  className="w-full bg-[#9ed42e] text-[#0d3b2e] hover:bg-[#8bc41f]"
                >
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === "in" ? "Inloggen" : "Registreren"}
                </Button>
              </form>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
