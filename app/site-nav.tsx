"use client";

import { useEffect, useState } from "react";

type SiteNavProps = {
  tone?: "default" | "home";
};

export function SiteNav({ tone = "default" }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const className = tone === "home" ? "public-header home-public-header" : "public-header";
  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Products", "/products"],
    ["Services", "/services"],
    ["Industrial Solutions", "/services"],
    ["Contact", "/contact"],
  ];

  useEffect(() => {
    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, []);

  return (
    <header className={className}>
      <nav className="public-header-inner" aria-label="Main navigation">
        <a className="public-brand" href="/" aria-label="Zelita home">
          <img src="/zelita-logo.png" alt="Zelita Ventures Co. LLC" />
        </a>
        <div className="public-nav-links">
          {links.map(([label, href]) => (
            <a href={href} key={`${label}-${href}`}>{label}</a>
          ))}
        </div>
        <div className="public-header-actions">
          <select className="language-select" aria-label="Language">
            <option>EN</option>
            <option>AR</option>
          </select>
          <a className="nav-quote" href="/request-quote">Request a Quote</a>
          <button className="mobile-nav-toggle" type="button" onClick={() => setOpen(true)} aria-label="Open navigation">
            ☰
          </button>
        </div>
      </nav>
      <div className={`mobile-public-nav ${open ? "open" : ""}`}>
        <button className="mobile-public-backdrop" type="button" onClick={() => setOpen(false)} aria-label="Close navigation" />
        <div className="mobile-public-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mobile-public-head">
            <img src="/zelita-logo.png" alt="Zelita Ventures Co. LLC" />
            <button type="button" onClick={() => setOpen(false)}>Close</button>
          </div>
          {links.map(([label, href]) => (
            <a href={href} key={`${label}-mobile-${href}`} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <select className="language-select" aria-label="Language">
            <option>EN</option>
            <option>AR</option>
          </select>
          <a className="button primary" href="/request-quote" onClick={() => setOpen(false)}>Request a Quote</a>
        </div>
      </div>
    </header>
  );
}
