"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Check, CheckCircle2, Loader2, X } from "lucide-react";
import { LAUNCH_DATE_LABEL, PRODUCT_CATEGORIES, SERVICE_CATEGORIES } from "@/lib/constants";

type Step = 1 | 2;

interface AccountDetails {
  fullName: string;
  email: string;
  phone: string;
  affiliation: string;
  idNumber: string;
  password: string;
}

interface ListingImage {
  name: string;
  preview: string;
}

const EMPTY_ACCOUNT: AccountDetails = {
  fullName: "",
  email: "",
  phone: "",
  affiliation: "",
  idNumber: "",
  password: "",
};

const AFFILIATIONS = [
  "University of Zimbabwe Student",
  "University of Zimbabwe Staff",
  "UZ Alumni",
  "Other approved UZ community member",
];

const STEPS = [
  { id: 1, label: "Account" },
  { id: 2, label: "Seller Setup" },
];

export default function RegisterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<Step>(1);
  const [account, setAccount] = useState<AccountDetails>(EMPTY_ACCOUNT);
  const [errors, setErrors] = useState<Partial<Record<keyof AccountDetails, string>>>({});
  const [listingSubmitted, setListingSubmitted] = useState(false);
  const [listingError, setListingError] = useState<string | null>(null);
  const [submittingListing, setSubmittingListing] = useState(false);
  const [listingType, setListingType] = useState<"product" | "service">("product");
  const [listingCategory, setListingCategory] = useState<string>("");
  const [listingName, setListingName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priceValue, setPriceValue] = useState<string>("");
  const [images, setImages] = useState<ListingImage[]>([]);
  const [contactPhone, setContactPhone] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setStep(1);
    setListingSubmitted(false);
    setListingError(null);
    setSubmittingListing(false);
    setListingType("product");
    setListingCategory("");
    setListingName("");
    setDescription("");
    setPriceValue("");
    setImages([]);
    setContactPhone("");
    setContactEmail("");
  }, [open]);

  if (!open) return null;

  const setAccountField = (field: keyof AccountDetails, value: string) => {
    setAccount((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateAccount = (): boolean => {
    const nextErrors: Partial<Record<keyof AccountDetails, string>> = {};

    if (account.fullName.trim().length < 2) {
      nextErrors.fullName = "Please enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (account.phone.replace(/\D/g, "").length < 7) {
      nextErrors.phone = "Please enter a valid phone number.";
    }
    if (!account.affiliation) {
      nextErrors.affiliation = "Please select your university affiliation.";
    }
    if (account.idNumber.trim().length < 3) {
      nextErrors.idNumber = "Please enter your student or staff identification number.";
    }
    if (account.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onAccountSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateAccount()) return;
    setContactPhone(account.phone);
    setContactEmail(account.email);
    try {
      window.sessionStorage.setItem("uzm_pending_account", JSON.stringify(account));
    } catch {
      // Ignore storage failures.
    }
    setStep(2);
  };

  const submitListing = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingListing) return;

    if (listingName.trim().length < 3) {
      setListingError("Please give your listing a name (min. 3 characters).");
      return;
    }
    if (!listingCategory) {
      setListingError("Please select a category.");
      return;
    }
    if (description.trim().length < 10) {
      setListingError("Please add a description (min. 10 characters).");
      return;
    }
    const price = Number(priceValue);
    if (!Number.isFinite(price) || price <= 0) {
      setListingError("Please enter a valid price greater than zero.");
      return;
    }

    setSubmittingListing(true);
    setListingError(null);

    const payload = {
      type: listingType,
      name: listingName.trim(),
      category: listingCategory,
      description: description.trim(),
      price: Number(price.toFixed(2)),
      status: "PRE-LAUNCH",
      seller: { name: account.fullName, email: account.email, phone: account.phone },
      images: images.map((image) => image.name),
    };

    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? "Listing could not be submitted.");
      }

      setListingSubmitted(true);
    } catch {
      setListingSubmitted(false);
      setListingError("We couldn't submit your listing right now. Please try again.");
    } finally {
      setSubmittingListing(false);
    }
  };

  const stepState = (id: number) => (step > id ? "completed" : step === id ? "current" : "upcoming");

  const stepIndicator = (
    <div className="flex items-center" role="list" aria-label="Registration progress">
      {STEPS.map((s, index) => {
        const state = stepState(s.id);
        return (
          <div key={s.id} className="flex flex-1 items-center gap-2" role="listitem">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                state === "completed"
                  ? "bg-emerald-500 text-white"
                  : state === "current"
                    ? "bg-royal-600 text-white"
                    : "bg-slate-100 text-slate-500"
              }`}
            >
              {state === "completed" ? <Check className="h-4 w-4" /> : s.id}
            </span>
            <span className={`hidden text-xs font-semibold sm:block ${state === "current" ? "text-royal-700" : "text-slate-400"}`}>
              {s.label}
            </span>
            {index < STEPS.length - 1 ? (
              <span
                aria-hidden="true"
                className={`mx-2 h-px flex-1 ${step > s.id ? "bg-emerald-400" : "bg-slate-200"}`}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );

  const modalTitle =
    step === 1 ? "Create your marketplace account" : "Seller dashboard — pre-launch setup";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-navy-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="uzm-modal-title"
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl focus:outline-none sm:rounded-3xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur">
          <div>
            <h2 id="uzm-modal-title" className="font-display text-xl font-bold text-navy-900">
              {modalTitle}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">UZ Marketplace · Pre-launch phase</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close registration dialog"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-navy-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 pt-6">{stepIndicator}</div>

        {/* STEP 1 — ACCOUNT */}
        {step === 1 ? (
          <form onSubmit={onAccountSubmit} className="space-y-5 px-6 pb-8" noValidate>
            <div>
              <label htmlFor="uzm-full-name" className="mb-1.5 block text-sm font-semibold text-navy-900">
                Full name <span className="text-royal-600">*</span>
              </label>
              <input
                id="uzm-full-name"
                type="text"
                autoComplete="name"
                value={account.fullName}
                onChange={(e) => setAccountField("fullName", e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-navy-900 placeholder-slate-400 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100"
                placeholder="e.g. Tapiwa Moyo"
              />
              {errors.fullName ? <p className="mt-1.5 text-xs font-medium text-red-600">{errors.fullName}</p> : null}
            </div>

            <div>
              <label htmlFor="uzm-email" className="mb-1.5 block text-sm font-semibold text-navy-900">
                Email address <span className="text-royal-600">*</span>
              </label>
              <input
                id="uzm-email"
                type="email"
                autoComplete="email"
                value={account.email}
                onChange={(e) => setAccountField("email", e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-navy-900 placeholder-slate-400 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100"
                placeholder="you@universityofzimbabwe.ac.zw"
              />
              {errors.email ? <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p> : null}
            </div>

            <div>
              <label htmlFor="uzm-phone" className="mb-1.5 block text-sm font-semibold text-navy-900">
                Phone number <span className="text-royal-600">*</span>
              </label>
              <input
                id="uzm-phone"
                type="tel"
                autoComplete="tel"
                value={account.phone}
                onChange={(e) => setAccountField("phone", e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-navy-900 placeholder-slate-400 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100"
                placeholder="+263 XX XXX XXXX"
              />
              {errors.phone ? <p className="mt-1.5 text-xs font-medium text-red-600">{errors.phone}</p> : null}
            </div>

            <div>
              <label htmlFor="uzm-affiliation" className="mb-1.5 block text-sm font-semibold text-navy-900">
                University affiliation <span className="text-royal-600">*</span>
              </label>
              <select
                id="uzm-affiliation"
                value={account.affiliation}
                onChange={(e) => setAccountField("affiliation", e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-navy-900 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100"
              >
                <option value="">Select affiliation…</option>
                {AFFILIATIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.affiliation ? <p className="mt-1.5 text-xs font-medium text-red-600">{errors.affiliation}</p> : null}
            </div>

            <div>
              <label htmlFor="uzm-id" className="mb-1.5 block text-sm font-semibold text-navy-900">
                Student registration number or staff ID <span className="text-royal-600">*</span>
              </label>
              <input
                id="uzm-id"
                type="text"
                value={account.idNumber}
                onChange={(e) => setAccountField("idNumber", e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-navy-900 placeholder-slate-400 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100"
                placeholder="e.g. UZ/XXXX/2024"
              />
              {errors.idNumber ? <p className="mt-1.5 text-xs font-medium text-red-600">{errors.idNumber}</p> : null}
            </div>

            <div>
              <label htmlFor="uzm-password" className="mb-1.5 block text-sm font-semibold text-navy-900">
                Password <span className="text-royal-600">*</span>
              </label>
              <input
                id="uzm-password"
                type="password"
                autoComplete="new-password"
                value={account.password}
                onChange={(e) => setAccountField("password", e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-navy-900 placeholder-slate-400 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100"
                placeholder="At least 8 characters"
              />
              {errors.password ? <p className="mt-1.5 text-xs font-medium text-red-600">{errors.password}</p> : null}
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-royal-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-royal-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-royal-700 sm:w-auto"
            >
              Continue to Seller Setup
            </button>
            <p className="text-center text-xs text-slate-500">
              Already registered?{" "}
              <span className="font-semibold text-royal-700">Sign in</span>
            </p>
          </form>
        ) : null}

        {/* SELLER SETUP */}
        {step === 2 ? listingSubmitted ? (
          <div className="space-y-6 px-6 pb-8">
            <div className="flex flex-col items-center py-8 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 className="h-9 w-9 text-emerald-500" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-navy-900">Listing submitted!</h3>
              <p className="mt-3 max-w-md text-sm text-slate-600">
                Your listing has been received and marked{" "}
                <span className="font-bold text-royal-700">PRE-LAUNCH</span>. It will go live at the official
                marketplace launch on {LAUNCH_DATE_LABEL}.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-full bg-royal-600 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-royal-700 sm:w-auto"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submitListing} className="space-y-5 px-6 pb-8">
            <div>
              <span className="mb-2 block text-sm font-semibold text-navy-900">What are you selling?</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setListingType("product");
                    setListingCategory("");
                  }}
                  className={`rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
                    listingType === "product"
                      ? "border-royal-600 bg-royal-50 text-royal-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-royal-300"
                  }`}
                >
                  Product
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setListingType("service");
                    setListingCategory("");
                  }}
                  className={`rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
                    listingType === "service"
                      ? "border-royal-600 bg-royal-50 text-royal-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-royal-300"
                  }`}
                >
                  Service
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="listing-name" className="mb-1.5 block text-sm font-semibold text-navy-900">
                Listing name <span className="text-royal-600">*</span>
              </label>
              <input
                id="listing-name"
                type="text"
                value={listingName}
                onChange={(e) => setListingName(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-navy-900 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100"
                placeholder={listingType === "product" ? "e.g. Vintage Denim Jacket" : "e.g. A-Level Maths Tutoring"}
              />
            </div>

            <div>
              <label htmlFor="listing-category" className="mb-1.5 block text-sm font-semibold text-navy-900">
                Category <span className="text-royal-600">*</span>
              </label>
              <select
                id="listing-category"
                value={listingCategory}
                onChange={(e) => setListingCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-navy-900 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100"
              >
                <option value="">Select category…</option>
                {(listingType === "product" ? PRODUCT_CATEGORIES : SERVICE_CATEGORIES).map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="listing-description" className="mb-1.5 block text-sm font-semibold text-navy-900">
                Description <span className="text-royal-600">*</span>
              </label>
              <textarea
                id="listing-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-navy-900 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100"
                placeholder="Describe your product or service…"
              />
            </div>

            <div>
              <label htmlFor="listing-price" className="mb-1.5 block text-sm font-semibold text-navy-900">
                Price (USD) <span className="text-royal-600">*</span>
              </label>
              <input
                id="listing-price"
                type="number"
                min="0"
                step="0.01"
                value={priceValue}
                onChange={(e) => setPriceValue(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-navy-900 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100"
                placeholder="e.g. 12.00"
              />
            </div>

            <div>
              <label htmlFor="listing-images" className="mb-1.5 block text-sm font-semibold text-navy-900">
                Listing images <span className="font-normal text-slate-500">(optional — preview)</span>
              </label>
              <input
                id="listing-images"
                type="file"
                accept="image/*"
                multiple
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const files = Array.from(e.target.files ?? []);
                  setImages(
                    files.map((file) => ({ name: file.name, preview: URL.createObjectURL(file) }))
                  );
                  e.target.value = "";
                }}
                className="block w-full text-sm font-medium text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-royal-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-royal-700 hover:file:bg-royal-100"
              />
              {images.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-3">
                  {images.map((image, index) => (
                    <div key={`${image.name}-${index}`} className="relative h-20 w-20 overflow-hidden rounded-xl border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.preview} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="listing-contact-phone" className="mb-1.5 block text-sm font-semibold text-navy-900">
                  Seller contact phone
                </label>
                <input
                  id="listing-contact-phone"
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-navy-900 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100"
                />
              </div>
              <div>
                <label htmlFor="listing-contact-email" className="mb-1.5 block text-sm font-semibold text-navy-900">
                  Seller contact email
                </label>
                <input
                  id="listing-contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-navy-900 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100"
                />
              </div>
            </div>

            {listingError ? <p className="text-sm font-medium text-red-600">{listingError}</p> : null}

            <button
              type="submit"
              disabled={submittingListing}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-royal-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-royal-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-royal-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {submittingListing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Submitting…
                </>
              ) : (
                "Submit listing for launch"
              )}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
