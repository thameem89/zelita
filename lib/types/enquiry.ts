export type EnquiryType = "Contact" | "Quote" | "Product";
export type EnquiryStatus = "New" | "Contacted" | "In Progress" | "Closed" | "Spam";

export type Enquiry = {
  id: string;
  enquiryType: EnquiryType;
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  productId: string;
  productName: string;
  quantity: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
};

export type EnquiryInput = Omit<Enquiry, "id" | "status" | "adminNotes" | "createdAt" | "updatedAt"> & {
  status?: EnquiryStatus;
  adminNotes?: string;
};
