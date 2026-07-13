export type ServiceResult<T> =
  | { ok: true; data: T; message?: string }
  | { ok: false; error: string };
