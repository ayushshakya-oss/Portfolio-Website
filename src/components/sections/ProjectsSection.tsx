"use client";

import gsap from "gsap";
import { useRef, useState } from "react";
import SplitWords from "@/components/sections/SplitWords";
import type { ProjectItem } from "@/components/types";

export const PROJECTS: ProjectItem[] = [
  {
    title: "Bidlens AI",
    category: "AI Tender Intelligence Frontend",
    year: "2026",
    status: "Live Platform",
    summary:
      "AI-driven tender intelligence frontend automating bidding analysis, TOR visualization, and procurement metrics.",
    description:
      "Engineered the frontend platform and analytical dashboard interfaces for an enterprise AI tender intelligence application. Developed interactive Terms of Reference (TOR) document inspection views, competitive pricing benchmark charts, and high-performance Next.js workflows.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI REST APIs"],
    url: "https://bidlensai.com",
    highlights: [
      "AI document criteria inspection & interactive TOR summary views",
      "Competitive pricing benchmark dashboards and data visualization",
      "Fast, responsive Next.js application state with sub-second navigation",
    ],
  },
  {
    title: "Raramarket",
    category: "Cross-Border E-Commerce Frontend",
    year: "2025-Present",
    status: "Live Platform",
    summary:
      "High-performance web storefront and multi-vendor eCommerce UI for an international marketplace.",
    description:
      "Engineered the modern web storefront and user interface for an international cross-border e-commerce platform. Built responsive product catalogs, dynamic cart and checkout flows, vendor management views, and optimized client performance across diverse international markets.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST APIs"],
    url: "https://raramarket.jp",
    highlights: [
      "Modular web storefront architecture with instant catalog search and filtering",
      "Seamless multi-vendor shopping, localized cart, and checkout UI workflows",
      "Optimized Core Web Vitals and image delivery for international connectivity",
    ],
  },
  {
    title: "Annapur",
    category: "Full-Stack Agro-Tech Marketplace & Bidding",
    year: "2025",
    status: "Live Platform",
    summary:
      "Full-stack agro-tech eCommerce platform with real-time bidding, Node.js backend, and farmer telemetry.",
    description:
      "Architected and built the full-stack agro-tech marketplace enabling farmers and agricultural buyers to trade transparently through a real-time dynamic bidding engine. Engineered the Node.js backend with socket-driven bid updates, secure Stripe payment processing, MongoDB database models, and responsive farmer/buyer dashboards.",
    stack: [
      "Node.js",
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Stripe",
      "WebSockets",
      "Tailwind CSS",
    ],
    url: "https://annapur-agro-tech-platform.vercel.app",
    highlights: [
      "Real-time dynamic price bidding engine powered by Node.js & WebSockets",
      "Full-stack payment integration & automated seller payout pipeline via Stripe",
      "Comprehensive farmer & buyer telemetry dashboard with role-based permissions",
    ],
  },
  {
    title: "Immigration Portal UI",
    category: "GovTech Web Platform",
    year: "2025",
    status: "Live Platform",
    summary:
      "Frontend UI and design system for a government immigration and visa system.",
    description:
      "A responsive, accessible, and high-security frontend interface designed for a government immigration platform. Focused on rigorous WCAG accessibility, clear multi-step verification workflows, and fast page loads using modern Next.js practices.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React Hook Form", "Zod"],
    url: "https://immigration-website-dashboard.vercel.app",
    highlights: [
      "Multi-step secure application flow with rigorous client validation",
      "Strict WCAG 2.1 AA accessibility compliance",
      "Dynamic document verification status tracking",
    ],
  },
  {
    title: "Animated eCommerce Experience",
    category: "Creative Motion & Frontend Prototype",
    year: "2025",
    status: "Deployment Pending",
    summary:
      "Interactive eCommerce concept with advanced GSAP animations and kinetic layout (awaiting web deployment).",
    description:
      "An interactive eCommerce showcase featuring smooth GSAP-powered animations, scroll-based product transitions, kinetic type effects, and fluid cart micro-interactions that elevate brand storytelling. Currently maintained as a development prototype awaiting live web deployment.",
    stack: ["Next.js", "GSAP", "ScrollTrigger", "JavaScript", "CSS Modules"],
    url: "",
    highlights: [
      "Custom GSAP ScrollTrigger timeline reveals and scrubbed momentum",
      "Buttery page and layout transitions with kinetic typography",
      "Creative prototype actively prepared for upcoming web deployment",
    ],
  },
  {
    title: "Car Rental Platform",
    category: "Full Stack Node.js Web App",
    year: "2024",
    status: "Offline Prototype",
    summary:
      "Full-stack web application with custom Node.js and Express REST backend for vehicle fleet bookings.",
    description:
      "A complete full-stack web application with a custom Node.js and Express backend REST API for live vehicle reservations, fleet availability tracking, user authentication, and administrative controls.",
    stack: ["Node.js", "Express.js", "MySQL", "REST APIs", "Tailwind CSS"],
    url: "",
    highlights: [
      "Custom Node.js & Express RESTful API with relational database schemas",
      "Automated reservation calculation and booking management engine",
      "Role-based administrative control suite with JWT authentication",
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
              text="Full-stack web applications, scalable Node.js backends, and creative interactive platforms."
              className="mt-4 max-w-3xl text-3xl leading-tight font-bold text-zinc-100 sm:text-4xl lg:text-5xl"
            />
          </div>
          <p
            data-reveal
            className="max-w-xs text-xs tracking-wider text-zinc-400 uppercase md:text-right"
          >
            Click any project card to inspect architecture, backend stack &amp;
            live demos.
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
                <div className="flex items-start sm:items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                    <span className="shrink-0 text-xs font-mono font-bold tracking-widest text-cyan-300">
                      0{index + 1}
                    </span>
                    <span className="truncate text-xs tracking-wider text-zinc-400 uppercase">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {project.status && (
                      <span
                        className={`whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide ${
                          project.url
                            ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                            : "border border-amber-500/30 bg-amber-500/10 text-amber-300"
                        }`}
                      >
                        {project.status}
                      </span>
                    )}
                    <span className="whitespace-nowrap rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-zinc-400">
                      {project.year}
                    </span>
                  </div>
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
                    <span>Inspect Architecture</span>
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
