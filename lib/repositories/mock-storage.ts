const namespace = "zelita-mock";

export function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function storageKey(key: string) {
  return `${namespace}:${key}`;
}

export function readCollection<T>(key: string, fallback: T[]): T[] {
  if (!isBrowser()) return fallback;

  try {
    const stored = window.localStorage.getItem(storageKey(key));
    if (!stored) return fallback;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function writeCollection<T>(key: string, data: T[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(storageKey(key), JSON.stringify(data));
}

export function readItem<T>(key: string): T | null {
  if (!isBrowser()) return null;

  try {
    const stored = window.localStorage.getItem(storageKey(key));
    return stored ? (JSON.parse(stored) as T) : null;
  } catch {
    return null;
  }
}

export function writeItem<T>(key: string, data: T) {
  if (!isBrowser()) return;
  window.localStorage.setItem(storageKey(key), JSON.stringify(data));
}

export function removeItem(key: string) {
  if (!isBrowser()) return;
  window.localStorage.removeItem(storageKey(key));
}
