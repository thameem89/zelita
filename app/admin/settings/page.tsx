"use client";

import { useState } from "react";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { getMockAdminCredentials, resetMockSession } from "@/lib/services/auth-service";
import { resetMockData } from "@/lib/services/mock-reset-service";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminSettingsPage() {
  const credentials = getMockAdminCredentials();
  const supabaseConfigured = isSupabaseConfigured();
  const [confirmReset, setConfirmReset] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <main className="admin-page">
      <div className="admin-title"><p className="eyebrow">Settings</p><h1>Mock backend settings</h1></div>
      {message ? <div className="success-message">{message}</div> : null}
      <section className="admin-two-col">
        <article className="admin-panel">
          <h2>Status</h2>
          <p><strong>Supabase config:</strong> {supabaseConfigured ? "Connected with local.env credentials." : "Missing environment variables."}</p>
          <p><strong>Mock fallback:</strong> Active. If Supabase tables/RLS are not ready, repositories fall back to local mock data.</p>
          <p><strong>Current mock admin:</strong> {credentials.email}</p>
          <div className="quick-actions">
            <button className="button primary" type="button" onClick={() => setConfirmReset(true)}>Reset Mock Data</button>
            <button className="button dark" type="button" onClick={async () => { await resetMockSession(); setMessage("Mock session reset. Use Logout or refresh to return to login."); }}>Reset Mock Session</button>
          </div>
        </article>
        <article className="admin-panel">
          <h2>Supabase integration checklist</h2>
          <ul className="checklist">
            <li>Supabase project created</li>
            <li>Local environment variables added</li>
            <li>Create database schema from <code>supabase/schema.sql</code></li>
            <li>Configure authentication</li>
            <li>Configure Row Level Security</li>
            <li>Create storage buckets</li>
            <li>Replace mock repositories</li>
            <li>Test production permissions</li>
          </ul>
        </article>
      </section>
      <ConfirmationDialog
        open={confirmReset}
        title="Reset all mock data?"
        message="This restores starter products, categories, and enquiries. Demo session is not changed."
        confirmLabel="Reset data"
        onCancel={() => setConfirmReset(false)}
        onConfirm={async () => {
          await resetMockData();
          setConfirmReset(false);
          setMessage("Mock products, categories, and enquiries were reset.");
        }}
      />
    </main>
  );
}
