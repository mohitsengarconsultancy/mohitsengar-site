/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import { CALENDLY_URL } from "@/lib/contact";
import { QUOTES } from "@/lib/testimonials";
import { PERSON_ID, PERSON_NAME, PERSON_SAME_AS, SITE_URL } from "@/lib/person";

/* ───────── DATA ───────── */

const CONTACT = {
  email: "mohit@sengarconsultancy.org",
  phone: "+971 50 405 9627",
  nationality: "Indian",
  linkedin: "in/mohitsengarr",
  github: "mohitsengarconsultancy",
  instagram: "mohitsengarr",
  facebook: "mohitsengarr",
  location: "Dubai, UAE",
};

const ACHIEVEMENTS = [
  {
    title: "Outstanding Leadership Award",
    url: "https://www.internet2conf.com",
    desc: "Honored with the Outstanding Leadership Award at the Internet 2.0 Conference, Dubai 2024, while acting as CTO at Invatu Technologies.",
  },
  {
    title: "You Are the Star Award",
    url: "https://www.publicissapient.com/",
    desc: "Won the “You are the star” award for extraordinary performance while at Publicis Sapient — one of the world’s leading digital transformation agencies.",
  },
  {
    title: "Speaker — Internet 2.0 Conference",
    url: "https://www.internet2conf.com",
    desc: "Featured speaker on Extended Reality (XR), AI and technology leadership. Fireside chat with XR thought leaders.",
  },
];

/* Verbatim quotes (src/lib/testimonials.ts), the same text used on every page. */
const RECOMMENDATIONS = [
  {
    name: "Nathan Jaskot",
    role: "Founder",
    company: "Everconnect Data Systems, Inc",
    linkedin: "https://www.linkedin.com/in/nathanjaskot/",
    quote: QUOTES.nathan,
  },
  {
    name: "Max Aronsson",
    role: "CTO",
    company: "Nomor AB",
    linkedin: "https://www.linkedin.com/in/max-aronsson",
    quote: QUOTES.max,
  },
  {
    name: "Nadia Ouzoubair",
    role: "Founder",
    company: "Cyolo",
    linkedin: "https://www.linkedin.com/in/nadia-ouzoubair-your-partner/",
    quote: QUOTES.nadia,
  },
  {
    name: "Emma Lucas",
    role: "Director of Operations",
    company: "Canteenhub",
    linkedin: "https://www.linkedin.com/in/emma-lucas-a7179125/",
    quote: QUOTES.emma,
  },
  {
    name: "Erlend Bårli-Olsen",
    role: "Product Manager",
    company: "APCOA Parkings GmbH",
    linkedin: "https://www.linkedin.com/in/esport",
    quote: QUOTES.erlend,
  },
  {
    name: "Talal Alhabib",
    role: "Founder & CEO",
    company: "Sooqista Studios · Internet 2.0 fireside-chat co-panellist",
    linkedin: "https://www.linkedin.com/in/talalalhabib",
    quote: QUOTES.talal,
  },
  {
    name: "Sourabh Kapoor",
    role: "CEO",
    company: "Costimizer.ai",
    linkedin: "https://www.linkedin.com/in/sourabh-kapoor-71834111/",
    quote: QUOTES.sourabh,
  },
];

const TECH_EXPERTISE = [
  {
    group: "Core Backend & Server-Side",
    items: "Node.js, .NET Core (C#), Python, Blazor, ASP.NET Web API/MVC, Entity Framework",
  },
  {
    group: "Frontend",
    items: "Vue.js, React.js, Angular, Next.js, Nuxt.js",
  },
  {
    group: "Full-Stack",
    items: "MEAN, MERN, MEVN, Airtable, Retool",
  },
  {
    group: "AI & Coding Assistants",
    items: "GitHub Copilot, Cursor, Replit Ghostwriter, Tabnine, JetBrains AI Assistant, Claude Code, Anthropic API",
  },
  {
    group: "Generative AI",
    items: "ChatGPT, Claude, Midjourney, DALL·E 3, Stable Diffusion, Leonardo AI, Krea.ai, Runway AI, Adobe Firefly, Meta Imagine",
  },
  {
    group: "Agentic AI Frameworks",
    items: "LangChain, Microsoft AutoGen, CrewAI, SuperAGI, AgentGPT, LlamaIndex",
  },
  {
    group: "Blockchain & Distributed",
    items: "Ethereum, Solidity, Rust, Hyperledger (Fabric, Iroha, Sawtooth, Cello)",
  },
  {
    group: "Real-Time",
    items: "Socket.IO, WebRTC, Agora.io",
  },
  {
    group: "Cloud & DevOps",
    items: "Azure, AWS, GCP, Docker, Kubernetes",
  },
  {
    group: "Mobile & No-Code",
    items: "Flutter, React Native, Xamarin, PhoneGap, Bubble.io, Retool, Airtable",
  },
  {
    group: "Databases",
    items: "MySQL, SQL Server, MongoDB, PostgreSQL, DynamoDB, Redis, Azure CosmosDB, Cassandra, Neo4j",
  },
  {
    group: "Identity & Auth",
    items: "Azure AD, Auth0, Okta, AWS Cognito, Supabase Auth",
  },
];

const NOTABLE_CLIENTS = [
  "APCOA",
  "AgriSync (acquired by John Deere)",
  "Rentokil (Nomor AB acquired)",
  "Glasswall",
  "Authority Partners",
  "Social27",
  "PrimeLab",
  "CanteenHub",
  "Vourity",
  "Cyolo",
  "Everconnectds",
  "Swaggle",
];

const WORK_EXPERIENCE = [
  {
    role: "Fractional CTO & Engineering Partner",
    company: "Independent",
    dates: "Mar 2026 — Present",
    location: "Dubai, UAE — Remote-first",
    body: [
      "Fractional CTO and senior engineering partner for founders and growth-stage startups. Specialise in turning AI-generated prototypes (Lovable, Bolt, Base44, Replit) into production-ready systems — security hardening, Supabase / API integrations, payments, observability, and clean handover.",
      "Lead a curated team of senior engineers, AI specialists, and designers across UAE, India, EU and the Americas. Fixed-scope engagements with written SoWs.",
    ],
  },
  {
    role: "Chief Technology Officer",
    company: "Unlimits",
    dates: "Mar 2025 — Mar 2026",
    location: "Dubai, UAE",
    body: [
      "Chief Technology Officer and tech lead at Unlimits, overseeing all technology operations, product scalability, and engineering leadership that align with the company’s vision for personal and business growth.",
      "Co-led the company with the founder and co-founder, driving tech vision and execution with a focus on speed, simplicity, and customer-centricity — maintaining a no-excuses, results-oriented culture.",
    ],
    link: { label: "linktr.ee/unlimits", url: "https://linktr.ee/unlimits" },
  },
  {
    role: "Chief Technology Officer",
    company: "Invatu Technologies",
    dates: "Sep 2018 — Mar 2025",
    location: "Dubai, UAE",
    body: [
      "Led engineering for 40+ enterprise and startup clients across healthcare, fintech, e-commerce, parking, theme-park operations, and legal-tech. Honored with the Outstanding Leadership Award at Internet 2.0 Conference Dubai 2024.",
      "Built and ran multi-region distributed engineering teams across UAE, India, Eastern Europe and the Americas. Delivered $501K+ in client revenue.",
    ],
    clients: [
      "APCOA Holdings GmbH",
      "Glasswall",
      "Authority Partners",
      "Social27",
      "Rentokil",
      "AgriSync (John Deere)",
      "PrimeLab",
      "CanteenHub",
      "Vourity",
      "Cyolo",
      "Everconnectds",
      "Swaggle",
    ],
    pillars: [
      {
        title: "Innovation & R&D",
        text: "Launched R&D projects in AI, ML and blockchain. Established partnerships with tech startups and academic institutions.",
      },
      {
        title: "Cybersecurity",
        text: "Overhauled the cybersecurity framework. Conducted regular security audits and GDPR / data-protection compliance training.",
      },
      {
        title: "Team & Leadership",
        text: "Built a high-performing tech team. Cultivated a culture of transparency, empowerment, and continuous improvement.",
      },
      {
        title: "Strategic Partnerships",
        text: "Forged partnerships with leading technology providers. Aligned tech investments to overall business strategy.",
      },
    ],
  },
  {
    role: "Associate Technology",
    company: "Publicis Sapient",
    dates: "Mar 2015 — Jan 2018",
    location: "India",
    body: [
      "Worked with global clients including Ferrari World Abu Dhabi and Ladbrokes. Developed and implemented ticket purchasing, management, and validation features alongside a comprehensive online betting platform.",
      "Led quality assurance with unit, integration, and end-to-end testing. Enhanced system scalability and performance through caching, refinements, and database optimisation.",
    ],
  },
  {
    role: "Software Developer",
    company: "Glasswall",
    dates: "Mar 2013 — Mar 2015",
    location: "UK / India",
    body: [
      "Built and maintained robust security solutions — designing, implementing and testing software components to ensure the highest levels of security and performance.",
      "Collaborated with engineers to ship innovative solutions protecting against advanced cyber threats; sharpened skills in secure software development and cutting-edge cybersecurity technology.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "B.Tech — Computer Science",
    school: "Abdul Kalam Technical University",
    url: "https://aktu.ac.in",
    dates: "2009 — 2013",
  },
  {
    degree: "High School",
    school: "Kendriya Vidyalaya",
    url: "https://kvsangathan.nic.in/",
  },
];

const PROJECTS = [
  {
    name: "APCOA Parking Holdings GmbH",
    url: "https://www.apcoa.com",
    bullets: [
      "Performance optimisation — query tuning, caching, async programming for high-load handling.",
      "Architecture for scale — load balancers, Docker containerisation, multi-region support.",
      "Reporting & analytics tools surfacing parking occupancy, revenue trends, and customer behaviour.",
      "Security hardening — encryption, auth, authorisation; comprehensive review for breach prevention.",
      "Stack: Node.js, Express.js, MongoDB, Redis, React.js, Docker, AWS/Azure/GCP, Git.",
    ],
  },
  {
    name: "Ferrari World — Theme Park",
    url: "https://www.ferrariworldabudhabi.com",
    bullets: [
      "Hero homepage, ride details, real-time event updates, secure ticket booking, interactive park maps, virtual tours.",
      "Backend in .NET Core / C# with Microsoft Azure and Azure SQL Database for hosting and storage.",
      "Frontend in React with Redux state, deployed via Azure App Service + CDN for global delivery.",
    ],
  },
  {
    name: "Social27",
    url: "https://www.social27.com",
    bullets: [
      "Social-networking platform for engagement, personalised content sharing, instant messaging, and video calls.",
      "Privacy-first architecture with advanced data protection and high availability for a growing audience.",
      "Gamification, user-generated content and community features to drive interaction.",
      "Stack: .NET Framework / Core, C#, ASP.NET MVC, EF Core, MS SQL Server, HTML/CSS, JS, AWS.",
    ],
  },
  {
    name: "Vourity",
    url: "https://vourity.com",
    bullets: [
      "Connects users with local events and activities; tools for organisers to manage and promote.",
      "Personalised recommendations and a streamlined discovery flow tied to user interests.",
      "Real-time updates, high performance, scalable architecture.",
      "Stack: Node.js + Express, MongoDB + Mongoose, Azure cloud.",
    ],
  },
  {
    name: "Canteenhub",
    url: "https://www.canteenhub.com.au/",
    bullets: [
      "Canteen management with menu, orders, inventory; visitor flow for ordering & paying online.",
      "Real-time order tracking, notifications, responsive web interface.",
      "Stack: React + Redux, Node.js + Express, MongoDB; deployed on Docker + AWS.",
    ],
  },
  {
    name: "Atlashxm",
    url: "https://www.atlashxm.com",
    bullets: [
      "Dynamic platform built with the MERN stack and Sitefinity CMS for international business expansion.",
      "Resource library, multilingual support, advanced search/filtering, interactive forums.",
    ],
  },
  {
    name: "AgriSync",
    url: "https://www.linkedin.com/company/agrisync",
    bullets: [
      "Communication and collaboration platform connecting farmers, agricultural experts and stakeholders.",
      "Real-time data visualisation and analytics across agricultural activities; scalable, secure backend.",
      "GraphQL for optimised data retrieval; integrated with third-party agricultural services and APIs.",
      "Stack: Node.js + Express, MongoDB + Mongoose, React + Redux; Docker + AWS for deployment.",
    ],
  },
];

const RECENT_HIGHLIGHTS = [
  {
    name: "Bhagwatham — AI Storytelling Engine",
    year: "2025 — Ongoing",
    bullets: [
      "Generative-AI engine producing illustrated narratives from Sanskrit and Hindi source texts.",
      "Custom character-face bank built on Together AI FLUX.2 for cross-frame face consistency.",
      "Supabase pgvector knowledge base for retrieval over a multi-million-token corpus.",
      "Multi-layer Sanskrit/Hindi shlok detection pipeline (postposition + verb + ML classifier).",
    ],
  },
  {
    name: "MenkeReport — Logging & Observability",
    year: "2025",
    bullets: [
      "End-to-end logging, error-handling and observability strategy for a SaaS web platform.",
      "Senior error-logging UX audit; structured logs, retention, alerting, and incident-response runbooks.",
      "Test plan covering unit, integration, e2e, and contract testing across the deployment pipeline.",
    ],
  },
  {
    name: "mohitsengar.org — Founder Brand & Funnel",
    year: "2025",
    bullets: [
      "Next.js 16 / React 19 / Tailwind 4 production build with structured-data SEO across all routes.",
      "Conversion funnel with Hotjar, Leadsy vTag, and GA4 instrumentation; sub-2s LCP on mobile.",
    ],
  },
  {
    name: "Build-Iskcon — Temple Operations Suite",
    year: "2025",
    bullets: [
      "Multi-app stack — temple tracker, API server, mockup sandbox — for a global devotee network.",
      "Distributed engineering across donations, attendance, and content workflows.",
    ],
  },
  {
    name: "Invatu Internal AI Tooling",
    year: "2024 — 2025",
    bullets: [
      "Bespoke due-diligence AI engine for M&A review across legal, financial and technical documents.",
      "Internal RAG chatbots over policy and engineering docs; cost-tracked LLM gateway.",
    ],
  },
];

const SPEAKING = [
  {
    event: "Internet 2.0 Conference — Dubai 2024",
    role: "Speaker · Award Recipient",
    desc: "Fireside chat on Extended Reality (XR) and emerging tech. Honored with the Outstanding Leadership Award for contributions as CTO at Invatu Technologies.",
  },
  {
    event: "Publicis Sapient — Global Awards",
    role: "Award Recipient",
    desc: "Recipient of the “You Are the Star” award for outstanding individual contribution across a global digital-transformation agency.",
  },
  {
    event: "Delivery Track Record",
    role: "40+ client engagements",
    desc: "40+ client engagements spanning healthcare, fintech, e-commerce, parking, and legal-tech. $501K+ in managed client revenue across multiple geographies.",
  },
];

/* ───────── ICONS ───────── */

const Icon = {
  trophy: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM3 5h4v3a3 3 0 01-3 3 1 1 0 01-1-1V5zm18 0h-4v3a3 3 0 003 3 1 1 0 001-1V5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  doc: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M9 13h6M9 17h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  building: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 13v.01M9 17v.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  cap: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 10L12 5 2 10l10 5 10-5zM6 12v5a6 3 0 0012 0v-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  folder: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2v11z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  mic: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3zM19 10v1a7 7 0 01-14 0v-1M12 18v4M8 22h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  rocket: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  briefcase: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" strokeLinecap="round" />
    </svg>
  ),
  mail: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  phone: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" />
    </svg>
  ),
  globe: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
    </svg>
  ),
  linkedin: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.7a1.8 1.8 0 110-3.6 1.8 1.8 0 010 3.6zM20 19h-3v-5.6c0-3.4-4-3.1-4 0V19h-3V8h3v1.8c1.4-2.6 7-2.8 7 2.5V19z" />
    </svg>
  ),
  github: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3" />
    </svg>
  ),
  instagram: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2 0 2 .2 2.4.4.6.2 1.1.5 1.6 1 .5.5.8 1 1 1.6.2.4.4 1.2.4 2.4.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.2 2-.4 2.4-.2.6-.5 1.1-1 1.6-.5.5-1 .8-1.6 1-.4.2-1.2.4-2.4.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-2-.2-2.4-.4-.6-.2-1.1-.5-1.6-1-.5-.5-.8-1-1-1.6-.2-.4-.4-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c0-1.2.2-2 .4-2.4.2-.6.5-1.1 1-1.6.5-.5 1-.8 1.6-1 .4-.2 1.2-.4 2.4-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.9c-3.1 0-3.5 0-4.7.1-1.1 0-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.1.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.1 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1 0 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.1-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.1-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zM12 6.9a5.1 5.1 0 110 10.2 5.1 5.1 0 010-10.2zm0 8.4a3.3 3.3 0 100-6.6 3.3 3.3 0 000 6.6zm5.3-8.6a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
    </svg>
  ),
  facebook: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 8H6v4h3v12h5V12h3.6l.4-4H14V6.3c0-1 .2-1.3 1.1-1.3H18V0h-3.6C10.7 0 9 1.7 9 4.7V8z" />
    </svg>
  ),
  pin: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  calendar: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  download: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  arrowLeft: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/* ───────── REUSABLE BITS ───────── */

function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-5 mt-10 first:mt-0">
      <div className="w-7 h-7 rounded-md bg-[#E6F3FB] text-[#1E9FFF] flex items-center justify-center">
        {icon}
      </div>
      <h2 className="text-[15px] font-semibold tracking-[0.18em] text-[#9CA3AF] uppercase">
        {title}
      </h2>
    </div>
  );
}

function ContactChip({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-2 bg-[#F4F5F7] hover:bg-[#EBECEF] transition-colors px-3 py-2 rounded text-[13px] text-[#374151] break-all">
      <span className="text-[#6B7280] flex-shrink-0">{icon}</span>
      <span>{text}</span>
    </div>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return inner;
}

function PersonBlock({
  name,
  role,
  company,
  linkedin,
  quote,
}: {
  name: string;
  role: string;
  company: string;
  linkedin?: string;
  quote: string;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="text-[15px] font-semibold text-[#1E9FFF]">{name}</h3>
      <div className="text-[13px] text-[#4B5563] leading-tight">{role}</div>
      <div className="text-[13px] text-[#4B5563] leading-tight">{company}</div>
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-[#9CA3AF] hover:text-[#1E9FFF] break-all block mt-0.5"
        >
          {linkedin}
        </a>
      )}
      <p className="text-[13px] text-[#374151] leading-relaxed mt-2">{quote}</p>
    </div>
  );
}

/* ───────── PAGE ───────── */

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#1F2937]">
      {/* Top action bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-[#4B5563] hover:text-[#1F2937] transition-colors"
          >
            {Icon.arrowLeft}
            <span>Back to mohitsengar.org</span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#1E9FFF] text-[#1E9FFF] hover:bg-[#1E9FFF]/10 text-[13px] font-semibold px-4 py-2 rounded-md transition-colors"
            >
              Book a call
            </a>
            {/* CV PDF download hidden: public/Mohit-Sengar-CV.pdf is out of date
                (12 years, job-seeker wording, unfinished Unlimits dates, personal
                email). Regenerate it from this page before linking it again. */}
          </div>
        </div>
      </div>

      <article className="max-w-5xl mx-auto bg-white shadow-sm my-0 lg:my-6 grid grid-cols-1 lg:grid-cols-[34%_66%]">
        {/* ─── LEFT SIDEBAR ─── */}
        <aside className="bg-[#F7F8FA] px-6 lg:px-8 py-10 lg:py-12 border-r border-[#E5E7EB]">
          {/* CV badge + photo */}
          <div className="relative mb-8">
            <span className="absolute -top-1 -left-1 bg-[#1E9FFF] text-white text-[11px] font-bold tracking-widest px-3 py-1.5 rounded">
              CV
            </span>
            <div className="relative w-full aspect-[4/5] max-w-[260px] mx-auto rounded overflow-hidden bg-[#E5E7EB]">
              <Image
                src="/images/hero.jpg"
                alt="Mohit Sengar"
                fill
                sizes="260px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Achievements */}
          <SectionHeader icon={Icon.trophy} title="Achievements" />
          {ACHIEVEMENTS.map((a) => (
            <div key={a.title} className="mb-5 last:mb-0">
              <h3 className="text-[15px] font-semibold text-[#1E9FFF] leading-snug">
                {a.title}
              </h3>
              {a.url && (
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-[#9CA3AF] hover:text-[#1E9FFF] break-all block mt-0.5"
                >
                  {a.url}
                </a>
              )}
              <p className="text-[13px] text-[#374151] leading-relaxed mt-1.5">
                {a.desc}
              </p>
            </div>
          ))}

          {/* Recommendations */}
          <SectionHeader icon={Icon.trophy} title="Recommendations" />
          {RECOMMENDATIONS.map((r) => (
            <PersonBlock key={r.name} {...r} />
          ))}
        </aside>

        {/* ─── RIGHT MAIN ─── */}
        <section className="px-6 lg:px-10 py-10 lg:py-12">
          {/* Header */}
          <header>
            <h1 className="text-[34px] sm:text-[40px] font-bold text-[#1E9FFF] leading-tight tracking-tight">
              Mohit Singh Sengar
            </h1>
            <p className="text-[18px] text-[#4B5563] mt-1">
              Chief Technology Officer
            </p>

            {/* Contact grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
              <ContactChip icon={Icon.mail} text={CONTACT.email} href={`mailto:${CONTACT.email}`} />
              <ContactChip icon={Icon.phone} text={CONTACT.phone} href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`} />
              <ContactChip icon={Icon.globe} text={CONTACT.nationality} />
              <ContactChip icon={Icon.linkedin} text={CONTACT.linkedin} href="https://www.linkedin.com/in/mohitsengarr/" />
              <ContactChip icon={Icon.github} text={CONTACT.github} href={`https://github.com/${CONTACT.github}`} />
              <ContactChip icon={Icon.instagram} text={CONTACT.instagram} href="https://www.instagram.com/mohitsengarr/" />
              <ContactChip icon={Icon.facebook} text={CONTACT.facebook} href="https://www.facebook.com/mohitsengarr" />
              <ContactChip icon={Icon.pin} text={CONTACT.location} />
            </div>
          </header>

          {/* Summary */}
          <SectionHeader icon={Icon.doc} title="Summary" />
          <div className="space-y-3 text-[13.5px] text-[#374151] leading-relaxed">
            <p>
              Seasoned technology leader driving innovation across AI, automation, software development,
              and blockchain. Currently an independent Fractional CTO and engineering partner; previously
              CTO at Unlimits and CTO at Invatu Technologies. Focused on turning AI-generated prototypes
              into production-grade systems and leading high-performing distributed teams. Recipient of the
              Outstanding Leadership Award at the <strong>Internet 2.0 Conference, Dubai, February 2024</strong>.
            </p>
            <div>
              <strong className="text-[#1F2937]">Current focus areas</strong>
              <ul className="mt-2 space-y-1 list-disc pl-5">
                <li>AI &amp; automation — fluent across modern tooling and agentic frameworks</li>
                <li>Coding assistants — GitHub Copilot, Cursor, Claude Code, Replit Ghostwriter</li>
                <li>Generative AI — Midjourney, DALL·E 3, Stable Diffusion, FLUX, Runway</li>
                <li>Agentic frameworks — LangChain, AutoGen, CrewAI, LlamaIndex</li>
                <li>Product strategy &amp; execution; senior technology leadership engagements</li>
              </ul>
            </div>
            <p>
              <strong className="text-[#1F2937]">Experience summary.</strong> 14+ years delivering software
              with .NET, JavaScript, modern AI (Claude, GPT, V0, Cursor), blockchain, and a stack-fluent
              approach to building, scaling and rescuing production systems.
            </p>
          </div>

          {/* Technical Expertise */}
          <SectionHeader icon={Icon.rocket} title="Technical Expertise" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {TECH_EXPERTISE.map((g) => (
              <div key={g.group}>
                <h4 className="text-[13px] font-semibold text-[#1F2937]">{g.group}</h4>
                <p className="text-[12.5px] text-[#4B5563] leading-relaxed mt-0.5">{g.items}</p>
              </div>
            ))}
          </div>

          {/* Notable Clients */}
          <SectionHeader icon={Icon.briefcase} title="Notable Clients" />
          <div className="flex flex-wrap gap-2">
            {NOTABLE_CLIENTS.map((c) => (
              <span
                key={c}
                className="text-[12.5px] text-[#374151] bg-[#F4F5F7] border border-[#E5E7EB] px-3 py-1.5 rounded"
              >
                {c}
              </span>
            ))}
          </div>

          {/* Work Experience */}
          <SectionHeader icon={Icon.building} title="Work Experience" />
          <div className="space-y-7">
            {WORK_EXPERIENCE.map((job) => (
              <div key={`${job.role}-${job.company}`}>
                <h3 className="text-[16px] font-semibold text-[#1E9FFF]">{job.role}</h3>
                <div className="text-[13.5px] text-[#1F2937] font-medium">{job.company}</div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-[#6B7280] mt-1">
                  <span className="inline-flex items-center gap-1.5">{Icon.calendar}{job.dates}</span>
                  <span className="inline-flex items-center gap-1.5">{Icon.pin}{job.location}</span>
                </div>
                <div className="mt-2 space-y-2 text-[13px] text-[#374151] leading-relaxed">
                  {job.body.map((p, i) => <p key={i}>{p}</p>)}
                  {job.link && (
                    <p>
                      <a
                        href={job.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1E9FFF] hover:underline break-all"
                      >
                        {job.link.label}
                      </a>
                    </p>
                  )}
                  {job.clients && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {job.clients.map((c) => (
                        <span
                          key={c}
                          className="text-[11.5px] text-[#4B5563] bg-white border border-[#E5E7EB] px-2 py-1 rounded"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                  {job.pillars && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {job.pillars.map((p) => (
                        <div key={p.title} className="bg-[#F7F8FA] border border-[#E5E7EB] rounded p-3">
                          <h5 className="text-[12.5px] font-semibold text-[#1F2937]">{p.title}</h5>
                          <p className="text-[12px] text-[#4B5563] leading-relaxed mt-1">{p.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <SectionHeader icon={Icon.cap} title="Education" />
          <div className="space-y-4">
            {EDUCATION.map((e) => (
              <div key={e.degree}>
                <h3 className="text-[15px] font-semibold text-[#1E9FFF]">{e.degree}</h3>
                <div className="text-[13px] text-[#1F2937]">{e.school}</div>
                {e.url && (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] text-[#9CA3AF] hover:text-[#1E9FFF]"
                  >
                    {e.url}
                  </a>
                )}
                {e.dates && (
                  <div className="text-[12px] text-[#6B7280] mt-0.5">{e.dates}</div>
                )}
              </div>
            ))}
          </div>

          {/* Projects */}
          <SectionHeader icon={Icon.folder} title="Projects" />
          <div className="space-y-6">
            {PROJECTS.map((p) => (
              <div key={p.name}>
                <h3 className="text-[15px] font-semibold text-[#1E9FFF]">{p.name}</h3>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-[#9CA3AF] hover:text-[#1E9FFF] break-all block"
                >
                  {p.url}
                </a>
                <ul className="mt-2 list-decimal pl-5 space-y-1 text-[13px] text-[#374151] leading-relaxed">
                  {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* ─── NEW PAGE: Recent Highlights ─── */}
          <SectionHeader icon={Icon.rocket} title="Recent Highlights · 2024 — 2026" />
          <div className="space-y-6">
            {RECENT_HIGHLIGHTS.map((p) => (
              <div key={p.name}>
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h3 className="text-[15px] font-semibold text-[#1E9FFF]">{p.name}</h3>
                  <span className="text-[11.5px] text-[#6B7280] uppercase tracking-wider">{p.year}</span>
                </div>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-[13px] text-[#374151] leading-relaxed">
                  {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Speaking & Recognition */}
          <SectionHeader icon={Icon.mic} title="Speaking & Recognition" />
          <div className="space-y-4">
            {SPEAKING.map((s) => (
              <div key={s.event}>
                <h3 className="text-[15px] font-semibold text-[#1E9FFF]">{s.event}</h3>
                <div className="text-[12.5px] text-[#6B7280]">{s.role}</div>
                <p className="text-[13px] text-[#374151] leading-relaxed mt-1.5">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom booking CTA */}
          <div className="mt-12 pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[14px] font-semibold text-[#1F2937]">Need a CTO for your product?</p>
              <p className="text-[12.5px] text-[#6B7280] mt-0.5">
                Book a free 30-minute fit call, or read how the{" "}
                <Link href="/fractional-cto" className="text-[#1E9FFF] hover:underline">
                  fractional CTO
                </Link>{" "}
                engagement works.
              </p>
            </div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1E9FFF] hover:bg-[#1976D2] text-white text-[14px] font-semibold px-5 py-2.5 rounded-md transition-colors shadow-sm"
            >
              Book a call
            </a>
          </div>

        </section>
      </article>

      {/* JSON-LD: a ProfilePage about the site-wide Person node. The Person keeps the
          root node's @id, url and sameAs, and only adds resume facts. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ProfilePage",
                "@id": `${SITE_URL}/resume#profile`,
                url: `${SITE_URL}/resume`,
                name: "Mohit Sengar — Resume",
                mainEntity: { "@id": PERSON_ID },
              },
              {
                "@type": "Person",
                "@id": PERSON_ID,
                name: PERSON_NAME,
                url: SITE_URL,
                sameAs: PERSON_SAME_AS,
                jobTitle: "Fractional CTO",
                email: `mailto:${CONTACT.email}`,
                telephone: CONTACT.phone,
                address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
                worksFor: { "@id": `${SITE_URL}/#org` },
                alumniOf: [
                  { "@type": "CollegeOrUniversity", name: "Abdul Kalam Technical University" },
                ],
                award: "Outstanding Leadership Award, Internet 2.0 Conference, Dubai, February 2024",
              },
            ],
          }),
        }}
      />
    </main>
  );
}
