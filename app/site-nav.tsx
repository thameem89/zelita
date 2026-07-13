type SiteNavProps = {
  tone?: "default" | "home";
};

export function SiteNav({ tone = "default" }: SiteNavProps) {
  const className = tone === "home" ? "topbar home-nav" : "topbar";

  return (
    <nav className={className} aria-label="Main navigation">
      <a className="brand" href="/" aria-label="Zelita home">
        <img
          className="brand-logo"
          src="/zelita-logo.png"
          alt="Zelita Ventures Co. LLC"
        />
      </a>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/products">Products</a>
        <a href="/services">Cleaning Services</a>
        <a href="/contact">Contact Us</a>
      </div>
      <a className="nav-quote" href="/request-quote">Request a Quote</a>
    </nav>
  );
}
