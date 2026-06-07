import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfUse() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 t-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold t-heading">Terms of Use</h1>
          <div className="mt-8 prose max-w-none space-y-6 t-body leading-relaxed">
            <p>Welcome to the Maxcient Technologies website. By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Use of Website</h2>
            <p>The content of this website is for your general information and use only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Intellectual Property</h2>
            <p>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Limitation of Liability</h2>
            <p>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Contact</h2>
            <p>For any questions regarding these terms, please contact us at <a href="mailto:hello@maxcient.com" className="text-[var(--primary)] hover:underline">hello@maxcient.com</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
