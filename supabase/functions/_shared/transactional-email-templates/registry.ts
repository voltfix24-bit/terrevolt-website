// deno-lint-ignore-file no-explicit-any
import { template as contactNotification } from './contact-notification.tsx'
import { template as contactConfirmation } from './contact-confirmation.tsx'
import { template as applicationNotification } from './application-notification.tsx'
import { template as applicationConfirmation } from './application-confirmation.tsx'

export interface TemplateEntry {
  /** React Email component rendered with templateData as props. */
  component: (props: any) => any
  /** Static subject or a function of templateData. */
  subject: string | ((data: any) => string)
  /** Human readable name for previews. */
  displayName?: string
  /** Sample data used by the preview function. */
  previewData?: Record<string, any>
  /** Fixed recipient — overrides recipientEmail from the caller. */
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-notification': contactNotification,
  'contact-confirmation': contactConfirmation,
  'application-notification': applicationNotification,
  'application-confirmation': applicationConfirmation,
}
