import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Zelita homepage shell", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Zelita Ventures Co\. LLC<\/title>/i);
  assert.match(html, /Complete cleaning, industrial &amp; facility/i);
  assert.match(html, /Explore Products/i);
  assert.match(html, /Request a Quote/i);
});

test("keeps mock backend services separated from UI storage", async () => {
  const productService = await readFile(new URL("../lib/services/product-service.ts", import.meta.url), "utf8");
  const productRepository = await readFile(new URL("../lib/repositories/mock-product-repository.ts", import.meta.url), "utf8");
  const productsPage = await readFile(new URL("../app/products/page.tsx", import.meta.url), "utf8");
  const adminPage = await readFile(new URL("../app/admin/page.tsx", import.meta.url), "utf8");

  assert.match(productService, /getActiveProducts/);
  assert.match(productRepository, /readCollection/);
  assert.doesNotMatch(productsPage, /localStorage/);
  assert.doesNotMatch(adminPage, /localStorage/);
});
