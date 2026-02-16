'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <header className="bg-bg-primary border-b border-border-color sticky top-0 z-50 shadow-sm">
      <div className="container-fluid">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 interactive group">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-header to-border-accent rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
              <span className="text-text-background text-xl font-bold">H</span>
            </div>
            <div>
              <div className="text-xl font-bold text-accent-header">Handcrafted Haven</div>
              <div className="text-xs text-text-secondary hidden sm:block">Artisan Marketplace</div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-text-primary font-medium px-4 py-2.5 rounded-lg interactive hover:text-accent-header hover:bg-bg-secondary transition-colors duration-200 min-h-[44px] flex items-center">
              Home
            </Link>
            <Link href="/products" className="text-text-primary font-medium px-4 py-2.5 rounded-lg interactive hover:text-accent-header hover:bg-bg-secondary transition-colors duration-200 min-h-[44px] flex items-center">
              Products
            </Link>
            <Link href="/sellers" className="text-text-primary font-medium px-4 py-2.5 rounded-lg interactive hover:text-accent-header hover:bg-bg-secondary transition-colors duration-200 min-h-[44px] flex items-center">
              Sellers
            </Link>
            {!isAuthPage && (
              <Link href="/dashboard" className="text-text-primary font-medium px-4 py-2.5 rounded-lg interactive hover:text-accent-header hover:bg-bg-secondary transition-colors duration-200 min-h-[44px] flex items-center">
                Dashboard
              </Link>
            )}
            <div className="flex items-center gap-3 ml-2">
              <Link 
                href="/signup" 
                className="text-text-primary font-medium px-4 py-2.5 rounded-lg interactive hover:text-accent-header hover:bg-bg-secondary transition-colors duration-200 min-h-[44px] flex items-center"
              >
                Sign Up
              </Link>
              <Link 
                href="/login" 
                className="bg-accent-header text-text-background px-6 py-3 rounded-lg font-semibold interactive hover:opacity-90 hover:shadow-lg transition-all duration-200 shadow-md min-h-[44px] flex items-center"
              >
                Login
              </Link>
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden interactive p-3 rounded-lg hover:bg-bg-secondary transition min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6 text-accent-header" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-color">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="px-4 py-2 rounded-lg text-text-primary font-medium interactive hover:bg-bg-secondary transition" 
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="px-4 py-2 rounded-lg text-text-primary font-medium interactive hover:bg-bg-secondary transition" 
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/sellers" 
                className="px-4 py-2 rounded-lg text-text-primary font-medium interactive hover:bg-bg-secondary transition" 
                onClick={() => setIsMenuOpen(false)}
              >
                Sellers
              </Link>
              {!isAuthPage && (
                <Link 
                  href="/dashboard" 
                  className="px-4 py-2 rounded-lg text-text-primary font-medium interactive hover:bg-bg-secondary transition" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link 
                href="/signup" 
                className="px-4 py-3 rounded-lg text-text-primary font-medium interactive hover:bg-bg-secondary hover:text-accent-header transition-colors duration-200" 
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link 
                href="/login" 
                className="mx-4 bg-accent-header text-text-background px-6 py-3 rounded-lg font-semibold text-center interactive hover:opacity-90 hover:shadow-lg transition-all duration-200" 
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
