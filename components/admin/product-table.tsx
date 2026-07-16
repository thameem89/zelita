import { ActiveBadge, FeaturedBadge, StatusBadge } from "@/components/ui/badges";
import { formatDate } from "@/lib/services/utils";
import type { Product } from "@/lib/types/product";

export function ProductTable({
  products,
  onToggle,
  onDelete,
}: {
  products: Product[];
  onToggle: (product: Product) => void;
  onDelete: (product: Product) => void;
}) {
  return (
    <>
      <div className="product-admin-table" role="table" aria-label="Products">
        <div className="product-admin-table-head" role="row">
          <span>Product</span>
          <span>Slug</span>
          <span>PDF</span>
          <span>Created</span>
          <span>Updated</span>
          <span>Actions</span>
        </div>
        {products.map((product) => (
          <article className="product-admin-row" role="row" key={product.id}>
            <div className="product-cell">
              <img src={product.imageUrl} alt="" />
              <div>
                <strong>{product.name}</strong>
                <small>{product.shortDescription || product.slug}</small>
              </div>
            </div>
            <span>{product.slug}</span>
            <span>{product.pdfUrl ? <a href={product.pdfUrl} target="_blank" rel="noreferrer">View PDF</a> : "Not uploaded"}</span>
            <small>{formatDate(product.createdAt)}</small>
            <small>{formatDate(product.updatedAt)}</small>
            <div className="compact-actions">
              <a href={`/products/${product.slug}`} target="_blank" rel="noreferrer">View</a>
              <a href={`/admin/products/${product.id}/edit`}>Edit</a>
              <button type="button" onClick={() => onToggle(product)}>{product.isActive ? "Deactivate" : "Activate"}</button>
              <button type="button" onClick={() => onDelete(product)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
      <div className="product-admin-cards">
        {products.map((product) => (
          <article className="product-admin-card" key={product.id}>
            <div className="product-card-head">
              <img src={product.imageUrl} alt="" />
              <div>
                <strong>{product.name}</strong>
                <small>{product.sku || "No SKU"} • {product.categoryName}</small>
              </div>
            </div>
            <p>{product.shortDescription || product.slug}</p>
            <div className="product-card-badges">
              <StatusBadge status={product.status} />
              <ActiveBadge active={product.isActive} />
              <FeaturedBadge featured={product.featured} />
            </div>
            <dl>
              <div><dt>Pack</dt><dd>{product.packSize}</dd></div>
              <div><dt>Slug</dt><dd>{product.slug}</dd></div>
              <div><dt>PDF</dt><dd>{product.pdfUrl ? <a href={product.pdfUrl} target="_blank" rel="noreferrer">View PDF</a> : "Not uploaded"}</dd></div>
              <div><dt>Created</dt><dd>{formatDate(product.createdAt)}</dd></div>
              <div><dt>Updated</dt><dd>{formatDate(product.updatedAt)}</dd></div>
            </dl>
            <div className="compact-actions">
              <a href={`/admin/products/${product.id}/edit`}>Edit</a>
              <a href={`/products/${product.slug}`} target="_blank" rel="noreferrer">View</a>
              <button type="button" onClick={() => onToggle(product)}>{product.isActive ? "Deactivate" : "Activate"}</button>
              <button type="button" onClick={() => onDelete(product)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
