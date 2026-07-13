import type { EnquiryInput, EnquiryStatus } from "../types/enquiry";
import { getSupabaseClient, isSupabaseConfigured } from "../supabase/client";
import { enquiryFromRow, enquiryInputToInsert } from "../supabase/mappers";
import { mockEnquiryRepository, type EnquiryRepository } from "./mock-enquiry-repository";

function now() {
  return new Date().toISOString();
}

function createId() {
  return `enq-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function fallbackReason(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Supabase request failed.";
}

async function fallback<T>(operation: () => Promise<T>, mockOperation: () => Promise<T>) {
  if (!isSupabaseConfigured()) return mockOperation();
  try {
    return await operation();
  } catch (error) {
    console.warn("[Supabase enquiry fallback]", fallbackReason(error));
    return mockOperation();
  }
}

export const supabaseEnquiryRepository: EnquiryRepository = {
  async list() {
    return fallback(async () => {
      const { data, error } = await getSupabaseClient()
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map(enquiryFromRow);
    }, () => mockEnquiryRepository.list());
  },
  async getById(id) {
    return (await this.list()).find((enquiry) => enquiry.id === id) ?? null;
  },
  async create(input: EnquiryInput) {
    return fallback(async () => {
      const timestamp = now();
      const { data, error } = await getSupabaseClient()
        .from("enquiries")
        .insert(enquiryInputToInsert(input, createId(), timestamp, timestamp))
        .select()
        .single();
      if (error) throw error;
      return enquiryFromRow(data);
    }, () => mockEnquiryRepository.create(input));
  },
  async updateStatus(id: string, status: EnquiryStatus) {
    return fallback(async () => {
      const { data, error } = await getSupabaseClient()
        .from("enquiries")
        .update({ status, updated_at: now() })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return enquiryFromRow(data);
    }, () => mockEnquiryRepository.updateStatus(id, status));
  },
  async updateNotes(id: string, adminNotes: string) {
    return fallback(async () => {
      const { data, error } = await getSupabaseClient()
        .from("enquiries")
        .update({ admin_notes: adminNotes, updated_at: now() })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return enquiryFromRow(data);
    }, () => mockEnquiryRepository.updateNotes(id, adminNotes));
  },
  async reset() {
    await mockEnquiryRepository.reset();
  },
};
