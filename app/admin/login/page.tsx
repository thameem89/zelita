"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMockSession, mockLogin } from "@/lib/services/auth-service";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getMockSession().then((session) => {
      if (session) router.replace("/admin");
    });
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const result = await mockLogin(username, password);
    if (!result.ok) {
      setError("Invalid username or password.");
      return;
    }
    router.replace("/admin");
  }

  return (
    <main className="admin-login">
      <form onSubmit={submit}>
        <img className="footer-logo" src="/zelita-logo.png" alt="Zelita Ventures Co. LLC" />
        <p className="eyebrow">Admin Login</p>
        <h1>Zelita catalog management</h1>
        {error ? <div className="form-error-banner">{error}</div> : null}
        <label>
          Username
          <input type="text" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Password
          <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button className="button primary" type="submit">Login to Admin</button>
      </form>
    </main>
  );
}
