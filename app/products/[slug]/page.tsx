"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Mail, PackageCheck, Phone } from "lucide-react";
import { QuoteRequestForm } from "@/components/forms/quote-request-form";
import { StatusBadge } from "@/components/ui/badges";
import { EmptyState, LoadingState } from "@/components/ui/state";
import { getActiveProducts, getProductBySlug } from "@/lib/services/product-service";
import type { Product } from "@/lib/types/product";
import { SiteFooter } from "../../site-footer";
import { SiteNav } from "../../site-nav";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProductBySlug(params.slug), getActiveProducts()])
      .then(([productData, productList]) => {
        setProduct(productData);
        setProducts(productList);
      })
      .finally(() => setLoading(false));
  }, [params.slug]);

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((item) => item.categoryId === product.categoryId && item.id !== product.id)
      .slice(0, 3);
  }, [product, products]);

  if (loading) {
    return (
      <main>
        <SiteNav />
        <section className="catalog page-surface">
          <LoadingState label="Loading product details..." />
        </section>
        <SiteFooter />
      </main>
    );
  }

  if (!product) {
    return (
      <main>
        <SiteNav />
        <section className="catalog page-surface">
          <EmptyState title="Product not found" message="This product may be inactive or currently unavailable." action={<a className="button dark" href="/products">Back to Products</a>} />
        </section>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main>
      <SiteNav />
      <section className="product-detail page-surface">
        <div className="product-detail-grid">
          <div>
            <img className="product-detail-image" src={product.imageUrl} alt="" />
            {product.gallery.length ? (
              <div className="product-gallery">
                {product.gallery.map((image) => <img key={image} src={image} alt="" />)}
              </div>
            ) : null}
          </div>
          <article>
            <p className="eyebrow">{product.categoryName}</p>
            <h1>{product.name}</h1>
            <p className="lead">{product.shortDescription}</p>
            <StatusBadge status={product.status} />
            <p>{product.description}</p>
            <dl className="product-specs">
              <div><dt>SKU</dt><dd>{product.sku || "On request"}</dd></div>
              <div><dt>Pack size</dt><dd>{product.packSize}</dd></div>
              <div><dt>Availability</dt><dd>{product.availability}</dd></div>
              <div><dt>Minimum order</dt><dd>{product.minimumOrderQuantity}</dd></div>
            </dl>
            <div className="hero-actions">
              <a className="button primary" href={`/request-quote?product=${product.id}`}>Request Quote</a>
              <a className="button dark" href={`https://wa.me/966567424517?text=${encodeURIComponent(`Hello Zelita, I want to enquire about ${product.name}.`)}`} target="_blank" rel="noreferrer">WhatsApp Enquiry</a>
            </div>
            <div className="document-links">
              {product.pdfUrl ? <a className="button dark" href={product.pdfUrl} target="_blank" rel="noreferrer" aria-label={`View datasheet for ${product.name}`}>View Datasheet</a> : null}
              {product.brochureUrl ? <a href={product.brochureUrl}>Download brochure</a> : null}
              {product.safetySheetUrl ? <a href={product.safetySheetUrl}>Safety sheet</a> : null}
            </div>
          </article>
        </div>

        <section className="quote-panel">
          <div className="quote-panel-copy">
            <p className="eyebrow">Product Quote</p>
            <h2>Request a commercial quote</h2>
            <p>Send your requirement and Zelita will prepare availability, pack-size and pricing details for this product.</p>
            <dl className="quote-product-summary">
              <div><dt>Product</dt><dd>{product.name}</dd></div>
              <div><dt>SKU</dt><dd>{product.sku || "On request"}</dd></div>
              <div><dt>Pack size</dt><dd>{product.packSize}</dd></div>
              <div><dt>MOQ</dt><dd>{product.minimumOrderQuantity}</dd></div>
            </dl>
            <div className="quote-contact-strip" aria-label="Alternative contact options">
              <span><PackageCheck size={16} aria-hidden="true" /> Procurement support</span>
              <a href="tel:+966567424517"><Phone size={16} aria-hidden="true" /> Call sales</a>
              <a href="mailto:info@zelitasa.com"><Mail size={16} aria-hidden="true" /> Email team</a>
            </div>
          </div>
          <QuoteRequestForm preselectedProductId={product.id} />
        </section>

        {related.length ? (
          <section>
            <div className="section-head"><h2>Related products</h2></div>
            <div className="public-product-grid">
              {related.map((item) => (
                <article className="public-product-card" key={item.id}>
                  <img src={item.imageUrl} alt="" />
                  <strong>{item.name}</strong>
                  <small>{item.packSize}</small>
                  <a className="button dark" href={`/products/${item.slug}`}>View Product</a>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </section>
      <SiteFooter />
    </main>
  );
}
