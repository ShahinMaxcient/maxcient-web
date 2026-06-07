import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationForm from "@/components/ConsultationForm";

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
              <ConsultationForm />

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
