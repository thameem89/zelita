import { Handshake, MapPin, PackageCheck, ShieldCheck } from "lucide-react";

const trustItems = [
  { label: "50+ product solutions", icon: ShieldCheck },
  { label: "Bulk supply support", icon: PackageCheck },
  { label: "Saudi Arabia based", icon: MapPin },
  { label: "Commercial procurement assistance", icon: Handshake },
];

export function ProductHero() {
  return (
    <>
      <section className="catalog-hero">
        <div className="catalog-hero-grid page-container">
          <div className="catalog-hero-copy">
            <p className="catalog-eyebrow">Facility Care & Industrial Supplies</p>
            <h1>Everything your facility needs, in one reliable catalogue.</h1>
            <p>
              Explore cleaning chemicals, janitorial products, waste-management
              supplies, industrial solutions and commercial cleaning essentials from
              Zelita.
            </p>
            <div className="catalog-hero-actions">
              <a className="button primary" href="#catalog-results">Browse Products</a>
              <a className="button secondary-light" href="/request-quote">Request a Quote</a>
            </div>
          </div>
          <figure className="catalog-hero-visual">
            <img
              src="/zelita-catalog-hero-studio.png"
              alt="Professional collection of Zelita facility-care products including chemical containers, a wheeled bin, tissue roll and soap dispenser"
            />
          </figure>
        </div>
      </section>
      <section className="catalog-trust-strip" aria-label="Zelita catalogue strengths">
        <div className="catalog-trust-row page-container">
          {trustItems.map(({ label, icon: Icon }) => (
            <div className="catalog-trust-item" key={label}>
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
