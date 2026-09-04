"use client";

import { useState } from "react";
import SplitWords from "@/components/sections/SplitWords";

type SkillCategory = {
  id: string;
  name: string;
  skills: { name: string; level: string; highlight?: boolean }[];
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "creative",
    name: "Creative & 3D",
    skills: [
      { name: "Three.js", level: "Advanced", highlight: true },
      { name: "React Three Fiber", level: "Advanced", highlight: true },
      { name: "GSAP & ScrollTrigger", level: "Expert", highlight: true },
      { name: "GLSL / Shaders", level: "Intermediate", highlight: true },
    ],
  },
  {
    id: "frontend",
    name: "Frontend Core",
    skills: [
      { name: "Next.js (App Router)", level: "Expert", highlight: true },
      { name: "React 19", level: "Expert", highlight: true },
      { name: "TypeScript", level: "Advanced", highlight: true },
      { name: "Tailwind CSS", level: "Expert" },
    ],
  },
  {
    id: "backend",
    name: "Backend & Systems",
    skills: [
      { name: "Node.js", level: "Advanced" },
      { name: "Express.js", level: "Advanced" },
      { name: "MongoDB", level: "Intermediate" },
      { name: "Python", level: "Intermediate" },
      { name: "PHP", level: "Intermediate" },
    ],
  },
  {
    id: "devops",
    name: "DevOps & Tools",
    skills: [
      { name: "Git & GitHub", level: "Advanced" },
      { name: "Docker", level: "Intermediate" },
      { name: "WordPress", level: "Intermediate" },
    ],
  },
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const displayedCategories =
    activeTab === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeTab);

  return (
    <section
      id="skills"
      className="scene-section relative flex min-h-screen items-center py-28 md:py-36"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span data-reveal className="section-label">
              03 // Capabilities & Tech
            </span>
            <SplitWords
              text="Tools and frameworks I use to ship fast, expressive, and reliable software."
              className="mt-4 max-w-3xl text-3xl leading-tight font-bold text-zinc-100 sm:text-4xl lg:text-5xl"
            />
          </div>

          {/* Category Filter Tabs */}
          <div data-reveal className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              data-cursor="Filter"
              className={`cursor-hover rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
              }`}
            >
              All Domains
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                data-cursor="Filter"
                className={`cursor-hover rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                  activeTab === cat.id
                    ? "bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                    : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Clusters Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayedCategories.map((category) => (
            <div
              key={category.id}
              data-reveal
              className="glass-panel-interactive flex flex-col justify-between rounded-3xl p-6 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-sm font-bold tracking-wider text-cyan-300 uppercase">
                    {category.name}
                  </h3>
                  <span className="font-mono text-[11px] text-zinc-400">
                    {category.skills.length} tools
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex items-center justify-between rounded-xl bg-white/[0.03] px-3.5 py-2.5 transition-colors duration-200 hover:bg-cyan-400/10"
                    >
                      <span className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white">
                        {skill.name}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wide ${
                          skill.highlight
                            ? "bg-cyan-400/20 text-cyan-300"
                            : "bg-white/5 text-zinc-400"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-2 text-[11px] font-mono text-zinc-400">
                {"// production ready"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
