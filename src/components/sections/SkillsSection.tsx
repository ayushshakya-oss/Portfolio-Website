import SplitWords from "@/components/sections/SplitWords";

const SKILLS = [
  "Next.js",
  "React",
  "TypeScript",
  "GSAP",
  "Three.js",
  "React Three Fiber",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Git & GitHub",
  "Python",
  "Docker",
  "PHP",
  "WordPress",
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="scene-section relative flex min-h-screen items-center py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <p data-reveal className="section-label">
          Skills
        </p>
        <SplitWords
          text="Tools I use to ship fast, expressive, and reliable products."
          className="mt-4 max-w-4xl text-3xl leading-tight font-semibold text-zinc-100 md:text-5xl"
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skill) => (
            <div
              key={skill}
              data-reveal
              className="glass-panel rounded-2xl px-4 py-3 text-sm font-medium tracking-wide text-zinc-100"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
