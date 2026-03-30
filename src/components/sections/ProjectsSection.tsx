"use client";

import gsap from "gsap";
import { useRef } from "react";
import SplitWords from "@/components/sections/SplitWords";
import type { ProjectItem } from "@/components/types";

const PROJECTS: ProjectItem[] = [
  {
    title: "Nebula Commerce",
    summary: "Headless storefront with cinematic product stories.",
    description:
      "An immersive commerce platform using server-rendered data pipelines and a WebGL-first product explorer. Built for conversion and visual storytelling.",
    stack: ["Next.js", "R3F", "GSAP", "Stripe", "CMS"],
    url: "https://example.com/nebula-commerce",
  },
  {
    title: "Pulse Studio",
    summary: "Creative agency portfolio with live campaign reels.",
    description:
      "A premium showcase platform blending interactive case studies, timeline-based transitions, and deeply optimized media delivery for large art assets.",
    stack: ["Next.js", "TypeScript", "GSAP", "Cloudflare"],
    url: "https://example.com/pulse-studio",
  },
  {
    title: "ArcadeOps Dashboard",
    summary: "Real-time analytics UI for game publishing teams.",
    description:
      "A data-dense dashboard with composable chart modules, keyboard-first workflows, and nuanced micro-interactions to reduce cognitive load.",
    stack: ["React", "Three.js", "WebSockets", "Node.js"],
    url: "https://example.com/arcade-ops",
  },
];

type ProjectsSectionProps = {
  onOpenProject: (project: ProjectItem) => void;
};

export default function ProjectsSection({
  onOpenProject,
}: ProjectsSectionProps) {
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleMove = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const card = cardRefs.current[index];
    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 12,
      rotateX: -y * 10,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 900,
      transformOrigin: "center",
    });
  };

  const handleLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) {
      return;
    }

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <section
      id="projects"
      className="scene-section relative flex min-h-screen items-center py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <p data-reveal className="section-label">
          Projects
        </p>
        <SplitWords
          text="Selected builds where interaction design drives product impact."
          className="mt-4 max-w-4xl text-3xl leading-tight font-semibold text-zinc-100 md:text-5xl"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <button
              key={project.title}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              type="button"
              onMouseMove={(event) => handleMove(event, index)}
              onMouseLeave={() => handleLeave(index)}
              onClick={() => onOpenProject(project)}
              data-cursor="Open"
              className="project-card cursor-hover glass-panel group rounded-3xl p-6 text-left transition-colors duration-300 hover:border-cyan-300/50"
            >
              <p className="text-xs tracking-[0.2em] text-cyan-100/80 uppercase">
                Case Study {index + 1}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-zinc-100">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300/85">
                {project.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={`${project.title}-${item}`}
                    className="rounded-full bg-zinc-900/70 px-3 py-1 text-xs text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
