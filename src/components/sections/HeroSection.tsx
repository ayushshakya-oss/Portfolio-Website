"use client";

import SplitWords from "@/components/sections/SplitWords";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="scene-section relative flex min-h-screen items-center pt-24 pb-20 md:pt-32 md:pb-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="max-w-3xl">
          {/* Availability Radar Badge */}
          <div
            data-reveal
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-emerald-300 uppercase backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="radar-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for Select Projects & Roles
          </div>

          {/* Role Pill */}
          <div data-reveal className="mb-4">
            <span className="text-xs font-semibold tracking-[0.24em] text-cyan-300 uppercase">
              Ayush Shakya — Creative Developer & Frontend Engineer
            </span>
          </div>

          {/* Main Kinetic Headline */}
          <SplitWords
            as="h1"
            text="Building cinematic interfaces with code, motion, and light."
            className="text-4xl leading-[1.08] font-bold tracking-tight text-zinc-100 sm:text-6xl lg:text-7xl"
          />

          {/* Narrative Subtitle */}
          <p
            data-reveal
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300/85 sm:text-lg"
          >
            Specialized in crafting high-impact digital experiences at the
            intersection of WebGL 3D, buttery GSAP choreography, and robust
            Next.js engineering.
          </p>

          {/* Capability Tags */}
          <div data-reveal className="mt-7 flex flex-wrap items-center gap-2.5">
            {["Next.js 16", "React Three Fiber", "GLSL Shaders", "GSAP ScrollTrigger"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-zinc-300 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ),
            )}
          </div>

          {/* Action CTAs */}
          <div data-reveal className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              data-cursor="Explore"
              className="cursor-hover group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(56,189,248,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(56,189,248,0.55)]"
            >
              <span>Explore Selected Works</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            <a
              href="#contact"
              data-cursor="Talk"
              className="cursor-hover glass-panel inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-zinc-200 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
            >
              <span>Initiate Contact</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
