"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { MARKETPLACE_NAME, NAV_ITEMS, TAGLINE } from "@/lib/constants";
import RegisterButton from "@/components/RegisterButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-slate-200/70 bg-white/85 shadow-sm"
          : "border-slate-200 bg-white"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center"
          aria-label={`${MARKETPLACE_NAME} home`}
        >
          <span className="bg-gradient-to-r from-navy-900 via-royal-800 to-royal-600 bg-clip-text font-retro text-2xl font-bold tracking-wide text-transparent sm:text-3xl">
            UZ Marketplace
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-[#123F83]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <RegisterButton className="hidden items-center justify-center rounded-full bg-[#123F83] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#123F83]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0d2f63] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123F83] sm:inline-flex">
            Start Selling
          </RegisterButton>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-navy-900 transition-colors hover:bg-slate-100 lg:hidden"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-6 pb-8 pt-4 shadow-xl lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#123F83]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <RegisterButton className="w-full rounded-full bg-[#123F83] px-6 py-3.5 text-base font-bold text-white shadow-xl shadow-[#123F83]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0d2f63]">
              Start Selling
            </RegisterButton>
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">{TAGLINE}</p>
        </div>
      ) : null}
    </header>
  );
}
