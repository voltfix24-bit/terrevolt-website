import * as React from 'npm:react@18.3.1'
import { Button, Text } from 'npm:@react-email/components@0.0.22'
import { BRAND, Row, Shell } from './layout.tsx'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  phone?: string
  profile?: string
  region?: string
  message?: string
  hasCv?: boolean
  source?: string
}

function ApplicationNotification(props: Props) {
  const p = props || {}
  return (
    <Shell
      preview={`Nieuwe sollicitatie van ${p.name || 'onbekend'} — ${p.profile || 'functie onbekend'}`}
      heading="Nieuwe sollicitatie via de website"
    >
      <Row label="Naam" value={p.name} />
      <Row label="E-mail" value={p.email} />
      <Row label="Telefoon" value={p.phone} />
      <Row label="Functie" value={p.profile} />
      <Row label="Regio" value={p.region} />
      <Row label="CV" value={p.hasCv ? 'Ja — zie /admin' : 'Niet meegestuurd'} />
      <Row label="Bron" value={p.source} />
      {p.message ? (
        <Text style={{ color: '#0d3b2e', fontSize: '14px', lineHeight: '22px', margin: '16px 0 0', whiteSpace: 'pre-line' }}>
          {p.message}
        </Text>
      ) : null}
      <Button
        href={`${BRAND.site}/admin/sollicitaties`}
        style={{ backgroundColor: BRAND.lime, borderRadius: '8px', color: BRAND.green, display: 'inline-block', fontSize: '14px', fontWeight: 700, marginTop: '24px', padding: '12px 20px', textDecoration: 'none' }}
      >
        Bekijk in beheer
      </Button>
    </Shell>
  )
}

export const template = {
  component: ApplicationNotification,
  displayName: 'Sollicitatie — interne melding',
  subject: (d: Props) => `Nieuwe sollicitatie: ${d?.profile || 'onbekend'} — ${d?.name || 'onbekend'}`,
  to: 'info@terrevolt.nl',
  previewData: {
    name: 'Peter Jansen',
    email: 'peter@example.nl',
    phone: '0612345678',
    profile: 'Elektromonteur middenspanning',
    region: 'Noord-Holland',
    hasCv: true,
  },
} satisfies TemplateEntry
