"use client";

import type { ReactNode } from "react";
import { useRegistration } from "./RegistrationContext";

interface RegisterButtonProps {
  children: ReactNode;
  className?: string;
}

/** Primary conversion button — opens the pre-launch registration flow. */
export default function RegisterButton({ children, className }: RegisterButtonProps) {
  const openRegistration = useRegistration();

  const classes = className
    ? className
    : "inline-flex items-center justify-center gap-2 rounded-full bg-[#123F83] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#123F83]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0d2f63] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123F83] active:scale-[0.98]";

  return (
    <button type="button" onClick={openRegistration} className={classes}>
      {children}
    </button>
  );
}
