import test from "node:test";
import assert from "node:assert/strict";
import { slugify, uniqueSlug } from "../lib/services/utils.ts";
import { validatePdf } from "../lib/services/pdf-validation.ts";

test("slug generation sanitizes names", () => {
  assert.equal(slugify("  Premium Organic Protein Powder!  "), "premium-organic-protein-powder");
  assert.equal(slugify("A---B & C"), "a-b-and-c");
});

test("duplicate slugs receive increasing suffixes", () => {
  assert.equal(uniqueSlug("Premium Protein", ["premium-protein", "premium-protein-2"]), "premium-protein-3");
  assert.equal(uniqueSlug("Custom URL", []), "custom-url");
});

test("PDF validation checks extension, MIME, and size", () => {
  assert.equal(validatePdf(new File(["pdf"], "sheet.pdf", { type: "application/pdf" })), null);
  assert.match(validatePdf(new File(["x"], "sheet.exe", { type: "application/pdf" })), /PDF file/);
  assert.match(validatePdf(new File(["x"], "sheet.pdf", { type: "text/plain" })), /PDF file/);
  const oversized = { name: "large.pdf", type: "application/pdf", size: 11 * 1024 * 1024 };
  assert.match(validatePdf(oversized), /10 MB/);
});
