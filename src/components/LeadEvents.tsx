"use client";

import { useEffect } from "react";
import { sendEvent } from "@/lib/analytics";

function eventForHref(href: string): string | null {
  if (href.includes("calendly.com")) return "calendly_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.includes("wa.me")) return "whatsapp_click";
  return null;
}

/**
 * Site-wide GA4 events. One delegated click listener covers every Calendly,
 * email and WhatsApp link (including links rendered later). One delegated
 * submit listener records `form_attempt`; it fires before /api/lead answers,
 * so it is NOT a conversion. Each form reports its real outcome itself with
 * trackLead() (`lead_submitted` on a 2xx, `lead_failed` otherwise). Renders nothing.
 */
export default function LeadEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const eventName = eventForHref(href);
      if (!eventName) return;
      sendEvent(eventName, {
        page_path: window.location.pathname,
        link_text: (anchor.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100),
      });
    };

    const onSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement | null;
      if (!form || form.tagName !== "FORM") return;
      sendEvent("form_attempt", {
        page_path: window.location.pathname,
        form_id: form.id || form.getAttribute("name") || "unnamed",
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("submit", onSubmit, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("submit", onSubmit, { capture: true });
    };
  }, []);

  return null;
}
