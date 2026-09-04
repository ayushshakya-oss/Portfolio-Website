"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

type LoaderProps = {
  onComplete: () => void;
};

export default function Loader({ onComplete }: LoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const statusText =
    progress < 30
      ? "Initializing WebGL 3D Context"
      : progress < 70
        ? "Compiling GLSL Shader Pipelines"
        : progress < 95
          ? "Choreographing GSAP Timelines"
          : "Ready";

  useEffect(() => {
    if (!rootRef.current) return;

    const counter = { value: 0 };

    const timeline = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete,
    });

    timeline.to(counter, {
      value: 100,
      duration: 2.1,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(counter.value)),
    });

    timeline.to(
      ".loader-bar-fill",
      {
        scaleX: 1,
        duration: 2.1,
        ease: "power2.inOut",
      },
      0,
    );

    timeline.to(rootRef.current, {
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.inOut",
      delay: 0.15,
    });

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-100 grid place-items-center bg-[#020409]"
    >
      <div className="w-[min(480px,88vw)]">
        <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.24em] text-cyan-300 uppercase">
          <span>Ayush Shakya // 2025</span>
          <span>{progress}%</span>
        </div>

        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10 p-[1px]">
          <div className="loader-bar-fill h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 shadow-[0_0_15px_rgba(56,189,248,0.7)]" />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>{statusText}</span>
          <span className="text-[10px] text-zinc-400">{"// creative-dev"}</span>
        </div>
      </div>
    </div>
  );
}
