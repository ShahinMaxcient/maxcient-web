import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiePolicy() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 t-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold t-heading">Cookie Policy</h1>
          <div className="mt-8 space-y-6 t-body leading-relaxed">
            <p>This website uses cookies to improve your browsing experience. By continuing to use this site, you consent to our use of cookies.</p>
            <h2 className="text-xl font-bold t-heading mt-8">What Are Cookies</h2>
            <p>Cookies are small text files placed on your device when you visit a website. They help the website recognize your device and remember your preferences.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Types of Cookies We Use</h2>
            <p><strong>Essential Cookies:</strong> Required for basic site functionality such as navigation and security.</p>
            <p><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website to improve the experience.</p>
            <p><strong>Preference Cookies:</strong> Remember your settings and preferences for a more personalized experience.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Managing Cookies</h2>
            <p>You can control and delete cookies through your browser settings. Disabling certain cookies may affect website functionality.</p>
            <h2 className="text-xl font-bold t-heading mt-8">Contact</h2>
            <p>For questions about our cookie policy, email <a href="mailto:hello@maxcient.com" className="text-[var(--primary)] hover:underline">hello@maxcient.com</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
