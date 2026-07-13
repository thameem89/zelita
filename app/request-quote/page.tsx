"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QuoteRequestForm } from "@/components/forms/quote-request-form";
import { SiteFooter } from "../site-footer";
import { SiteNav } from "../site-nav";

function RequestQuotePageContent() {
  const searchParams = useSearchParams();

  return (
    <main>
      <SiteNav />
      <section className="form-page page-surface">
        <div className="section-head">
          <p className="eyebrow">Request a Quote</p>
          <h1>Tell us what your team needs.</h1>
        </div>
        <QuoteRequestForm preselectedProductId={searchParams.get("product") ?? ""} />
      </section>
      <SiteFooter />
    </main>
  );
}

export default function RequestQuotePage() {
  return (
    <Suspense
      fallback={
        <main>
          <SiteNav />
          <section className="form-page page-surface">
            <div className="section-head">
              <p className="eyebrow">Request a Quote</p>
              <h1>Tell us what your team needs.</h1>
            </div>
          </section>
          <SiteFooter />
        </main>
      }
    >
      <RequestQuotePageContent />
    </Suspense>
  );
}
