import { NextResponse } from "next/server";

const NOTIFY_TO = "mohit@sengarconsultancy.org";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LeadType = "playbook" | "shopify-lead";

interface LeadPayload {
  type: LeadType;
  email: string;
  name?: string;
  store?: string;
  revenue?: string;
  message?: string;
  /** Honeypot — real users never fill this. */
  website?: string;
}

function clamp(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  // Honeypot tripped — pretend success so bots don't adapt.
  if (clamp(body.website, 10)) {
    return NextResponse.json({ ok: true });
  }

  const type: LeadType = body.type === "shopify-lead" ? "shopify-lead" : "playbook";
  const email = clamp(body.email, 254);
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, reason: "invalid_email" }, { status: 400 });
  }

  const lead = {
    type,
    email,
    name: clamp(body.name, 200),
    store: clamp(body.store, 300),
    revenue: clamp(body.revenue, 50),
    message: clamp(body.message, 5000),
    at: new Date().toISOString(),
  };

  // Always log — visible in Vercel function logs as a backup capture.
  console.log("LEAD", JSON.stringify(lead));

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("LEAD_NOT_DELIVERED: RESEND_API_KEY is not set");
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  const subject =
    type === "shopify-lead"
      ? `🛍️ Shopify lead: ${lead.name || lead.email}${lead.revenue ? ` (${lead.revenue})` : ""}`
      : `📕 Checklist subscriber: ${lead.email}`;

  const checklistUrl =
    "https://www.mohitsengar.org/downloads/ai-app-production-checklist.pdf";

  const text = [
    `Type: ${lead.type}`,
    `Email: ${lead.email}`,
    lead.name && `Name: ${lead.name}`,
    lead.store && `Store: ${lead.store}`,
    lead.revenue && `Revenue: ${lead.revenue}`,
    lead.message && `Message:\n${lead.message}`,
    type === "playbook" &&
      `\nThey were shown the instant download; checklist lives at:\n${checklistUrl}`,
    ``,
    `Received ${lead.at} via mohitsengar.org`,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Mohit Sengar Website <onboarding@resend.dev>",
      to: [NOTIFY_TO],
      reply_to: lead.email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("LEAD_NOT_DELIVERED: resend error", res.status, detail.slice(0, 500));
    return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
