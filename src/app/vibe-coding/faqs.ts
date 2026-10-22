/** Shared by the page (visible FAQ) and layout (FAQPage schema) so they never drift. */
export const VIBE_FAQS = [
  {
    q: "I built my app in Lovable. Do I have to migrate off it to work with you?",
    a: "Not necessarily. Many apps can stay on Lovable once the backend is hardened: the Supabase setup secured, the auth fixed, real Stripe or Twilio wired in, and what Lovable couldn't generate added. Others hit a structural ceiling, such as custom backend logic, complex permissions or performance at scale, and are better migrated. I'll give you an honest first read on the free fit call; the Launch Check gives you the answer in writing.",
  },
  {
    q: "What does this cost?",
    a: "Launch Check: AED 9,500 / $2,500 / £2,000, 5 working days, with a written keep / fix / rebuild verdict. Rescue to Production: from AED 55,000 / from $15,000, fixed scope and billed by milestone; that covers production builds, integrations, security hardening and, where needed, a migration off the AI builder. If you want me to stay on afterwards, the Fractional CTO retainer is AED 45,000 / $14,000 a month for 2 days a week. The full Launch Check fee is credited against a retainer signed within 30 days.",
  },
  {
    q: "How fast can you start?",
    a: "Launch Checks usually start within 1-2 weeks; larger projects are scheduled once the scope is agreed. If your launch is on fire, say so on the fit call and I'll tell you honestly whether I can help in time.",
  },
  {
    q: "I'm not technical. Will I understand what you're doing?",
    a: "Yes. Written updates in plain English, such as “we fixed the bug where new signups could see each other's accounts”, and short recorded walkthroughs when something matters. You don't need to read code; you need to know what's done, what's next, and what's at risk.",
  },
  {
    q: "Do you keep my code, my Supabase account, my Stripe account?",
    a: "Never. Your repo, your accounts, your domain. I'm a guest in your infrastructure, so when the engagement ends you can hire anyone and nothing breaks because I'm gone.",
  },
  {
    q: "Why is this different from the last freelancer who burned me?",
    a: "I scope before I start, quote a fixed price, and don't take work I can't deliver. I've spent 7+ years as a CTO and 14+ years building software for 40+ companies, and I say “no, that's not a fit” when it isn't. The free fit call is partly so I can decide that honestly.",
  },
  {
    q: "Can you work alongside my existing engineer or agency?",
    a: "Often, yes, especially on Launch Checks and integrations. I review what they built, write a remediation list, and either fix it myself or hand it back against a clear spec.",
  },
  {
    q: "Are you in my timezone?",
    a: "I'm based in Dubai (GMT+4). I work in person with teams in Dubai and Abu Dhabi, and remotely with founders in the US, UK and Europe. Updates are written and async-first, so you're rarely waiting on me.",
  },
];
