import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ALLOWED: Record<string, string[]> = {
  "contact-attachments": ["pdf", "doc", "docx", "jpg", "jpeg", "png", "dwg"],
  "job-applications": ["pdf", "doc", "docx", "jpg", "jpeg", "png"],
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const json = (b: unknown, s = 200) =>
    new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const body = await req.json().catch(() => null);
    const bucket = typeof body?.bucket === "string" ? body.bucket : "";
    const ext = typeof body?.ext === "string" ? body.ext.toLowerCase() : "";
    if (!ALLOWED[bucket] || !ALLOWED[bucket].includes(ext)) return json({ error: "Invalid file type" }, 400);
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const path = `${crypto.randomUUID()}.${ext}`;
    const { data, error } = await admin.storage.from(bucket).createSignedUploadUrl(path);
    if (error || !data) return json({ error: "Upload not available" }, 500);
    return json({ path: data.path, token: data.token });
  } catch {
    return json({ error: "Upload not available" }, 500);
  }
});
