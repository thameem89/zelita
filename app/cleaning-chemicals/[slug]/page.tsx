import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download, FileText, MessageCircle, PackageCheck, ShieldAlert } from "lucide-react";
import { SiteFooter } from "../../site-footer";
import { SiteNav } from "../../site-nav";
import { getZeloxProductBySlug, zeloxProducts } from "../zelox-products";

type PageProps = {
  params: {
    slug: string;
  };
};

const whatsappNumber = "966567424517";

export function generateStaticParams() {
  return zeloxProducts.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getZeloxProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Cleaning Chemical Product | Zelita",
    };
  }

  return {
    title: `${product.name} | Zelita`,
    description: product.shortDescription,
    alternates: {
      canonical: `/cleaning-chemicals/${product.slug}`,
    },
  };
}

export default function CleaningChemicalProductPage({ params }: PageProps) {
  const product = getZeloxProductBySlug(params.slug);

  if (!product) notFound();

  const quoteHref = `/request-quote?division=cleaning-chemicals&product=${product.slug}`;
  const whatsappText = encodeURIComponent(`Hello, I would like to enquire about ${product.name}.`);
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
  const primaryDocument = product.documents?.[0];

  return (
    <main className="division-page">
      <SiteNav />
      <section className="chemical-detail-hero">
        <div className="page-container chemical-detail-grid">
          <div>
            <nav className="chemical-breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/cleaning-chemicals">Cleaning Chemicals</a>
              <span>/</span>
              <span>{product.name}</span>
            </nav>
            <figure className="chemical-detail-image">
              <img src={product.image} alt={`${product.name} product visual`} />
            </figure>
          </div>

          <article className="chemical-detail-copy">
            <div className="chemical-detail-badges">
              <span className="range-badge">{product.rangeName}</span>
              {product.safetyLevel ? <span className="safety-badge danger">{product.safetyLevel}</span> : null}
              {primaryDocument ? <span className="sds-badge">SDS Available</span> : null}
            </div>
            <p className="division-eyebrow">{product.rangeLabel}</p>
            <h1>{product.name}</h1>
            <p className="chemical-detail-lead">{product.shortDescription}</p>

            <dl className="chemical-meta-grid">
              <div>
                <dt>Product range</dt>
                <dd>{product.rangeName}</dd>
              </div>
              <div>
                <dt>Pack sizes</dt>
                <dd>{product.packSizes.join(", ")}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{product.category}</dd>
              </div>
            </dl>

            <div className="division-actions chemical-detail-actions">
              <a className="button primary" href={quoteHref}>Request Quote</a>
              <a className="button secondary-light" href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp Enquiry
              </a>
            </div>

            {product.safetySummary ? (
              <section className="safety-note-card" aria-labelledby="safety-note-heading">
                <div>
                  <ShieldAlert size={22} aria-hidden="true" />
                  <span className="safety-badge danger">{product.safetyLevel}</span>
                </div>
                <div>
                  <h2 id="safety-note-heading">Important Safety Note</h2>
                  <p>{product.safetySummary}</p>
                </div>
              </section>
            ) : null}

            {primaryDocument ? (
              <section className="sds-document-card" aria-labelledby="sds-document-heading">
                <FileText size={22} aria-hidden="true" />
                <div>
                  <h2 id="sds-document-heading">{primaryDocument.title}</h2>
                  <dl>
                    <div><dt>Type</dt><dd>{primaryDocument.type}</dd></div>
                    {primaryDocument.reference ? <div><dt>Reference</dt><dd>{primaryDocument.reference}</dd></div> : null}
                    {primaryDocument.version ? <div><dt>Version</dt><dd>{primaryDocument.version}</dd></div> : null}
                    {primaryDocument.date ? <div><dt>Date</dt><dd>{primaryDocument.date}</dd></div> : null}
                  </dl>
                  <a
                    className="button dark"
                    href={primaryDocument.url}
                    target="_blank"
                    rel="noreferrer"
                    download
                    aria-label={`${primaryDocument.title} PDF, opens in a new tab`}
                  >
                    <Download size={16} aria-hidden="true" />
                    Download Safety Data Sheet
                  </a>
                </div>
              </section>
            ) : null}
          </article>
        </div>
      </section>

      <section className="division-section chemical-detail-section">
        <div className="page-container chemical-detail-info-grid">
          <article>
            <PackageCheck size={24} aria-hidden="true" />
            <h2>Key advantages</h2>
            <ul>
              {product.keyAdvantages.map((advantage) => <li key={advantage}>{advantage}</li>)}
            </ul>
          </article>
          <article>
            <h2>Dilution guide</h2>
            <p>{product.dilutionGuide}</p>
          </article>
          <article>
            <h2>Application</h2>
            <p>{product.application}</p>
          </article>
          <article>
            <h2>Pack sizes</h2>
            <p>{product.packSizes.join(", ")}</p>
          </article>
        </div>
      </section>

      <section className="division-cta">
        <div className="page-container division-cta-inner">
          <div>
            <p className="division-eyebrow">Quote action</p>
            <h2>Need this ZELOX chemical for your facility?</h2>
            <p>Send your requirement and the Zelita team will help confirm product suitability, pack size and supply details.</p>
          </div>
          <div className="division-actions">
            <a className="button primary" href={quoteHref}>Request Quote</a>
            <a className="button secondary-dark" href="/cleaning-chemicals">Back to Chemicals</a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

