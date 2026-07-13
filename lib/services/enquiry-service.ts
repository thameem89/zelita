import { supabaseEnquiryRepository } from "../repositories/supabase-enquiry-repository";
import type { ServiceResult } from "../types/common";
import type { Enquiry, EnquiryInput, EnquiryStatus } from "../types/enquiry";

const repository = supabaseEnquiryRepository;

export async function getEnquiries() {
  return (await repository.list()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getEnquiryById(id: string) {
  return repository.getById(id);
}

export async function createEnquiry(input: EnquiryInput): Promise<ServiceResult<Enquiry>> {
  const errors: string[] = [];

  if (!input.customerName.trim()) errors.push("Customer name is required.");
  if (!input.email.trim() && !input.phone.trim()) errors.push("Email or phone is required.");
  if (!input.message.trim() && !input.subject.trim()) {
    errors.push("Message or enquiry details are required.");
  }
  if (input.customerName.length > 120) errors.push("Customer name is too long.");
  if (input.message.length > 1200) errors.push("Message is too long.");

  if (errors.length) return { ok: false, error: errors[0] };

  const enquiry = await repository.create(input);
  return { ok: true, data: enquiry, message: "Enquiry saved." };
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  return repository.updateStatus(id, status);
}

export async function updateEnquiryNotes(id: string, adminNotes: string) {
  return repository.updateNotes(id, adminNotes);
}

export async function resetEnquiries() {
  await repository.reset();
}
