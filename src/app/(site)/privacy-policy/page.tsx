import { pageMetadata } from "@/lib/seo";

// Unique title/description per page; Admin → Pages can override both.
export const generateMetadata = () =>
  pageMetadata({
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "How Maxcient Technologies collects, uses and protects personal information submitted through this website.",
  });


export default function PrivacyPolicy() {
  return (
    <>
      <main className="pt-28 pb-20 t-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold t-heading">Privacy Policy</h1>
          <div className="mt-8 space-y-6 t-body leading-relaxed">
            <p>Maxcient Technologies is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Information We Collect</h2>
            <p>We may collect personal information including your name, email address, phone number, and company details when you fill out forms, request consultations, or communicate with us.</p>
            <h2 className="text-xl font-bold t-heading mt-8">How We Use Your Information</h2>
            <p>We use your information to respond to inquiries, provide requested services, send relevant communications, and improve our website experience. We do not sell your personal data to third parties.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Business Contact Enrichment</h2>
            <p>When you submit an enquiry, we may use a third-party business intelligence provider (Apollo.io) to match the email address you give us with publicly available professional information — such as your job title, company, industry and LinkedIn profile — so our team can respond in context. This is used only to prepare for our conversation with you and is never sold on. You can ask us not to enrich your details, or to delete any enriched information we hold, by contacting us at the address below.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Live Chat and Virtual Assistant</h2>
            <p>The chat on this website runs on Microsoft Dynamics 365 Contact Center. Conversations are answered first by Maxie, our virtual assistant. Maxie is automated: its answers are generated from the published content of this website and can be incomplete or wrong, so please confirm anything important with our team.</p>
            <p>When you use the chat, we receive the messages you type, any details you choose to share (such as your name, email address or phone number), the address and title of the page you started the chat from, and the date and time of the conversation. Microsoft also processes the technical information needed to deliver the chat, such as your IP address and browser details, and receives diagnostic data from the chat software to keep the service running.</p>
            <p>We use chat conversations to answer your questions, pass the conversation to a member of our team when you ask for a person, follow up on requests you make, and review conversations to improve our answers. Transcripts are stored in our Microsoft Dynamics 365 customer-service system, which Microsoft operates on our behalf as our service provider. You can read how Microsoft handles data in the <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">Microsoft Privacy Statement</a>.</p>
            <p>Please do not share passwords, payment card details or other sensitive information in the chat. You can ask for a copy of your chat transcripts, or for them to be deleted, as described under Your Rights below.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. Contact us at <a href="mailto:hello@maxcient.com" className="text-[var(--primary)] hover:underline">hello@maxcient.com</a> to exercise these rights.</p>
          </div>
        </div>
      </main>
    </>
  );
}
