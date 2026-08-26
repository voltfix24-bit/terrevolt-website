import { supabase } from "@/integrations/supabase/client";

/**
 * Vraagt de backend om de meldingsmails voor een zojuist opgeslagen inzending
 * te versturen. De client stuurt bewust géén e-mailinhoud of ontvanger mee:
 * de edge function leest die server-side uit de database.
 *
 * Faalt stil: een mislukte melding mag nooit de formulierinzending blokkeren
 * (de aanvraag staat dan al veilig in de database).
 */
export async function notifySubmission(
  type: "contact" | "application",
  id: string,
): Promise<void> {
  try {
    await supabase.functions.invoke("notify-submission", {
      body: { type, id },
    });
  } catch (err) {
    console.warn(`[notify] melding voor ${type} kon niet worden verstuurd`, err);
  }
}
