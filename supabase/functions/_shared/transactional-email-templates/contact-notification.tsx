import * as React from 'npm:react@18.3.1'
import { Button, Text } from 'npm:@react-email/components@0.0.22'
import { BRAND, Row, Shell } from './layout.tsx'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  company?: string
  email?: string
  phone?: string
  requestType?: string
  location?: string
  startDate?: string
  description?: string
  intentLabel?: string
  hasAttachment?: boolean
}

function ContactNotification(props: Props) {
  const p = props || {}
  return (
    <Shell
      preview={`Nieuwe aanvraag van ${p.name || 'onbekend'} — ${p.requestType || 'aanvraag'}`}
      heading="Nieuwe aanvraag via de website"
    >
      <Row label="Naam" value={p.name} />
      <Row label="Bedrijf" value={p.company} />
      <Row label="E-mail" value={p.email} />
      <Row label="Telefoon" value={p.phone} />
      <Row label="Type aanvraag" value={p.requestType} />
      <Row label="Aanleiding" value={p.intentLabel} />
      <Row label="Locatie / postcode" value={p.location} />
      <Row label="Gewenste termijn" value={p.startDate} />
      <Row label="Bijlage" value={p.hasAttachment ? 'Ja — zie /admin' : undefined} />
      <Text style={{ color: '#0d3b2e', fontSize: '14px', lineHeight: '22px', margin: '16px 0 0', whiteSpace: 'pre-line' }}>
        {p.description || '(geen omschrijving)'}
      </Text>
      <Button
        href={`${BRAND.site}/admin/contact-requests`}
        style={{ backgroundColor: BRAND.lime, borderRadius: '8px', color: BRAND.green, display: 'inline-block', fontSize: '14px', fontWeight: 700, marginTop: '24px', padding: '12px 20px', textDecoration: 'none' }}
      >
        Bekijk in beheer
      </Button>
    </Shell>
  )
}

export const template = {
  component: ContactNotification,
  displayName: 'Contactaanvraag — interne melding',
  subject: (d: Props) => `Nieuwe aanvraag: ${d?.requestType || 'website'} — ${d?.name || 'onbekend'}`,
  to: 'info@terrevolt.nl',
  previewData: {
    name: 'Jan de Vries',
    company: 'De Vries Infra',
    email: 'jan@example.nl',
    phone: '0612345678',
    requestType: 'Aardingsoplossingen',
    location: '3545 NH Utrecht',
    description: 'Graag een prijsindicatie voor het slaan van een aardpen.',
  },
} satisfies TemplateEntry
