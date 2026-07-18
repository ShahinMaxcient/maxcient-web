import NavbarServer from "@/components/NavbarServer";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <NavbarServer />
      <main className="pt-28 pb-20 t-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold t-heading">Privacy Policy</h1>
          <div className="mt-8 space-y-6 t-body leading-relaxed">
            <p>Maxcient Technologies is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Information We Collect</h2>
            <p>We may collect personal information including your name, email address, phone number, and company details when you fill out forms, request consultations, or communicate with us.</p>
            <h2 className="text-xl font-bold t-heading mt-8">How We Use Your Information</h2>
            <p>We use your information to respond to inquiries, provide requested services, send relevant communications, and improve our website experience. We do not sell your personal data to third parties.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. Contact us at <a href="mailto:hello@maxcient.com" className="text-[var(--primary)] hover:underline">hello@maxcient.com</a> to exercise these rights.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
