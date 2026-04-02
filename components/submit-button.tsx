"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function SubmitButton({ children, className }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
    >
      {pending ? "Salvando…" : children}
    </button>
  );
}
