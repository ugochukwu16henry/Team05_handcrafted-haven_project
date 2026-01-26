'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-accent-header text-text-background sticky top-0 z-50 shadow-md">
      <div className="container-fluid">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold interactive">
              Handcrafted Haven
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="interactive hover:text-border-accent">
              Home
            </Link>
            <Link href="/products" className="interactive hover:text-border-accent">
              Products
            </Link>
            <Link href="/sellers" className="interactive hover:text-border-accent">
              Sellers
            </Link>
            <Link href="/dashboard" className="interactive hover:text-border-accent">
              Dashboard
            </Link>
            <Link href="/login" className="interactive hover:text-border-accent">
              Login
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden interactive p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="interactive hover:text-border-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="interactive hover:text-border-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/sellers"
                className="interactive hover:text-border-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Sellers
              </Link>
              <Link
                href="/dashboard"
                className="interactive hover:text-border-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/login"
                className="interactive hover:text-border-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}