/** Shared by the page (visible FAQ) and layout (FAQPage schema) so they never drift. */
export const QA_FAQS = [
  {
    question: "What does a QA and quality engineering engagement include?",
    answer:
      "Modern quality engineering across the whole delivery lifecycle: resilient test automation, AI/LLM system testing, performance and load testing shifted left, continuous security (SAST, DAST, SCA) in CI/CD, microservice contract testing and service virtualization, and observability-driven testing that feeds real production behaviour back into your suite. The focus is testing smarter, not just testing more.",
  },
  {
    question: "How do you fix flaky tests?",
    answer:
      "Most flakiness comes from selector fragility against dynamic DOM structures — a small UI change breaks an XPath or CSS selector and a test fails even though the app works. We rebuild suites on self-healing frameworks (Playwright, testRigor, Katalon) that use multiple locators and context to find elements even when the original selector changes, so false failures stop eroding trust in automation.",
  },
  {
    question: "Can you test AI and LLM features?",
    answer:
      "Yes. Because a large language model can return different responses to similar inputs, we evaluate qualities rather than a single expected output — hallucinations, bias, toxicity, truthfulness, relevance and prompt-injection resistance — using an LLM-as-a-Judge approach with tools like DeepEval, Langfuse and Promptfoo.",
  },
  {
    question: "How much does QA cost?",
    answer:
      "Quality engineering is my delivery bench, the capability behind my CTO work, so it isn't sold as a separate package. For an AI-built MVP, the 5-day Launch Check (AED 9,500 / $2,500 / £2,000) covers tests, load, security and payments. The 2-week Production & Investor Readiness Review (AED 27,500 / $7,500) covers code quality and testing alongside architecture, team and process. Ongoing quality work runs inside a Fractional CTO retainer (AED 45,000 / $14,000 a month for 2 days a week). Book a free fit call and I'll tell you which fits.",
  },
  {
    question: "What testing tools do you use?",
    answer:
      "We are tool-agnostic and pick what fits your stack: Playwright, testRigor and Katalon for automation; DeepEval, Langfuse and Promptfoo for AI/LLM evaluation; Grafana k6, Locust and OpenTelemetry for performance; Snyk, SonarQube and OWASP ZAP for security; PactFlow, WireMock and Tricentis for integration; Tonic.ai, Delphix and K2view for test data; and Datadog, Dynatrace and Honeycomb for observability.",
  },
  {
    question: "How quickly can you start?",
    answer:
      "Typically within 1-2 weeks. If a launch is on fire — a broken pipeline, a security scare, or a release deadline — say so on the free fit call and you'll get an honest answer on whether I can help in time.",
  },
  {
    question: "Do you work with our existing team and CI/CD?",
    answer:
      "Yes. We plug into your existing engineers, repositories and pipelines rather than replacing them — reviewing what you have, writing a remediation plan, and either implementing it ourselves or handing your team a clear spec. Most engagements end with a durable QA capability owned by your permanent team.",
  },
  {
    question: "Who leads the engagement?",
    answer:
      "Mohit Sengar leads every engagement personally. He has spent 7+ years as a CTO and 14+ years building software for 40+ companies, and this QA and quality-engineering practice is the delivery bench behind his fractional CTO work. You get senior quality-engineering leadership, not a hand-off to juniors.",
  },
];
