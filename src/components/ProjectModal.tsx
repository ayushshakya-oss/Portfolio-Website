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

  useEffect(() => {
    if (!project || !cardRef.current) {
      return;
    }

    const animation = gsap.fromTo(
      cardRef.current,
      { y: 36, autoAlpha: 0, scale: 0.98 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.55, ease: "power3.out" },
    );

    return () => {
      animation.kill();
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
      className="fixed inset-0 z-[60] grid place-items-center bg-black/65 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={cardRef}
        className="glass-panel w-full max-w-2xl rounded-3xl p-7 md:p-9"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs tracking-[0.2em] text-cyan-100/75 uppercase">
              Project Overview
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-zinc-50 md:text-3xl">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-cursor="Close"
            className="cursor-hover rounded-full border border-zinc-200/20 px-3 py-1 text-sm text-zinc-300 transition-colors hover:bg-zinc-100/10"
          >
            Close
          </button>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-zinc-300/85">
          {project.description}
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

        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          data-cursor="Visit"
          className="cursor-hover mt-7 inline-flex rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
        >
          Visit Project
        </a>
      </div>
    </div>
  );
}
