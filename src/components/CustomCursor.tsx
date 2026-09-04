"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

type CursorState = {
  active: boolean;
  label: string;
};

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const activeTargetRef = useRef<HTMLElement | null>(null);
  const pointerRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const dotPosRef = useRef({ x: -100, y: -100 });
  const velocityRef = useRef({ x: 0, y: 0 });

  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>({
    active: false,
    label: "",
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const update = () => {
      setEnabled(mediaQuery.matches);
      document.body.classList.toggle("cursor-active", mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      document.body.classList.remove("cursor-active");
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !cursorRef.current || !dotRef.current) {
      return;
    }

    const cursorElement = cursorRef.current;
    const dotElement = dotRef.current;
    const hoverSelector = "[data-cursor], .cursor-hover, a, button";
    let hasMoved = false;

    gsap.set([cursorElement, dotElement], {
      autoAlpha: 0,
      xPercent: -50,
      yPercent: -50,
    });

    const updateHoverState = (nextTarget: HTMLElement | null) => {
      if (activeTargetRef.current === nextTarget) {
        return;
      }

      activeTargetRef.current = nextTarget;

      if (!nextTarget) {
        setCursorState({ active: false, label: "" });
        return;
      }

      const label = nextTarget.getAttribute("data-cursor") || "";
      setCursorState({ active: true, label });
    };

    const resolveHoverTargetAt = (x: number, y: number) => {
      const target = document.elementFromPoint(x, y) as HTMLElement | null;
      return target?.closest<HTMLElement>(hoverSelector) ?? null;
    };

    const showCursor = () => {
      gsap.to([cursorElement, dotElement], {
        autoAlpha: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const hideCursor = () => {
      gsap.to([cursorElement, dotElement], {
        autoAlpha: 0,
        duration: 0.15,
        overwrite: true,
      });
    };

    const tick = () => {
      if (!hasMoved) return;

      const pointer = pointerRef.current;

      const clampedVx = Math.max(-12, Math.min(12, velocityRef.current.x * 0.8));
      const clampedVy = Math.max(-12, Math.min(12, velocityRef.current.y * 0.8));

      const ringTargetX = pointer.x + clampedVx;
      const ringTargetY = pointer.y + clampedVy;

      ringRef.current.x += (ringTargetX - ringRef.current.x) * 0.22;
      ringRef.current.y += (ringTargetY - ringRef.current.y) * 0.22;

      dotPosRef.current.x += (pointer.x - dotPosRef.current.x) * 0.55;
      dotPosRef.current.y += (pointer.y - dotPosRef.current.y) * 0.55;

      velocityRef.current.x *= 0.85;
      velocityRef.current.y *= 0.85;

      gsap.set(cursorElement, {
        x: ringRef.current.x,
        y: ringRef.current.y,
      });

      gsap.set(dotElement, {
        x: dotPosRef.current.x,
        y: dotPosRef.current.y,
      });
    };

    const onMove = (event: PointerEvent) => {
      const previous = pointerRef.current;

      velocityRef.current.x = event.clientX - previous.x;
      velocityRef.current.y = event.clientY - previous.y;

      if (!hasMoved) {
        hasMoved = true;
        ringRef.current = { x: event.clientX, y: event.clientY };
        dotPosRef.current = { x: event.clientX, y: event.clientY };
        gsap.set(cursorElement, { x: event.clientX, y: event.clientY });
        gsap.set(dotElement, { x: event.clientX, y: event.clientY });
      }

      pointerRef.current = { x: event.clientX, y: event.clientY };
      showCursor();

      const target = event.target as HTMLElement | null;
      const hoverable = target?.closest<HTMLElement>(hoverSelector) ?? null;
      updateHoverState(hoverable);
    };

    const onLeaveWindow = () => {
      hideCursor();
      updateHoverState(null);
    };

    const onEnterWindow = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      showCursor();
      updateHoverState(resolveHoverTargetAt(event.clientX, event.clientY));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeaveWindow);
    document.addEventListener("pointerenter", onEnterWindow);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeaveWindow);
      document.removeEventListener("pointerenter", onEnterWindow);
      gsap.ticker.remove(tick);
      activeTargetRef.current = null;
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !cursorRef.current) return;

    if (cursorState.label) {
      gsap.to(cursorRef.current, {
        width: 72,
        height: 72,
        backgroundColor: "rgba(56, 189, 248, 0.15)",
        borderColor: "rgba(56, 189, 248, 0.6)",
        duration: 0.25,
        ease: "power2.out",
      });
    } else if (cursorState.active) {
      gsap.to(cursorRef.current, {
        width: 48,
        height: 48,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderColor: "rgba(56, 189, 248, 0.4)",
        duration: 0.25,
        ease: "power2.out",
      });
    } else {
      gsap.to(cursorRef.current, {
        width: 32,
        height: 32,
        backgroundColor: "transparent",
        borderColor: "rgba(125, 211, 252, 0.4)",
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }, [cursorState, enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor fixed left-0 top-0 z-80 hidden rounded-full border pointer-events-none backdrop-blur-[2px] md:flex items-center justify-center text-center shadow-[0_0_20px_rgba(56,189,248,0.2)]"
        style={{ willChange: "transform, width, height" }}
      >
        {cursorState.label && (
          <span
            ref={labelRef}
            className="text-[10px] font-bold tracking-widest text-cyan-200 uppercase"
          >
            {cursorState.label}
          </span>
        )}
      </div>
      <div
        ref={dotRef}
        className={`custom-cursor fixed left-0 top-0 z-81 hidden h-1.5 w-1.5 rounded-full bg-cyan-300 pointer-events-none md:block transition-opacity duration-200 ${
          cursorState.active ? "opacity-0" : "opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />
    </>
  );
}
