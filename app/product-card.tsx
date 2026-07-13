"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Product } from "@/lib/types/product";
import { StatusBadge } from "@/components/ui/badges";

type ProductCardProps = {
  product: Product;
  view?: "grid" | "list";
};

export function ProductCard({ product, view = "grid" }: ProductCardProps) {
  return (
    <motion.article
      className={`procurement-product-card ${view === "list" ? "is-list" : ""}`}
      role="listitem"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <a className="product-image-frame" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={520}
          height={390}
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
      </a>
      <div className="product-card-body">
        <span className="product-category-label">{product.categoryName}</span>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <div className="product-card-meta">
          <span>{product.packSize}</span>
          <StatusBadge status={product.status} />
        </div>
      </div>
      <div className="product-card-actions">
        <a className="button outline" href={`/products/${product.slug}`}>View Details</a>
        <a className="button primary" href={`/request-quote?product=${product.id}`}>Request Quote</a>
      </div>
    </motion.article>
  );
}
