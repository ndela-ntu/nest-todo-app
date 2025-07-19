"use server";

import { z } from "zod";
import { getTokens } from "../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const todoSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters"),
  description: z.string().min(2, "Description should be at least 2 character"),
  isComplete: z.boolean(),
});

export async function createTodoAction(prevState: any, formData: FormData) {
  const tokens = await getTokens();
  if (!tokens) redirect("/login");

  const validatedFields = todoSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    isComplete: formData.get("isComplete") === "on",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.accessToken}`,
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      const error = await response.json();

      return {
        message: error.message || "Failed to create todo",
      };
    }

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    return {
      message: "Network error. Please try again",
    };
  }
}

export async function updateTodoAction(id: string, formData: FormData) {
  const tokens = await getTokens();
  if (!tokens) redirect("/login");

  const validatedFields = todoSchema.safeParse({
    isComplete: formData.get("isComplete") === "true",
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.accessToken}`,
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      throw new Error("Failed to update todo");
    }

    revalidatePath("/dashboard");
    revalidatePath("/admin");
  } catch (error) {
    return {
      message: "Network error. Please try again",
    };
  }
}

export async function toggleIsComplete(id: string, isComplete: boolean) {
  const tokens = await getTokens();
  if (!tokens) redirect("/login");

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.accessToken}`,
      },
      body: JSON.stringify({ isComplete }),
    });

    if (!response.ok) {
      throw new Error("Failed to update todo");
    }

    revalidatePath("/dashboard");
    revalidatePath("/admin");
  } catch (error) {
    return {
      message: "Network error. Please try again",
    };
  }
}

export async function deleteTodoAction(id: string) {
  const tokens = await getTokens();
  if (!tokens) redirect("/login");

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }

    revalidatePath("/dashboard");
    revalidatePath("/admin");
  } catch (error) {
    return {
      message: "Network error. Please try again",
    };
  }
}
