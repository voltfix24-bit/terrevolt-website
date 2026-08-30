import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

// Publiek aanroepbaar endpoint dat GEEN e-mailinhoud van de caller accepteert.
// De caller geeft alleen het type + id van een zojuist aangemaakte rij door.
// Alle e-mailgegevens worden server-side uit de database gelezen, waardoor het
// onmogelijk is om willekeurige ontvangers of inhoud te versturen.

const MAX_AGE_MS = 15 * 60 * 1000

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function truncate(value: unknown, max = 2000): string {
  if (typeof value !== 'string') return ''
  return value.length > max ? `${value.slice(0, max)}…` : value
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceKey) {
    console.error('Missing required environment variables')
    return json({ error: 'Server configuration error' }, 500)
  }

  let type: string
  let id: string
  try {
    const body = await req.json()
    type = String(body?.type ?? '')
    id = String(body?.id ?? '')
  } catch {
    return json({ error: 'Invalid JSON in request body' }, 400)
  }

  if (type !== 'contact' && type !== 'application') {
    return json({ error: 'Unsupported type' }, 400)
  }
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return json({ error: 'Invalid id' }, 400)
  }

  const supabase = createClient(supabaseUrl, serviceKey)
  const table = type === 'contact' ? 'contact_requests' : 'job_applications'

  const { data: row, error: rowError } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (rowError) {
    console.error('Lookup failed', { table, code: rowError.code })
    return json({ error: 'Lookup failed' }, 500)
  }
  if (!row) {
    return json({ error: 'Not found' }, 404)
  }

  // Alleen net aangemaakte inzendingen mogen een melding triggeren.
  const createdAt = new Date(row.created_at as string).getTime()
  if (!Number.isFinite(createdAt) || Date.now() - createdAt > MAX_AGE_MS) {
    return json({ success: false, reason: 'submission_too_old' }, 200)
  }

  // Idempotentie: één meldingsronde per inzending.
  const markerId = `submission-${type}-${id}`
  const { data: existing } = await supabase
    .from('email_send_log')
    .select('id')
    .eq('message_id', markerId)
    .maybeSingle()

  if (existing) {
    return json({ success: false, reason: 'already_notified' }, 200)
  }

  await supabase.from('email_send_log').insert({
    message_id: markerId,
    template_name: `${type}-submission-marker`,
    recipient_email: String(row.email ?? ''),
    status: 'sent',
  })

  const recipient = String(row.email ?? '')
  const templateData =
    type === 'contact'
      ? {
          name: truncate(row.name, 200),
          company: truncate(row.company, 200),
          email: recipient,
          phone: truncate(row.phone, 50),
          requestType: truncate(row.request_type, 200),
          location: truncate(row.location, 200),
          startDate: truncate(row.start_date, 100),
          description: truncate(row.description),
          intentLabel: truncate(row.intent_label, 200),
          hasAttachment: Boolean(row.attachment_url),
        }
      : {
          name: truncate(row.name, 200),
          email: recipient,
          phone: truncate(row.phone, 50),
          profile: truncate(row.profile, 200),
          region: truncate(row.region, 200),
          message: truncate(row.message),
          hasCv: Boolean(row.cv_url),
        }

  const notificationTemplate = type === 'contact' ? 'contact-notification' : 'application-notification'
  const confirmationTemplate = type === 'contact' ? 'contact-confirmation' : 'application-confirmation'

  async function send(templateName: string, recipientEmail?: string) {
    const target = recipientEmail ?? ''
    try {
      const result = await sendTemplateEmail(templateName, target, {
        templateData,
        idempotencyKey: `${templateName}-${type}-${id}`,
      })

      const { error: logError } = await supabase.from('email_send_log').insert({
        message_id: null,
        template_name: templateName,
        recipient_email: target,
        status: result.sent ? 'sent' : 'suppressed',
      })
      if (logError) {
        console.error('Failed to write email_send_log', { templateName, code: logError.code })
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error('Email send failed', { templateName, message })
      const { error: logError } = await supabase.from('email_send_log').insert({
        message_id: null,
        template_name: templateName,
        recipient_email: target,
        status: 'failed',
        error_message: message,
      })
      if (logError) {
        console.error('Failed to write email_send_log', { templateName, code: logError.code })
      }
    }
  }

  await Promise.allSettled([
    send(notificationTemplate),
    recipient ? send(confirmationTemplate, recipient) : Promise.resolve(),
  ])


  return json({ success: true })
})
