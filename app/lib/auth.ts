"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
}

export interface AuthToken {
  accessToken: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function getTokens(): Promise<AuthToken | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  return { accessToken };
}

export async function getCurrentUser(): Promise<User | null> {
  const tokens = await getTokens();
  if (!tokens) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/profile`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) return null;
    const result = await response.json();
    const { data } = result;

    return await data;
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<User | null> {
  const user = getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireAuth();
  if (user?.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return user;
}
