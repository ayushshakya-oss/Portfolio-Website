"use client";

import gsap from "gsap";
import { useRef, useState } from "react";
import SplitWords from "@/components/sections/SplitWords";
import type { ProjectItem } from "@/components/types";

export const PROJECTS: ProjectItem[] = [
  {
    title: "Annapur",
    category: "Agro-Tech Marketplace",
    year: "2025",
    summary: "Agro-tech eCommerce platform with real-time bidding system.",
    description:
      "A full-stack agro-tech marketplace enabling farmers and buyers to trade with a real-time bidding system. Includes a comprehensive admin dashboard, secure Stripe transactions, inventory monitoring, and a scalable cloud-native backend architecture.",
    stack: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    url: "https://annapur-agro-tech-platform.vercel.app",
    highlights: [
      "Real-time dynamic price bidding engine",
      "Comprehensive farmer & buyer dashboard",
      "Secure payment processing via Stripe",
    ],
  },
  {
    title: "Immigration Portal UI",
    category: "GovTech Design System",
    year: "2025",
    summary: "Frontend UI for a government immigration and visa system.",
    description:
      "A responsive, accessible, and high-security frontend interface designed for a government immigration platform. Focused on rigorous WCAG accessibility, clear multi-step verification workflows, and fast page loads using modern Next.js practices.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React Hook Form"],
    url: "https://immigration-website-dashboard.vercel.app",
    highlights: [
      "Multi-step secure application flow",
      "Strict WCAG 2.1 AA accessibility compliance",
      "Dynamic document verification status",
    ],
  },
  {
    title: "Animated eCommerce Experience",
    category: "Creative Frontend & Motion",
    year: "2024",
    summary: "E-commerce platform with advanced GSAP animations and kinetic layout.",
    description:
      "An interactive eCommerce showcase featuring smooth GSAP-powered animations, scroll-based product transitions, kinetic type effects, and fluid cart micro-interactions that elevate brand storytelling.",
    stack: ["Next.js", "GSAP", "ScrollTrigger", "JavaScript", "CSS Modules"],
    url: "https://annapur-agro-tech-platform.vercel.app", // fallback link
    highlights: [
      "Custom GSAP ScrollTrigger timeline reveals",
      "Buttery page and layout transitions",
      "Interactive 3D product showcase perspectives",
    ],
  },
  {
    title: "Car Rental System",
    category: "Full Stack Management",
    year: "2024",
    summary: "Web-based car rental booking and fleet management system.",
    description:
      "A complete car rental platform allowing users to browse vehicles, filter by specifications, make bookings, and manage rentals. Features a backend administration module for availability tracking, reservations, and maintenance scheduling.",
    stack: ["PHP", "MySQL", "JavaScript", "HTML5/CSS3"],
    url: "",
    highlights: [
      "Live vehicle availability and fleet tracking",
      "Automated reservation calculation engine",
      "Role-based administrative control panel",
    ],
  },
];

type ProjectsSectionProps = {
  onOpenProject: (project: ProjectItem) => void;
};

export default function ProjectsSection({
  onOpenProject,
}: ProjectsSectionProps) {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [mousePositions, setMousePositions] = useState<{
    [key: number]: { x: number; y: number };
  }>({});

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setMousePositions((prev) => ({
      ...prev,
      [index]: { x, y },
    }));

    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    gsap.to(card, {
      rotateY: normX * 10,
      rotateX: -normY * 8,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center",
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section
      id="projects"
      className="scene-section relative flex min-h-screen items-center py-28 md:py-36"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span data-reveal className="section-label">
              02 // Selected Works
            </span>
            <SplitWords
              text="Projects where interaction design drives real-world product impact."
              className="mt-4 max-w-3xl text-3xl leading-tight font-bold text-zinc-100 sm:text-4xl lg:text-5xl"
            />
          </div>
          <p
            data-reveal
            className="max-w-xs text-xs tracking-wider text-zinc-400 uppercase md:text-right"
          >
            Click any project card to inspect architecture, stack &amp; live demos.
          </p>
        </div>

        {/* Project Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((project, index) => {
            const pos = mousePositions[index] || { x: 0, y: 0 };
            return (
              <div
                key={project.title}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => onOpenProject(project)}
                data-cursor="Open"
                className="project-card cursor-hover relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1224]/70 p-7 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                style={{
                  backgroundImage: `radial-gradient(450px circle at ${pos.x}px ${pos.y}px, rgba(56, 189, 248, 0.12), transparent 80%)`,
                }}
              >
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold tracking-widest text-cyan-300">
                      0{index + 1}
                    </span>
                    <span className="text-xs tracking-wider text-zinc-400 uppercase">
                      {project.category}
                    </span>
                  </div>
                  <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-zinc-400">
                    {project.year}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="mt-4 text-2xl font-bold text-zinc-100 transition-colors duration-300 group-hover:text-cyan-300">
                  {project.title}
                </h3>

                {/* Summary */}
                <p className="mt-3 text-sm leading-relaxed text-zinc-300/85">
                  {project.summary}
                </p>

                {/* Key Highlights */}
                {project.highlights && (
                  <ul className="mt-4 space-y-1.5 border-t border-white/5 pt-4 text-xs text-zinc-400">
                    {project.highlights.slice(0, 2).map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-cyan-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Stack Pills & CTA */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-medium text-zinc-400">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                    <span>Inspect Details</span>
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
