"use client";

import SplitWords from "@/components/sections/SplitWords";

const EXPERIENCE = [
  {
    role: "Lead Full-Stack & Creative Developer",
    org: "Annapur Agro-Tech Platform",
    period: "2024 — 2025",
    description:
      "Architected the full-stack agro-tech marketplace with a live bidding engine, Stripe payments, and an administrative control suite.",
  },
  {
    role: "Frontend Design System Engineer",
    org: "Immigration Portal UI",
    period: "2024 — 2025",
    description:
      "Built a secure, accessible frontend platform compliant with WCAG 2.1 AA, featuring multi-step application and document verification.",
  },
  {
    role: "Creative Web & Motion Developer",
    org: "Independent Products & Client Builds",
    period: "2023 — Present",
    description:
      "Crafted high-impact web applications integrating React Three Fiber, custom GLSL shaders, and fine-tuned GSAP scroll choreographies.",
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
            A verified record of production systems delivered, technical leadership,
            and continuous architectural discipline. Download the full resume or inspect
            key highlights below.
          </p>
        </div>

        {/* Content Layout */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start">
          {/* Left Column: Timeline Highlights */}
          <div className="space-y-6">
            <h3
              data-reveal
              className="text-xs font-mono font-semibold tracking-widest text-cyan-300 uppercase"
            >
              {"// Career Milestones"}
            </h3>

            <div className="space-y-4">
              {EXPERIENCE.map((item) => (
                <div
                  key={item.role}
                  data-reveal
                  className="glass-panel-interactive rounded-3xl p-6 sm:p-7"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-zinc-100">
                        {item.role}
                      </h4>
                      <p className="text-xs sm:text-sm font-medium text-cyan-300">
                        {item.org}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-zinc-400">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-300/85">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Education Badge */}
            <div
              data-reveal
              className="glass-panel-interactive flex items-center justify-between rounded-2xl p-5"
            >
              <div>
                <p className="text-xs font-mono text-zinc-400 uppercase">
                  Education &amp; Degree
                </p>
                <h4 className="mt-1 text-sm sm:text-base font-bold text-zinc-100">
                  Bachelor of Science in Information Technology / CS
                </h4>
              </div>
              <span className="rounded-full bg-cyan-400/15 px-3 py-1 font-mono text-[11px] text-cyan-300">
                Graduated
              </span>
            </div>
          </div>

          {/* Right Column: Download Hub Card */}
          <div className="space-y-6">
            <h3
              data-reveal
              className="text-xs font-mono font-semibold tracking-widest text-cyan-300 uppercase"
            >
              {"// Download Hub"}
            </h3>

            <div
              data-reveal
              className="glass-panel relative overflow-hidden rounded-3xl border border-cyan-400/25 bg-[#090e1f]/90 p-7 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
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
                <ul className="space-y-1.5 list-disc list-inside text-zinc-300/85">
                  <li>Full professional work history &amp; project scope</li>
                  <li>In-depth technical skills &amp; tooling proficiency</li>
                  <li>Architecture, accessibility &amp; performance metrics</li>
                  <li>Verified contact details &amp; credentials</li>
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
