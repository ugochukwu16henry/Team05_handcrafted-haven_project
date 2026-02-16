"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="container-fluid">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
              H
            </div>
            <span className="text-gray-900">Haven</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className="text-gray-600 hover:text-blue-600 font-medium transition"
            >
              Browse
            </Link>
            <Link
              href="/sellers"
              className="text-gray-600 hover:text-blue-600 font-medium transition"
            >
              Sellers
            </Link>
            <Link
              href="/sellers/become"
              className="text-gray-600 hover:text-blue-600 font-medium transition"
            >
              Become a Seller
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
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
          <div className="md:hidden border-t border-gray-200 py-4 px-4 space-y-3">
            <Link
              href="/products"
              className="block text-gray-600 hover:text-blue-600 font-medium"
            >
              Browse
            </Link>
            <Link
              href="/sellers"
              className="block text-gray-600 hover:text-blue-600 font-medium"
            >
              Sellers
            </Link>
            <Link
              href="/sellers/become"
              className="block text-gray-600 hover:text-blue-600 font-medium"
            >
              Become a Seller
            </Link>
            <hr />
            <Link
              href="/login"
              className="block text-blue-600 font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
