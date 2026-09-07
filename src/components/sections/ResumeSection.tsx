"use client";

import SplitWords from "@/components/sections/SplitWords";

type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
  stack: string[];
};

const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Frontend Engineer — AI Interfaces",
    org: "Bidlens AI Platform",
    period: "2026",
    type: "AI & Enterprise Web",
    description:
      "Architected and engineered the frontend platform, interactive analytical dashboards, and real-time document viewing interfaces for an enterprise AI tender intelligence suite.",
    highlights: [
      "Engineered interactive TOR document criteria inspectors and AI summarization views",
      "Built responsive competitor pricing benchmark dashboards and data visualization tools",
      "Integrated AI REST endpoints into high-performance, accessible Next.js interfaces",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Zod",
    ],
  },
  {
    role: "Frontend Web Engineer",
    org: "Annapur Agro-Tech Platform",
    period: "2025",
    type: "Marketplace Frontend",
    description:
      "Engineered the responsive frontend web application and real-time bidding interface connecting agricultural producers directly with commercial buyers.",
    highlights: [
      "Engineered real-time dynamic bidding interface with instant socket-driven price ticker updates",
      "Built farmer & buyer management dashboards with interactive telemetry metrics",
      "Achieved sub-second page loads using Next.js App Router and responsive client design",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "WebSockets",
      "Stripe Checkout",
    ],
  },
  {
    role: "Frontend & Creative Web Developer",
    org: "Raramarket & Client Digital Builds",
    period: "2025-Present",
    type: "E-Commerce & 3D Web",
    description:
      "Crafted high-performance e-commerce storefront interfaces, multi-vendor shopping flows, and cinematic 3D digital experiences integrating React Three Fiber and GSAP.",
    highlights: [
      "Developed modular Next.js & React storefront UI for cross-border multi-vendor catalogs",
      "Created procedural GLSL shaders, React Three Fiber scenes, and buttery GSAP scroll choreography",
      "Enforced strict WCAG accessibility and optimized Core Web Vitals to 98+ Lighthouse scores",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Three.js",
      "Tailwind CSS",
      "GSAP",
    ],
  },
];

export default function ResumeSection() {
  return (
    <section
      id="resume"
      className="scene-section relative flex min-h-screen items-center py-28 md:py-36"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span data-reveal className="section-label">
            04 // Resume & Credentials
          </span>
          <SplitWords
            text="Professional trajectory, engineering depth, and formal qualifications."
            className="mt-4 text-3xl leading-tight font-bold text-zinc-100 sm:text-4xl lg:text-5xl"
          />
          <p
            data-reveal
            className="mt-5 text-base leading-relaxed text-zinc-300/85 sm:text-lg"
          >
            A verified record of production systems delivered, technical
            leadership, and continuous architectural discipline. Download the
            full resume or inspect verified milestones below.
          </p>
        </div>

        {/* Content Layout - Explicit 12 Column Grid for Rock-Solid Reliability */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Timeline Highlights (7 of 12 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
                {"// Career Milestones"}
              </h3>
              <span className="font-mono text-[11px] text-zinc-400">
                {EXPERIENCE.length} Key Roles
              </span>
            </div>

            {/* Vertical Timeline Container */}
            <div className="relative border-l-2 border-cyan-400/20 pl-6 sm:pl-8 space-y-8 ml-2 sm:ml-3">
              {EXPERIENCE.map((item) => (
                <div
                  key={item.role}
                  className="relative glass-panel-interactive rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:border-cyan-400/50"
                >
                  {/* Timeline Glowing Node on Left Border */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-7 flex h-4 w-4 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-40" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
                  </span>

                  {/* Role Header */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <span className="inline-block rounded-full bg-cyan-400/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-cyan-300 uppercase tracking-wider mb-1.5">
                        {item.type}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-zinc-100">
                        {item.role}
                      </h4>
                      <p className="text-xs sm:text-sm font-medium text-cyan-300/90 mt-0.5">
                        {item.org}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-300">
                      {item.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-300/90">
                    {item.description}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="mt-4 space-y-1.5 border-t border-white/5 pt-3 text-xs text-zinc-300">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stack Badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Education Badge */}
            <div className="glass-panel-interactive flex items-center justify-between rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                    Education &amp; Degree
                  </p>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-100 mt-0.5">
                    Bachelor of Science in Information Technology (BSc IT)
                  </h4>
                </div>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-medium text-emerald-300">
                Graduated
              </span>
            </div>
          </div>

          {/* Right Column: Download Hub Card (5 of 12 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
                {"// Download Hub"}
              </h3>
            </div>

            <div className="glass-panel relative overflow-hidden rounded-3xl border border-cyan-400/25 bg-[#090e1f]/90 p-7 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {/* PDF Icon Graphic */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 border border-cyan-400/30 text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-zinc-100">
                    Ayush_Shakya_Resume.pdf
                  </h4>
                  <p className="text-xs font-mono text-zinc-400">
                    Format: PDF • Comprehensive Edition 2025
                  </p>
                </div>
              </div>

              {/* Summary bullet highlights */}
              <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-xs leading-relaxed text-zinc-300">
                <p className="font-semibold text-cyan-300 mb-2">
                  Document Overview Includes:
                </p>
                <ul className="space-y-2 list-disc list-inside text-zinc-300/85">
                  <li>Full-stack &amp; Node.js backend architecture history</li>
                  <li>
                    Multi-vendor platforms, AI integrations &amp; database
                    schemas
                  </li>
                  <li>
                    Creative WebGL 3D, accessibility &amp; performance metrics
                  </li>
                  <li>
                    Verified contact details, GitHub repositories &amp;
                    credentials
                  </li>
                </ul>
              </div>

              {/* Download & Preview Actions */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="/resume.pdf"
                  download="Ayush_Shakya_Resume.pdf"
                  data-cursor="Download"
                  className="cursor-hover group flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download Full CV</span>
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Preview"
                  className="cursor-hover glass-panel flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-xs sm:text-sm font-medium text-zinc-200 transition-colors hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
                >
                  <span>Preview</span>
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
