"use client";

import { Menu, MessageCircle, Phone, Search, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Products", "/products"],
  ["Cleaning Services", "/services"],
  ["Industrial Solutions", "/services#industrial-solutions"],
  ["Contact Us", "/contact"],
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Zelita home">
          <img
            className="brand-logo"
            src="/zelita-logo.png"
            alt="Zelita Ventures Co. LLC"
          />
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="icon-button" href="/products" aria-label="Search products">
            <Search aria-hidden="true" size={18} strokeWidth={2.2} />
          </a>
          <div className="language-switch" aria-label="Language switch">
            <button type="button">EN</button>
            <button type="button">AR</button>
          </div>
          <a className="nav-quote" href="/request-quote">Request a Quote</a>
          <button
            className="mobile-menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" size={22} strokeWidth={2.2} />
          </button>
        </div>
      </header>

      <div className={`mobile-drawer ${open ? "open" : ""}`} id="mobile-menu">
        <div className="mobile-drawer-panel">
          <div className="mobile-drawer-head">
            <img src="/zelita-logo.png" alt="Zelita Ventures Co. LLC" />
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
              <X aria-hidden="true" size={22} strokeWidth={2.2} />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {navItems.map(([label, href]) => (
              <a href={href} key={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <a className="button primary" href="/request-quote" onClick={() => setOpen(false)}>
            Request a Quote
          </a>
        </div>
      </div>

      <div className="mobile-bottom-actions" aria-label="Quick contact actions">
        <a href="tel:+966567424517">
          <Phone aria-hidden="true" size={18} strokeWidth={2.2} />
          Call
        </a>
        <a href="https://wa.me/966567424517" rel="noreferrer" target="_blank">
          <MessageCircle aria-hidden="true" size={18} strokeWidth={2.2} />
          WhatsApp
        </a>
        <a href="/request-quote">Quote</a>
      </div>
    </>
  );
}
