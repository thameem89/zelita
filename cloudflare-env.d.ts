declare module "cloudflare:workers" {
  export type D1Database = {
    prepare: (query: string) => unknown;
  };

  export const env: {
    DB?: D1Database;
  };
}

type Fetcher = {
  fetch: (request: Request) => Promise<Response>;
};

type D1Database = {
  prepare: (query: string) => unknown;
};
