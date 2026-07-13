import { Mail, MessageCircle, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="minimal-footer" id="footer">
      <div className="minimal-footer-main">
        <section className="minimal-footer-brand">
          <img src="/zelita-logo.png" alt="Zelita Ventures Co. LLC" />
          <p>Facility-care supplies, industrial products and professional cleaning solutions across Saudi Arabia.</p>
        </section>
        <nav className="minimal-footer-links" aria-label="Footer navigation">
          <a href="/about">About</a>
          <a href="/products">Products</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="minimal-footer-contact" aria-label="Zelita contact links">
          <a href="tel:+966567424517"><Phone aria-hidden="true" size={16} /> Phone</a>
          <a href="mailto:info@zelitasa.com"><Mail aria-hidden="true" size={16} /> Email</a>
          <a href="https://wa.me/966567424517" target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" size={16} /> WhatsApp</a>
        </div>
      </div>
      <div className="minimal-footer-bottom">
        <span>© 2026 Zelita Ventures Co. LLC</span>
        <span><a href="/privacy">Privacy Policy</a> <a href="/terms">Terms & Conditions</a></span>
      </div>
    </footer>
  );
}
