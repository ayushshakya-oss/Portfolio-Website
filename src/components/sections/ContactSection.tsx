import SplitWords from "@/components/sections/SplitWords";

type ContactSectionProps = {
  soundEnabled: boolean;
  onToggleSound: () => void;
};

export default function ContactSection({
  soundEnabled,
  onToggleSound,
}: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="scene-section relative flex min-h-screen items-center py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="glass-panel rounded-[2rem] p-8 md:p-12">
          <p data-reveal className="section-label">
            Contact
          </p>
          <SplitWords
            text="Let’s collaborate on an experience people remember."
            className="mt-4 max-w-4xl text-3xl leading-tight font-semibold text-zinc-100 md:text-5xl"
          />

          <p
            data-reveal
            className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300/85"
          >
            Open for product, portfolio, and campaign builds. If you need
            motion-heavy interfaces that still feel sharp and performant,
            I&apos;d love to hear from you.
          </p>

          <div data-reveal className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:hello@yourname.dev"
              data-cursor="Send"
              className="cursor-hover rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
            >
              hello@yourname.dev
            </a>
            <button
              type="button"
              onClick={onToggleSound}
              data-cursor={soundEnabled ? "Mute" : "Sound"}
              className="cursor-hover rounded-full border border-cyan-300/35 px-6 py-3 text-sm font-medium text-zinc-100 transition-colors duration-300 hover:bg-cyan-300/15"
            >
              Ambient {soundEnabled ? "On" : "Off"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
