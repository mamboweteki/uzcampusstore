"use client";

import { useState } from "react";
import Link from "next/link";
import { MARKETPLACE_NAME } from "@/lib/constants";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="bg-[#F5F7FB] pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-md px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
          <h1 className="font-display text-3xl font-bold tracking-tight text-navy-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to your {MARKETPLACE_NAME} account to continue to your
            dashboard.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-navy-900"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@zu.ac.zw"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-navy-900 outline-none transition-colors focus:border-royal-500 focus:ring-2 focus:ring-royal-200"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-navy-900"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-navy-900 outline-none transition-colors focus:border-royal-500 focus:ring-2 focus:ring-royal-200"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#123F83] px-8 py-4 text-base font-bold text-white shadow-xl shadow-[#123F83]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0d2f63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123F83]"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            New to {MARKETPLACE_NAME}?{" "}
            <Link href="/#home" className="font-bold text-[#123F83] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
