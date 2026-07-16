export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function uniqueSlug(value: string, existingSlugs: string[], currentSlug?: string) {
  const base = slugify(value);
  const occupied = new Set(existingSlugs.map(slugify).filter((slug) => slug !== slugify(currentSlug ?? "")));
  if (!occupied.has(base)) return base;
  let suffix = 2;
  while (occupied.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

export function normalize(value: string) {
  return value.trim().toLowerCase();
}
