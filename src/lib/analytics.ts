import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "tv_analytics_session";
const FORM_START_PREFIX = "tv_form_started:";

export function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = (crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`);
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "no-storage";
  }
}

export interface AnalyticsPayload {
  page_path?: string;
  page_title?: string;
  element_label?: string;
  element_id?: string;
  entity_type?: string;
  entity_id?: string;
  metadata?: Record<string, unknown>;
}

function safePagePath() {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname + window.location.search;
}

function safePageTitle() {
  if (typeof document === "undefined") return undefined;
  return document.title;
}

function safeReferrer() {
  if (typeof document === "undefined") return undefined;
  return document.referrer || undefined;
}

function safeUA() {
  if (typeof navigator === "undefined") return undefined;
  return navigator.userAgent?.slice(0, 500);
}

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
  // Fire and forget. Never throw.
  try {
    const row = {
      event_name: eventName.slice(0, 100),
      page_path: (payload.page_path ?? safePagePath())?.slice(0, 500),
      page_title: (payload.page_title ?? safePageTitle())?.slice(0, 300),
      referrer: safeReferrer()?.slice(0, 500),
      element_label: payload.element_label?.slice(0, 200),
      element_id: payload.element_id?.slice(0, 200),
      entity_type: payload.entity_type?.slice(0, 100),
      entity_id: payload.entity_id?.slice(0, 200),
      metadata: payload.metadata ?? {},
      session_id: getSessionId(),
      user_agent: safeUA(),
    };
    // do not await
    void supabase.from("analytics_events").insert(row).then(({ error }) => {
      if (error && import.meta.env.DEV) {
        console.debug("[analytics] insert failed", error.message);
      }
    });
  } catch (e) {
    if (import.meta.env.DEV) console.debug("[analytics] track error", e);
  }
}

export function trackPageView(path?: string, title?: string) {
  trackEvent("page_view", { page_path: path, page_title: title });
}

export function trackCTA(label: string, metadata: Record<string, unknown> = {}) {
  trackEvent("cta_click", { element_label: label, metadata });
}

export function trackFormStart(formName: string, metadata: Record<string, unknown> = {}) {
  if (typeof window !== "undefined") {
    const key = FORM_START_PREFIX + formName;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* ignore */
    }
  }
  trackEvent("form_start", { element_label: formName, metadata: { form_name: formName, ...metadata } });
}

export function trackFormSubmit(formName: string, metadata: Record<string, unknown> = {}) {
  trackEvent("form_submit", { element_label: formName, metadata: { form_name: formName, ...metadata } });
}
