"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

type LoaderProps = {
  onComplete: () => void;
};

export default function Loader({ onComplete }: LoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const counter = { value: 0 };

    const timeline = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete,
    });

    timeline.to(counter, {
      value: 100,
      duration: 2.3,
      onUpdate: () => setProgress(Math.round(counter.value)),
    });

    timeline.to(
      ".loader-bar-fill",
      {
        scaleX: 1,
        duration: 2.3,
      },
      0,
    );

    timeline.to(rootRef.current, {
      autoAlpha: 0,
      duration: 0.85,
      ease: "power3.inOut",
      delay: 0.2,
    });

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-100 grid place-items-center bg-[#02040a]"
    >
      <div className="w-[min(520px,88vw)]">
        <p className="text-[11px] tracking-[0.2em] text-zinc-400 uppercase">
          Initializing Portfolio Experience
        </p>
        <div className="mt-4 h-0.5 overflow-hidden rounded-full bg-zinc-700/70">
          <div className="loader-bar-fill h-full origin-left scale-x-0 bg-cyan-300" />
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-zinc-300">
          <span>Loading Assets</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
