"use client";

import { loginAction } from "@/app/lib/actions/auth";
import { useFormState } from "react-dom";
import FormButton from "../ui/form-button";
import Link from "next/link";
import { useActionState } from "react";

const initialState = {
  message: "",
  errors: {},
};

export default function LoginForm() {
  const [state, formAction] = useActionState<any, FormData>(
    loginAction,
    initialState
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action={formAction}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {state.errors?.email && (
                <p className="mt-1 text-sm text-red-600">
                  {state.errors.email[0]}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {state.errors?.password && (
                <p className="mt-1 text-sm text-red-600">
                  {state.errors.password[0]}
                </p>
              )}
            </div>
          </div>

          {state.message && (
            <div className="text-sm text-red-600 text-center">
              {state.message}
            </div>
          )}

          <div>
            <FormButton className="w-full">Sign In</FormButton>
          </div>

          <div className="text-center">
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-500"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
