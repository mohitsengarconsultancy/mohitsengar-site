type Gtag = (command: "event", eventName: string, params: Record<string, string>) => void;

/** Send a GA4 event if gtag is on the page. Safe to call anywhere on the client. */
export function sendEvent(eventName: string, params: Record<string, string>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") {
    gtag("event", eventName, params);
  }
}

/**
 * Report the outcome of a lead form, once /api/lead has answered.
 * Only `lead_submitted` (a 2xx response) should be treated as a conversion;
 * `lead_failed` covers 4xx/5xx (e.g. 503 while email delivery is not configured)
 * and network errors.
 */
export function trackLead(leadType: string, formId: string, ok: boolean, status?: number) {
  sendEvent(ok ? "lead_submitted" : "lead_failed", {
    lead_type: leadType,
    form_id: formId,
    page_path: window.location.pathname,
    ...(status !== undefined ? { status: String(status) } : {}),
  });
}
