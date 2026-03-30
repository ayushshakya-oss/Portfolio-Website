import SplitWords from "@/components/sections/SplitWords";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scene-section relative flex min-h-screen items-center py-24"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[1.2fr_1fr] lg:px-10">
        <div>
          <p data-reveal className="section-label">
            About
          </p>
          <SplitWords
            text="I craft polished product experiences from concept to production."
            className="mt-4 max-w-3xl text-3xl leading-tight font-semibold text-zinc-100 md:text-5xl"
          />
          <p
            data-reveal
            className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300/80"
          >
            My work blends frontend architecture, creative direction, and motion
            systems. I care deeply about details that users feel but cannot
            always name: pacing, depth, tactility, and smoothness.
          </p>
        </div>

        <div data-reveal className="glass-panel rounded-3xl p-6 md:p-7">
          <h3 className="text-lg font-semibold text-zinc-100">
            What I Focus On
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300/85">
            <li>Immersive WebGL-powered hero experiences</li>
            <li>Systematic animation design with GSAP timelines</li>
            <li>Performance-first React and Next.js architecture</li>
            <li>Design systems with clear visual language</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
