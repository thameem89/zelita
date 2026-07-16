const configuredMegabytes = Number(process.env.NEXT_PUBLIC_PRODUCT_PDF_MAX_MB ?? 10);
export const DEFAULT_MAX_PDF_BYTES = (Number.isFinite(configuredMegabytes) && configuredMegabytes > 0 ? configuredMegabytes : 10) * 1024 * 1024;

export function validatePdf(file: Pick<File, "name" | "type" | "size">, maxBytes = DEFAULT_MAX_PDF_BYTES) {
  if (!file.name.toLowerCase().endsWith(".pdf") || file.type !== "application/pdf") {
    return "Choose a PDF file. Both its extension and file type must be PDF.";
  }
  if (file.size > maxBytes) return `The PDF must be ${Math.floor(maxBytes / 1024 / 1024)} MB or smaller.`;
  return null;
}
