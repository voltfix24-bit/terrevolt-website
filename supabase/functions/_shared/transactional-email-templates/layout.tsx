import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

export const BRAND = {
  green: '#0d3b2e',
  lime: '#9ed42e',
  site: 'https://terrevolt.nl',
  name: 'TerreVolt B.V.',
  email: 'info@terrevolt.nl',
  phone: '+31 6 34 48 74 67',
}

export function Shell({
  preview,
  heading,
  children,
}: {
  preview: string
  heading: string
  children: React.ReactNode
}) {
  return (
    <Html lang="nl">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: '#f8f9fa', fontFamily: 'Arial, Helvetica, sans-serif', margin: 0, padding: '24px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '12px', maxWidth: '600px', overflow: 'hidden', border: '1px solid #e6e9e7' }}>
          <Section style={{ backgroundColor: BRAND.green, padding: '20px 28px' }}>
            <Link href={BRAND.site} style={{ display: 'inline-block' }}>
              <img
                src={`${BRAND.site}/__l5e/assets-v1/599ea27b-e1bf-4959-b6e7-d43a29e41717/terrevolt-logo-email.png`}
                alt="TerreVolt BV"
                width="150"
                height="36"
                style={{ display: 'block', border: 0, outline: 'none' }}
              />
            </Link>
          </Section>
          <Section style={{ padding: '28px' }}>
            <Heading style={{ color: BRAND.green, fontSize: '20px', margin: '0 0 16px' }}>{heading}</Heading>
            {children}
          </Section>
          <Hr style={{ borderColor: '#e6e9e7', margin: 0 }} />
          <Section style={{ padding: '18px 28px' }}>
            <Text style={{ color: '#6b7a74', fontSize: '12px', margin: 0, lineHeight: '18px' }}>
              {BRAND.name} · {BRAND.phone} ·{' '}
              <Link href={`mailto:${BRAND.email}`} style={{ color: BRAND.green }}>{BRAND.email}</Link>
              <br />
              <Link href={BRAND.site} style={{ color: BRAND.green }}>terrevolt.nl</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <Text style={{ color: '#0d3b2e', fontSize: '14px', margin: '0 0 8px', lineHeight: '20px' }}>
      <strong style={{ color: '#6b7a74', fontWeight: 600 }}>{label}: </strong>
      {value}
    </Text>
  )
}
