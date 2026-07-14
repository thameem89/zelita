import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";

const divisions = [
  {
    title: "Cleaning Chemicals",
    copy: "Commercial and industrial chemical solutions for daily cleaning, disinfection, floor care, kitchens and specialised applications.",
    button: "Explore Cleaning Chemicals",
    href: "/cleaning-chemicals",
    image: "/zelita-cleaning-products.png",
  },
  {
    title: "Cleaning Equipment",
    copy: "Professional equipment and facility-care essentials for washrooms, waste handling, janitorial work and floor maintenance.",
    button: "Explore Cleaning Equipment",
    href: "/cleaning-equipment",
    image: "/zelita-janitorial-cart.png",
  },
];

const services = [
  {
    title: "Industrial Cleaning",
    description: "Large-scale cleaning programs for industrial and commercial environments.",
  },
  {
    title: "Glass & Facade Cleaning",
    description: "Specialized exterior cleaning for buildings and premium facilities.",
  },
  {
    title: "Supply & Replenishment",
    description: "Reliable product fulfillment for teams, sites, and projects.",
  },
];

export default function Home() {
  return (
    <main className="home-page">
      <SiteNav />

      <section className="industrial-hero" id="home">
        <img
          className="industrial-hero-image"
          src="/zelita-facility-cleaning.png"
          alt="Professional cleaning team maintaining a modern commercial facility"
        />
        <div className="industrial-hero-overlay" />
        <div className="home-shell industrial-hero-content">
          <p className="hero-badge">Trusted partner in Saudi Arabia</p>
          <h1>
            Complete cleaning, industrial & facility <span>supply solutions.</span>
          </h1>
          <p>
            Reliable products, professional cleaning services, and industrial
            solutions for businesses across Saudi Arabia.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="/cleaning-chemicals">Cleaning Chemicals</a>
            <a className="button secondary" href="/cleaning-equipment">Cleaning Equipment</a>
            <a className="button secondary" href="/request-quote">Request a Quote</a>
          </div>
        </div>
      </section>

      <section className="capability-bar" aria-label="Zelita strengths">
        <div className="home-shell capability-grid">
          <article>
            <strong>Saudi Arabia based</strong>
            <span>Local presence, fast support</span>
          </article>
          <article>
            <strong>50+ product solutions</strong>
            <span>Wide range for every need</span>
          </article>
          <article>
            <strong>Bulk & custom supply</strong>
            <span>Flexible packaging options</span>
          </article>
          <article>
            <strong>Professional services</strong>
            <span>Cleaning contracts and beyond</span>
          </article>
        </div>
      </section>

      <section className="division-showcase" id="divisions">
        <div className="home-shell">
          <div className="centered-heading">
            <p className="eyebrow">Product Divisions</p>
            <h2>Focused supply paths for commercial buyers.</h2>
          </div>
          <div className="division-showcase-grid">
            {divisions.map((division) => (
              <a className="division-panel" href={division.href} key={division.title}>
                <img src={division.image} alt="" />
                <div>
                  <h3>{division.title}</h3>
                  <p>{division.copy}</p>
                  <span>{division.button}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="company-section" id="about">
        <div className="home-shell company-grid">
          <img
            className="company-image"
            src="/zelita-supplies-set.png"
            alt="Modern commercial facility maintained by a professional cleaning team"
          />
          <div className="company-copy">
            <p className="eyebrow">About Zelita Ventures</p>
            <h2>Your reliable supply and service partner.</h2>
            <p>
              Originating as Zelita Global Ventures in India, we have expanded
              into Saudi Arabia to deliver a comprehensive range of cleaning,
              industrial, and facility supply solutions.
            </p>
            <div className="company-facts">
              <span><strong>50+</strong> specialized solutions</span>
              <span><strong>Multi-sector</strong> business support</span>
            </div>
            <a className="button dark" href="/about">Learn More About Us</a>
          </div>
        </div>
      </section>

      <section className="services-showcase" id="services">
        <div className="home-shell">
          <div className="centered-heading light-heading">
            <p className="eyebrow">Our Cleaning Services</p>
            <h2>Professional cleaning solutions for every environment.</h2>
          </div>
          <div className="service-showcase-grid">
            {services.map((service) => (
              <article className="service-showcase-card" key={service.title}>
                <img
                  src={
                    service.title === "Industrial Cleaning"
                      ? "/zelita-facility-cleaning.png"
                      : service.title === "Glass & Facade Cleaning"
                        ? "/zelita-janitorial-cart.png"
                        : "/zelita-packaging-products.png"
                  }
                  alt=""
                />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="/services">View service</a>
                </div>
              </article>
            ))}
          </div>
          <div className="services-action">
            <a className="button primary" href="/services">View All Services</a>
          </div>
        </div>
      </section>

      <section className="contact home-contact" id="contact">
        <div className="home-shell contact-inner">
          <div>
            <p className="eyebrow">Partnership Desk</p>
            <h2>Ready to discuss supply, services, or a custom quote?</h2>
          </div>
          <a className="button secondary" href="/contact">Contact Zelita</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
