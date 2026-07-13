import { SiteFooter } from "./site-footer";

const productCategories = [
  { name: "Cleaning Chemicals", image: "/zelita-hero-premium.png" },
  { name: "Waste Management", image: "/zelita-facility-hero.png" },
  { name: "Janitorial Products", image: "/zelita-facility-hero.png" },
  { name: "Aerosol Products", image: "/zelita-hero-premium.png" },
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
      <nav className="topbar home-nav" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Zelita home">
          <img
            className="brand-logo"
            src="/zelita-logo.png"
            alt="Zelita Ventures Co. LLC"
          />
        </a>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="/products">Products</a>
          <a href="#services">Cleaning Services</a>
          <a href="#contact">Contact Us</a>
        </div>
        <a className="nav-quote" href="#contact">Request a Quote</a>
      </nav>

      <section className="industrial-hero" id="home">
        <img
          className="industrial-hero-image"
          src="/zelita-facility-hero.png"
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
            <a className="button primary" href="/products">Explore Products</a>
            <a className="button secondary" href="#contact">Request a Quote</a>
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

      <section className="category-showcase" id="products">
        <div className="home-shell">
          <div className="centered-heading">
            <p className="eyebrow">Our Product Categories</p>
            <h2>Everything your business needs.</h2>
          </div>
          <div className="category-showcase-grid">
            {productCategories.map((category) => (
              <a className="showcase-card" href="/products" key={category.name}>
                <img src={category.image} alt="" />
                <h3>{category.name}</h3>
                <span>View products</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="company-section" id="about">
        <div className="home-shell company-grid">
          <img
            className="company-image"
            src="/zelita-facility-hero.png"
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
            <a className="button dark" href="#contact">Learn More About Us</a>
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
                <img src="/zelita-facility-hero.png" alt="" />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="#contact">View service</a>
                </div>
              </article>
            ))}
          </div>
          <div className="services-action">
            <a className="button primary" href="#contact">View All Services</a>
          </div>
        </div>
      </section>

      <section className="contact home-contact" id="contact">
        <div className="home-shell contact-inner">
          <div>
            <p className="eyebrow">Partnership Desk</p>
            <h2>Ready to discuss supply, services, or a custom quote?</h2>
          </div>
          <a className="button secondary" href="mailto:info@zelitasa.com">Contact Zelita</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
