import { mockEnquiries } from "../mock/mock-enquiries";
import type { Enquiry, EnquiryInput, EnquiryStatus } from "../types/enquiry";
import { readCollection, writeCollection } from "./mock-storage";

const key = "enquiries";

function now() {
  return new Date().toISOString();
}

function createId() {
  return `enq-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export type EnquiryRepository = {
  list(): Promise<Enquiry[]>;
  getById(id: string): Promise<Enquiry | null>;
  create(input: EnquiryInput): Promise<Enquiry>;
  updateStatus(id: string, status: EnquiryStatus): Promise<Enquiry | null>;
  updateNotes(id: string, adminNotes: string): Promise<Enquiry | null>;
  reset(): Promise<void>;
};

export const mockEnquiryRepository: EnquiryRepository = {
  async list() {
    return readCollection<Enquiry>(key, mockEnquiries);
  },
  async getById(id) {
    return (await this.list()).find((enquiry) => enquiry.id === id) ?? null;
  },
  async create(input) {
    const enquiries = await this.list();
    const timestamp = now();
    const enquiry: Enquiry = {
      ...input,
      id: createId(),
      status: input.status ?? "New",
      adminNotes: input.adminNotes ?? "",
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    writeCollection(key, [enquiry, ...enquiries]);
    return enquiry;
  },
  async updateStatus(id, status) {
    const enquiries = await this.list();
    let updated: Enquiry | null = null;
    const next = enquiries.map((enquiry) => {
      if (enquiry.id !== id) return enquiry;
      updated = { ...enquiry, status, updatedAt: now() };
      return updated;
    });
    writeCollection(key, next);
    return updated;
  },
  async updateNotes(id, adminNotes) {
    const enquiries = await this.list();
    let updated: Enquiry | null = null;
    const next = enquiries.map((enquiry) => {
      if (enquiry.id !== id) return enquiry;
      updated = { ...enquiry, adminNotes, updatedAt: now() };
      return updated;
    });
    writeCollection(key, next);
    return updated;
  },
  async reset() {
    writeCollection(key, mockEnquiries);
  },
};
