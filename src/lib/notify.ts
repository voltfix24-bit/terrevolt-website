import { supabase } from "@/integrations/supabase/client";

/**
 * Verstuurt een transactionele e-mail via de edge function.
 * Faalt stil: een mislukte melding mag nooit de formulierinzending blokkeren
 * (de aanvraag staat dan al veilig in de database).
 */
export async function sendTransactionalEmail(
  templateName: string,
  templateData: Record<string, unknown>,
  recipientEmail?: string,
): Promise<void> {
  try {
    await supabase.functions.invoke("send-transactional-email", {
      body: { templateName, recipientEmail, templateData },
    });
  } catch (err) {
    console.warn(`[notify] ${templateName} kon niet worden verstuurd`, err);
  }
}

/** Interne melding + ontvangstbevestiging, parallel en niet-blokkerend. */
export async function notifyAndConfirm(
  notificationTemplate: string,
  confirmationTemplate: string,
  data: Record<string, unknown>,
  recipientEmail: string,
): Promise<void> {
  await Promise.allSettled([
    sendTransactionalEmail(notificationTemplate, data),
    sendTransactionalEmail(confirmationTemplate, data, recipientEmail),
  ]);
}
