import { TAGLINE } from "@/lib/constants";

const EXPLORE_LINKS = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Benefits", href: "#benefits" },
  { label: "FAQs", href: "#faqs" },
];

const RESOURCE_LINKS = [
  { label: "Contact", href: "mailto:hello@uzmarketplace.co.zw" },
  { label: "Terms & Conditions", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className="max-w-md text-center md:text-left">
            <div className="flex items-center gap-2.5 justify-center md:justify-start">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-royal-500 to-royal-700 text-white shadow-lg shadow-royal-600/30">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                UZ Marketplace
              </span>
            </div>
            <p className="mt-5 text-sm text-royal-200/80">{TAGLINE}</p>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-royal-300">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-royal-100/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-royal-300">
                Resources
              </h3>
              <ul className="mt-4 space-y-2.5">
                {RESOURCE_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-royal-100/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-navy-800 pt-8 text-sm text-royal-200/60 sm:flex-row">
          <p>{`UZ Marketplace — Connecting the University of Zimbabwe Community.`}</p>
          <p>© 2026 UZ Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
