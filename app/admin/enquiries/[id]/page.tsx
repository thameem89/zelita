"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { StatusBadge } from "@/components/ui/badges";
import { EmptyState, LoadingState } from "@/components/ui/state";
import { getEnquiryById, updateEnquiryNotes, updateEnquiryStatus } from "@/lib/services/enquiry-service";
import { formatDate } from "@/lib/services/utils";
import type { Enquiry, EnquiryStatus } from "@/lib/types/enquiry";

const statuses: EnquiryStatus[] = ["Contacted", "In Progress", "Closed", "Spam"];

export default function EnquiryDetailPage() {
  const params = useParams<{ id: string }>();
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  function load() {
    getEnquiryById(params.id).then((item) => {
      setEnquiry(item);
      setNotes(item?.adminNotes ?? "");
    }).finally(() => setLoading(false));
  }

  useEffect(load, [params.id]);

  if (loading) return <LoadingState label="Loading enquiry..." />;
  if (!enquiry) return <main className="admin-page"><EmptyState title="Enquiry not found" message="This enquiry does not exist." /></main>;

  return (
    <main className="admin-page">
      <div className="admin-title with-action">
        <div><p className="eyebrow">{enquiry.enquiryType} enquiry</p><h1>{enquiry.customerName}</h1></div>
        <StatusBadge status={enquiry.status} />
      </div>
      <section className="admin-two-col">
        <article className="admin-panel detail-panel">
          <dl className="product-specs">
            <div><dt>Company</dt><dd>{enquiry.companyName || "Not provided"}</dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${enquiry.email}`}>{enquiry.email || "Not provided"}</a></dd></div>
            <div><dt>Phone</dt><dd>{enquiry.phone ? <a href={`https://wa.me/${enquiry.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">{enquiry.phone}</a> : "Not provided"}</dd></div>
            <div><dt>City</dt><dd>{enquiry.city || "Not provided"}</dd></div>
            <div><dt>Product</dt><dd>{enquiry.productName || "General enquiry"}</dd></div>
            <div><dt>Quantity</dt><dd>{enquiry.quantity || "Not provided"}</dd></div>
            <div><dt>Created</dt><dd>{formatDate(enquiry.createdAt)}</dd></div>
          </dl>
          <h2>{enquiry.subject}</h2>
          <p>{enquiry.message}</p>
          <div className="quick-actions">
            {statuses.map((status) => <button className="button dark" type="button" key={status} onClick={async () => { await updateEnquiryStatus(enquiry.id, status); load(); }}>Mark {status}</button>)}
          </div>
        </article>
        <article className="admin-panel">
          <h2>Admin notes</h2>
          <textarea rows={10} value={notes} onChange={(event) => setNotes(event.target.value)} />
          <button className="button primary" type="button" onClick={async () => { await updateEnquiryNotes(enquiry.id, notes); load(); }}>Save Notes</button>
        </article>
      </section>
    </main>
  );
}
