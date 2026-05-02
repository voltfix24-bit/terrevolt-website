import { useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      if (!active) return;
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        // role check moet buiten de listener om recursie te voorkomen
        setTimeout(() => {
          if (!active) return;
          checkAdmin(sess.user.id);
        }, 0);
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      if (!active) return;
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) checkAdmin(sess.user.id);
      else setLoading(false);
    });

    async function checkAdmin(uid: string) {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      if (!active) return;
      setIsAdmin(!error && !!data);
      setLoading(false);
    }

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, user, isAdmin, loading };
}
