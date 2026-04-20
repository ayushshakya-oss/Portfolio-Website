"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import ProjectModal from "@/components/ProjectModal";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import type { ProjectItem } from "@/components/types";

gsap.registerPlugin(ScrollTrigger);

const CanvasScene = dynamic(() => import("@/components/canvas/CanvasScene"), {
  ssr: false,
});

const VISIT_KEY = "portfolio:first-visit";

export default function PortfolioShell() {
  const [showLoader, setShowLoader] = useState(
    () => window.localStorage.getItem(VISIT_KEY) !== "1",
  );
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [easterEggVisible, setEasterEggVisible] = useState(false);
  const easterTimeoutRef = useRef<number | null>(null);

  const audioRef = useRef<{
    context: AudioContext;
    gain: GainNode;
    oscA: OscillatorNode;
    oscB: OscillatorNode;
    lfo: OscillatorNode;
    lfoGain: GainNode;
  } | null>(null);

  const navLinks = useMemo(
    () => [
      { href: "#about", label: "About" },
      { href: "#projects", label: "Projects" },
      { href: "#skills", label: "Skills" },
      { href: "#contact", label: "Contact" },
    ],
    [],
  );

  const handleLoaderComplete = useCallback(() => {
    window.localStorage.setItem(VISIT_KEY, "1");
    setShowLoader(false);
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    if (showLoader) {
      return;
    }

    const context = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".scene-section");

      sections.forEach((section) => {
        const revealItems =
          section.querySelectorAll<HTMLElement>("[data-reveal]");
        const words = section.querySelectorAll<HTMLElement>("[data-word]");

        if (words.length > 0) {
          gsap.from(words, {
            yPercent: 115,
            opacity: 0,
            stagger: 0.04,
            duration: 0.92,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
            },
          });
        }

        if (revealItems.length > 0) {
          gsap.from(revealItems, {
            y: 26,
            opacity: 0,
            stagger: 0.12,
            duration: 0.92,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
            },
          });
        }
      });

      gsap.from(".project-card", {
        y: 32,
        opacity: 0,
        stagger: 0.15,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#projects",
          start: "top 65%",
        },
      });
    });

    return () => {
      context.revert();
    };
  }, [showLoader]);

  const stopAmbient = useCallback(() => {
    const current = audioRef.current;
    if (!current) {
      return;
    }

    const now = current.context.currentTime;
    current.gain.gain.cancelScheduledValues(now);
    current.gain.gain.setTargetAtTime(0, now, 0.15);

    window.setTimeout(() => {
      current.oscA.stop();
      current.oscB.stop();
      current.lfo.stop();
      void current.context.close();
      audioRef.current = null;
    }, 320);
  }, []);

  const startAmbient = useCallback(async () => {
    if (audioRef.current) {
      return;
    }

    const AudioContextConstructor =
      window.AudioContext ||
      (
        window as Window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextConstructor) {
      return;
    }

    const context = new AudioContextConstructor();
    if (context.state === "suspended") {
      await context.resume();
    }

    const gain = context.createGain();
    const oscA = context.createOscillator();
    const oscB = context.createOscillator();
    const lfo = context.createOscillator();
    const lfoGain = context.createGain();

    oscA.type = "triangle";
    oscA.frequency.value = 86;
    oscB.type = "sine";
    oscB.frequency.value = 172;

    lfo.type = "sine";
    lfo.frequency.value = 0.2;

    lfoGain.gain.value = 0.006;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    gain.gain.value = 0;

    oscA.connect(gain);
    oscB.connect(gain);
    gain.connect(context.destination);

    oscA.start();
    oscB.start();
    lfo.start();

    gain.gain.linearRampToValueAtTime(0.022, context.currentTime + 0.3);

    audioRef.current = { context, gain, oscA, oscB, lfo, lfoGain };
  }, []);

  useEffect(() => {
    if (soundEnabled) {
      void startAmbient();
    } else {
      stopAmbient();
    }
  }, [soundEnabled, startAmbient, stopAmbient]);

  useEffect(() => {
    return () => {
      stopAmbient();
      if (easterTimeoutRef.current) {
        window.clearTimeout(easterTimeoutRef.current);
      }
    };
  }, [stopAmbient]);

  useEffect(() => {
    const sequence = ["i", "d", "d", "q", "d"];
    let pointer = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === sequence[pointer]) {
        pointer += 1;
        if (pointer === sequence.length) {
          pointer = 0;
          setEasterEggVisible(true);

          if (easterTimeoutRef.current) {
            window.clearTimeout(easterTimeoutRef.current);
          }

          easterTimeoutRef.current = window.setTimeout(() => {
            setEasterEggVisible(false);
          }, 4200);
        }
        return;
      }

      pointer = key === sequence[0] ? 1 : 0;
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      className={`relative min-h-screen overflow-x-clip ${easterEggVisible ? "neon-boost" : ""}`}
    >
      <CustomCursor />

      <div className="pointer-events-none fixed inset-0 z-0">
        <Suspense fallback={null}>
          <CanvasScene introReady={!showLoader} />
        </Suspense>
      </div>

      <div className="relative z-20">
        <header className="fixed left-0 right-0 top-0 z-40 px-4 pt-4 md:px-8">
          <div className="glass-panel mx-auto flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-3">
            <a
              href="#hero"
              data-cursor="Top"
              className="cursor-hover text-sm font-semibold tracking-[0.2em] text-cyan-100 uppercase"
            >
              AS
            </a>

            <nav className="hidden items-center gap-5 text-xs tracking-[0.14em] text-zinc-200/80 uppercase md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-cursor={link.label}
                  className="cursor-hover transition-colors duration-300 hover:text-cyan-100"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setSoundEnabled((prev) => !prev)}
              data-cursor={soundEnabled ? "Mute" : "Sound"}
              className="cursor-hover rounded-full border border-cyan-200/30 px-3 py-1.5 text-xs tracking-wide text-zinc-100 transition-colors duration-300 hover:bg-cyan-300/12"
            >
              {soundEnabled ? "Sound On" : "Sound Off"}
            </button>
          </div>
        </header>

        <HeroSection />
        <AboutSection />
        <ProjectsSection onOpenProject={setSelectedProject} />
        <SkillsSection />
        <ContactSection
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((previous) => !previous)}
        />

        <footer className="relative px-6 pb-14 text-center text-xs tracking-[0.16em] text-zinc-400 uppercase">
          Crafted with Next.js, React Three Fiber, and GSAP.
        </footer>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {showLoader ? <Loader onComplete={handleLoaderComplete} /> : null}

      {easterEggVisible ? (
        <div className="easter-toast fixed bottom-7 left-1/2 z-70 -translate-x-1/2 rounded-full border border-cyan-300/35 bg-black/60 px-5 py-2 text-xs tracking-[0.15em] text-cyan-100 uppercase backdrop-blur">
          Neon boost unlocked
        </div>
      ) : null}
    </div>
  );
}
