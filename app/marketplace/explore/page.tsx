import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Categories from "@/components/Categories";
import LiveListings from "@/components/LiveListings";

export const metadata: Metadata = {
  title: "Explore the Marketplace — UZ Marketplace",
  description:
    "Browse products and services from student sellers within the University of Zimbabwe community.",
};

export default function ExploreMarketplacePage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 sm:pt-28">
        <Categories />
      </div>
      <LiveListings limit={9} />
    </main>
  );
}
