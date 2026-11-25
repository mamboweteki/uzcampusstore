import type { ComponentType, CSSProperties } from "react";
import Image from "next/image";
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
} from "lucide-react";
import { SERVICE_CATEGORIES, PRODUCT_CATEGORIES } from "@/lib/constants";

const PRODUCT_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "Clothing & Fashion": Shirt,
  "Food & Snacks": Coffee,
  "Electronics & Accessories": Smartphone,
  "Beauty & Personal Care": Sparkles,
  "Books & Academic Materials": BookOpen,
  "Student Essentials": Backpack,
  "Sports & Fitness": Dumbbell,
  "Art & Design": Folder,
};

const SERVICE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "Graphic Design": Palette,
  "Website Development": Code2,
  "Photography": Camera,
  "Tutoring": GraduationCap,
  "Printing Services": Printer,
  "CV & Professional Services": Briefcase,
  "Language Tutoring": Palette,
  "Event Planning": Code2,
};

const PRODUCT_GRADIENTS = [
  "from-royal-400 to-royal-700",
  "from-royal-500 to-navy-800",
  "from-sun-300 to-royal-500",
  "from-indigo-400 to-royal-600",
  "from-royal-600 to-navy-900",
  "from-sky-400 to-indigo-600",
];

interface CategoryCardProps {
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  gradient: string;
  delay?: number;
}

function CategoryCard({ name, description, icon: Icon, gradient, delay = 0 }: CategoryCardProps) {
  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-royal-200 hover:shadow-xl hover:shadow-royal-600/10"
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{name}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}

export default function Categories() {
  return (
    <section id="categories" className="relative overflow-hidden bg-white py-20 sm:py-24">
      {/* Ambient background photography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <Image
          src="/pictures/hero-students.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            data-reveal
            className="text-sm font-semibold uppercase tracking-[0.2em] text-royal-600"
          >
            What Can You Sell or Offer?
          </p>
          <h2
            data-reveal
            className="mt-4 font-display text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl"
          >
            WHATEVER YOU OFFER, THERE&apos;S A PLACE FOR IT.
          </h2>
          <p data-reveal className="mt-5 text-lg text-slate-600">
            Turn your skills, products and entrepreneurial ideas into
            opportunities within the UZ community.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_CATEGORIES.map((category, index) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              description={category.description}
              icon={PRODUCT_ICONS[category.name] ?? Sparkles}
              gradient={PRODUCT_GRADIENTS[index % PRODUCT_GRADIENTS.length]}
              delay={index * 80}
            />
          ))}
        </div>

        <h3 className="mt-20 text-center font-display text-2xl font-bold text-navy-900 sm:text-3xl">
          Services students are already offering
        </h3>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((category, index) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              description={category.description}
              icon={SERVICE_ICONS[category.name] ?? Sparkles}
              gradient={PRODUCT_GRADIENTS[(index + 2) % PRODUCT_GRADIENTS.length]}
              delay={(index + 2) * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
