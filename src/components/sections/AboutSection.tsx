"use client";

import SplitWords from "@/components/sections/SplitWords";

const PILLARS = [
  {
    num: "01",
    title: "Backend & Node.js Architecture",
    desc: "Scalable REST APIs, asynchronous pipelines, secure authentication, and resilient database schemas with MongoDB & SQL.",
  },
  {
    num: "02",
    title: "Full-Stack Web Engineering",
    desc: "Next.js App Router, server-rendered React components, state management, and accessible high-performance interfaces.",
  },
  {
    num: "03",
    title: "Immersive 3D & Creative Tech",
    desc: "Procedural geometry, custom GLSL shaders, interactive React Three Fiber scenes, and fluid GSAP choreography.",
  },
  {
    num: "04",
    title: "Performance & Production Rigor",
    desc: "Sub-second LCP, edge caching, low-latency API response times, and strict TypeScript end-to-end type safety.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scene-section relative flex min-h-screen items-center py-28 md:py-36"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-center">
          {/* Left Column: Narrative */}
          <div>
            <div data-reveal className="mb-4">
              <span className="section-label">
                01 // About &amp; Approach
              </span>
            </div>

            <SplitWords
              text="Architecting end-to-end web products from database to browser."
              className="mt-4 text-3xl leading-tight font-bold text-zinc-100 sm:text-4xl lg:text-5xl"
            />

            <p
              data-reveal
              className="mt-6 text-base leading-relaxed text-zinc-300/85 sm:text-lg"
            >
              My engineering spans full-stack web development, scalable Node.js backend
              systems, and high-impact creative interfaces. I design and build production-ready
              digital platforms that unite robust server-side architecture, clean data schemas,
              and frictionless user experiences.
            </p>

            <p
              data-reveal
              className="mt-4 text-sm leading-relaxed text-zinc-400"
            >
              From architecting full-stack bidding platforms on Annapur and AI dashboards
              on Bidlens to engineering multi-vendor storefronts and choreographing WebGL shaders,
              every project is built for speed, resilience, and mathematical elegance.
            </p>

            {/* Quick Metrics */}
            <div data-reveal className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-2xl font-bold text-cyan-300">&lt; 150ms</p>
                <p className="mt-1 text-xs tracking-wider text-zinc-400 uppercase">
                  API Latency
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-300">100%</p>
                <p className="mt-1 text-xs tracking-wider text-zinc-400 uppercase">
                  TypeScript Rigor
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-300">60 FPS</p>
                <p className="mt-1 text-xs tracking-wider text-zinc-400 uppercase">
                  WebGL &amp; Motion
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Focus Cards */}
          <div className="space-y-4">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                data-reveal
                className="glass-panel-interactive rounded-2xl p-5 sm:p-6"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono font-semibold tracking-widest text-cyan-300">
                    {pillar.num}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/50" />
                </div>
                <h3 className="mt-2 text-base font-semibold text-zinc-100 sm:text-lg">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-300/80 sm:text-sm">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
