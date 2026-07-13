import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <section className="footer-brand">
          <img
            className="footer-logo"
            src="/zelita-logo.png"
            alt="Zelita Ventures Co. LLC"
          />
          <p>
            Premium facility-care supplies, industrial products and professional
            cleaning support for Saudi Arabia and the wider Middle East.
          </p>
          <div className="social-links" aria-label="Zelita contact shortcuts">
            <a aria-label="Call Zelita" href="tel:+966567424517">
              <Phone aria-hidden="true" size={18} strokeWidth={2.2} />
            </a>
            <a aria-label="WhatsApp Zelita" href="https://wa.me/966567424517" rel="noreferrer" target="_blank">
              <MessageCircle aria-hidden="true" size={18} strokeWidth={2.2} />
            </a>
            <a aria-label="Email Zelita" href="mailto:info@zelitasa.com">
              <Mail aria-hidden="true" size={18} strokeWidth={2.2} />
            </a>
          </div>
        </section>

        <section className="footer-column">
          <p className="footer-label">Company</p>
          <a href="/about">About Zelita</a>
          <a href="/contact">Contact Us</a>
          <a href="/request-quote">Request Quote</a>
        </section>

        <section className="footer-column">
          <p className="footer-label">Products</p>
          <a href="/products">Product Catalog</a>
          <a href="/products?category=cat-cleaning-chemicals">Cleaning Chemicals</a>
          <a href="/products?category=cat-industrial-chemicals">Industrial Chemicals</a>
          <a href="/products?category=cat-waste-management">Waste Management</a>
        </section>

        <section className="footer-column">
          <p className="footer-label">Services</p>
          <a href="/services">Cleaning Services</a>
          <a href="/services#industrial-solutions">Industrial Solutions</a>
          <a href="/request-quote">Procurement Support</a>
        </section>

        <section className="footer-column footer-contact">
          <p className="footer-label">Contact</p>
          <a className="footer-contact-link" href="tel:+966567424517">
            <Phone aria-hidden="true" size={15} strokeWidth={2.2} />
            <span>+966 56 742 4517</span>
          </a>
          <a className="footer-contact-link" href="mailto:info@zelitasa.com">
            <Mail aria-hidden="true" size={15} strokeWidth={2.2} />
            <span>info@zelitasa.com</span>
          </a>
          <a className="footer-contact-link" href="https://wa.me/966567424517" rel="noreferrer" target="_blank">
            <MessageCircle aria-hidden="true" size={15} strokeWidth={2.2} />
            <span>WhatsApp</span>
          </a>
        </section>

        <section className="footer-column footer-location">
          <p className="footer-label">Location</p>
          <address>
            Building No. 9089-5044, 5A Street<br />
            Al Jalawiyah District, Dammam 32246<br />
            Saudi Arabia
          </address>
          <a className="map-link" href="https://www.google.com/maps/search/?api=1&query=Building+9089-5044%2C+5A+Street%2C+Al+Jalawiyah+Dist%2C+Dammam+32246%2C+Saudi+Arabia" rel="noreferrer" target="_blank">
            <MapPin aria-hidden="true" size={15} strokeWidth={2.2} />
            Open in Maps
          </a>
        </section>
      </div>

      <div className="footer-bottom">
        <span>Copyright 2026 Zelita Ventures Co. LLC</span>
        <span><a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms & Conditions</a></span>
      </div>
    </footer>
  );
}
