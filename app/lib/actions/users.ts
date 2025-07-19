import { z } from "zod";
import { getTokens } from "../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const userSchema = z.object({
  id: z.string().min(2, "Invalid id provided"),
  email: z.string().email("Invalid email syntax"),
  name: z.string().min(2, "Name should be at least 2 characters"),
  password: z.string().min(2, "Password should be at least 2 characters"),
  role: z.enum(["ADMIN", "USER"]),
});

export async function udpateProfileAction(prevState: any, formData: FormData) {
  const tokens = await getTokens();
  if (!tokens) redirect("/login");

  const validatedFields = userSchema.safeParse({
    id: formData.get("id"),
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { id, email, name, password, role } = validatedFields.data;

    const response = await fetch(`${API_BASE_URL}/api/v1/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${tokens.accessToken}`,
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    revalidatePath("/dashboard");
    revalidatePath("/admin");
  } catch (error) {
    return {
      message: "Network error. Please try again",
    };
  }
}

export async function updateUserAction(prevState: any, formData: FormData) {
  const tokens = await getTokens();
  if (!tokens) redirect("/login");

  const validatedFields = userSchema.safeParse({
    id: formData.get("id"),
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { id, email, name, password, role } = validatedFields.data;

    const response = await fetch(`${API_BASE_URL}/api/v1/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${tokens.accessToken}`,
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    revalidatePath("/dashboard");
    revalidatePath("/admin");
  } catch (error) {
    return {
      message: "Network error. Please try again",
    };
  }
}

export async function deleteUserAction(id: string) {
  const tokens = await getTokens();
  if (!tokens) redirect("/login");

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    revalidatePath("/dashboard");
    revalidatePath("/admin");
  } catch (error) {
    return {
      message: "Network error. Please try again",
    };
  }
}
