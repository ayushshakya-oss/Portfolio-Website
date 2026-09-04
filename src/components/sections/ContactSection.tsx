"use client";

import { useState } from "react";
import SplitWords from "@/components/sections/SplitWords";

type ContactSectionProps = {
  soundEnabled: boolean;
  onToggleSound: () => void;
};

export default function ContactSection({
  soundEnabled,
  onToggleSound,
}: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const email = "ashakya406@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      // Fallback
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section
      id="contact"
      className="scene-section relative flex min-h-screen items-center py-28 md:py-36"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="glass-panel relative overflow-hidden rounded-[2.5rem] border border-cyan-400/25 bg-[#090e1f]/85 p-8 sm:p-12 lg:p-16 shadow-[0_25px_80px_rgba(0,0,0,0.7)]">
          {/* Subtle decorative glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <span data-reveal className="section-label">
              04 // Get In Touch
            </span>

            <SplitWords
              text="Let’s collaborate on an experience people remember."
              className="mt-5 text-3xl leading-tight font-bold text-zinc-50 sm:text-5xl lg:text-6xl"
            />

            <p
              data-reveal
              className="mt-6 text-base leading-relaxed text-zinc-300/90 sm:text-lg"
            >
              Open for creative engineering, frontend architecture contracts,
              and high-impact product roles. If you need motion-heavy interfaces
              that remain blazing fast and mathematically sound, let&apos;s
              connect.
            </p>

            {/* Direct Interactive Actions */}
            <div
              data-reveal
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              {/* Direct Mailto */}
              <a
                href={`mailto:${email}`}
                data-cursor="Send"
                className="cursor-hover group inline-flex items-center gap-2.5 rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all duration-300 hover:scale-[1.03]"
              >
                <span>Write to {email}</span>
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>

              {/* 1-Click Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor={copied ? "Copied!" : "Copy"}
                className="cursor-hover glass-panel inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-zinc-200 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
              >
                {copied ? (
                  <>
                    <svg
                      className="h-4 w-4 text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-emerald-300 font-semibold">
                      Copied to Clipboard!
                    </span>
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4 text-zinc-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              {/* Ambient Sound Toggle with Live Waveform Graphic */}
              <button
                type="button"
                onClick={onToggleSound}
                data-cursor={soundEnabled ? "Mute" : "Sound"}
                className={`cursor-hover inline-flex items-center gap-2.5 rounded-full border px-6 py-3.5 text-sm font-medium transition-all duration-300 ${
                  soundEnabled
                    ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-200 shadow-[0_0_20px_rgba(56,189,248,0.25)]"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                }`}
              >
                {/* Micro Audio Wave Indicator */}
                <span className="flex h-3.5 items-end gap-0.5">
                  <span
                    className={`w-0.5 rounded-full bg-current transition-all ${
                      soundEnabled ? "h-3.5 animate-pulse" : "h-1"
                    }`}
                  />
                  <span
                    className={`w-0.5 rounded-full bg-current transition-all ${
                      soundEnabled ? "h-2 animate-bounce" : "h-1"
                    }`}
                  />
                  <span
                    className={`w-0.5 rounded-full bg-current transition-all ${
                      soundEnabled ? "h-3 animate-pulse" : "h-1"
                    }`}
                  />
                </span>
                <span>Ambient Synth: {soundEnabled ? "Active" : "Muted"}</span>
              </button>
            </div>

            {/* Social Links & Location Details */}
            <div
              data-reveal
              className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-zinc-400"
            >
              <div className="flex items-center gap-6 font-mono">
                <a
                  href="https://github.com/ayushshakya-oss"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="GitHub"
                  className="cursor-hover transition-colors hover:text-cyan-300"
                >
                  {"// github.com/ayushshakya-oss"}
                </a>
                <a
                  href="https://www.linkedin.com/in/ayush-shakya-a1644a182/"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="LinkedIn"
                  className="cursor-hover transition-colors hover:text-cyan-300"
                >
                  {"// linkedin"}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>Kathmandu, Nepal (GMT+5:45) — Available Globally</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
