"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getMockSession, mockLogout } from "@/lib/services/auth-service";
import type { MockSession } from "@/lib/types/admin";
import { LoadingState } from "../ui/state";

const navItems = [
  ["Dashboard", "/admin"],
  ["Products", "/admin/products"],
  ["Categories", "/admin/categories"],
  ["Enquiries", "/admin/enquiries"],
  ["Settings", "/admin/settings"],
];

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
  if (loading) return <LoadingState label="Checking demo admin session..." />;

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <a className="admin-brand" href="/">
          <img src="/zelita-logo.png" alt="Zelita Ventures Co. LLC" />
        </a>
        <span className="demo-badge">Demo Admin</span>
        <nav aria-label="Admin navigation">
          {navItems.map(([label, href]) => (
            <a className={pathname === href || (href !== "/admin" && pathname.startsWith(href)) ? "active" : ""} href={href} key={href}>
              {label}
            </a>
          ))}
          <a href="/" target="_blank">View Website</a>
          <button type="button" onClick={logout}>Logout</button>
        </nav>
      </aside>
      <div className="admin-main">
        <header className="admin-header">
          <button className="admin-menu" type="button" onClick={() => setOpen(!open)} aria-expanded={open}>
            Menu
          </button>
          <div>
            <strong>{session?.admin.name ?? "Zelita Admin"}</strong>
            <span>{session?.admin.email ?? "admin@zelita-demo.com"}</span>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
