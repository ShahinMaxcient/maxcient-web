import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import FramedImage from "@/components/FramedImage";
import Reveal from "@/components/Reveal";
import { RevealGroup, RevealItem } from "@/components/RevealGroup";

const BASE = "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site";

// Content mirrors www.maxcient.com/dedicated-development-team (Smart Teams).
const guidance = [
  {
    title: "Charting the Course for Exceptional Development Teams",
    body: "In the ever-evolving landscape of software development, having a strategic approach to building your team is paramount. Our expertise guides businesses in curating the ideal team composition and dynamics, ensuring your development projects are expedited with efficiency and precision.",
    points: [
      "Without the right team strategy, even the most promising projects can face undue challenges.",
      "Relying on a generic team structure might not capture the essence of your project's requirements.",
    ],
    image: `${BASE}/smartteams-strategy.webp`,
  },
  {
    title: "Curating Specialized Teams for Unique Projects",
    body: "The world of development is diverse, and one-size-fits-all teams might not cater to the intricate demands of every project. We specialize in assembling bespoke teams, tailoring skills and expertise to perfectly match your industry and project specifications.",
    points: [] as string[],
    image: `${BASE}/smartteams-specialized.webp`,
  },
  {
    title: "Honing Team Dynamics for Seamless Project Execution",
    body: "The journey from project inception to completion is paved with collaboration and alignment. We emphasize continuous team optimization, ensuring that all members are aligned with project goals, methodologies, and collaboration tools. This proactive approach guarantees smooth project trajectories and exceptional deliverables.",
    points: ["A misaligned team can lead to potential project derailments."],
    image: `${BASE}/smartteams-dynamics.webp`,
  },
];

const cardSections = [
  {
    intro: "Engaging in a Comprehensive Development Partnership ensures a holistic approach to crafting solutions. By focusing on the nuances of your business, we strive for innovation and superior quality, ensuring lasting partnerships.",
    eyebrow: "Development Partnership",
    image: `${BASE}/smartteams-partnership.webp`,
    cards: [
      { title: "Tailored Offshore Development Centers", body: "Our bespoke offshore development centers are designed to suit specific project needs. Through specialized teams and state-of-the-art infrastructure, we provide a hub of expertise and innovation, propelling businesses forward." },
      { title: "Full Management or Limited Engagement", body: "Understanding the diverse needs of our clients, we offer flexibility in engagement. Whether you prefer complete project management or wish to engage at key junctures, we tailor our approach to align with your strategy." },
      { title: "Transparent Processes with Complete Deliverable Responsibility", body: "Trust and clarity form the backbone of our operations. We emphasize transparency in every project phase and hold ourselves accountable, ensuring that deliverables meet the highest standards and client expectations." },
    ],
  },
  {
    intro: "Augmenting your existing teams with our professionals bridges the skill gap and enriches your workforce. With a focus on collaboration, we seamlessly integrate to drive results and achieve project goals.",
    eyebrow: "Team Augmentation",
    image: `${BASE}/smartteams-augmentation.webp`,
    cards: [
      { title: "Enhancement of In-House Capabilities with Our Specialists", body: "Leverage our specialist expertise to enhance your in-house capabilities. Our seasoned professionals bring a blend of technical knowledge and industry insights, propelling your projects to new heights." },
      { title: "Domain-Specific Expertise Integration", body: "Incorporating domain-specific knowledge is crucial for targeted solutions. We bring experts who not only understand the technicalities but also the nuances of your industry, ensuring tailored solutions for maximum impact." },
      { title: "Combined R&D and Engineering Competencies", body: "By combining our extensive R&D and engineering prowess with your team's strengths, we foster innovation and deliver projects that resonate with end-users and fulfill business objectives." },
    ],
  },
  {
    intro: "Embrace the future of product delivery with our DevOps integration. This approach ensures smooth transitions between development and operations, leading to efficient and scalable solutions.",
    eyebrow: "DevOps Integration",
    image: `${BASE}/smartteams-devops.webp`,
    cards: [
      { title: "Accelerate Product Delivery Through DevOps Practices", body: "With DevOps practices at the forefront, we streamline product delivery. This holistic approach results in faster iterations, efficient builds, and quicker releases, keeping you ahead in the market." },
      { title: "Complete Lifecycle Automation from Infrastructure to Deployment", body: "Our comprehensive automation strategy covers every aspect of the software lifecycle. From setting up infrastructure to final deployment, we ensure consistency, speed, and reliability, eliminating manual errors and bottlenecks." },
      { title: "Minimize Delays and Expedite Time-to-Market", body: "Time is of the essence in today's competitive landscape. Our strategies and methodologies are designed to cut down delays, ensuring your product reaches the market swiftly and effectively." },
    ],
  },
];

function WarnIcon() {
  return (
    <svg className="w-[18px] h-[18px] mt-0.5 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>
  );
}

export default function SmartTeams() {
  return (
    <>
      <main>
        <PageHero slug="dedicated-development-team"
          title="Smart Teams"
          subtitle="Building Specialized Teams for Your Unique Goals."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1522071820081-009f0129c71c.webp"
        />

        {/* Strategy / Assembly / Optimization — alternating image/text rows */}
        <section className="py-16 lg:py-24 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal direction="up" className="max-w-3xl mb-14 lg:mb-20">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">How we help</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading leading-tight">Our approach to building Smart Teams</h2>
            </Reveal>
            <div className="space-y-16 lg:space-y-28">
              {guidance.map((item, i) => {
                const flip = i % 2 === 1;
                return (
                  <div key={item.title} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <Reveal direction={flip ? "right" : "left"} className={flip ? "lg:order-2" : ""}>
                      <h3 className="text-2xl sm:text-3xl font-bold t-heading leading-snug">{item.title}</h3>
                      <p className="mt-4 t-body leading-relaxed">{item.body}</p>
                      {item.points.length > 0 && (
                        <div className="mt-6 space-y-3">
                          {item.points.map((pt) => (
                            <div key={pt} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "var(--surface-alt)", border: "1px solid var(--border)" }}>
                              <WarnIcon />
                              <p className="text-sm t-label leading-relaxed">{pt}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </Reveal>
                    <Reveal direction={flip ? "left" : "right"} delay={0.08} className={flip ? "lg:order-1" : ""}>
                      <FramedImage src={item.image} alt={item.title} />
                    </Reveal>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Partnership / Augmentation / DevOps — image intro + animated card grids */}
        {cardSections.map((sec, si) => {
          const flip = si % 2 === 1;
          return (
            <section key={sec.eyebrow} className={`py-14 lg:py-20 ${si % 2 === 0 ? "t-bg-alt" : "t-bg-surface"}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12 lg:mb-14">
                  <Reveal direction={flip ? "right" : "left"} className={flip ? "lg:order-2" : ""}>
                    <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">{sec.eyebrow}</span>
                    <p className="mt-3 text-xl sm:text-2xl t-heading font-semibold leading-snug">{sec.intro}</p>
                  </Reveal>
                  <Reveal direction={flip ? "left" : "right"} delay={0.08} className={flip ? "lg:order-1" : ""}>
                    <FramedImage src={sec.image} alt={sec.eyebrow} />
                  </Reveal>
                </div>
                <RevealGroup className="grid md:grid-cols-3 gap-6 items-stretch" stagger={0.08}>
                  {sec.cards.map((c) => (
                    <RevealItem key={c.title} className="h-full p-7 rounded-2xl border t-border t-bg-surface hover:shadow-lg transition-all">
                      <h3 className="text-base font-bold t-heading leading-snug">{c.title}</h3>
                      <p className="mt-3 text-sm t-body leading-relaxed">{c.body}</p>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </section>
          );
        })}

        <CTASection
          title="How We Deliver Smart Teams Services"
          subtitle="Empowering Streamlined Development Initiatives — Elevate your vision with our Dedicated Development Team. Our experts seamlessly integrate with your projects, ensuring enhanced collaboration and optimized solutions. Experience the synergy where technical expertise meets business innovation."
        />
        <PageFAQ slug="dedicated-development-team" />
      </main>
    </>
  );
}
