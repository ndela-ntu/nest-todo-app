'use client';

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
}

export default function FormButton({
  children,
  className = "",
  variant = "primary",
}: FormButtonProps) {
  const { pending } = useFormStatus();

  const baseClasses =
    "px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {pending ? "Loading..." : children}
    </button>
  );
}
