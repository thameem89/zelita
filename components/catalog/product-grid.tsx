import { ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/ui/badges";
import type { Product } from "@/lib/types/product";

const cardImages: Record<string, string> = {
  "dac-disinfectant": "/zelita-cleaning-products.png",
  "heavy-duty-degreaser": "/zelita-hero-premium.png",
  "outdoor-trash-can-with-wheels": "/zelita-waste-bins.png",
  "automatic-soap-dispenser": "/zelita-facility-hero.png",
};

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="catalog-product-grid" role="list">
      {products.slice(0, 4).map((product) => (
        <article className="catalog-product-card" key={product.id} role="listitem">
          <a className="catalog-product-image" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
            <img src={cardImages[product.slug] || product.imageUrl || "/zelita-cleaning-products.png"} alt={`${product.name} product visual`} />
          </a>
          <div className="catalog-product-content">
            <div className="catalog-product-body">
              <span className="catalog-category-label">{product.categoryName}</span>
              <h2>{product.name}</h2>
              <p>{product.shortDescription}</p>
              <dl className="catalog-product-meta">
                <div><dt>Pack Size</dt><dd>{product.packSize || "On request"}</dd></div>
                <div><dt>SKU</dt><dd>{product.sku || "On request"}</dd></div>
                <div><dt>MOQ</dt><dd>{product.minimumOrderQuantity || "On request"}</dd></div>
              </dl>
              <StatusBadge status={product.status} />
            </div>
            <div className="catalog-product-actions">
              <a className="button dark" href={`/products/${product.slug}`}>View Product</a>
              <a className="catalog-quote-link" href={`/request-quote?product=${product.slug}`}>
                Request Quote <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
