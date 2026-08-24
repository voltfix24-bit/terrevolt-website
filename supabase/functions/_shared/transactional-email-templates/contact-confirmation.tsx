import * as React from 'npm:react@18.3.1'
import { Text } from 'npm:@react-email/components@0.0.22'
import { BRAND, Row, Shell } from './layout.tsx'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  requestType?: string
  location?: string
  description?: string
}

function ContactConfirmation(props: Props) {
  const p = props || {}
  return (
    <Shell
      preview="We hebben je aanvraag ontvangen — TerreVolt"
      heading={`Bedankt${p.name ? `, ${p.name}` : ''} — we hebben je aanvraag ontvangen`}
    >
      <Text style={{ color: '#0d3b2e', fontSize: '14px', lineHeight: '22px', margin: '0 0 16px' }}>
        Je aanvraag staat bij ons klaar. We nemen zo snel mogelijk contact met je op om je vraag te bespreken.
        Heb je haast? Bel gerust direct met {BRAND.phone}.
      </Text>
      <Text style={{ color: '#6b7a74', fontSize: '13px', fontWeight: 700, margin: '0 0 10px', textTransform: 'uppercase' }}>
        Samenvatting van je aanvraag
      </Text>
      <Row label="Type aanvraag" value={p.requestType} />
      <Row label="Locatie / postcode" value={p.location} />
      {p.description ? (
        <Text style={{ color: '#0d3b2e', fontSize: '14px', lineHeight: '22px', margin: '8px 0 0', whiteSpace: 'pre-line' }}>
          {p.description}
        </Text>
      ) : null}
    </Shell>
  )
}

export const template = {
  component: ContactConfirmation,
  displayName: 'Contactaanvraag — ontvangstbevestiging',
  subject: 'We hebben je aanvraag ontvangen — TerreVolt',
  previewData: {
    name: 'Jan de Vries',
    requestType: 'Aardingsoplossingen',
    location: '3545 NH Utrecht',
    description: 'Graag een prijsindicatie voor het slaan van een aardpen.',
  },
} satisfies TemplateEntry
