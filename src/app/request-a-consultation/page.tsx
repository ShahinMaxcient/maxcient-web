import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const offices = [
  { region: "MENA", locations: [
    { city: "Dubai", address: "Churchill Tower, Business Bay, PO Box 118467" },
    { city: "Oman", address: "Almaktabi Building, Watayyah, Muscat" },
    { city: "Saudi Arabia", address: "Olaya Towers, MBZ Road, Riyadh" },
  ]},
  { region: "India", locations: [
    { city: "Bengaluru", address: "VISIBLE, Indiranagar, 100 Feet Road" },
    { city: "Kochi", address: "Crescens Tower, Eranakulam" },
  ]},
  { region: "UK", locations: [
    { city: "Bradford", address: "Southfield Square, West Yorkshire BD8 7SN" },
  ]},
];

export default function RequestConsultation() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 lg:pt-36 pb-20 lg:pb-28 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">Request a Consultation</h1>
              <p className="mt-6 text-lg text-blue-100">
                Fill out the form below to initiate a comprehensive consultation with our functional and technical consultants.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-16 t-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-2xl font-bold t-heading">Get in Touch</h2>
                <p className="mt-4 t-body">Our team will reach out within 24 hours to schedule your consultation.</p>

                <div className="mt-8 space-y-6">
                  <div>
                    <label className="block text-sm font-medium t-label mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl t-input outline-none transition-all" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium t-label mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl t-input outline-none transition-all" placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium t-label mb-2">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl t-input outline-none transition-all" placeholder="+971 XX XXX XXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium t-label mb-2">Company</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl t-input outline-none transition-all" placeholder="Company name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium t-label mb-2">Service Interest</label>
                    <select className="w-full px-4 py-3 rounded-xl t-input outline-none transition-all t-body">
                      <option>Select a service</option>
                      <option>ERP & CRM</option>
                      <option>Data Analytics</option>
                      <option>Intelligent Automation</option>
                      <option>Application Development</option>
                      <option>Application Management</option>
                      <option>Smart Teams</option>
                      <option>RealtyAI</option>
                      <option>SmartFees</option>
                      <option>MaxPayroll</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium t-label mb-2">Message</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-xl t-input outline-none transition-all resize-none" placeholder="Tell us about your project..." />
                  </div>
                  <button className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white px-8 py-4 rounded-xl text-base font-semibold hover:shadow-lg transition-all">
                    Submit Request
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold t-heading">Our Offices</h2>
                <p className="mt-4 t-body">Visit us or reach out to any of our global locations.</p>

                <div className="mt-8 space-y-8">
                  {offices.map((region) => (
                    <div key={region.region}>
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">{region.region}</h3>
                      <div className="space-y-4">
                        {region.locations.map((loc) => (
                          <div key={loc.city} className="p-4 rounded-xl t-bg-alt border t-border">
                            <div className="font-semibold t-heading">{loc.city}</div>
                            <div className="text-sm t-body mt-1">{loc.address}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-[var(--primary)]/5 rounded-2xl border border-[var(--primary)]/10">
                  <h3 className="font-semibold t-heading">Direct Contact</h3>
                  <div className="mt-4 space-y-2">
                    <a href="mailto:hello@maxcient.com" className="block text-sm text-[var(--primary)] hover:underline">hello@maxcient.com</a>
                    <a href="tel:+97143293710" className="block text-sm text-[var(--primary)] hover:underline">+971 4 329 3710</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
