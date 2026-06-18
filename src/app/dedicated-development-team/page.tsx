import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "Smart Team Strategy", description: "Charting the course for exceptional development teams with strategic planning ensuring efficiency and precision." },
  { title: "Custom Team Assembly", description: "Curating specialized teams for unique projects with skills matched to specific industry and project requirements." },
  { title: "Team Optimization", description: "Continuous alignment of team members with project goals, methodologies, and collaboration tools." },
  { title: "Offshore Development", description: "Tailored offshore development centers with specialized teams and flexible engagement options." },
  { title: "Team Augmentation", description: "Enhancement of in-house capabilities with specialist expertise and domain-specific knowledge integration." },
  { title: "DevOps Integration", description: "Accelerated product delivery through DevOps practices with complete lifecycle automation." },
  { title: "Transparent Processes", description: "Complete deliverable responsibility with transparent reporting and regular progress updates." },
  { title: "R&D Competencies", description: "Combined research and engineering competencies bringing innovation to every project phase." },
];

const faqs = [
  { question: "What defines a Smart Team?", answer: "A Smart Team is a dedicated group of IT professionals assembled specifically for your project, with skills and expertise matched to your industry and technical requirements." },
  { question: "What are the business benefits?", answer: "Benefits include access to specialized expertise, scalability, flexibility, cost savings, and the ability to focus on core business while we handle the technical execution." },
  { question: "How do you ensure quality and productivity?", answer: "We implement agile methodologies, regular code reviews, automated testing, and continuous integration practices to maintain the highest quality standards." },
  { question: "Can I select or replace team members?", answer: "Yes, you have full flexibility in team member selection. If a member isn't the right fit, we provide replacement options to ensure project success." },
  { question: "How do you protect data security and IP?", answer: "We implement strict NDAs, secure development environments, access controls, and comprehensive IP protection protocols to safeguard your business interests." },
];

export default function DedicatedDevelopmentTeam() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero slug="dedicated-development-team"
          title="Smart Teams"
          subtitle="Building Specialized Teams for Your Unique Goals. Empower your business with our Smart Teams, bringing expertise and innovation to every project."
          image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
        />
        <FeatureGrid title="Smart Team Services" subtitle="Flexible team engagement models tailored to your project needs." features={features} />
        <CTASection title="Build Your Dream Team" subtitle="Connect with us to assemble the perfect team for your next project." />
        <PageFAQ slug="dedicated-development-team" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
