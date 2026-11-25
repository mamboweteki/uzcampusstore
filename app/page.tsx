import type { Metadata } from "next";
import { RegistrationProvider } from "@/components/RegistrationContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "UZ Marketplace — Discover. Shop. Sell. Connect.",
  description:
    "Discover products, shop from fellow students, find useful services and showcase your own business — all within the University of Zimbabwe community. Early access registration is open — it's free. Launching 15 November 2026.",
};

export default function Home() {
  return (
    <RegistrationProvider>
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <Categories />
        <Faq />
      </main>
      <Footer />
    </RegistrationProvider>
  );
}
