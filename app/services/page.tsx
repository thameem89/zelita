import { SiteFooter } from "../site-footer";
import { SiteNav } from "../site-nav";

const services = [
  {
    title: "Industrial Cleaning",
    description:
      "Planned cleaning support for warehouses, industrial sites, factories, commercial buildings, and operational facilities.",
  },
  {
    title: "Glass & Facade Cleaning",
    description:
      "Exterior and interior glass care for offices, towers, showrooms, retail spaces, and premium commercial environments.",
  },
  {
    title: "Supply & Replenishment",
    description:
      "Routine supply planning for cleaning chemicals, tissues, dispensers, waste products, janitorial tools, and site consumables.",
  },
  {
    title: "Contract Support",
    description:
      "Long-term supply coordination and professional cleaning support for major businesses, projects, and multi-site teams.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <SiteNav />
      <section className="detail-hero">
        <img
          className="detail-hero-image"
          src="/zelita-hero-premium.png"
          alt="Premium cleaning and facility-care supplies arranged for business use"
        />
        <div className="detail-hero-overlay" />
        <div className="home-shell detail-hero-content">
          <p className="hero-badge">Cleaning Services</p>
          <h1>Professional support for cleaner, safer facilities.</h1>
          <p>
            Zelita combines product supply with practical service coordination
            so businesses can manage cleaning, replenishment, and site support
            from one trusted partner.
          </p>
        </div>
      </section>

      <section className="services-page-section">
        <div className="home-shell">
          <div className="centered-heading">
            <p className="eyebrow">Service Scope</p>
            <h2>Structured solutions for everyday operations.</h2>
          </div>
          <div className="service-detail-grid">
            {services.map((service) => (
              <article key={service.title}>
                <img src="/zelita-facility-hero.png" alt="" />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="/contact">Request service</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-band">
        <div className="home-shell process-grid">
          <article>
            <strong>Assess</strong>
            <span>Understand site needs, quantities, service frequency, and operating constraints.</span>
          </article>
          <article>
            <strong>Plan</strong>
            <span>Recommend suitable products, pack sizes, delivery cycles, and service support.</span>
          </article>
          <article>
            <strong>Support</strong>
            <span>Coordinate fulfillment, replenishment, and ongoing communication.</span>
          </article>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
