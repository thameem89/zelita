import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { SiteFooter } from "../site-footer";
import { SiteNav } from "../site-nav";

export default function ContactPage() {
  return (
    <main>
      <SiteNav />
      <section className="contact-page">
        <div className="home-shell contact-page-grid">
          <div className="contact-panel">
            <p className="eyebrow">Contact Zelita</p>
            <h1>Let’s plan the right supply or service solution.</h1>
            <p>
              Share your product requirement, service need, or recurring
              procurement enquiry. Zelita will route it to the right team for a
              response-focused follow-up.
            </p>
            <div className="contact-card-list">
              <a href="tel:+966567424517">
                <Phone aria-hidden="true" size={18} strokeWidth={2.2} />
                <span><strong>Call Us</strong>+966 56 742 4517</span>
              </a>
              <a href="https://wa.me/966567424517" rel="noreferrer" target="_blank">
                <MessageCircle aria-hidden="true" size={18} strokeWidth={2.2} />
                <span><strong>WhatsApp</strong>Start a conversation</span>
              </a>
              <a href="mailto:info@zelitasa.com">
                <Mail aria-hidden="true" size={18} strokeWidth={2.2} />
                <span><strong>Email</strong>info@zelitasa.com</span>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Building+9089-5044%2C+5A+Street%2C+Al+Jalawiyah+Dist%2C+Dammam+32246%2C+Saudi+Arabia"
                rel="noreferrer"
                target="_blank"
              >
                <MapPin aria-hidden="true" size={18} strokeWidth={2.2} />
                <span><strong>Visit Us</strong>Dammam, Saudi Arabia</span>
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="contact-map-section">
        <div className="home-shell contact-map-grid">
          <div>
            <p className="eyebrow">Location</p>
            <h2>Visit Zelita in Dammam.</h2>
            <address>
              Building No. 9089-5044,<br />
              5A Street,<br />
              Al Jalawiyah District,<br />
              Dammam 32246,<br />
              Saudi Arabia
            </address>
            <p className="business-hours">Business hours: Sunday to Thursday, 9:00 AM - 6:00 PM</p>
            <a className="button outline" href="https://www.google.com/maps/search/?api=1&query=Building+9089-5044%2C+5A+Street%2C+Al+Jalawiyah+Dist%2C+Dammam+32246%2C+Saudi+Arabia" rel="noreferrer" target="_blank">
              Open in Google Maps
            </a>
          </div>
          <div className="map-card">
            <iframe
              title="Zelita Ventures location in Dammam"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Building+9089-5044%2C+5A+Street%2C+Al+Jalawiyah+Dist%2C+Dammam+32246%2C+Saudi+Arabia&output=embed"
            />
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="page-container trust-grid">
          <span>Saudi Arabia based</span>
          <span>Bulk supply support</span>
          <span>Professional cleaning contracts</span>
          <span>Vendor and partnership enquiries</span>
          <span>Response-focused sales support</span>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
