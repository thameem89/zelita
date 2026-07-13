import { StatusBadge } from "@/components/ui/badges";
import type { Product } from "@/lib/types/product";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="catalog-product-grid" role="list">
      {products.map((product) => (
        <article className="catalog-product-card" key={product.id} role="listitem">
          <a className="catalog-product-image" href={`/products/${product.slug}`}>
            <img src={product.imageUrl || "/zelita-cleaning-products.png"} alt={`${product.name} product visual`} />
          </a>
          <div className="catalog-product-body">
            <span className="catalog-category-label">{product.categoryName}</span>
            <h2>{product.name}</h2>
            <p>{product.shortDescription}</p>
            <div className="catalog-product-meta">
              <span>Pack: {product.packSize || "On request"}</span>
              {product.sku ? <span>SKU: {product.sku}</span> : null}
              {product.minimumOrderQuantity ? <span>MOQ: {product.minimumOrderQuantity}</span> : null}
            </div>
            <StatusBadge status={product.status} />
          </div>
          <div className="catalog-product-actions">
            <a className="button secondary-light" href={`/products/${product.slug}`}>View Product</a>
            <a className="catalog-quote-link" href={`/request-quote?product=${product.id}`}>Request Quote →</a>
          </div>
        </article>
      ))}
    </div>
  );
}
