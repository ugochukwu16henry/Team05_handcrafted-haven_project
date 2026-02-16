"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg-primary border-b border-border-color shadow-sm">
      <nav className="container-fluid">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-accent-header rounded-lg flex items-center justify-center text-text-background font-bold">
              H
            </div>
            <span className="text-accent-header">Haven</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className="text-text-secondary hover:text-accent-header font-medium transition"
            >
              Browse
            </Link>
            <Link
              href="/sellers"
              className="text-text-secondary hover:text-accent-header font-medium transition"
            >
              Sellers
            </Link>
            <Link
              href="/sellers/become"
              className="text-text-secondary hover:text-accent-header font-medium transition"
            >
              Become a Seller
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-accent-header font-medium hover:opacity-80 transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-accent-header text-text-background rounded-lg font-medium hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-accent-header"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border-color py-4 px-4 space-y-3">
            <Link
              href="/products"
              className="block text-text-secondary hover:text-accent-header font-medium"
            >
              Browse
            </Link>
            <Link
              href="/sellers"
              className="block text-text-secondary hover:text-accent-header font-medium"
            >
              Sellers
            </Link>
            <Link
              href="/sellers/become"
              className="block text-text-secondary hover:text-accent-header font-medium"
            >
              Become a Seller
            </Link>
            <hr className="border-border-color" />
            <Link
              href="/login"
              className="block text-accent-header font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block w-full text-center px-4 py-2 bg-accent-header text-text-background rounded-lg font-medium"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
