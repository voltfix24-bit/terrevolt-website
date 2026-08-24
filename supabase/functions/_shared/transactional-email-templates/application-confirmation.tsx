import * as React from 'npm:react@18.3.1'
import { Text } from 'npm:@react-email/components@0.0.22'
import { BRAND, Row, Shell } from './layout.tsx'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  profile?: string
  region?: string
}

function ApplicationConfirmation(props: Props) {
  const p = props || {}
  return (
    <Shell
      preview="We hebben je sollicitatie ontvangen — TerreVolt"
      heading={`Bedankt${p.name ? `, ${p.name}` : ''} — je sollicitatie is binnen`}
    >
      <Text style={{ color: '#0d3b2e', fontSize: '14px', lineHeight: '22px', margin: '0 0 16px' }}>
        We hebben je aanmelding ontvangen en nemen binnen twee werkdagen contact met je op.
        Wil je eerder sparren over de functie? Bel gerust met {BRAND.phone}.
      </Text>
      <Row label="Functie" value={p.profile} />
      <Row label="Regio" value={p.region} />
      <Text style={{ color: '#6b7a74', fontSize: '13px', lineHeight: '20px', margin: '16px 0 0' }}>
        Alle functies bij TerreVolt zijn rechtstreeks in loondienst.
      </Text>
    </Shell>
  )
}

export const template = {
  component: ApplicationConfirmation,
  displayName: 'Sollicitatie — ontvangstbevestiging',
  subject: 'We hebben je sollicitatie ontvangen — TerreVolt',
  previewData: {
    name: 'Peter Jansen',
    profile: 'Elektromonteur middenspanning',
    region: 'Noord-Holland',
  },
} satisfies TemplateEntry
