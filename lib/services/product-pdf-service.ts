import { getSupabaseClient, isSupabaseConfigured } from "../supabase/client";
import { validatePdf } from "./pdf-validation";
const bucket = "product-pdfs";

function storagePath(file: File) {
  const safeStem = file.name.replace(/\.pdf$/i, "").replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "datasheet";
  return `products/${crypto.randomUUID()}-${safeStem}.pdf`;
}

export async function uploadProductPdf(file: File) {
  const validationError = validatePdf(file);
  if (validationError) throw new Error(validationError);
  if (!isSupabaseConfigured()) return URL.createObjectURL(file);
  const path = storagePath(file);
  const client = getSupabaseClient();
  const { error } = await client.storage.from(bucket).upload(path, file, { contentType: "application/pdf", upsert: false });
  if (error) throw error;
  return client.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

export async function removeProductPdf(url: string) {
  if (!url || !isSupabaseConfigured()) return;
  const marker = `/storage/v1/object/public/${bucket}/`;
  const path = decodeURIComponent(url.split(marker)[1] ?? "");
  if (!path || path.includes("..") || path.startsWith("/")) return;
  const { error } = await getSupabaseClient().storage.from(bucket).remove([path]);
  if (error) throw error;
}
