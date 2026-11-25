"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import RegisterModal from "@/components/RegisterModal";

type OpenRegistration = () => void;

const RegistrationContext = createContext<OpenRegistration>(() => {});

export function useRegistration() {
  return useContext(RegistrationContext);
}

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openRegistration = () => setIsOpen(true);
  const closeRegistration = () => setIsOpen(false);

  return (
    <RegistrationContext.Provider value={openRegistration}>
      {children}
      <RegisterModal open={isOpen} onClose={closeRegistration} />
    </RegistrationContext.Provider>
  );
}
