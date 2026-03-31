"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

/* ─── Data ─── */
const PROJECTS = [
  { img: "/images/project-apcoa.jpg", url: "https://www.apcoa.com/" },
  { img: "/images/project-ferrari.jpg", url: "https://www.ferrariworldabudhabi.com/" },
  { img: "/images/project-social27.jpg", url: "https://www.social27.com/" },
  { img: "/images/project-vourity.png", url: "https://vourity.com/" },
  { img: "/images/project-5.png", url: "https://www.mohitsengar.org/" },
  { img: "/images/project-atlas.jpg", url: "https://www.atlashxm.com/" },
];

const TESTIMONIALS = [
  {
    img: "/images/testimonial-talal.jpg",
    name: "Talal Alhabib",
    source: "Linkedin",
    text: "I had the pleasure of engaging with Mohit Sengar in a fireside chat on Extended Reality (XR) at the Internet 2.0 conference. Mohit's command over XR technology and its applications across various sectors is truly impressive.",
  },
  {
    img: "/images/testimonial-nathan.jpeg",
    name: "Nathan Jaskot",
    source: "Linkedin",
    text: "Working with Mohit has been great! He is a technical expert in all things development! I can consistently rely on him to provide great advice, technical expertise and well developed solutions. Highly recommended",
  },
  {
    img: "/images/testimonial-erlend.jpeg",
    name: "Erlend B\u00e5rli-Olsen",
    source: "Linkedin",
    text: "My absolute pleasure to endorse Mohit Sengar, an invaluable asset & the pivotal force behind our success at APCOA Parkings GmbH. Mohit has consistently demonstrated exceptional technical acumen & unwavering dedication to our projects.",
  },
  {
    img: "/images/testimonial-emma.jpeg",
    name: "Emma Lucas",
    source: "Linkedin",
    text: "I highly recommend Mohit for his exceptional support, timely actions, and platform development skills. His expertise and dedication have been invaluable to our project's success. A skilled and reliable developer.",
  },
  {
    img: "/images/testimonial-max.jpeg",
    name: "Max Aronsson",
    source: "Linkedin",
    text: "Competent and trustworthy fullstack developer. Mohit is communicative and a great team player. Was always available and open to new ideas and thrived in a fast changing environment. Solved complex problems during many years of collaboration.",
  },
  {
    img: "/images/testimonial-nadia.jpeg",
    name: "Nadia O.",
    source: "Linkedin",
    text: "Your contributions have helped us bring our idea to life and also positioned our application as a game-changer in the legal tech domain. Your efforts as a full-stack software engineer are exceptional.",
  },
];

const GALLERY_IMAGES = [
  "/images/gallery1.jpeg",
  "/images/gallery2.jpeg",
  "/images/gallery3.jpeg",
  "/images/gallery4.jpeg",
];

const NGO_IMAGES = [
  "/images/ngo-dreamgirl.jpg",
  "/images/ngo-2.jpg",
  "/images/ngo-dreamgirl2.jpg",
  "/images/ngo-4.png",
  "/images/ngo-5.jpg",
];

const SERVICES = [
  {
    img: "/images/service-collaboration.jpg",
    title: "Team Collaboration",
    text: "At Invatu, we prioritize team collaboration and employee well-being through various activities, including team-building exercises, knowledge-sharing sessions, and wellness programs.",
  },
  {
    img: "/images/service-deployment.jpg",
    title: "Swift Deployment",
    text: "Invatu excels in swift deployment strategies, deploying solutions swiftly by leveraging agile methodologies and robust pipelines to seamlessly integrate software solutions.",
  },
  {
    img: "/images/service-rapid.jpg",
    title: "Rapid Solutions",
    text: "We prioritize rapid, high-quality solutions. Through continuous integration and automated testing, we accelerate development cycles, reducing time-to-market.",
  },
  {
    img: "/images/service-tech.jpg",
    title: "Cutting-edge Technology",
    text: "From AI and machine learning to blockchain and IoT, we harness the latest advancements to drive digital transformation and deliver cutting-edge solutions.",
  },
];

const APPS = [
  {
    title: "Crypto Fear Greed",
    text: "Empower your investment decisions with Crypto Fear Greed, where data-driven insights help you stay ahead in the ever-evolving crypto landscape.",
  },
  {
    title: "The ParkMan",
    text: "Embark on adventures with The ParkMan, your gateway to unforgettable outdoor experiences.",
  },
  {
    title: "TrustAdvisor",
    text: "Your holistic guide across all domains, ensuring informed decisions and lasting prosperity.",
  },
];

const FAQS = [
  {
    q: "Who is Mohit Sengar?",
    a: "Mohit Sengar is an award-winning Chief Technology Officer (CTO) and full-stack technology leader with over 11 years of enterprise experience. He is the CTO of Invatu Technologies and has collaborated with 47+ clients across e-commerce, healthcare, finance, parking management, theme park operations, and more.",
  },
  {
    q: "What does Mohit Sengar specialize in?",
    a: "Mohit Sengar specializes in digital transformation, enterprise integration and automation, full-stack development, AI & machine learning, blockchain, IoT, and technology team leadership. He has expertise across multiple industries including e-commerce, healthcare, finance, and parking management.",
  },
  {
    q: "What is a fractional CTO?",
    a: "A fractional CTO is an experienced technology executive who provides part-time CTO services to companies that need strategic technology leadership but may not require or afford a full-time CTO. Mohit Sengar offers fractional CTO services, bringing 11+ years of enterprise experience to help businesses with technology strategy, team building, and digital transformation.",
  },
  {
    q: "How can I hire Mohit Sengar?",
    a: "You can hire Mohit Sengar by scheduling a call through his website at mohitsengar.org. He offers CTO-as-a-service, full-stack development, digital transformation consulting, and enterprise integration services. He is also available on Upwork where he holds Top Rated Plus status.",
  },
  {
    q: "What awards has Mohit Sengar received?",
    a: "Mohit Sengar received the Outstanding Leadership Award at Dubai's Internet 2.0 Conference in February 2024 for his adept leadership and transformative impact as CTO of Invatu Technologies. He also holds the Upwork Top Rated Plus badge, reserved for the top 1% of freelancers.",
  },
  {
    q: "What is Mohit Sengar's experience on Upwork?",
    a: "Mohit Sengar has accumulated over 29,000 hours of work on Upwork with a 100% job success rate. He has collaborated with 47+ clients and earned the Top Rated Plus badge, which is reserved for the top 1% of freelancers on the platform.",
  },
];

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mohitsengarr/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/mohitsengarr",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "Upwork",
    url: "https://www.upwork.com/freelancers/mohitsengar",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
      </svg>
    ),
  },
];

/* ─── Carousel Hook ─── */
function useCarousel(length: number, interval = 4000) {
  const [index, setIndex] = useState(0);
  const next = useCallback(
    () => setIndex((i) => (i + 1) % length),
    [length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + length) % length),
    [length]
  );
  useEffect(() => {
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [next, interval]);
  return { index, next, prev, setIndex };
}

/* ─── FAQ Accordion ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-lg font-semibold pr-4">{q}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <p className="pb-5 text-gray-600 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

/* ─── Page ─── */
export default function Home() {
  const projectCarousel = useCarousel(PROJECTS.length, 3000);
  const testimonialCarousel = useCarousel(TESTIMONIALS.length, 5000);

  return (
    <main className="bg-white text-black">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Mohit Sengar - CTO and Full-Stack Technology Leader speaking at conference"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 font-[var(--font-heading)]">
            Mohit Sengar &mdash; CTO &amp; Full-Stack Technology Leader
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Award-winning technology leader with 11+ years of enterprise
            experience. Specializing in digital transformation, enterprise
            integration, and building high-performance engineering teams.
          </p>
          <a
            href="https://calendly.com/mohitsengarr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-mint hover:bg-mint-dark text-black font-semibold px-8 py-4 rounded-md transition-colors text-lg"
          >
            Schedule a Call
          </a>
        </div>
      </section>

      {/* ═══ AEO BIO BLOCK ═══ */}
      <section className="py-16 px-6 bg-white" id="about">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            About Mohit Sengar
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Mohit Sengar is an award-winning Chief Technology Officer and
            full-stack technology leader with over 11 years of enterprise
            experience. As CTO of Invatu Technologies, he has collaborated
            with 47+ clients across e-commerce, healthcare, finance, parking
            management, theme park operations, and agricultural solutions.
            Honored with the Outstanding Leadership Award at Dubai&apos;s
            Internet 2.0 Conference in 2024, he holds the prestigious Upwork
            Top Rated Plus badge (top 1%) with a 100% job success rate and
            29,000+ hours of delivered work. He founded and co-founded
            multiple successful companies and apps, pioneering solutions in
            blockchain, AI, and IoT.
          </p>
        </div>
      </section>

      {/* ═══ AWARD SECTION ═══ */}
      <section className="py-20 px-6 bg-gray-50" id="awards">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Outstanding Leadership Award
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Honored with &ldquo;Outstanding Leadership Award&rdquo; at
              Dubai&apos;s Internet 2.0 Conference, 2024
            </p>
            <div className="flex justify-center gap-12 mt-6 text-sm text-gray-500">
              <div>
                <span className="font-semibold text-black">Host</span>{" "}
                Internet 2.0 Conference
              </div>
              <div>
                <span className="font-semibold text-black">Date</span>{" "}
                22/02/2024
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[3/4] rounded-lg overflow-hidden group"
              >
                <Image
                  src={src}
                  alt={`Mohit Sengar at Internet 2.0 Conference Dubai - Award ceremony photo ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS CAROUSEL ═══ */}
      <section className="py-20 px-6 bg-white" id="projects">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Projects &amp; Clients
          </h2>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Mohit Sengar contributed to diverse software projects spanning
            e-commerce, healthcare, finance, parking management, theme park
            operations, agricultural solutions, payment-integrated applications,
            and many more.
          </p>

          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${projectCarousel.index * 100}%)`,
                }}
              >
                {PROJECTS.map((p, i) => (
                  <div key={i} className="carousel-slide">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative aspect-[16/9] max-h-[500px]"
                    >
                      <Image
                        src={p.img}
                        alt={`Client project ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 1152px"
                        className="object-contain bg-white"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={projectCarousel.prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={projectCarousel.next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              aria-label="Next project"
            >
              <ChevronRight />
            </button>
            <div className="flex justify-center gap-2 mt-6">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => projectCarousel.setIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === projectCarousel.index ? "bg-mint" : "bg-gray-300"
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LEADERSHIP VIDEO PLACEHOLDER ═══ */}
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Leadership Award for Digital Transformation
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Mohit Sengar as CTO of Invatu Technologies, is rewarded with the
            prestigious Outstanding Leadership Award, underscoring their adept
            leadership and transformative impact in steering the company towards
            innovation and success.
          </p>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 px-6 bg-white" id="testimonials">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Clients Say
          </h2>
          <div className="relative overflow-hidden">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${testimonialCarousel.index * 100}%)`,
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="carousel-slide flex flex-col items-center text-center px-6"
                >
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-6">
                    <Image
                      src={t.img}
                      alt={`${t.name} - Client testimonial`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{t.name}</h3>
                  <span className="text-sm text-gray-400 mb-4">
                    ({t.source})
                  </span>
                  <p className="text-gray-600 max-w-xl leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={testimonialCarousel.prev}
              className="bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => testimonialCarousel.setIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === testimonialCarousel.index
                      ? "bg-mint"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={testimonialCarousel.next}
              className="bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* ═══ APPS / PLATFORMS ═══ */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Platforms &amp; Products
          </h2>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore our array of platforms, from TrustAdvisor for holistic
            guidance, to Crypto for cutting-edge investment opportunities, and
            ParkMan for enriching outdoor experiences.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {APPS.map((app, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-mint/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-mint font-bold text-xl">
                    {app.title[0]}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{app.title}</h3>
                <p className="text-gray-600 leading-relaxed">{app.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-20 px-6 bg-white" id="stats">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="/images/stats-photo.jpeg"
                alt="Mohit Sengar - Award-winning CTO"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Proven Track Record
              </h2>
              <ul className="space-y-6">
                {[
                  "Collaborated with over 47 clients across diverse industries worldwide.",
                  "Consistently delivers top-notch solutions, garnering a stream of 5-star feedback.",
                  "Honored with the prestigious Top Rated Plus badge on Upwork, reserved for the top 1%.",
                  "Maintaining a flawless 100% job success rate amidst diverse challenges.",
                  "Accumulating over 29,000 hours of work showcasing unwavering work ethic.",
                ].map((stat, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="mt-1 flex-shrink-0 w-6 h-6 bg-mint rounded-full flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-700 leading-relaxed">
                      {stat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NGO / SOCIAL WORK ═══ */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Social Impact &amp; NGO Collaborations
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            I am honored to collaborate with the esteemed NGO Dream Girl
            Foundation, Donate an Hour and other respected associations, pooling
            our expertise and resources to create a lasting impact.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {NGO_IMAGES.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-lg overflow-hidden group"
              >
                <Image
                  src={src}
                  alt={`NGO collaboration - Social impact initiative ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT WE DO / SERVICES ═══ */}
      <section className="py-20 px-6 bg-white" id="services">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What We Do
            </h2>
            <p className="text-gray-600 text-lg">
              Enterprise integration and automation
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-video">
                  <Image
                    src={s.img}
                    alt={`${s.title} - Invatu Technologies service`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ SECTION ═══ */}
      <section className="py-20 px-6 bg-gray-50" id="faq">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div>
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-black text-white py-16 px-6" id="contact">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Mohit Sengar</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Award-winning CTO and full-stack technology leader with over 11
            years of industry experience. Specializing in digital
            transformation, enterprise integration, and cutting-edge technology
            strategy.
          </p>
          <div className="flex justify-center gap-5 mb-8">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-mint transition-colors"
                aria-label={`${link.name} profile`}
              >
                {link.icon}
              </a>
            ))}
          </div>
          <a
            href="https://calendly.com/mohitsengarr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-mint hover:bg-mint-dark text-black font-semibold px-8 py-3 rounded-md transition-colors"
          >
            Schedule a Call
          </a>
          <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Mohit Sengar. All rights
            reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ─── Icons ─── */
function ChevronLeft() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
