import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const products = [
  { name: "GPT", desc: "Renowned language processing capabilities for content creation, analysis, and coding assistance.", color: "from-gray-700 to-gray-900" },
  { name: "DALL·E", desc: "AI-powered image generation from text descriptions for creative and business applications.", color: "from-pink-500 to-rose-700" },
  { name: "CLIP", desc: "Vision and language understanding connecting visual and textual information.", color: "from-blue-500 to-blue-700" },
  { name: "Codex", desc: "Advanced programming assistance tool translating natural language to code.", color: "from-green-500 to-green-700" },
];

const services = [
  { title: "Custom Model Training", desc: "Tailored AI training for industry-specific needs including data preprocessing and model fine-tuning." },
  { title: "Integration with Dynamics 365", desc: "Seamless AI integration with your existing Microsoft ecosystem while preserving data integrity." },
  { title: "Training & Support", desc: "Dedicated training sessions and ongoing platform support for your teams to maximize AI potential." },
];

const faqs = [
  { question: "What distinguishes OpenAI from other AI platforms?", answer: "OpenAI leads in cutting-edge research, ethical AI commitment, and versatile tools like GPT for language processing, DALL-E for image generation, and Codex for programming assistance." },
  { question: "How does the GPT series work?", answer: "GPT models use transformer architecture trained on vast datasets to understand and generate human-like text, enabling applications from content creation to complex analysis." },
  { question: "Can OpenAI generate visual content?", answer: "Yes, DALL-E can generate original images from text descriptions, and CLIP connects visual and textual understanding for advanced image analysis." },
  { question: "How do you ensure AI safety?", answer: "We implement responsible AI practices including bias testing, safety evaluations, human oversight, and ethical guidelines aligned with OpenAI's safety research." },
  { question: "How can businesses benefit from OpenAI?", answer: "Businesses can automate content creation, enhance customer service with AI chatbots, accelerate development with Codex, and gain insights through advanced language analysis." },
];

export default function OpenAI() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero title="OpenAI" subtitle="Revolutionizing AI Research & Development. Leverage OpenAI's advanced AI models to drive innovation, automate processes, and engage customers like never before." image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80" />

        <section className="py-14 lg:py-16 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Products</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">OpenAI Products</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <div key={p.name} className="p-6 rounded-2xl border t-border hover:shadow-lg transition-all">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-bold text-sm`}>AI</div>
                  <h3 className="mt-4 font-semibold t-heading">{p.name}</h3>
                  <p className="mt-2 text-sm t-body">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-16 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold t-heading">Our AI Services</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((s) => (
                <div key={s.title} className="p-8 t-bg-surface rounded-2xl border t-border hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold t-heading">{s.title}</h3>
                  <p className="mt-4 t-body leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection title="Harness the Power of AI" subtitle="Let us help you integrate OpenAI solutions to drive innovation across your business." />
        <PageFAQ faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
