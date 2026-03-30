import SplitWords from "@/components/sections/SplitWords";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="scene-section relative flex min-h-screen items-end pb-24 pt-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <p
          data-reveal
          className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-xs tracking-[0.28em] text-cyan-100/85 uppercase backdrop-blur"
        >
          Frontend Engineer + Creative Developer
        </p>

        <SplitWords
          as="h1"
          text="Building cinematic interfaces with code, motion, and light."
          className="max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-zinc-50 md:text-6xl"
        />

        <p
          data-reveal
          className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-200/75 md:text-lg"
        >
          I design premium web experiences where storytelling, interaction, and
          performance stay in balance. Scroll to move through my world.
        </p>

        <div data-reveal className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            data-cursor="View"
            className="cursor-hover rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            data-cursor="Talk"
            className="cursor-hover glass-panel rounded-full px-6 py-3 text-sm font-medium text-zinc-100 transition-transform duration-300 hover:-translate-y-0.5"
          >
            Let&apos;s Build Together
          </a>
        </div>
      </div>
    </section>
  );
}
