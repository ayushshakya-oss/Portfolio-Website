"use client";

import SplitWords from "@/components/sections/SplitWords";

const PILLARS = [
  {
    num: "01",
    title: "Immersive 3D & Shaders",
    desc: "Procedural geometry, custom GLSL noise displacement, and interactive lighting using React Three Fiber.",
  },
  {
    num: "02",
    title: "Cinematic Choreography",
    desc: "Fine-tuned GSAP ScrollTrigger timelines, scrubbed momentum, and micro-interactions that feel alive.",
  },
  {
    num: "03",
    title: "Performance & Architecture",
    desc: "Zero jank, adaptive DPR capping, clean dispose lifecycles, and resilient Next.js App Router architecture.",
  },
  {
    num: "04",
    title: "Design Systems & Detail",
    desc: "Harmonious dark aesthetics, glassmorphism, responsive typography, and tactile cursor feedback.",
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
                01 // About & Approach
              </span>
            </div>

            <SplitWords
              text="I craft polished product experiences from concept to production."
              className="mt-4 text-3xl leading-tight font-bold text-zinc-100 sm:text-4xl lg:text-5xl"
            />

            <p
              data-reveal
              className="mt-6 text-base leading-relaxed text-zinc-300/85 sm:text-lg"
            >
              My work blends frontend architecture, creative direction, and motion
              systems. I care deeply about details that users feel but cannot
              always name: pacing, depth, tactility, and buttery smoothness.
            </p>

            <p
              data-reveal
              className="mt-4 text-sm leading-relaxed text-zinc-400"
            >
              Every interaction is thoughtfully choreographed to guide attention,
              reinforce brand value, and turn standard web pages into memorable digital artifacts.
            </p>

            {/* Quick Metrics */}
            <div data-reveal className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-2xl font-bold text-cyan-300">60 FPS</p>
                <p className="mt-1 text-xs tracking-wider text-zinc-400 uppercase">
                  WebGL Frame Rate
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-300">100%</p>
                <p className="mt-1 text-xs tracking-wider text-zinc-400 uppercase">
                  TypeScript Rigor
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-300">&lt; 1.2s</p>
                <p className="mt-1 text-xs tracking-wider text-zinc-400 uppercase">
                  LCP Optimization
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
