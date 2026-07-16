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
      <div className="admin-title"><p className="eyebrow">Settings</p><h1>Admin settings</h1></div>
      {message ? <div className="success-message">{message}</div> : null}
      <section className="admin-two-col">
        <article className="admin-panel">
          <h2>Status</h2>
          <p><strong>Supabase config:</strong> {supabaseConfigured ? "Connected with local.env credentials." : "Missing environment variables."}</p>
          <p><strong>Local fallback:</strong> Active. New catalog records are stored locally when Supabase is unavailable.</p>
          <p><strong>Current admin:</strong> {credentials.username}</p>
          <div className="quick-actions">
            <button className="button primary" type="button" onClick={() => setConfirmReset(true)}>Clear Local Data</button>
            <button className="button dark" type="button" onClick={async () => { await resetMockSession(); setMessage("Admin session reset. Use Logout or refresh to return to login."); }}>Reset Admin Session</button>
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
            <li>Verify production repositories</li>
            <li>Test production permissions</li>
          </ul>
        </article>
      </section>
      <ConfirmationDialog
        open={confirmReset}
        title="Clear all local data?"
        message="This removes locally stored products, categories, and enquiries. The admin session is not changed."
        confirmLabel="Clear data"
        onCancel={() => setConfirmReset(false)}
        onConfirm={async () => {
          await resetMockData();
          setConfirmReset(false);
          setMessage("Local products, categories, and enquiries were cleared.");
        }}
      />
    </main>
  );
}
