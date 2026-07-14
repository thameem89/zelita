"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QuoteRequestForm } from "@/components/forms/quote-request-form";
import { SiteFooter } from "../site-footer";
import { SiteNav } from "../site-nav";

const demoProductNames: Record<string, string> = {
  "dac-disinfectant": "DAC Disinfectant",
  "heavy-duty-degreaser": "Heavy Duty Degreaser",
  "floor-stripper": "Floor Stripper",
  "liquid-hand-wash": "Liquid Hand Wash",
  "outdoor-trash-can-with-wheels": "Outdoor Trash Can with Wheels",
  "automatic-soap-dispenser": "Automatic Soap Dispenser",
  "janitorial-cleaning-trolley": "Janitorial Cleaning Trolley",
  "commercial-wet-and-dry-vacuum": "Commercial Wet and Dry Vacuum",
};

function RequestQuotePageContent() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product") ?? "";
  const division = searchParams.get("division") ?? "";

  return (
    <main>
      <SiteNav />
      <section className="form-page page-surface">
        <div className="section-head">
          <p className="eyebrow">Request a Quote</p>
          <h1>Tell us what your team needs.</h1>
        </div>
        <QuoteRequestForm
          preselectedDivision={division}
          preselectedProductId={product}
          preselectedProductName={demoProductNames[product] ?? ""}
        />
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
