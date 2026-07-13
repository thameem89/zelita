"use client";

import { useSearchParams } from "next/navigation";
import { QuoteRequestForm } from "@/components/forms/quote-request-form";
import { SiteFooter } from "../site-footer";

export default function RequestQuotePage() {
  const searchParams = useSearchParams();

  return (
    <main>
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="/"><img className="brand-logo" src="/zelita-logo.png" alt="Zelita Ventures Co. LLC" /></a>
        <div className="nav-links"><a href="/">Home</a><a href="/products">Products</a><a href="/contact">Contact</a></div>
      </nav>
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
