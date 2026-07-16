import { mockAdmin, mockAdminPassword } from "../mock/mock-admin";
import { readItem, removeItem, writeItem } from "../repositories/mock-storage";
import type { MockSession } from "../types/admin";
import type { ServiceResult } from "../types/common";

const sessionKey = "admin-session";

export async function mockLogin(username: string, password: string): Promise<ServiceResult<MockSession>> {
  if (username.trim().toLowerCase() !== mockAdmin.username || password !== mockAdminPassword) {
    return { ok: false, error: "Invalid username or password." };
  }

  const session: MockSession = {
    admin: mockAdmin,
    createdAt: new Date().toISOString(),
  };
  writeItem(sessionKey, session);
  return { ok: true, data: session, message: "Logged in." };
}

export async function mockLogout() {
  removeItem(sessionKey);
}

export async function getMockSession() {
  return readItem<MockSession>(sessionKey);
}

export async function isMockAuthenticated() {
  return Boolean(await getMockSession());
}

export async function resetMockSession() {
  removeItem(sessionKey);
}

export function getMockAdminCredentials() {
  return {
    username: mockAdmin.username,
    password: mockAdminPassword,
  };
}
