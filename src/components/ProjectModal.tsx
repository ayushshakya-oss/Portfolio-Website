"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ProjectItem } from "@/components/types";

type ProjectModalProps = {
  project: ProjectItem | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project || !cardRef.current || !backdropRef.current) {
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35 },
    );

    tl.fromTo(
      cardRef.current,
      { y: 40, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45 },
      "-=0.2",
    );

    return () => {
      tl.kill();
    };
  }, [project]);

  useEffect(() => {
    if (!project) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-70 grid place-items-center bg-black/75 px-4 py-8 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={cardRef}
        className="glass-panel relative w-full max-w-2xl overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#090e1f]/90 p-7 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.8)]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-semibold tracking-widest text-cyan-300 uppercase">
                {project.category || "Selected Work"}
              </span>
              {project.year && (
                <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                  {project.year}
                </span>
              )}
            </div>
            <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-zinc-50">
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            data-cursor="Close"
            className="cursor-hover rounded-full border border-white/15 bg-white/5 p-2 text-zinc-300 transition-colors hover:bg-white/15 hover:text-white"
            aria-label="Close modal"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="mt-5 text-sm sm:text-base leading-relaxed text-zinc-300/90">
          {project.description}
        </p>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <h4 className="text-xs font-semibold tracking-wider text-cyan-300 uppercase">
              Key Engineering Highlights
            </h4>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-zinc-300">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Stack */}
        <div className="mt-6">
          <h4 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
            Technology Stack &amp; Tools
          </h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={`${project.title}-${item}`}
                className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="Launch"
              className="cursor-hover inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-2.5 text-xs font-bold tracking-wide text-slate-950 uppercase shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <span>Launch Live Project</span>
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
          ) : (
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-400">
              Deployment in progress
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="cursor-hover text-xs font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
