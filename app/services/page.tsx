import { SiteFooter } from "../site-footer";
import { SiteNav } from "../site-nav";

const services = [
  {
    title: "Industrial Cleaning",
    image: "/zelita-service-industrial-cleaning.webp",
    description:
      "Planned cleaning support for warehouses, industrial sites, factories, commercial buildings, and operational facilities.",
    highlights: ["Deep cleaning and scheduled maintenance", "Support for high-traffic and operational areas", "Site-specific cleaning plans"],
  },
  {
    title: "Glass & Facade Cleaning",
    image: "/zelita-service-facade-cleaning.webp",
    description:
      "Exterior and interior glass care for offices, towers, showrooms, retail spaces, and premium commercial environments.",
    highlights: ["Internal and external glass cleaning", "Facade presentation and routine care", "Flexible scheduling around site operations"],
  },
  {
    title: "Supply & Replenishment",
    image: "/zelita-service-supply-replenishment.webp",
    description:
      "Routine supply planning for cleaning chemicals, tissues, dispensers, waste products, janitorial tools, and site consumables.",
    highlights: ["Planned stock replenishment", "Consolidated product supply", "Support for single and multi-site operations"],
  },
  {
    title: "Contract Support",
    image: "/zelita-service-contract-support.webp",
    description:
      "Long-term supply coordination and professional cleaning support for major businesses, projects, and multi-site teams.",
    highlights: ["Dedicated account coordination", "Scalable support for projects and contracts", "Regular service and supply reviews"],
  },
];

export default function ServicesPage() {
  return (
    <main>
      <SiteNav />
      <section className="detail-hero">
        <img
          className="detail-hero-image"
          src="/zelita-service-contract-support.webp"
          alt="Professional cleaning team working in a modern commercial atrium"
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
            <p className="service-section-intro">
              Whether you manage an office, warehouse, retail property,
              hospitality site, residential community, or industrial facility,
              our team can shape the service around your operating hours,
              cleaning priorities, and procurement requirements.
            </p>
          </div>
          <div className="service-detail-grid">
            {services.map((service) => (
              <article key={service.title}>
                <img src={service.image} alt={`${service.title} service by Zelita`} />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
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
      <section className="page-cta">
        <div className="home-shell page-cta-inner">
          <div>
            <p className="eyebrow">Discuss Your Site</p>
            <h2>Need a service plan that fits your facility?</h2>
            <p className="service-cta-copy">Tell us about your site, preferred schedule, current challenges, and required supplies. We will help you define a practical scope.</p>
          </div>
          <a className="button primary" href="/contact">Request a consultation</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
