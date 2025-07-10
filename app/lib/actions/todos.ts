'use server';

import { z } from 'zod';
import { getTokens } from '../auth';
import { redirect } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const todoSchema = z.object({
    name: z.string().min(2, 'Name should be at least 2 characters'),
    description: z.string().min(2, 'Description should be at least 2 character'),
    isComplete: z.boolean(),
});

export async function createTodoAction(prevState: any, formData: FormData) {
    const tokens = await getTokens();
    if (!tokens) redirect('/login');

    const validatedFields = todoSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        isComplete: formData.get('isComplete'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    
}