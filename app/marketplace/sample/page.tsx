import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Categories from "@/components/Categories";
import { PRODUCT_CATEGORIES, SERVICE_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sample Listings — UZ Marketplace",
  description: "Browse sample products and services from the UZ Marketplace community",
};

export default function SampleListingsPage() {
  return (
    <main className="pt-24 sm:pt-28">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-4xl font-bold tracking-tight text-navy-900 mb-8">
          Sample Products & Services
        </h2>

        <Categories />

        <div className="mt-20">
          <h3 className="font-display text-2xl font-bold text-navy-900 mb-6">
            Featured Product Listings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Product Cards */}
            {["Laptop", "Textbooks", "Camera", "Phone", "Basketball", "Dorm Bed"].map(
              (item, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-royal-200 hover:shadow-xl hover:shadow-royal-600/10"
                >
                  <div className="h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-royal-500 to-royal-700 text-white shadow-lg mb-4">
                    <i
                      className="h-6 w-6"
                      style={{ fontFamily: "inherit" }}
                    >{item}</i>
                  </div>
                  <h4 className="font-display font-bold text-navy-900 mb-2">{item}</h4>
                  <p className="text-sm text-slate-600">
                    Student seller · Various conditions available
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        <div className="mt-20">
          <h3 className="font-display text-2xl font-bold text-navy-900 mb-6">
            Featured Service Listings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Service Cards */}
            {["Graphic Design", "Tutoring", "Photography", "Web Dev", "Printing", "CV Help"].map(
              (item, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-royal-200 hover:shadow-xl hover:shadow-royal-600/10"
                >
                  <div className="h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-royal-500 to-royal-700 text-white shadow-lg mb-4">
                    <i
                      className="h-6 w-6"
                      style={{ fontFamily: "inherit" }}
                    >{item}</i>
                  </div>
                  <h4 className="font-display font-bold text-navy-900 mb-2">{item}</h4>
                  <p className="text-sm text-slate-600">
                    Available for UZ community members
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}