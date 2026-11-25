"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import RegisterButton from "@/components/RegisterButton";

const HERO_IMAGE = "/pictures/student-browsing-wireless-headphones-marketplace.png";
const HERO_BANNER = "/pictures/banner.png";

export default function Hero() {
  const [variant, setVariant] = useState<"primary" | "banner">("primary");

  useEffect(() => {
    const timer = setTimeout(() => setVariant("banner"), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      key={variant}
      id="home"
      className={`relative overflow-hidden ${
        variant === "banner" ? "bg-navy-900" : "bg-[#F5F7FB]"
      } pb-16 pt-32 sm:pt-40 lg:pb-16 lg:pt-36`}
    >
      {variant === "primary" ? (
        <>
          {/* Ambient animated orbs + high-quality background photo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <Image
              src={HERO_IMAGE}
              alt="Student browsing wireless headphones on the UZ Marketplace"
              fill
              sizes="100vw"
              className="object-cover opacity-70 transition-opacity duration-2000 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5F7FB] via-[#F5F7FB]/80 to-[#F5F7FB]/50" />
            <div className="absolute -top-16 -left-16 h-96 w-96 rounded-full bg-royal-400/20 blur-3xl animate-float-y" />
            <div
              className="absolute -bottom-32 -right-16 h-[28rem] w-[28rem] rounded-full bg-sun-300/20 blur-3xl animate-float-y"
              style={{ animationDelay: "3s" }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">
              {/* ── Left column: content ── */}
              <div className="max-w-2xl">
                <h1
                  data-reveal
                  style={{ "--reveal-delay": "150ms" } as CSSProperties}
                  className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-navy-900 animate-fade-up sm:text-6xl lg:text-7xl"
                >
                  Discover. Shop. Sell. Connect.
                </h1>

                <p
                  data-reveal
                  style={{ "--reveal-delay": "300ms" } as CSSProperties}
                  className="mt-5 font-display text-3xl font-bold tracking-tight text-navy-800 animate-fade-up sm:text-4xl"
                >
                  Your Campus. Your Marketplace. Your Opportunity.
                </p>

                <p
                  data-reveal
                  style={{ "--reveal-delay": "450ms" } as CSSProperties}
                  className="mt-6 text-lg leading-relaxed text-slate-600 animate-fade-up"
                >
                  Discover products, shop from fellow students, find useful services
                  and showcase your own business — all within the University of
                  Zimbabwe community.
                </p>

                <div
                  data-reveal
                  style={{ "--reveal-delay": "600ms" } as CSSProperties}
                  className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center animate-fade-up"
                >
                  <a
                    href="/marketplace/explore"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#123F83] px-9 py-4 text-lg font-bold text-white shadow-xl shadow-[#123F83]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0d2f63] hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123F83] active:scale-[0.98] sm:w-auto"
                  >
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    Explore Marketplace
                  </a>
                  <RegisterButton className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#123F83] bg-white px-9 py-4 text-lg font-bold text-[#123F83] shadow-lg shadow-[#123F83]/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#123F83]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123F83] active:scale-[0.98] sm:w-auto">
                    Start Selling
                  </RegisterButton>
                </div>

                <p
                  data-reveal
                  style={{ "--reveal-delay": "750ms" } as CSSProperties}
                  className="mt-8 text-sm font-medium text-slate-500 animate-fade-up"
                >
                  Built for the University of Zimbabwe community.
                </p>
              </div>

              {/* ── Right column: real photography ── */}
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-2xl shadow-royal-900/10">
                  <Image
                    src="/pictures/student-browsing-wireless-headphones-marketplace.png"
                    alt="Student browsing wireless headphones on the UZ Marketplace"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>

            {/* ── Early registration announcement strip ── */}
            <div
              data-reveal
              className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-10"
            >
              <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-royal-600">
                    Early Registration Open
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                    Get Ready for the UZ Marketplace Launch
                  </h2>
                  <p className="mt-3 text-sm text-slate-600">
                    Early registration:{" "}
                    <span className="font-bold text-navy-900">Free</span> — Official
                    launch: <span className="font-bold text-navy-900">15 November 2026</span>
                  </p>
                  <p className="mt-3 max-w-xl text-sm text-slate-500">
                    Register now, create your seller profile and submit products or
                    services during the pre-launch period. The full marketplace is
                    still being prepared for launch.
                  </p>
                </div>
                <div className="w-full md:w-auto">
                  <RegisterButton className="w-full rounded-full bg-[#123F83] px-8 py-4 text-base font-bold text-white shadow-xl shadow-[#123F83]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0d2f63] hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123F83] active:scale-[0.98] sm:w-auto">
                    Register Now
                  </RegisterButton>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ── Second hero section: banner variant ── */
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <Image
              src={HERO_BANNER}
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-900/80 to-royal-900/70" />
            <div className="absolute -top-16 -left-16 h-96 w-96 rounded-full bg-royal-400/20 blur-3xl animate-float-y" />
            <div
              className="absolute -bottom-32 -right-16 h-[28rem] w-[28rem] rounded-full bg-sun-300/20 blur-3xl animate-float-y"
              style={{ animationDelay: "3s" }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl py-16 text-center sm:py-24">
              <p
                data-reveal
                style={{ "--reveal-delay": "0ms" } as CSSProperties}
                className="text-sm font-bold uppercase tracking-[0.25em] text-royal-300 animate-fade-up"
              >
                The UZ Campus Experience
              </p>

              <h1
              data-reveal
              style={{ "--reveal-delay": "150ms" } as CSSProperties}
              className="mt-8 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white animate-fade-up sm:text-6xl lg:text-7xl"
            >
              Discover. Shop. Sell. Connect.
            </h1>

            <p
              data-reveal
              style={{ "--reveal-delay": "300ms" } as CSSProperties}
              className="mt-6 font-display text-3xl font-bold tracking-tight text-royal-200 animate-fade-up sm:text-4xl"
            >
              Your Campus. Your Marketplace. Your Opportunity.
            </p>

            <p
              data-reveal
              style={{ "--reveal-delay": "450ms" } as CSSProperties}
              className="mt-6 text-lg leading-relaxed text-white/80 animate-fade-up"
            >
              Real student products, services and stories from the University
              of Zimbabwe — straight from the UZ community.
            </p>

            <div
              data-reveal
              style={{ "--reveal-delay": "600ms" } as CSSProperties}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up"
            >
              <a
                href="/marketplace/explore"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#123F83] px-9 py-4 text-lg font-bold text-white shadow-xl shadow-royal-900/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0d2f63] hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123F83] active:scale-[0.98] sm:w-auto"
              >
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
                Explore Marketplace
              </a>
              <RegisterButton className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-9 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto">
                Start Selling
              </RegisterButton>
            </div>

            <p
              data-reveal
              style={{ "--reveal-delay": "750ms" } as CSSProperties}
              className="mt-8 text-sm font-medium text-white/60 animate-fade-up"
            >
              Built for the University of Zimbabwe community.
            </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
