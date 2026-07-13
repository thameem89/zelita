export function ProductHero() {
  const trustItems = [
    "50+ product solutions",
    "Bulk supply support",
    "Saudi Arabia based",
    "Commercial procurement assistance",
  ];

  return (
    <section className="catalog-hero">
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
        <div className="catalog-trust-row" aria-label="Zelita catalog strengths">
          {trustItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <div className="catalog-hero-visual" aria-hidden="true">
        <div className="hero-product-card hero-product-card-main">
          <img src="/zelita-cleaning-products.png" alt="" />
          <span>Cleaning Chemicals</span>
        </div>
        <div className="hero-product-card hero-product-card-side">
          <img src="/zelita-waste-products.png" alt="" />
          <span>Waste Management</span>
        </div>
        <div className="hero-product-card hero-product-card-small">
          <img src="/zelita-facility-hero.png" alt="" />
          <span>Facility Care</span>
        </div>
      </div>
    </section>
  );
}
