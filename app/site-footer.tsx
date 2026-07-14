import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const mapUrl = "https://www.google.com/maps/search/?api=1&query=Building%20No.%209089-5044%205A%20Street%20Al%20Jalawiyah%20District%20Dammam%2032246%20Saudi%20Arabia";

const footerGroups = [
  {
    title: "Company",
    links: [
      ["About Zelita", "/about"],
      ["Contact Us", "/contact"],
      ["Request Quote", "/request-quote"],
    ],
  },
  {
    title: "Divisions",
    links: [
      ["Cleaning Chemicals", "/cleaning-chemicals"],
      ["Cleaning Equipment", "/cleaning-equipment"],
    ],
  },
  {
    title: "Services",
    links: [
      ["Cleaning Services", "/services"],
      ["Procurement Support", "/request-quote"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="public-footer" id="footer">
      <div className="public-footer-main page-container">
        <section className="footer-brand-column">
          <img src="/zelita-logo.png" alt="Zelita Ventures Co. LLC" />
          <p>Premium facility-care supplies, industrial products and professional cleaning support for Saudi Arabia and the wider Middle East.</p>
          <div className="footer-social-links" aria-label="Contact Zelita">
            <a href="tel:+966567424517" aria-label="Call Zelita"><Phone size={17} aria-hidden="true" /></a>
            <a href="https://wa.me/966567424517" target="_blank" rel="noreferrer" aria-label="WhatsApp Zelita"><MessageCircle size={17} aria-hidden="true" /></a>
            <a href="mailto:info@zelitasa.com" aria-label="Email Zelita"><Mail size={17} aria-hidden="true" /></a>
          </div>
        </section>

        {footerGroups.map((group) => (
          <details className="footer-column" key={group.title} open>
            <summary>{group.title}</summary>
            <div>
              {group.links.map(([label, href]) => (
                <a href={href} key={label}>{label}</a>
              ))}
            </div>
          </details>
        ))}

        <details className="footer-column footer-contact-column" open>
          <summary>Contact</summary>
          <div>
            <a href="tel:+966567424517"><Phone size={15} aria-hidden="true" /> +966 56 742 4517</a>
            <a href="mailto:info@zelitasa.com"><Mail size={15} aria-hidden="true" /> info@zelitasa.com</a>
            <a href="https://wa.me/966567424517" target="_blank" rel="noreferrer"><MessageCircle size={15} aria-hidden="true" /> WhatsApp</a>
          </div>
        </details>

        <details className="footer-column footer-location-column" open>
          <summary>Location</summary>
          <div>
            <address>
              <MapPin size={15} aria-hidden="true" />
              <span>
                Building No. 9089-5044<br />
                5A Street<br />
                Al Jalawiyah District<br />
                Dammam 32246<br />
                Saudi Arabia
              </span>
            </address>
            <a href={mapUrl} target="_blank" rel="noreferrer">Open in Maps</a>
          </div>
        </details>
      </div>
      <div className="public-footer-bottom page-container">
        <span>© 2026 Zelita Ventures Co. LLC. All rights reserved.</span>
        <span>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </span>
      </div>
    </footer>
  );
}
