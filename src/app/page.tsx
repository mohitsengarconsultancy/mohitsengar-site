"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

/* ─── Data ─── */
const PROJECTS = [
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/0af7543c-3cdb-4f93-b68b-7df8638b8361/OIP.jpg?format=1500w",
    url: "https://www.apcoa.com/",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/37abed93-0f49-4714-b8de-02a75edb2c7e/project+2.jpg?format=1500w",
    url: "https://www.ferrariworldabudhabi.com/",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/4d6b52d0-5854-4072-82c5-578890380aca/project+3.jpg?format=1500w",
    url: "https://www.social27.com/",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/aec1829d-bfe9-4041-8796-b2280ff0fc14/6.png?format=1500w",
    url: "https://vourity.com/",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/8564f9ed-bad5-48a4-88e7-99c2885850d1/7.png?format=1500w",
    url: "https://www.mohitsengar.org/",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/858cdd95-a314-4ad6-b0bb-d700c748a43b/8.jpg?format=1500w",
    url: "https://www.atlashxm.com/",
  },
];

const TESTIMONIALS = [
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/7a779e68-a5ad-4b43-ad71-94681b13f938/1705059028589+%281%29.jpg?format=500w",
    name: "Talal Alhabib",
    source: "Linkedin",
    text: "I had the pleasure of engaging with Mohit Sengar in a fireside chat on Extended Reality (XR) at the Internet 2.0 conference. Mohit's command over XR technology and its applications across various sectors is truly impressive.",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/b516d56e-dec7-4388-bcac-f48f847fcb0a/1703223085288.jpeg?format=500w",
    name: "Nathan Jaskot",
    source: "Linkedin",
    text: "Working with Mohit has been great! He is a technical expert in all things development! I can consistently rely on him to provide great advice, technical expertise and well developed solutions. Highly recommended",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/2538d18d-37d2-4b9e-8254-73167297a56f/1703973581380.jpeg?format=500w",
    name: "Erlend B\u00e5rli-Olsen",
    source: "Linkedin",
    text: "My absolute pleasure to endorse Mohit Sengar, an invaluable asset & the pivotal force behind our success at APCOA Parkings GmbH. Mohit has consistently demonstrated exceptional technical acumen & unwavering dedication to our projects.",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/06068382-bd7d-4d0c-be35-49f19d6cdc79/1628239985242.jpeg?format=500w",
    name: "Emma Lucas",
    source: "Linkedin",
    text: "I highly recommend Mohit for his exceptional support, timely actions, and platform development skills. His expertise and dedication have been invaluable to our project's success. A skilled and reliable developer.",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/4ff7fc70-8861-4ac9-b404-f054fd6fdecf/1706266379429.jpeg?format=500w",
    name: "Max Aronsson",
    source: "Linkedin",
    text: "Competent and trustworthy fullstack developer. Mohit is communicative and a great team player. Was always available and open to new ideas and thrived in a fast changing environment. Solved complex problems during many years of collaboration.",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/a5839266-d46b-4551-ad24-43a97f65254a/1571034712113.jpeg?format=500w",
    name: "Nadia O.",
    source: "Linkedin",
    text: "Your contributions have helped us bring our idea to life and also positioned our application as a game-changer in the legal tech domain. Your efforts as a full-stack software engineer are exceptional.",
  },
];

const GALLERY_IMAGES = [
  "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/3a095eef-42f0-481e-84ae-b4c9b4cc2ed4/AE2I0340+8r.jpeg?format=1500w",
  "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/d8a3b65e-909e-42a7-843d-0b7a670e6188/AE2I0064+8r+%281%29+%281%29.jpeg?format=1500w",
  "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/bc90efcf-34cf-4db6-8749-470d25386253/AE2I0026+8r+%281%29.jpeg?format=1500w",
  "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/97845543-35f7-45d5-8f7b-57f0cccb1d40/AE2I0071+8r+%281%29+%281%29.jpeg?format=1500w",
];

const NGO_IMAGES = [
  "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/fd38e3c1-3d8a-4e54-bfbb-4e42819fe088/dream+girl+foundation.jpg?format=1000w",
  "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/dd7aea22-0953-4dbc-8c3a-44bc554b62da/4.jpg?format=1000w",
  "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/6398d751-6a2a-460f-bb2e-215cf257a57b/dream+girl+foundation+2.jpg?format=1000w",
  "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/80198371-a4ab-464b-96ff-b8b7ffd8f156/Screenshot+2024-03-15+171305.png?format=1000w",
  "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/94d00bfa-e955-4bdd-a3e6-216f55b218e6/3.jpg?format=1000w",
];

const SERVICES = [
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/5436cc70-7c51-4e8b-8ba9-a3d878aa3856/activity123.jpg?format=1500w",
    title: "Team Collaboration",
    text: "At Invatu, we prioritize team collaboration and employee well-being through various activities, including team-building exercises, knowledge-sharing sessions, and wellness programs.",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/732a2359-e805-4cb2-b612-9355150bafdd/activity+new.jpg?format=1500w",
    title: "Swift Deployment",
    text: "Invatu excels in swift deployment strategies, deploying solutions swiftly by leveraging agile methodologies and robust pipelines to seamlessly integrate software solutions.",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/667ca948-302a-422c-8bde-8b425aae5086/fast+123.jpg?format=1500w",
    title: "Rapid Solutions",
    text: "We prioritize rapid, high-quality solutions. Through continuous integration and automated testing, we accelerate development cycles, reducing time-to-market.",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/d6487db7-3a3a-4bea-850a-b7b31e2a562a/cropped-techevery-icon.jpg?format=1500w",
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
            src="https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/5c71fefb-3ec5-4f7d-bffc-1163e0368382/AE2I0342-8r.jpg?format=2500w"
            alt="Mohit Sengar"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 font-[var(--font-heading)]">
            Chief Technology Officer of a Future Trillion Dollar Company.
          </h1>
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

      {/* ═══ AWARD SECTION ═══ */}
      <section className="py-20 px-6 bg-white">
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

          {/* Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[3/4] rounded-lg overflow-hidden group"
              >
                <Image
                  src={src}
                  alt={`Award gallery ${i + 1}`}
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
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
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
                        alt={`Project ${i + 1}`}
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
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
                      alt={t.name}
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/65f18952eca3e72b336ecef5/27ef5486-f51c-4cc0-a62f-9d4c22b05825/AE2I0340+8r.jpeg?format=1500w"
                alt="Mohit Sengar"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <ul className="space-y-6">
                {[
                  "Proven track record of excellence, having collaborated with over 47 clients.",
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
                  alt={`NGO collaboration ${i + 1}`}
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
      <section className="py-20 px-6 bg-white">
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
                    alt={s.title}
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

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-black text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Mohit Sengar</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Visionary Technology Leader and Founder with over 11 years of
            industry experience, at the forefront of crafting exceptional
            applications and pioneering innovation.
          </p>
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
