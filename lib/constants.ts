export const MARKETPLACE_NAME = "UZ Marketplace";

export const TAGLINE = "Your Campus. Your Marketplace. Your Opportunity.";

export const LAUNCH_DATE = new Date("2026-11-15T00:00:00.000Z");

export const LAUNCH_DATE_LABEL = "15 November 2026";

/** Number of products / services a seller can list during the pre-launch. */
export const LISTING_UNLOCK_LIMIT = 5;

/** Official marketplace launch date (15 November 2026). */
export const OFFICIAL_LAUNCH_DATE = "15 November 2026";

export const SUPPORT_EMAIL = "hello@uzmarketplace.co.zw";

export const NAV_ITEMS = [
  { label: "Products", href: "/marketplace/explore" },
  { label: "Services", href: "/marketplace/explore" },
  { label: "Deals", href: "/marketplace/explore" },
  { label: "Contact", href: "mailto:hello@uzmarketplace.co.zw" },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "What is UZ Marketplace?",
    answer:
      "A digital marketplace designed to connect buyers and sellers within the University of Zimbabwe community.",
  },
  {
    question: "Who can register?",
    answer:
      "Students, staff and other eligible members of the UZ community, subject to platform registration requirements.",
  },
  {
    question: "How much does registration cost?",
    answer:
      "Early registration is free during the pre-launch period. Listing is free — no registration fee applies.",
  },
  {
    question: "Can I upload products and services now?",
    answer:
      "Yes. Registered users can submit their products or services during the pre-launch period.",
  },
  {
    question: "When does the marketplace launch?",
    answer: "The official launch is scheduled for 15 November 2026.",
  },
  {
    question: "Can I sell products and services?",
    answer: "Yes. The platform is designed to support both product listings and service listings.",
  },
  {
    question: "Does registration guarantee sales?",
    answer:
      "No. Registration allows you to prepare your listings for the marketplace. Sales depend on demand, pricing, product quality and customer engagement.",
  },
  {
    question: "Is the full marketplace live?",
    answer:
      "The platform is currently in its pre-launch registration phase. The full marketplace is scheduled to launch on 15 November 2026.",
  },
];

export interface BenefitItem {
  title: string;
  description: string;
}

export const BENEFITS: BenefitItem[] = [
  {
    title: "Reach the UZ Community",
    description:
      "Showcase your products and services to a community centred around the University of Zimbabwe.",
  },
  {
    title: "Sell Your Products",
    description:
      "Prepare your product listings and make your offerings discoverable.",
  },
  {
    title: "Promote Your Skills",
    description:
      "Give your services a platform where potential customers can learn about what you do.",
  },
  {
    title: "One Convenient Platform",
    description:
      "Bring products, services and opportunities together in one marketplace.",
  },
  {
    title: "Be Part of the Launch",
    description:
      "Register early and prepare your listings ahead of the official launch.",
  },
];

export interface StepItem {
  name: string;
  title: string;
  description: string;
}

export const STEPS: StepItem[] = [
  {
    name: "Register",
    title: "STEP 1 — REGISTER",
    description: "Create your marketplace account for free.",
  },
  {
    name: "Upload",
    title: "STEP 2 — UPLOAD",
    description: "Add your products or services, descriptions, prices and images.",
  },
  {
    name: "Launch",
    title: "STEP 3 — GET READY TO LAUNCH",
    description:
      "Your listings will be prepared for the official marketplace launch on 15 November 2026.",
  },
];

export interface ProductCategory {
  name: string;
  description: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { name: "Clothing & Fashion", description: "Campus style, resales and student brands" },
  { name: "Food & Snacks", description: "Homemade treats and late-night bites" },
  { name: "Electronics & Accessories", description: "Gadgets, accessories and phone gear" },
  { name: "Beauty & Personal Care", description: "Student-made care and cosmetics" },
  { name: "Books & Academic Materials", description: "Second-hand textbooks and notes" },
  { name: "Student Essentials", description: "Laptops, stationery and dorm life" },
  { name: "Sports & Fitness", description: "Equipment, gear and activewear" },
  { name: "Art & Design", description: "Prints, crafts and creative works" },
];

export interface ServiceCategory {
  name: string;
  description: string;
}

export interface SampleListing {
  type: "product" | "service";
  name: string;
  category: string;
  description: string;
  price: number;
  status: "PRE-LAUNCH";
  seller: { name: string; email: string; phone: string };
  images: string[];
}

/**
 * Curated pre-launch sample listings used while Supabase is not configured
 * and no seller has listed yet. They showcase the live marketplace and give
 * the community a reason to join before the official launch.
 */
export const SAMPLE_LISTINGS: SampleListing[] = [
  {
    type: "product",
    name: "Vintage Denim Jacket",
    category: "Clothing & Fashion",
    description: "Second-hand vintage denim jacket, barely worn.",
    price: 24.99,
    status: "PRE-LAUNCH",
    seller: { name: "Tapiwa Moyo", email: "tapiwa.moyo@student.universityofzimbabwe.ac.zw", phone: "+263771234567" },
    images: [],
  },
  {
    type: "product",
    name: "A-Level Mathematics Notes Bundle",
    category: "Books & Academic Materials",
    description: "Complete set of handwritten A-Level maths notes and past-paper summaries.",
    price: 9.5,
    status: "PRE-LAUNCH",
    seller: { name: "Farai Chikwanha", email: "farai.chikwanha@student.universityofzimbabwe.ac.zw", phone: "+263772345678" },
    images: [],
  },
  {
    type: "product",
    name: "Homemade ZimBites Snack Pack",
    category: "Food & Snacks",
    description: "Pack of homemade snack treats — maize, roasted groundnuts and biscuits.",
    price: 6.75,
    status: "PRE-LAUNCH",
    seller: { name: "Chipo Dube", email: "chipo.dube@student.universityofzimbabwe.ac.zw", phone: "+263773456789" },
    images: [],
  },
  {
    type: "product",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics & Accessories",
    description: "Lightweight over-ear Bluetooth headphones with charging case.",
    price: 38,
    status: "PRE-LAUNCH",
    seller: { name: "Nyasha Mutasa", email: "nyasha.mutasa@student.universityofzimbabwe.ac.zw", phone: "+263774567890" },
    images: [],
  },
  {
    type: "product",
    name: "UZ Edition Campus Hoodie",
    category: "Clothing & Fashion",
    description: "Official UZ community hoodie — university colours, heavy cotton blend.",
    price: 18.5,
    status: "PRE-LAUNCH",
    seller: { name: "Sindiso Moyo", email: "sindiso.moyo@student.universityofzimbabwe.ac.zw", phone: "+263775678901" },
    images: [],
  },
  {
    type: "product",
    name: "Portable Bluetooth Speaker",
    category: "Electronics & Accessories",
    description: "Water-resistant portable speaker with 12-hour battery life.",
    price: 45.99,
    status: "PRE-LAUNCH",
    seller: { name: "Tariro Ncube", email: "tariro.ncube@student.universityofzimbabwe.ac.zw", phone: "+263776789012" },
    images: [],
  },
  {
    type: "service",
    name: "A-Level Mathematics Tutoring",
    category: "Tutoring",
    description: "One-on-one A-Level maths tutoring with exam-focused preparation.",
    price: 15,
    status: "PRE-LAUNCH",
    seller: { name: "Farai Chikwanha", email: "farai.chikwanha@student.universityofzimbabwe.ac.zw", phone: "+263772345678" },
    images: [],
  },
  {
    type: "service",
    name: "Student Brand Graphic Design",
    category: "Graphic Design",
    description: "Logo, flyer and social media graphics for student ventures and clubs.",
    price: 25,
    status: "PRE-LAUNCH",
    seller: { name: "Tariro Ncube", email: "tariro.ncube@student.universityofzimbabwe.ac.zw", phone: "+263776789012" },
    images: [],
  },
  {
    type: "service",
    name: "CV & Professional Personal Branding",
    category: "CV & Professional Services",
    description: "Resume, LinkedIn and personal branding package for UZ students.",
    price: 12,
    status: "PRE-LAUNCH",
    seller: { name: "Nyasha Mutasa", email: "nyasha.mutasa@student.universityofzimbabwe.ac.zw", phone: "+263774567890" },
    images: [],
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { name: "Graphic Design", description: "Logos, flyers and visual identity" },
  { name: "Website Development", description: "Modern sites for student ventures" },
  { name: "Photography", description: "Campus, events and product shoots" },
  { name: "Tutoring", description: "Exam prep and academic support" },
  { name: "Printing Services", description: "Flyers, portfolios and documents" },
  { name: "CV & Professional Services", description: "Resumes, profiles and personal branding" },
  { name: "Language Tutoring", description: "English, French, Shona and other languages" },
  { name: "Event Planning", description: "Campus events, parties and conferences" },
];
