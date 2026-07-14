import { SlidersHorizontal } from "lucide-react";
import type { Category } from "@/lib/types/category";
import type { ProductStatus } from "@/lib/types/product";

export type CatalogSort = "recommended" | "name-asc" | "name-desc" | "recent";

export function ProductSearchToolbar({
  categories,
  statuses,
  query,
  category,
  status,
  sort,
  count,
  onQueryChange,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  onOpenFilters,
}: {
  categories: Category[];
  statuses: ProductStatus[];
  query: string;
  category: string;
  status: string;
  sort: CatalogSort;
  count: number;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: CatalogSort) => void;
  onOpenFilters: () => void;
}) {
  const selectedFilterCount = Number(category !== "All") + Number(status !== "All");

  return (
    <section className="catalog-toolbar" aria-label="Product search and filters">
      <label className="catalog-search">
        <span className="sr-only">Search products</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search products, categories, SKU or pack size"
        />
      </label>
      <label>
        <span className="sr-only">Category</span>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="All">All categories</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only">Availability</span>
        <select value={status} onChange={(event) => onStatusChange(event.target.value)}>
          <option value="All">All availability</option>
          {statuses.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only">Sort products</span>
        <select value={sort} onChange={(event) => onSortChange(event.target.value as CatalogSort)}>
          <option value="recommended">Recommended</option>
          <option value="name-asc">Product Name A-Z</option>
          <option value="name-desc">Product Name Z-A</option>
          <option value="recent">Recently Added</option>
        </select>
      </label>
      <button className="catalog-filter-toggle" type="button" onClick={onOpenFilters}>
        <SlidersHorizontal size={16} aria-hidden="true" />
        Filters{selectedFilterCount ? ` (${selectedFilterCount})` : ""}
      </button>
      <span className="catalog-count">Showing {count} products</span>
    </section>
  );
}
