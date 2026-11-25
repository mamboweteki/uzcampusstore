"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, MessageCircle, Phone, ShoppingCart, Star } from "lucide-react";

interface FeaturedProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  listPrice?: number;
  rating: number;
  ratingsCount: number;
  delivery: string;
  image: string;
  alt: string;
  badge?: string;
  sellerName?: string;
  sellerPhone?: string;
}

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: "wireless-bluetooth-headphones",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics & Accessories",
    description: "Lightweight over-ear Bluetooth headphones with charging case.",
    price: 38,
    listPrice: 49.99,
    rating: 4.7,
    ratingsCount: 1284,
    delivery: "FREE delivery tomorrow",
    image: "/pictures/student-browsing-wireless-headphones-marketplace.png",
    alt: "Student browsing wireless headphones on the UZ Marketplace",
    badge: "STUDENT DEAL −22%",
    sellerName: "Nyasha Mutasa",
    sellerPhone: "+263774567890",
  },
  {
    id: "uz-campus-hoodie",
    name: "UZ Edition Campus Hoodie",
    category: "Clothing & Fashion",
    description: "University colours, heavy cotton blend — wear the campus vibe.",
    price: 18.5,
    rating: 4.9,
    ratingsCount: 356,
    delivery: "FREE delivery tomorrow",
    image: "/pictures/Student Exploring UZ Marketplace.png",
    alt: "Students exploring the UZ Marketplace on campus",
    badge: "LIMITED",
    sellerName: "Sindiso Moyo",
    sellerPhone: "+263775678901",
  },
  {
    id: "homemade-zimbites-snack-pack",
    name: "Homemade ZimBites Snack Pack",
    category: "Food & Snacks",
    description: "Pack of homemade treats — maize, roasted groundnuts and biscuits.",
    price: 6.75,
    rating: 4.6,
    ratingsCount: 89,
    delivery: "FREE delivery tomorrow",
    image: "/pictures/pexels-safari-consoler-3290243-20240506.jpg",
    alt: "Homemade snack pack ready for delivery",
    badge: "STUDENT DEAL",
    sellerName: "Chipo Dube",
    sellerPhone: "+263773456789",
  },
  {
    id: "alevel-mathematics-notes",
    name: "A-Level Mathematics Notes Bundle",
    category: "Books & Academic Materials",
    description: "Complete handwritten notes and past-paper summaries.",
    price: 9.5,
    rating: 4.8,
    ratingsCount: 145,
    delivery: "FREE delivery tomorrow",
    image: "/pictures/pexels-oacthecreator-10604068.jpg",
    alt: "Student study materials for A-Level mathematics",
    badge: "BEST SELLER",
    sellerName: "Farai Chikwanha",
    sellerPhone: "+263772345678",
  },
  {
    id: "vintage-denim-jacket",
    name: "Vintage Denim Jacket",
    category: "Clothing & Fashion",
    description: "Second-hand vintage denim jacket, barely worn.",
    price: 24.99,
    rating: 4.8,
    ratingsCount: 214,
    delivery: "FREE delivery tomorrow",
    image: "/pictures/hero-students.jpg",
    alt: "Students chatting on campus",
    badge: "STUDENT DEAL",
    sellerName: "Tapiwa Moyo",
    sellerPhone: "+263771234567",
  },
  {
    id: "portable-bluetooth-speaker",
    name: "Portable Bluetooth Speaker",
    category: "Electronics & Accessories",
    description: "Water-resistant speaker with 12-hour battery life.",
    price: 45.99,
    listPrice: 59.99,
    rating: 4.5,
    ratingsCount: 167,
    delivery: "FREE delivery tomorrow",
    image: "/pictures/pexels-juliolopez-29502358.jpg",
    alt: "Student with portable speaker",
    badge: "STUDENT DEAL −22%",
    sellerName: "Tariro Ncube",
    sellerPhone: "+263776789012",
  },
];

function AddToCartButton({ added, onAdd }: { added: boolean; onAdd: () => void }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFA41C] py-3 text-sm font-bold text-white shadow-lg shadow-[#FFA41C]/30 transition-all duration-300 hover:bg-[#fa8f0e] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123F83] active:scale-[0.98]"
    >
      {added ? (
        <>
          <Check className="h-4 w-4" aria-hidden="true" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          Add to Cart
        </>
      )}
    </button>
  );
}

function LargeProductCard({ product }: { product: FeaturedProduct }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-royal-900/10 lg:grid lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden bg-slate-100 lg:aspect-[4/3]">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-[#B12704] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
            {product.badge}
          </span>
        ) : null}
      </div>

      <div className="p-8 sm:p-10 lg:p-12">
        <span className="inline-flex items-center rounded-full bg-royal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-royal-700">
          {product.category}
        </span>

        <h3 className="mt-3 font-display text-2xl font-bold text-navy-900 lg:text-3xl">{product.name}</h3>
        <p className="mt-2 text-sm text-slate-600">{product.description}</p>

        <div className="mt-4 flex items-center gap-2">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
          <span className="text-sm font-bold text-slate-800">{product.rating}</span>
          <span className="text-sm text-slate-500">({product.ratingsCount.toLocaleString()} ratings)</span>
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-4xl font-extrabold text-[#B12704]">${product.price.toFixed(2)}</span>
          {product.listPrice ? (
            <span className="text-sm text-slate-400 line-through">${product.listPrice.toFixed(2)}</span>
          ) : null}
        </div>

        <p className="mt-2 text-sm font-medium text-emerald-700">{product.delivery}</p>

        <div className="mt-6">
          <AddToCartButton added={added} onAdd={handleAddToCart} />
        </div>

        {product.sellerName ? (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Seller</p>
              <p className="truncate text-sm font-semibold text-navy-900">{product.sellerName}</p>
            </div>
            {product.sellerPhone ? (
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={`https://wa.me/${product.sellerPhone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white transition-all duration-300 hover:bg-emerald-700"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${product.sellerPhone}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-royal-600 bg-white px-3.5 py-2 text-xs font-bold text-royal-700 transition-all duration-300 hover:bg-royal-50"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  Call
                </a>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SmallProductCard({ product }: { product: FeaturedProduct }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-royal-200 hover:shadow-lg">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wide text-royal-600">{product.category}</p>
        <h3 className="truncate font-display text-base font-bold text-navy-900">{product.name}</h3>

        <div className="mt-1 flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
          <span className="text-xs font-bold text-slate-800">{product.rating}</span>
          <span className="text-xs text-slate-500">({product.ratingsCount})</span>
        </div>

        <div className="mt-0.5 flex items-baseline gap-2">
          <span className="font-display text-xl font-extrabold text-[#B12704]">${product.price.toFixed(2)}</span>
          {product.listPrice ? (
            <span className="text-xs text-slate-400 line-through">${product.listPrice.toFixed(2)}</span>
          ) : null}
        </div>

        <p className="mt-0.5 text-xs font-medium text-emerald-700">{product.delivery}</p>

        <div className="mt-2">
          <AddToCartButton added={added} onAdd={handleAddToCart} />
        </div>

        {product.sellerName ? (
          <p className="mt-2 text-xs font-semibold text-slate-600">
            Seller:{" "}
            <span className="font-bold text-navy-900">{product.sellerName}</span>
          </p>
        ) : null}
        {product.sellerPhone ? (
          <div className="mt-2 flex items-center gap-2">
            <a
              href={`https://wa.me/${product.sellerPhone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white transition-all duration-300 hover:bg-emerald-700"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={`tel:${product.sellerPhone}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-royal-600 bg-white px-3.5 py-2 text-xs font-bold text-royal-700 transition-all duration-300 hover:bg-royal-50"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              Call
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <section id="featured" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-royal-600">
            Featured Products
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
            Featured on the UZ Marketplace
          </h2>
          <p className="mt-5 text-lg text-slate-600">
            Real products being sold by students across the University of Zimbabwe —
            ready to shop before the official launch.
          </p>
        </div>

        {/* Big featured deal */}
        <div className="mt-12">
          <LargeProductCard product={FEATURED_PRODUCTS[0]} />
        </div>

        {/* Small product cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PRODUCTS.slice(1).map((product) => (
            <SmallProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
