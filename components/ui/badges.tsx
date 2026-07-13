import type { EnquiryStatus } from "@/lib/types/enquiry";
import type { ProductStatus } from "@/lib/types/product";

export function StatusBadge({
  status,
}: {
  status: ProductStatus | EnquiryStatus | string;
}) {
  const className = `status-badge status-${status.toLowerCase().replaceAll(" ", "-")}`;
  return <span className={className}>{status}</span>;
}

export function ActiveBadge({ active }: { active: boolean }) {
  return (
    <span className={`active-badge ${active ? "is-active" : "is-inactive"}`}>
      {active ? "Active" : "Inactive"}
    </span>
  );
}

export function FeaturedBadge({ featured }: { featured: boolean }) {
  if (!featured) return <span className="featured-badge muted">Standard</span>;
  return <span className="featured-badge">Featured</span>;
}
