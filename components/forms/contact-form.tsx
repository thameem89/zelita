"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createEnquiry } from "@/lib/services/enquiry-service";
import { FormFieldError } from "../ui/form-field-error";

const enquiryTypes = [
  "Product enquiry",
  "Bulk supply",
  "Cleaning services",
  "Industrial chemicals",
  "Vendor partnership",
  "General enquiry",
];

const contactSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  company: z.string().optional(),
  email: z.string().email("Enter a valid work email."),
  phone: z.string().min(6, "Phone number is required."),
  city: z.string().optional(),
  enquiryType: z.string().min(1),
  productRequired: z.string().optional(),
  message: z.string().min(1, "Message is required."),
  consent: z.boolean().refine(Boolean, "Please confirm consent."),
  website: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      enquiryType: enquiryTypes[0],
      consent: false,
      website: "",
    },
  });
  const [success, setSuccess] = useState(false);

  async function submit(form: ContactFormValues) {
    if (form.website && form.website !== "success") return;

    const result = await createEnquiry({
      enquiryType: "Contact",
      customerName: form.name,
      companyName: form.company ?? "",
      email: form.email,
      phone: form.phone,
      city: form.city ?? "",
      productId: "",
      productName: form.productRequired ?? "",
      quantity: "",
      subject: form.productRequired
        ? `${form.enquiryType}: ${form.productRequired}`
        : form.enquiryType,
      message: form.message,
    });

    if (!result.ok) {
      setError("message", { message: result.error });
      return;
    }

    reset({ enquiryType: enquiryTypes[0], consent: false, website: "" });
    setSuccess(true);
  }

  return (
    <form className="public-form contact-form-card" onSubmit={handleSubmit(submit)}>
      {success ? (
        <div className="success-message">
          Thank you. Your enquiry has been saved for the Zelita team. Expected
          response time: within one business day.
          <a href="https://wa.me/966567424517" rel="noreferrer" target="_blank">
            <MessageCircle aria-hidden="true" size={16} strokeWidth={2.2} />
            Continue on WhatsApp
          </a>
        </div>
      ) : null}
      <input className="honeypot" tabIndex={-1} autoComplete="off" {...register("website")} aria-hidden="true" />
      <div className="form-grid">
        <label>
          Full name
          <input {...register("name")} />
          <FormFieldError message={errors.name?.message} />
        </label>
        <label>
          Company name
          <input {...register("company")} />
        </label>
      </div>
      <div className="form-grid">
        <label>
          Work email
          <input type="email" {...register("email")} />
          <FormFieldError message={errors.email?.message} />
        </label>
        <label>
          Phone number
          <input placeholder="+966" {...register("phone")} />
          <FormFieldError message={errors.phone?.message} />
        </label>
      </div>
      <div className="form-grid">
        <label>
          City
          <input {...register("city")} />
        </label>
        <label>
          Enquiry type
          <select {...register("enquiryType")}>
            {enquiryTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>
      </div>
      <label>
        Product or service required
        <input {...register("productRequired")} />
      </label>
      <label>
        Message
        <textarea rows={5} {...register("message")} />
        <FormFieldError message={errors.message?.message} />
      </label>
      <label>
        Optional attachment
        <input type="file" />
      </label>
      <label className="consent-row">
        <input type="checkbox" {...register("consent")} />
        I agree to be contacted by Zelita about this enquiry.
        <FormFieldError message={errors.consent?.message} />
      </label>
      <button className="button primary" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
