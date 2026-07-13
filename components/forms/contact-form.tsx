"use client";

import { FormEvent, useState } from "react";
import { createEnquiry } from "@/lib/services/enquiry-service";
import { FormFieldError } from "../ui/form-field-error";

type ContactState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  subject: string;
  message: string;
  website: string;
};

const initialState: ContactState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  city: "",
  subject: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactState, string>>>({});
  const [success, setSuccess] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("");
    if (form.website.trim()) return;

    const nextErrors: Partial<Record<keyof ContactState, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim() && !form.phone.trim()) nextErrors.email = "Email or phone is required.";
    if (!form.subject.trim() && !form.message.trim()) nextErrors.message = "Subject or message is required.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const result = await createEnquiry({
      enquiryType: "Contact",
      customerName: form.name,
      companyName: form.company,
      email: form.email,
      phone: form.phone,
      city: form.city,
      productId: "",
      productName: "",
      quantity: "",
      subject: form.subject || "Website contact",
      message: form.message,
    });

    if (!result.ok) {
      setErrors({ message: result.error });
      return;
    }

    setSuccess("Thank you. Your message has been saved for the Zelita team.");
    setForm(initialState);
    setErrors({});
  }

  return (
    <form className="public-form" onSubmit={submit}>
      {success ? <div className="success-message">{success}</div> : null}
      <input className="honeypot" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} aria-hidden="true" />
      <label>
        Name
        <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        <FormFieldError message={errors.name} />
      </label>
      <label>
        Company
        <input value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} />
      </label>
      <div className="form-grid">
        <label>
          Email
          <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <FormFieldError message={errors.email} />
        </label>
        <label>
          Phone
          <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
        </label>
      </div>
      <label>
        City
        <input value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
      </label>
      <label>
        Subject
        <input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} />
      </label>
      <label>
        Message
        <textarea rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
        <FormFieldError message={errors.message} />
      </label>
      <button className="button primary" type="submit">
        Send Message
      </button>
    </form>
  );
}
