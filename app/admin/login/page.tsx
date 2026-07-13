"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMockAdminCredentials, getMockSession, mockLogin } from "@/lib/services/auth-service";

export default function AdminLoginPage() {
  const router = useRouter();
  const credentials = getMockAdminCredentials();
  const [email, setEmail] = useState(credentials.email);
  const [password, setPassword] = useState(credentials.password);
  const [error, setError] = useState("");

  useEffect(() => {
    getMockSession().then((session) => {
      if (session) router.replace("/admin");
    });
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const result = await mockLogin(email, password);
    if (!result.ok) {
      setError("Invalid email or password.");
      return;
    }
    router.replace("/admin");
  }

  return (
    <main className="admin-login">
      <form onSubmit={submit}>
        <img className="footer-logo" src="/zelita-logo.png" alt="Zelita Ventures Co. LLC" />
        <p className="eyebrow">Mock Admin Login</p>
        <h1>Zelita catalog management</h1>
        {error ? <div className="form-error-banner">{error}</div> : null}
        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button className="button primary" type="submit">Login to Demo Admin</button>
        <p className="demo-note">
          Demo only: {credentials.email} / {credentials.password}. This is mock authentication, not production security.
        </p>
      </form>
    </main>
  );
}
