import { getTokens } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface Todo {
  id: string;
  name: string;
  description?: string;
  isComplete: boolean;
  userId: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
}

export async function getTodos(): Promise<Todo[] | { message: string }> {
  const tokens = await getTokens();
  if (!tokens) return { message: "Missing/Expired tokens" };

  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) return { message: "Failed fetching todos" };

    return await response.json();
  } catch (error) {
    return { message: "Error fetching todos" };
  }
}

export async function getTodoById(
  id: string
): Promise<Todo | { message: string }> {
  const tokens = await getTokens();
  if (!tokens) return { message: "Missing/Expired tokens" };

  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) return { message: "Failed fetching todo" };

    return await response.json();
  } catch (error) {
    return { message: "Error fetching todo" };
  }
}

export async function getTodoByUser(
  userId: string
): Promise<Todo | { message: string }> {
  const tokens = await getTokens();
  if (!tokens) return { message: "Missing/Expired tokens" };

  try {
    const response = await fetch(`${API_BASE_URL}/todos/user${userId}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) return { message: "Failed fetching todo by user" };

    return await response.json();
  } catch (error) {
    return { message: "Error fetching todo" };
  }
}

export async function getUsers(): Promise<User[] | { message: string }> {
  const tokens = await getTokens();
  if (!tokens) return { message: "Missing/Expired tokens" };

  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) return { message: "Failed fetching users" };

    return await response.json();
  } catch (error) {
    return { message: "Error fetching todo" };
  }
}

export async function getUserProfile(): Promise<User | { message: string }> {
  const tokens = await getTokens();
  if (!tokens) return { message: "Missing/Expired tokens" };

  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) return { message: "Failed fetching user profile" };

    return await response.json();
  } catch (error) {
    return { message: "Error fetching todo" };
  }
}

export async function getUserById(
  id: string
): Promise<User | { message: string }> {
  const tokens = await getTokens();
  if (!tokens) return { message: "Missing/Expired tokens" };

  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) return { message: "Failed fetching user by id" };

    return await response.json();
  } catch (error) {
    return { message: "Error fetching todo" };
  }
}
