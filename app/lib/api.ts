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
    const response = await fetch(`${API_BASE_URL}/api/v1/todos`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) return { message: "Failed fetching todos" };

    const result = await response.json();
    const { data } = result;

    return await data;
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
    const response = await fetch(`${API_BASE_URL}/api/v1/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) return { message: "Failed fetching todo" };
    const result = await response.json();
    const { data } = result;

    return await data;
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
    const response = await fetch(`${API_BASE_URL}/api/v1/todos/user${userId}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) return { message: "Failed fetching todo by user" };
    const result = await response.json();
    const { data } = result;

    return await data;
  } catch (error) {
    return { message: "Error fetching todo" };
  }
}

export async function getUsers(): Promise<User[] | { message: string }> {
  const tokens = await getTokens();
  if (!tokens) return { message: "Missing/Expired tokens" };

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) return { message: "Failed fetching users" };
    const result = await response.json();
    const { data } = result;

    return await data;
  } catch (error) {
    return { message: "Error fetching todo" };
  }
}

export async function getUserProfile(): Promise<User | { message: string }> {
  const tokens = await getTokens();
  if (!tokens) return { message: "Missing/Expired tokens" };

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/profile`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) return { message: "Failed fetching user profile" };
    const result = await response.json();
    const { data } = result;

    return await data;
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
    const response = await fetch(`${API_BASE_URL}/api/v1/users/${id}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) return { message: "Failed fetching user by id" };
    const result = await response.json();
    const { data } = result;

    return await data;
  } catch (error) {
    return { message: "Error fetching todo" };
  }
}
