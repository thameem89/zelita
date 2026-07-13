"use client";

import { useEffect, useMemo, useState } from "react";
import { StatusBadge } from "@/components/ui/badges";
import { EmptyState } from "@/components/ui/state";
import { getEnquiries } from "@/lib/services/enquiry-service";
import { formatDate } from "@/lib/services/utils";
import type { Enquiry } from "@/lib/types/enquiry";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    getEnquiries().then(setEnquiries);
  }, []);

  const visible = useMemo(() => {
    const normalized = query.toLowerCase();
    return enquiries
      .filter((enquiry) => `${enquiry.customerName} ${enquiry.companyName} ${enquiry.email} ${enquiry.phone} ${enquiry.productName} ${enquiry.subject}`.toLowerCase().includes(normalized))
      .filter((enquiry) => type === "All" || enquiry.enquiryType === type)
      .filter((enquiry) => status === "All" || enquiry.status === status);
  }, [enquiries, query, status, type]);

  return (
    <main className="admin-page">
      <div className="admin-title"><p className="eyebrow">Enquiries</p><h1>Customer enquiries</h1></div>
      <section className="admin-filters">
        <input placeholder="Search customer, company, product, subject" value={query} onChange={(event) => setQuery(event.target.value)} />
        <select value={type} onChange={(event) => setType(event.target.value)}><option>All</option><option>Contact</option><option>Quote</option><option>Product</option></select>
        <select value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option><option>New</option><option>Contacted</option><option>In Progress</option><option>Closed</option><option>Spam</option></select>
      </section>
      <p className="result-count">{visible.length} enquiries</p>
      {!visible.length ? <EmptyState title="No enquiries found" message="Try changing the filters or reset mock data in settings." /> : null}
      <div className="admin-table">
        {visible.map((enquiry) => (
          <a className="admin-table-row enquiry-row" href={`/admin/enquiries/${enquiry.id}`} key={enquiry.id}>
            <div><strong>{enquiry.customerName}</strong><small>{enquiry.companyName || enquiry.city}</small></div>
            <span>{enquiry.enquiryType}</span>
            <span>{enquiry.productName || enquiry.subject}</span>
            <StatusBadge status={enquiry.status} />
            <small>{formatDate(enquiry.createdAt)}</small>
          </a>
        ))}
      </div>
    </main>
  );
}
