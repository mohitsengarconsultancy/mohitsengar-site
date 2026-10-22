/** Shared by the page (visible FAQ) and layout (FAQPage schema) so they never drift. */
export const LAUNCH_CHECK_FAQS = [
  {
    q: "How much does the Launch Check cost?",
    a: "It is a fixed fee: AED 9,500, $2,500 or £2,000, for 5 working days. The price does not change once we agree the scope on the free fit call. If you go on to sign a retainer within 30 days, the full fee is credited against it.",
  },
  {
    q: "Which AI builders and stacks do you review?",
    a: "Apps built with Lovable, Bolt, Cursor, Base44, Replit, v0 and similar tools, and hand-written or agency code on the same kind of stack: React or Next.js, Supabase or Postgres, Node, Stripe. Where a platform limits access to the code or database, I check everything that can be checked and say clearly what could not be.",
  },
  {
    q: "What access do you need?",
    a: "Read access to the code repository, the Supabase project or database, hosting and the payment provider in test mode, plus two test user accounts. Read-only access is enough for almost everything. Credentials should be shared through a password manager, never in chat or email, and nothing is changed in production unless you ask.",
  },
  {
    q: "Will you fix the problems you find?",
    a: "The Launch Check is a diagnosis, so I do not change your code during it. If I find something urgent, such as a live secret key in the browser bundle or a table anyone can read, you hear about it the same day so you can rotate the key or close the hole. After the report you can fix the rest yourself, hire me for a fixed-scope Rescue to Production, or keep me on as your fractional CTO.",
  },
  {
    q: "Is this a penetration test or a security certification?",
    a: "No. It is an engineering review of the problems that most often appear in AI-built apps: secrets, database access rules, auth, payments, tests and load. It is not a certified penetration test or a compliance audit such as SOC 2 or ISO 27001. If a customer or regulator needs one of those, I will tell you and help you scope it.",
  },
  {
    q: "What if the verdict is rebuild?",
    a: "You get the reasoning in writing, and a list of what is worth keeping, such as the UI, validated flows and the parts of the data model that hold up. A rebuild verdict is a plan, not a judgment on the founder: the tool did its job of getting you to a working prototype, and the report shows how to get from there to a product.",
  },
];
