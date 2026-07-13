import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-main">
        <section className="footer-brand">
          <img
            className="footer-logo"
            src="/zelita-logo.png"
            alt="Zelita Ventures Co. LLC"
          />
          <p>
            Facility-care supplies and professional cleaning support for Saudi
            Arabia and the wider Middle East.
          </p>
          <div className="social-links" aria-label="Zelita online channels">
            <a
              aria-label="WhatsApp Zelita"
              href="https://wa.me/966567424517"
              rel="noreferrer"
              target="_blank"
              title="WhatsApp"
            >
              <MessageCircle aria-hidden="true" size={19} strokeWidth={2.2} />
              <span className="sr-only">WhatsApp</span>
            </a>
            <a aria-label="Email Zelita" href="mailto:info@zelitasa.com" title="Email">
              <Mail aria-hidden="true" size={19} strokeWidth={2.2} />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </section>

        <section className="footer-column" aria-labelledby="footer-navigation">
          <p className="footer-label" id="footer-navigation">Navigation</p>
          <a href="/#about">About Zelita</a>
          <a href="/products">Product Catalog</a>
          <a href="/#services">Services</a>
          <a href="/admin">Add Products</a>
        </section>

        <section className="footer-column" aria-labelledby="footer-contact">
          <p className="footer-label" id="footer-contact">Contact</p>
          <a className="footer-contact-link" href="tel:+966567424517">
            <Phone aria-hidden="true" size={15} strokeWidth={2.2} />
            <span>+966 56 742 4517</span>
          </a>
          <a className="footer-contact-link" href="mailto:info@zelitasa.com">
            <Mail aria-hidden="true" size={15} strokeWidth={2.2} />
            <span>info@zelitasa.com</span>
          </a>
          <address>
            Building no. 9089-5044, 5A Street<br />
            Al Jalawiyah Dist, Dammam 32246<br />
            Saudi Arabia
          </address>
        </section>
        <section className="footer-map" aria-labelledby="footer-location">
          <p className="footer-label" id="footer-location">Visit Zelita</p>
          <iframe
            title="Zelita Ventures location in Dammam"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Building+9089-5044%2C+5A+Street%2C+Al+Jalawiyah+Dist%2C+Dammam+32246%2C+Saudi+Arabia&output=embed"
          />
          <a
            className="map-link"
            href="https://www.google.com/maps/search/?api=1&query=Building+9089-5044%2C+5A+Street%2C+Al+Jalawiyah+Dist%2C+Dammam+32246%2C+Saudi+Arabia"
            rel="noreferrer"
            target="_blank"
          >
            <MapPin aria-hidden="true" size={15} strokeWidth={2.2} />
            Open in Maps
          </a>
        </section>
      </div>

      <div className="footer-bottom">
        <span>Zelita Ventures Co. LLC</span>
        <span>Vision. Global partnership. Sustainable growth.</span>
      </div>
    </footer>
  );
}
