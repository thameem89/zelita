"use client";

import { FormEvent, useState } from "react";

const interests = [
  "Product supply",
  "Cleaning services",
  "Contract or bulk order",
  "General enquiry",
];

export function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    interest: interests[0],
    message: "",
  });
  const [notice, setNotice] = useState("");

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(`Zelita enquiry: ${form.interest}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company || "Not provided"}\nEmail: ${form.email}\nEnquiry: ${form.interest}\n\nRequirements:\n${form.message}`,
    );

    setNotice("Your email app is opening with the enquiry ready to send.");
    window.location.href = `mailto:info@zelitasa.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className="quote-form" onSubmit={submitQuote}>
      <div className="quote-form-row">
        <label>
          Name
          <input
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
            value={form.name}
          />
        </label>
        <label>
          Email
          <input
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
            type="email"
            value={form.email}
          />
        </label>
      </div>
      <div className="quote-form-row">
        <label>
          Company
          <input
            onChange={(event) => setForm({ ...form, company: event.target.value })}
            value={form.company}
          />
        </label>
        <label>
          Enquiry type
          <select
            onChange={(event) => setForm({ ...form, interest: event.target.value })}
            value={form.interest}
          >
            {interests.map((interest) => (
              <option key={interest}>{interest}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Requirements
        <textarea
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          required
          rows={4}
          value={form.message}
        />
      </label>
      <button className="button primary" type="submit">Send Enquiry</button>
      {notice ? <p className="quote-notice" role="status">{notice}</p> : null}
    </form>
  );
}
