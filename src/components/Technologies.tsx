import SectionReveal from "./SectionReveal";
import SectionHead from "./SectionHead";
import TechCard from "./TechCard";

type TechnologyItem = { title: string; description: string; letter: string; href: string };

type SectionHeaderProps = { eyebrow?: string; title?: string; body?: string };

export default function Technologies({ technologies, header }: { technologies: TechnologyItem[]; header?: SectionHeaderProps }) {
  return (
    <section id="technologies" className="pt-8 lg:pt-16 pb-14 lg:pb-28" style={{ background: "var(--background)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <SectionHead eyebrow={header?.eyebrow || "Tech Stack"} title={header?.title || "Platforms we master."}>
            {header?.body || "Cutting-edge platforms powering next-generation enterprise solutions across the region."}
          </SectionHead>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {technologies.map((tech, i) => (
            <SectionReveal key={tech.title} delay={i * 0.06} className="h-full">
              <TechCard title={tech.title} description={tech.description} href={tech.href} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
