import { SiteFooter } from "../site-footer";
import { SiteNav } from "../site-nav";

const values = [
  {
    title: "Vision",
    description:
      "To become one of the top 10 leading companies across the Middle East by 2034, aligned with Saudi Vision 2030 and built on local manufacturing, service quality, and affordability.",
  },
  {
    title: "Mission",
    description:
      "To expand rapidly beyond 50 specialized items and deliver dependable supplies and professional cleaning contract services for major businesses and mega-projects.",
  },
  {
    title: "Partnership",
    description:
      "To connect global product standards with local market needs through reliable procurement, responsive support, and sustainable long-term relationships.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <SiteNav />
      <section className="detail-hero about-hero">
        <img
          className="detail-hero-image"
          src="/zelita-facility-hero.png"
          alt="Professional cleaning team supporting a modern facility"
        />
        <div className="detail-hero-overlay" />
        <div className="home-shell detail-hero-content">
          <p className="hero-badge">About Zelita Ventures</p>
          <h1>Built for dependable facility-care supply.</h1>
          <p>
            Zelita brings cleaning supplies, janitorial materials, industrial
            solutions, and professional service support together for businesses
            across Saudi Arabia and the wider Middle East.
          </p>
        </div>
      </section>

      <section className="page-story">
        <div className="home-shell story-grid">
          <div>
            <p className="eyebrow">Our Background</p>
            <h2>From global trading roots to a Saudi Arabia growth platform.</h2>
          </div>
          <div className="story-copy">
            <p>
              Originating as Zelita Global Ventures in India, Zelita Ventures
              Co. LLC has expanded into Saudi Arabia with a practical focus:
              source dependable products, support daily facility operations, and
              help clients manage supply requirements with clarity.
            </p>
            <p>
              The company serves organizations that need a responsive partner
              for everyday cleaning materials, specialized industrial products,
              and professional cleaning contracts.
            </p>
            <p>
              Our approach combines international sourcing experience with
              practical local support. We work closely with procurement teams,
              facility managers, contractors, and service partners to identify
              suitable products, maintain dependable supply, and respond to the
              changing needs of each site across Saudi Arabia.
            </p>
          </div>
        </div>
      </section>

      <section className="value-section">
        <div className="home-shell value-grid">
          {values.map((value) => (
            <article key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-cta">
        <div className="home-shell page-cta-inner">
          <h2>Looking for a reliable supply and service partner?</h2>
          <a className="button primary" href="/contact">Contact Zelita</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
