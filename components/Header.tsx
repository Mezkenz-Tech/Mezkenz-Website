"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" }
];

const IconMenu = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconClose = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-responsive flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-secondary">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
            AI
          </span>
          <span className="sr-only sm:not-sr-only">Atlas IT Solutions</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-secondary lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative transition-colors hover:text-primary focus-visible:text-primary ${
                  isActive ? "text-primary" : "text-secondary"
                }`}
              >
                {link.label}
                {isActive && <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-primary" aria-hidden="true" />}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:inline-flex"
          >
            Book a Free Consult
          </Link>
          <button
            type="button"
            className="inline-flex rounded-full border border-slate-200 p-2 text-secondary transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle navigation</span>
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="container-responsive flex flex-col gap-4 py-4 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-full px-4 py-2 transition hover:bg-slate-100 ${
                  pathname === link.href ? "bg-primary/10 text-primary" : "text-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
