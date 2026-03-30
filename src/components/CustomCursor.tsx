"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

type CursorState = {
  active: boolean;
};

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const activeTargetRef = useRef<HTMLElement | null>(null);
  const pointerRef = useRef({ x: -1, y: -1 });
  const ringRef = useRef({ x: -1, y: -1 });
  const dotPosRef = useRef({ x: -1, y: -1 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>({
    active: false,
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
    let isInsideWindow = false;

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
        setCursorState({ active: false });
        return;
      }

      setCursorState({ active: true });
    };

    const resolveHoverTargetAt = (x: number, y: number) => {
      const target = document.elementFromPoint(x, y) as HTMLElement | null;
      return target?.closest<HTMLElement>(hoverSelector) ?? null;
    };

    const showCursor = () => {
      gsap.to([cursorElement, dotElement], {
        autoAlpha: 1,
        duration: 0.15,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const hideCursor = () => {
      gsap.to([cursorElement, dotElement], {
        autoAlpha: 0,
        duration: 0.12,
        overwrite: true,
      });
    };

    const syncFromLastPointer = () => {
      const { x, y } = pointerRef.current;
      const inBounds =
        x >= 0 && y >= 0 && x <= window.innerWidth && y <= window.innerHeight;

      if (!hasMoved || !inBounds || document.visibilityState !== "visible") {
        hideCursor();
        updateHoverState(null);
        return;
      }

      isInsideWindow = true;
      ringRef.current = { x, y };
      dotPosRef.current = { x, y };
      gsap.set(cursorElement, { x, y });
      gsap.set(dotElement, { x, y });
      showCursor();
      updateHoverState(resolveHoverTargetAt(x, y));
    };

    const tick = () => {
      if (!hasMoved) {
        return;
      }

      const pointer = pointerRef.current;

      const clampedVx = Math.max(
        -14,
        Math.min(14, velocityRef.current.x * 1.1),
      );
      const clampedVy = Math.max(
        -14,
        Math.min(14, velocityRef.current.y * 1.1),
      );

      const ringTargetX = pointer.x + clampedVx;
      const ringTargetY = pointer.y + clampedVy;

      ringRef.current.x += (ringTargetX - ringRef.current.x) * 0.22;
      ringRef.current.y += (ringTargetY - ringRef.current.y) * 0.22;

      dotPosRef.current.x += (pointer.x - dotPosRef.current.x) * 0.52;
      dotPosRef.current.y += (pointer.y - dotPosRef.current.y) * 0.52;

      velocityRef.current.x *= 0.86;
      velocityRef.current.y *= 0.86;

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

      isInsideWindow = true;
      pointerRef.current = { x: event.clientX, y: event.clientY };
      showCursor();

      const target = event.target as HTMLElement | null;
      const hoverable = target?.closest<HTMLElement>(hoverSelector) ?? null;
      updateHoverState(hoverable);
    };

    const onLeaveWindow = () => {
      isInsideWindow = false;
      hideCursor();
      updateHoverState(null);
    };

    const onEnterWindow = () => {
      isInsideWindow = true;
      syncFromLastPointer();
    };

    const onFocus = () => {
      if (isInsideWindow) {
        syncFromLastPointer();
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncFromLastPointer();
        return;
      }

      onLeaveWindow();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeaveWindow);
    window.addEventListener("pointerenter", onEnterWindow);
    window.addEventListener("blur", onLeaveWindow);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeaveWindow);
      window.removeEventListener("pointerenter", onEnterWindow);
      window.removeEventListener("blur", onLeaveWindow);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gsap.ticker.remove(tick);
      activeTargetRef.current = null;
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !cursorRef.current) {
      return;
    }

    gsap.to(cursorRef.current, {
      scale: cursorState.active ? 1.18 : 1,
      duration: 0.16,
      ease: "power2.out",
      overwrite: true,
    });
  }, [cursorState.active, enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor fixed left-0 top-0 z-80 hidden h-9 w-9 rounded-full border border-cyan-200/55 bg-transparent md:grid place-items-center"
      />
      <div
        ref={dotRef}
        className={`custom-cursor fixed left-0 top-0 z-81 hidden h-2 w-2 rounded-full bg-cyan-200 md:block ${
          cursorState.active ? "opacity-0" : "opacity-100"
        }`}
      />
    </>
  );
}
