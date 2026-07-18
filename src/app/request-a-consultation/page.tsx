import NavbarServer from "@/components/NavbarServer";
import Footer from "@/components/Footer";
import ConsultationForm from "@/components/ConsultationForm";
import { getCollectionItems } from "@/lib/content";
import { getSiteSettings } from "@/lib/settings";
import { getServices } from "@/lib/homepage";

type OfficeRow = { region: string; city: string; address: string };

function groupOffices(rows: OfficeRow[]) {
  const map = new Map<string, { region: string; locations: { city: string; address: string }[] }>();
  for (const o of rows) {
    if (!map.has(o.region)) map.set(o.region, { region: o.region, locations: [] });
    map.get(o.region)!.locations.push({ city: o.city, address: o.address });
  }
  return Array.from(map.values());
}

export default async function RequestConsultation() {
  const [officeRows, settings, services] = await Promise.all([
    getCollectionItems<OfficeRow>("offices"),
    getSiteSettings(),
    getServices(),
  ]);

  const offices = groupOffices(officeRows);
  const serviceNames = services.map((s) => s.title);
  const telHref = `tel:${settings.contactPhone.replace(/[^0-9+]/g, "")}`;

  return (
    <>
      <NavbarServer />
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
              <ConsultationForm serviceOptions={serviceNames} />

              <div>
                {/* Call us card */}
                <div className="relative overflow-hidden rounded-2xl p-7 lg:p-8 mb-10" style={{ background: "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 55%, var(--primary-light) 100%)" }}>
                  <div className="flex items-center gap-5">
                    <span className="flex items-center justify-center shrink-0" style={{ width: 56, height: 56 }}>
                      <svg width="44" height="44" fill="none" stroke="#fbbf24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 2 }}>Call us</div>
                      <a href={telHref} className="block font-bold text-white" style={{ fontSize: "1.9rem", letterSpacing: "-0.01em" }}>{settings.contactPhone}</a>
                    </div>
                  </div>
                  <div style={{ height: 1, background: "rgba(255,255,255,0.22)", margin: "24px 0" }} />
                  <div className="text-center text-white">
                    <div className="font-bold" style={{ fontSize: "1.5rem" }}>9 AM – 6 PM</div>
                    <div className="font-semibold mt-1" style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.9)" }}>Monday – Friday</div>
                  </div>
                </div>

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
                    <a href={`mailto:${settings.contactEmail}`} className="block text-sm text-[var(--primary)] hover:underline">{settings.contactEmail}</a>
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
