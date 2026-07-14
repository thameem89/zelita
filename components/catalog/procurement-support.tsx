import { ArrowRight, ClipboardList } from "lucide-react";

export function ProcurementSupport() {
  return (
    <section className="catalog-procurement" aria-label="Procurement support">
      <div className="procurement-icon" aria-hidden="true">
        <ClipboardList size={42} />
      </div>
      <div>
        <p className="catalog-eyebrow">Procurement Support</p>
        <h2>Need multiple products or recurring supply?</h2>
        <p>
          Share your requirement list and our team will prepare a consolidated
          commercial quotation.
        </p>
      </div>
      <div className="catalog-procurement-actions">
        <a className="button primary" href="/request-quote">Request Procurement Support</a>
        <a className="button secondary-dark" href="/contact">Speak to Sales</a>
        <a className="catalog-tertiary-link" href="mailto:info@zelitasa.com?subject=Zelita requirement list">
          Upload Requirement List <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
