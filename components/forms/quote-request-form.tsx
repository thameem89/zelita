"use client";

import { FormEvent, useEffect, useState } from "react";
import { createEnquiry } from "@/lib/services/enquiry-service";
import { getActiveProducts } from "@/lib/services/product-service";
import type { Product } from "@/lib/types/product";
import { FormFieldError } from "../ui/form-field-error";

type FormState = {
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  division: string;
  productId: string;
  quantity: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  customerName: "",
  companyName: "",
  email: "",
  phone: "",
  city: "",
  division: "",
  productId: "",
  quantity: "",
  message: "",
  website: "",
};

type QuoteRequestFormProps = {
  preselectedDivision?: string;
  preselectedProductId?: string;
  preselectedProductName?: string;
};

export function QuoteRequestForm({
  preselectedDivision = "",
  preselectedProductId = "",
  preselectedProductName = "",
}: QuoteRequestFormProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<FormState>({
    ...initialState,
    division: preselectedDivision,
    productId: preselectedProductId,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getActiveProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      division: preselectedDivision || current.division,
      productId: preselectedProductId || current.productId,
    }));
  }, [preselectedDivision, preselectedProductId]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("");
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.customerName.trim()) nextErrors.customerName = "Name is required.";
    if (!form.email.trim() && !form.phone.trim()) nextErrors.email = "Email or phone is required.";
    if (!form.message.trim() && !form.quantity.trim()) nextErrors.message = "Message or quantity details are required.";
    if (form.website.trim()) return;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const product = products.find((item) => item.id === form.productId);
    const productName = product?.name ?? preselectedProductName;
    const context = [
      form.division ? `Division: ${form.division}` : "",
      productName ? `Requested product: ${productName}` : "",
      form.message,
    ].filter(Boolean).join("\n\n");
    const result = await createEnquiry({
      enquiryType: product || productName ? "Product" : "Quote",
      customerName: form.customerName,
      companyName: form.companyName,
      email: form.email,
      phone: form.phone,
      city: form.city,
      productId: product?.id ?? "",
      productName,
      quantity: form.quantity,
      subject: productName ? `Quote request for ${productName}` : "Quote request",
      message: context,
    });

    if (!result.ok) {
      setErrors({ message: result.error });
      return;
    }

    setSuccess("Thank you. Your quote request has been saved for the Zelita team.");
    setForm({ ...initialState, division: preselectedDivision, productId: preselectedProductId });
    setErrors({});
  }

  return (
    <form className="public-form" onSubmit={submit}>
      {success ? <div className="success-message">{success}</div> : null}
      <input className="honeypot" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} aria-hidden="true" />
      <label>
        Customer name
        <input value={form.customerName} onChange={(event) => setForm({ ...form, customerName: event.target.value })} />
        <FormFieldError message={errors.customerName} />
      </label>
      <label>
        Company name
        <input value={form.companyName} onChange={(event) => setForm({ ...form, companyName: event.target.value })} />
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
      <div className="form-grid">
        <label>
          City
          <input value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
        </label>
        <label>
          Division
          <select value={form.division} onChange={(event) => setForm({ ...form, division: event.target.value })}>
            <option value="">General requirement</option>
            <option value="cleaning-chemicals">Cleaning Chemicals</option>
            <option value="cleaning-equipment">Cleaning Equipment</option>
          </select>
        </label>
      </div>
      <div className="form-grid">
        <label>
          Product
          <select value={form.productId} onChange={(event) => setForm({ ...form, productId: event.target.value })}>
            <option value="">General quote</option>
            {preselectedProductId && preselectedProductName ? (
              <option value={preselectedProductId}>{preselectedProductName}</option>
            ) : null}
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Required quantity
        <input value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })} placeholder="e.g. 20 cartons" />
      </label>
      <label>
        Message
        <textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} rows={5} />
        <FormFieldError message={errors.message} />
      </label>
      <button className="button primary" type="submit">
        Submit Quote Request
      </button>
    </form>
  );
}
