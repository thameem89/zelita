import { SearchX } from "lucide-react";

export function ProductEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="catalog-empty-state" role="status">
      <SearchX size={34} aria-hidden="true" />
      <h2>No products match your filters</h2>
      <p>Try removing a filter or searching with a different keyword.</p>
      <div>
        <button className="button primary" type="button" onClick={onClear}>Clear Filters</button>
        <a className="button secondary-light" href="/request-quote">Request Procurement Support</a>
      </div>
    </div>
  );
}
