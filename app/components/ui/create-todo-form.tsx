"use client";

import { createTodoAction } from "@/app/lib/actions/todos";
import { useActionState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import FormButton from "./form-button";

const initialState = {
  message: "",
  errors: {},
};

export default function CreateTodoForm() {
  const [state, formAction] = useActionState<any, FormData>(
    createTodoAction,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4 mb-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state.errors?.name && (
          <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description (Optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state.errors?.description && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.description[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="isComplete"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Is Complete (Optional)
        </label>
        <input
          id="isComplete"
          name="isComplete"
          type="checkbox"
          className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
        />
        {state.errors?.isComplete && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.isComplete[0]}
          </p>
        )}
      </div>

      {state.message && (
        <div className="text-sm text-red-600">{state.message}</div>
      )}

      <FormButton>Add Todo</FormButton>
    </form>
  );
}
