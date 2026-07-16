"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getMockSession, mockLogout } from "@/lib/services/auth-service";
import type { MockSession } from "@/lib/types/admin";
import { LoadingState } from "../ui/state";

const navItems = [
  ["D", "Dashboard", "/admin"],
  ["C", "Cleaning Chemicals", "/admin/cleaning-chemicals"],
  ["E", "Cleaning Equipment", "/admin/cleaning-equipment"],
  ["Q", "Enquiries", "/admin/enquiries"],
  ["S", "Settings", "/admin/settings"],
];

const pageMeta = [
  {
    match: (pathname: string) => pathname === "/admin",
    title: "Dashboard",
    description: "Monitor Zelita products and customer enquiries.",
    action: null,
  },
  {
    match: (pathname: string) => pathname.startsWith("/admin/cleaning-chemicals"),
    title: "Cleaning Chemicals",
    description: "Manage chemical products, ZELOX ranges, detail pages and PDF documents.",
    action: { label: "Add Chemical Product", href: "/admin/cleaning-chemicals/new" },
  },
  {
    match: (pathname: string) => pathname.startsWith("/admin/cleaning-equipment"),
    title: "Cleaning Equipment",
    description: "Manage simple equipment quotation cards and display order.",
    action: { label: "Add Equipment Product", href: "/admin/cleaning-equipment/new" },
  },
  {
    match: (pathname: string) => pathname.startsWith("/admin/enquiries"),
    title: "Enquiries",
    description: "Review customer requests, quote leads, and follow-up status.",
    action: null,
  },
  {
    match: (pathname: string) => pathname.startsWith("/admin/settings"),
    title: "Settings",
    description: "Manage catalog storage and admin settings.",
    action: null,
  },
];

function getPageMeta(pathname: string) {
  return pageMeta.find((item) => item.match(pathname)) ?? pageMeta[0];
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<MockSession | null>(null);
  const [loading, setLoading] = useState(pathname !== "/admin/login");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }
    getMockSession().then((activeSession) => {
      if (!activeSession) {
        router.replace("/admin/login");
        return;
      }
      setSession(activeSession);
      setLoading(false);
    });
  }, [pathname, router]);

  async function logout() {
    await mockLogout();
    router.replace("/admin/login");
  }

  if (pathname === "/admin/login") return <>{children}</>;
  if (loading) return <LoadingState label="Checking admin session..." />;

  const meta = getPageMeta(pathname);

  return (
    <div className="admin-shell">
      <button
        className={`admin-drawer-scrim ${open ? "open" : ""}`}
        type="button"
        aria-label="Close admin navigation"
        onClick={() => setOpen(false)}
      />
      <aside className={`admin-sidebar ${open ? "open" : ""}`} aria-label="Admin sidebar">
        <a className="admin-brand" href="/">
          <img src="/zelita-logo.png" alt="Zelita Ventures Co. LLC" />
        </a>
        <nav aria-label="Admin navigation">
          {navItems.map(([icon, label, href]) => (
            <a
              className={pathname === href || (href !== "/admin" && pathname.startsWith(href)) ? "active" : ""}
              href={href}
              key={href}
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <span className="demo-badge">Admin</span>
          <a href="/" target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span> View Website</a>
          <button type="button" onClick={logout}><span aria-hidden="true">×</span> Logout</button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-header">
          <div className="admin-header-title">
            <button className="admin-menu" type="button" onClick={() => setOpen(!open)} aria-expanded={open}>
              Menu
            </button>
            <div>
              <h1>{meta.title}</h1>
              <p>{meta.description}</p>
            </div>
          </div>
          <div className="admin-header-actions">
            {meta.action ? <a className="button primary admin-primary-action" href={meta.action.href}>{meta.action.label}</a> : null}
            <button className="admin-notification" type="button" aria-label="Notifications">•</button>
            <div className="admin-user">
              <strong>{session?.admin.name ?? "Zelita Admin"}</strong>
              <span>{session?.admin.username ?? "admin"}</span>
            </div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
