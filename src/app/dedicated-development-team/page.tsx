import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

// Content mirrors www.maxcient.com/dedicated-development-team (Smart Teams).
const guidance = [
  {
    title: "Charting the Course for Exceptional Development Teams",
    body: "In the ever-evolving landscape of software development, having a strategic approach to building your team is paramount. Our expertise guides businesses in curating the ideal team composition and dynamics, ensuring your development projects are expedited with efficiency and precision.",
    points: [
      "Without the right team strategy, even the most promising projects can face undue challenges.",
      "Relying on a generic team structure might not capture the essence of your project's requirements.",
    ],
  },
  {
    title: "Curating Specialized Teams for Unique Projects",
    body: "The world of development is diverse, and one-size-fits-all teams might not cater to the intricate demands of every project. We specialize in assembling bespoke teams, tailoring skills and expertise to perfectly match your industry and project specifications.",
    points: [] as string[],
  },
  {
    title: "Honing Team Dynamics for Seamless Project Execution",
    body: "The journey from project inception to completion is paved with collaboration and alignment. We emphasize continuous team optimization, ensuring that all members are aligned with project goals, methodologies, and collaboration tools. This proactive approach guarantees smooth project trajectories and exceptional deliverables.",
    points: ["A misaligned team can lead to potential project derailments."],
  },
];

const cardSections = [
  {
    intro: "Engaging in a Comprehensive Development Partnership ensures a holistic approach to crafting solutions. By focusing on the nuances of your business, we strive for innovation and superior quality, ensuring lasting partnerships.",
    eyebrow: "Development Partnership",
    cards: [
      { title: "Tailored Offshore Development Centers", body: "Our bespoke offshore development centers are designed to suit specific project needs. Through specialized teams and state-of-the-art infrastructure, we provide a hub of expertise and innovation, propelling businesses forward." },
      { title: "Full Management or Limited Engagement", body: "Understanding the diverse needs of our clients, we offer flexibility in engagement. Whether you prefer complete project management or wish to engage at key junctures, we tailor our approach to align with your strategy." },
      { title: "Transparent Processes with Complete Deliverable Responsibility", body: "Trust and clarity form the backbone of our operations. We emphasize transparency in every project phase and hold ourselves accountable, ensuring that deliverables meet the highest standards and client expectations." },
    ],
  },
  {
    intro: "Augmenting your existing teams with our professionals bridges the skill gap and enriches your workforce. With a focus on collaboration, we seamlessly integrate to drive results and achieve project goals.",
    eyebrow: "Team Augmentation",
    cards: [
      { title: "Enhancement of In-House Capabilities with Our Specialists", body: "Leverage our specialist expertise to enhance your in-house capabilities. Our seasoned professionals bring a blend of technical knowledge and industry insights, propelling your projects to new heights." },
      { title: "Domain-Specific Expertise Integration", body: "Incorporating domain-specific knowledge is crucial for targeted solutions. We bring experts who not only understand the technicalities but also the nuances of your industry, ensuring tailored solutions for maximum impact." },
      { title: "Combined R&D and Engineering Competencies", body: "By combining our extensive R&D and engineering prowess with your team's strengths, we foster innovation and deliver projects that resonate with end-users and fulfill business objectives." },
    ],
  },
  {
    intro: "Embrace the future of product delivery with our DevOps integration. This approach ensures smooth transitions between development and operations, leading to efficient and scalable solutions.",
    eyebrow: "DevOps Integration",
    cards: [
      { title: "Accelerate Product Delivery Through DevOps Practices", body: "With DevOps practices at the forefront, we streamline product delivery. This holistic approach results in faster iterations, efficient builds, and quicker releases, keeping you ahead in the market." },
      { title: "Complete Lifecycle Automation from Infrastructure to Deployment", body: "Our comprehensive automation strategy covers every aspect of the software lifecycle. From setting up infrastructure to final deployment, we ensure consistency, speed, and reliability, eliminating manual errors and bottlenecks." },
      { title: "Minimize Delays and Expedite Time-to-Market", body: "Time is of the essence in today's competitive landscape. Our strategies and methodologies are designed to cut down delays, ensuring your product reaches the market swiftly and effectively." },
    ],
  },
];

export default function SmartTeams() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="dedicated-development-team"
          title="Smart Teams"
          subtitle="Building Specialized Teams for Your Unique Goals."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1522071820081-009f0129c71c.webp"
        />

        {/* Strategy / Assembly / Optimization */}
        <section className="py-14 lg:py-16 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {guidance.map((item) => (
                <div key={item.title} className="p-8 rounded-2xl border t-border hover:shadow-lg transition-all flex flex-col">
                  <h3 className="text-lg font-bold t-heading leading-snug">{item.title}</h3>
                  <p className="mt-4 t-body leading-relaxed">{item.body}</p>
                  {item.points.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {item.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-sm t-label leading-relaxed">
                          <svg className="w-4 h-4 mt-0.5 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          </svg>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership / Augmentation / DevOps card grids */}
        {cardSections.map((sec, si) => (
          <section key={sec.eyebrow} className={`py-14 lg:py-16 ${si % 2 === 0 ? "t-bg-alt" : "t-bg-surface"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-10">
                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">{sec.eyebrow}</span>
                <p className="mt-3 text-lg t-heading font-semibold leading-snug">{sec.intro}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {sec.cards.map((c) => (
                  <div key={c.title} className="p-7 rounded-2xl border t-border t-bg-surface hover:shadow-lg transition-all">
                    <h3 className="text-base font-bold t-heading leading-snug">{c.title}</h3>
                    <p className="mt-3 text-sm t-body leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <CTASection
          title="How We Deliver Smart Teams Services"
          subtitle="Elevate your vision with our Dedicated Development Team. Our experts seamlessly integrate with your projects, ensuring enhanced collaboration and optimized solutions. Experience the synergy where technical expertise meets business innovation."
        />
        <PageFAQ slug="dedicated-development-team" />
      </main>
      <Footer />
    </>
  );
}
