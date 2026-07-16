"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { SHOW_CLEANING_CHEMICALS_PUBLICLY } from "../lib/site-visibility";

type SiteNavProps = {
  tone?: "default" | "home";
};

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ...(SHOW_CLEANING_CHEMICALS_PUBLICLY ? [["Cleaning Chemicals", "/cleaning-chemicals"]] : []),
  ["Cleaning Equipment", "/cleaning-equipment"],
  ["Services", "/services"],
  ["Contact", "/contact"],
];

export function SiteNav({ tone = "default" }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const className = tone === "home" ? "public-header home-public-header" : "public-header";

  useEffect(() => {
    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={className}>
      <nav className="public-header-inner" aria-label="Main navigation">
        <a className="public-brand" href="/" aria-label="Zelita home">
          <img src="/zelita-logo.png" alt="Zelita Ventures Co. LLC" />
        </a>
        <div className="public-nav-links">
          {links.map(([label, href]) => {
            const active = href === "/" ? pathname === href : pathname.startsWith(href);
            return (
              <a className={active ? "active" : ""} href={href} key={`${label}-${href}`} aria-current={active ? "page" : undefined}>
                {label}
              </a>
            );
          })}
        </div>
        <div className="public-header-actions">
          <a className="nav-quote" href="/request-quote">Request a Quote</a>
          <button
            className="mobile-nav-toggle"
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </nav>
      <div className={`mobile-public-nav ${open ? "open" : ""}`} aria-hidden={!open}>
        <button className="mobile-public-backdrop" type="button" onClick={() => setOpen(false)} aria-label="Close navigation" />
        <div className="mobile-public-panel" id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mobile-public-head">
            <img src="/zelita-logo.png" alt="Zelita Ventures Co. LLC" />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close navigation">
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          {links.map(([label, href]) => {
            const active = href === "/" ? pathname === href : pathname.startsWith(href);
            return (
              <a className={active ? "active" : ""} href={href} key={`${label}-mobile-${href}`} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined}>
                {label}
              </a>
            );
          })}
          <a className="button primary" href="/request-quote" onClick={() => setOpen(false)}>Request a Quote</a>
        </div>
      </div>
    </header>
  );
}
