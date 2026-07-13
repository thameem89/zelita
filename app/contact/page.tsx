import { ContactForm } from "@/components/forms/contact-form";
import { SiteFooter } from "../site-footer";

export default function ContactPage() {
  return (
    <main>
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="/"><img className="brand-logo" src="/zelita-logo.png" alt="Zelita Ventures Co. LLC" /></a>
        <div className="nav-links"><a href="/">Home</a><a href="/products">Products</a><a href="/request-quote">Request Quote</a></div>
      </nav>
      <section className="form-page page-surface">
        <div className="section-head">
          <p className="eyebrow">Contact Zelita</p>
          <h1>Start a supply, service, or partnership conversation.</h1>
        </div>
        <ContactForm />
      </section>
      <SiteFooter />
    </main>
  );
}
