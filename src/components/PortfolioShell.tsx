"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
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
import ResumeSection from "@/components/sections/ResumeSection";
import SkillsSection from "@/components/sections/SkillsSection";
import type { ProjectItem } from "@/components/types";

gsap.registerPlugin(ScrollTrigger);

const CanvasScene = dynamic(() => import("@/components/canvas/CanvasScene"), {
  ssr: false,
});

const VISIT_KEY = "portfolio:first-visit";

export default function PortfolioShell() {
  const [showLoader, setShowLoader] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem(VISIT_KEY) !== "1",
  );
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [easterEggVisible, setEasterEggVisible] = useState(false);
  const easterTimeoutRef = useRef<number | null>(null);

  // Generative Web Audio API ambient synth
  const audioRef = useRef<{
    context: AudioContext;
    masterGain: GainNode;
    oscA: OscillatorNode;
    oscB: OscillatorNode;
    filter: BiquadFilterNode;
    lfo: OscillatorNode;
    lfoGain: GainNode;
  } | null>(null);

  const navLinks = useMemo(
    () => [
      { href: "#about", label: "About" },
      { href: "#projects", label: "Works" },
      { href: "#skills", label: "Skills" },
      { href: "#resume", label: "Resume" },
      { href: "#contact", label: "Contact" },
    ],
    [],
  );

  const handleLoaderComplete = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(VISIT_KEY, "1");
    }
    setShowLoader(false);
    ScrollTrigger.refresh();
  }, []);

  // 1. Lenis Smooth Momentum Scrolling synchronized with GSAP ScrollTrigger
  useEffect(() => {
    if (showLoader) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [showLoader]);

  // 2. GSAP Section & Typography Entry Animations
  useEffect(() => {
    if (showLoader) {
      return;
    }

    const context = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".scene-section");

      sections.forEach((section) => {
        const revealItems = section.querySelectorAll<HTMLElement>("[data-reveal]");
        const words = section.querySelectorAll<HTMLElement>("[data-word]");

        if (words.length > 0) {
          gsap.from(words, {
            yPercent: 120,
            opacity: 0,
            stagger: 0.035,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
            },
          });
        }

        if (revealItems.length > 0) {
          gsap.fromTo(
            revealItems,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.75,
              ease: "power3.out",
              clearProps: "opacity,transform",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
              },
            },
          );
        }
      });

      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);

      return () => {
        clearTimeout(refreshTimer);
      };
    });

    return () => {
      context.revert();
    };
  }, [showLoader]);

  // 3. Ambient Generative Audio Synthesizer
  const stopAmbient = useCallback(() => {
    const current = audioRef.current;
    if (!current) return;

    const now = current.context.currentTime;
    current.masterGain.gain.cancelScheduledValues(now);
    current.masterGain.gain.setTargetAtTime(0, now, 0.2);

    window.setTimeout(() => {
      current.oscA.stop();
      current.oscB.stop();
      current.lfo.stop();
      void current.context.close();
      audioRef.current = null;
    }, 350);
  }, []);

  const startAmbient = useCallback(async () => {
    if (audioRef.current) return;

    const AudioContextConstructor =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextConstructor) return;

    const context = new AudioContextConstructor();
    if (context.state === "suspended") {
      await context.resume();
    }

    const masterGain = context.createGain();
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 360;

    const oscA = context.createOscillator();
    const oscB = context.createOscillator();
    const lfo = context.createOscillator();
    const lfoGain = context.createGain();

    // Harmonic warm frequencies
    oscA.type = "triangle";
    oscA.frequency.value = 92.5; // F#2
    oscB.type = "sine";
    oscB.frequency.value = 138.6; // C#3 fifth

    lfo.type = "sine";
    lfo.frequency.value = 0.18;
    lfoGain.gain.value = 80;

    lfo.connect(filter.frequency);

    masterGain.gain.value = 0;
    oscA.connect(filter);
    oscB.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(context.destination);

    oscA.start();
    oscB.start();
    lfo.start();

    masterGain.gain.linearRampToValueAtTime(0.028, context.currentTime + 0.4);

    audioRef.current = {
      context,
      masterGain,
      oscA,
      oscB,
      filter,
      lfo,
      lfoGain,
    };
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

  // 4. Easter Egg: IDDQD Doom God Mode sequence
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

      {/* 3D WebGL Canvas Layer */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Suspense fallback={null}>
          <CanvasScene
            introReady={!showLoader}
            soundEnabled={soundEnabled}
          />
        </Suspense>
      </div>

      {/* Foreground Content */}
      <div className="relative z-20">
        {/* Elevated Floating Navigation Header */}
        <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8">
          <div className="glass-panel mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#090e1f]/75 px-5 py-3 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            {/* Identity Badge */}
            <a
              href="#hero"
              data-cursor="Top"
              className="cursor-hover group flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-zinc-100 uppercase"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-[11px] font-extrabold text-slate-950 transition-transform duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                AS
              </span>
              <span className="hidden sm:inline-block text-zinc-300 group-hover:text-cyan-300 transition-colors">
                Ayush Shakya
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-6 text-xs font-medium tracking-[0.16em] text-zinc-300 uppercase md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-cursor={link.label}
                  className="cursor-hover transition-colors duration-300 hover:text-cyan-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              {/* Sound Synthesizer Toggle */}
              <button
                type="button"
                onClick={() => setSoundEnabled((prev) => !prev)}
                data-cursor={soundEnabled ? "Mute" : "Sound"}
                className={`cursor-hover flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 ${
                  soundEnabled
                    ? "border-cyan-400/50 bg-cyan-400/20 text-cyan-200 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="flex h-2.5 items-end gap-0.5">
                  <span
                    className={`w-0.5 rounded-full bg-current ${
                      soundEnabled ? "h-2.5 animate-pulse" : "h-1"
                    }`}
                  />
                  <span
                    className={`w-0.5 rounded-full bg-current ${
                      soundEnabled ? "h-1.5 animate-bounce" : "h-1"
                    }`}
                  />
                  <span
                    className={`w-0.5 rounded-full bg-current ${
                      soundEnabled ? "h-2 animate-pulse" : "h-1"
                    }`}
                  />
                </span>
                <span className="hidden sm:inline">
                  {soundEnabled ? "Sound On" : "Sound Off"}
                </span>
              </button>

              {/* Direct Let's Talk CTA */}
              <a
                href="#contact"
                data-cursor="Connect"
                className="cursor-hover hidden sm:inline-flex rounded-full bg-cyan-400 px-4 py-1.5 text-xs font-bold tracking-wide text-slate-950 transition-transform duration-300 hover:scale-105"
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>
        </header>

        {/* Core Portfolio Sections */}
        <HeroSection />
        <AboutSection />
        <ProjectsSection onOpenProject={setSelectedProject} />
        <SkillsSection />
        <ResumeSection />
        <ContactSection
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
        />

        {/* Elevated Minimal Footer */}
        <footer className="relative border-t border-white/5 px-6 py-12 text-center text-xs tracking-[0.2em] text-zinc-400 uppercase">
          <p>Designed &amp; Engineered by Ayush Shakya • Next.js 16 + R3F + GSAP</p>
        </footer>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Initial Loading Screen */}
      {showLoader ? <Loader onComplete={handleLoaderComplete} /> : null}

      {/* Easter Egg Toast Notification */}
      {easterEggVisible ? (
        <div className="easter-toast fixed bottom-8 left-1/2 z-80 -translate-x-1/2 rounded-full border border-cyan-400/40 bg-black/80 px-6 py-2.5 text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase shadow-[0_0_30px_rgba(56,189,248,0.5)] backdrop-blur-lg">
          Neon boost unlocked // IDDQD
        </div>
      ) : null}
    </div>
  );
}
