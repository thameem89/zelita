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
            <h1>Let us plan the right supply or service support.</h1>
            <p>
              Share your product requirement, cleaning service need, or bulk
              order enquiry. Zelita will keep the conversation organized for
              the team.
            </p>
            <div className="contact-card-list">
              <a href="tel:+966567424517">
                <Phone aria-hidden="true" size={18} strokeWidth={2.2} />
                <span>+966 56 742 4517</span>
              </a>
              <a href="https://wa.me/966567424517" rel="noreferrer" target="_blank">
                <MessageCircle aria-hidden="true" size={18} strokeWidth={2.2} />
                <span>WhatsApp Zelita</span>
              </a>
              <a href="mailto:info@zelitasa.com">
                <Mail aria-hidden="true" size={18} strokeWidth={2.2} />
                <span>info@zelitasa.com</span>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Building+9089-5044%2C+5A+Street%2C+Al+Jalawiyah+Dist%2C+Dammam+32246%2C+Saudi+Arabia"
                rel="noreferrer"
                target="_blank"
              >
                <MapPin aria-hidden="true" size={18} strokeWidth={2.2} />
                <span>Dammam, Saudi Arabia</span>
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
              Building no. 9089-5044, 5A Street<br />
              Al Jalawiyah Dist, Dammam 32246<br />
              Saudi Arabia
            </address>
          </div>
          <iframe
            title="Zelita Ventures location in Dammam"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Building+9089-5044%2C+5A+Street%2C+Al+Jalawiyah+Dist%2C+Dammam+32246%2C+Saudi+Arabia&output=embed"
          />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
