"use client";

import { useEffect, useState } from "react";
import {
  Backpack,
  BookOpen,
  Briefcase,
  Camera,
  Code2,
  Coffee,
  Dumbbell,
  GraduationCap,
  Palette,
  Printer,
  Shirt,
  Smartphone,
  Sparkles,
  Folder,
  Package,
  MessageCircle,
  Phone,
  Store,
} from "lucide-react";
import { SERVICE_CATEGORIES, PRODUCT_CATEGORIES } from "@/lib/constants";

export interface ListingItem {
  type?: string;
  name?: string;
  category?: string;
  description?: string;
  price?: number;
  status?: string;
  seller?: { name?: string; email?: string; phone?: string };
  images?: string[];
}

interface LiveListingsProps {
  /** Maximum number of listings to render before the marketplace fills up. */
  limit?: number;
}

const PRODUCT_ICONS: Record<string, typeof Shirt> = {
  "Clothing & Fashion": Shirt,
  "Food & Snacks": Coffee,
  "Electronics & Accessories": Smartphone,
  "Beauty & Personal Care": Sparkles,
  "Books & Academic Materials": BookOpen,
  "Student Essentials": Backpack,
  "Sports & Fitness": Dumbbell,
  "Art & Design": Folder,
};

const SERVICE_ICONS: Record<string, typeof GraduationCap> = {
  "Graphic Design": Palette,
  "Website Development": Code2,
  "Photography": Camera,
  "Tutoring": GraduationCap,
  "Printing Services": Printer,
  "CV & Professional Services": Briefcase,
  "Language Tutoring": Palette,
  "Event Planning": Code2,
};

function SellerContact({ seller }: { seller?: ListingItem["seller"] }) {
  const phone = seller?.phone ?? "";
  const digits = phone.replace(/\D/g, "");
  const hasSeller = Boolean(seller?.name || digits);

  if (!hasSeller) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Seller</p>
        <p className="truncate text-sm font-semibold text-navy-900">{seller?.name ?? "UZ Marketplace seller"}</p>
      </div>
      {digits ? (
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`https://wa.me/${digits}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white transition-all duration-300 hover:bg-emerald-700"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-royal-600 bg-white px-3.5 py-2 text-xs font-bold text-royal-700 transition-all duration-300 hover:bg-royal-50"
          >
            <Phone className="h-3.5 w-3.5" />
            Call
          </a>
        </div>
      ) : null}
    </div>
  );
}

function AmazonStyleCard({ listing }: { listing: ListingItem }) {
  const isService = listing.type === "service";
  const categoryName = listing.category ?? (isService ? SERVICE_CATEGORIES[0].name : PRODUCT_CATEGORIES[0].name);
  const categoryMeta = isService
    ? SERVICE_CATEGORIES.find((c) => c.name === categoryName)
    : PRODUCT_CATEGORIES.find((c) => c.name === categoryName);
  const Icon = (isService ? SERVICE_ICONS : PRODUCT_ICONS)[categoryName] ?? Sparkles;
  const price = Number(listing.price ?? 0);

  return (
    <div className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-royal-200 hover:shadow-xl hover:shadow-royal-600/10">
      <div className="flex items-start gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-royal-400 to-royal-700 text-white shadow-lg">
          <Icon className="h-7 w-7" />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-royal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-royal-700">
              {isService ? "Service" : "Product"}
            </span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
              Pre-launch
            </span>
          </div>
          <h3 className="mt-2 font-display text-xl font-bold text-navy-900">{listing.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{listing.description}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="font-display text-2xl font-extrabold text-[#123F83]">
          {price > 0 ? `$${price.toFixed(2)}` : "Free"}
        </span>
        <span className="text-xs font-semibold text-slate-500">{categoryMeta?.name ?? categoryName}</span>
      </div>

      <SellerContact seller={listing.seller} />
    </div>
  );
}

function AlibabaStyleCard({ listing }: { listing: ListingItem }) {
  const categoryName = listing.category ?? SERVICE_CATEGORIES[0].name;
  const Icon = SERVICE_ICONS[categoryName] ?? Sparkles;
  const price = Number(listing.price ?? 0);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-royal-200 hover:shadow-xl hover:shadow-royal-600/10">
      <div className="h-2 w-full bg-gradient-to-r from-royal-500 via-royal-400 to-sun-300" />
      <div className="p-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-royal-500 to-navy-800 text-white">
            <Store className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-bold text-navy-900">{listing.seller?.name ?? "UZ Supplier"}</p>
            <p className="text-xs text-slate-500">Alibaba-style supplier storefront</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-royal-50 text-royal-700">
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-navy-900">{listing.name}</h3>
            <p className="text-xs text-slate-500">{listing.description}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="font-display text-2xl font-extrabold text-[#123F83]">
            {price > 0 ? `$${price.toFixed(2)}` : "Free"}
          </span>
          <span className="rounded-full bg-royal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-royal-700">
            Supplier service
          </span>
        </div>

        <SellerContact seller={listing.seller} />
      </div>
    </div>
  );
}

export default function LiveListings({ limit = 6 }: LiveListingsProps) {
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/api/listings", { cache: "no-store" });
        const data = (await response.json().catch(() => ({}))) as { listings?: ListingItem[] };
        if (!cancelled) {
          setListings(Array.isArray(data?.listings) ? data.listings : []);
        }
      } catch {
        if (!cancelled) {
          setListings([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-royal-600">
            Live Listings
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Fresh from the UZ community
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: Math.min(3, limit) }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-44 animate-pulse rounded-3xl border border-slate-200 bg-slate-50"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const visible = listings
    .slice()
    .sort((a, b) => Number(a.type === "service") - Number(b.type === "service"))
    .slice(0, limit);

  if (visible.length === 0) {
    return (
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-8 py-12 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-50 text-royal-600">
              <Package className="h-7 w-7" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold text-navy-900">
              No listings live yet
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Be the first to list — it&apos;s free — your listing will appear
              here instantly.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-royal-600">
            Live Listings
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
            Fresh from the UZ community
          </h2>
          <p className="mt-5 text-lg text-slate-600">
            Newly listed products and services from student sellers, ready for
            the marketplace.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((listing, index) => (
            <div key={`${listing.name}-${index}`}>
              {listing.type === "service" ? (
                <AlibabaStyleCard listing={listing} />
              ) : (
                <AmazonStyleCard listing={listing} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
