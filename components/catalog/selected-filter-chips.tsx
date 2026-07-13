import type { Category } from "@/lib/types/category";

export function SelectedFilterChips({
  categories,
  query,
  category,
  status,
  onQueryClear,
  onCategoryClear,
  onStatusClear,
  onClearAll,
}: {
  categories: Category[];
  query: string;
  category: string;
  status: string;
  onQueryClear: () => void;
  onCategoryClear: () => void;
  onStatusClear: () => void;
  onClearAll: () => void;
}) {
  const categoryName = categories.find((item) => item.id === category)?.name;
  const hasFilters = query || category !== "All" || status !== "All";

  if (!hasFilters) return null;

  return (
    <div className="selected-filter-chips" aria-label="Selected filters">
      {query ? <button type="button" onClick={onQueryClear}>Search: {query} ×</button> : null}
      {categoryName ? <button type="button" onClick={onCategoryClear}>{categoryName} ×</button> : null}
      {status !== "All" ? <button type="button" onClick={onStatusClear}>{status} ×</button> : null}
      <button className="clear-all-chip" type="button" onClick={onClearAll}>Clear All</button>
    </div>
  );
}
