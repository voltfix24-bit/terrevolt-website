import { supabase } from "@/integrations/supabase/client";

export type UploadBucket = "contact-attachments" | "job-applications";

/** Uploads via a short-lived server-issued signed upload URL (no public insert policy). */
export async function secureUpload(bucket: UploadBucket, file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const { data, error } = await supabase.functions.invoke<{ path: string; token: string }>(
    "create-upload-url",
    { body: { bucket, ext } },
  );
  if (error || !data?.path || !data?.token) throw error ?? new Error("Upload niet beschikbaar");
  const { error: upErr } = await supabase.storage
    .from(bucket)
    .uploadToSignedUrl(data.path, data.token, file, { contentType: file.type || undefined });
  if (upErr) throw upErr;
  return data.path;
}
