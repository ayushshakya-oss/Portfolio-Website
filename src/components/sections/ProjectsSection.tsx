"use client";

import gsap from "gsap";
import { useRef } from "react";
import SplitWords from "@/components/sections/SplitWords";
import type { ProjectItem } from "@/components/types";

const PROJECTS: ProjectItem[] = [
  {
    title: "Annapur",
    summary: "Agro-tech eCommerce platform with bidding system.",
    description:
      "A full-stack agro-tech marketplace enabling farmers and buyers to trade with a real-time bidding system. Includes a comprehensive admin dashboard, secure transactions, and scalable backend architecture.",
    stack: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    url: "https://annapur-agro-tech-platform.vercel.app", // replace with actual link
  },
  {
    title: "Immigration Portal UI",
    summary: "Frontend UI for a government immigration system.",
    description:
      "A responsive and accessible frontend interface designed for a government immigration platform. Focused on usability, clean navigation, and performance using modern Next.js practices.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    url: "https://immigration-website-dashboard.vercel.app", // replace with actual link
  },
  {
    title: "Animated eCommerce Experience",
    summary: "E-commerce platform with advanced GSAP animations.",
    description:
      "An interactive eCommerce frontend featuring smooth GSAP-powered animations, scroll-based transitions, and engaging product showcases to enhance user experience.",
    stack: ["Next.js", "GSAP", "JavaScript"],
    url: "", // not deployed yet
  },
  {
    title: "Car Rental System",
    summary: "Web-based car rental management system.",
    description:
      "A PHP-based car rental platform allowing users to browse vehicles, make bookings, and manage rentals. Includes backend logic for availability tracking and booking management.",
    stack: ["PHP", "MySQL", "JavaScript"],
    url: "", // not deployed yet
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
                Project {index + 1}
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
