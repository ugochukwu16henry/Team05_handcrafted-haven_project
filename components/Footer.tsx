'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <footer className="bg-accent-header text-text-background border-t border-border-accent-dark">
      <div className="container-fluid">
        <div className={`py-6 md:py-8 flex flex-col ${isAuthPage ? 'items-center gap-4 text-center' : 'md:flex-row justify-between items-center gap-4'}`}>
          {!isAuthPage && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-border-accent to-border-accent-dark rounded-lg flex items-center justify-center">
                <span className="text-text-primary text-lg font-bold">H</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-text-background">Handcrafted Haven</p>
                <p className="text-xs opacity-80">Artisan Marketplace</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <Link href="/products" className="opacity-80 hover:opacity-100 transition-opacity py-2 px-2 min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent-header rounded">
              Products
            </Link>
            <span className="opacity-60 hidden sm:inline" aria-hidden>|</span>
            <Link href="/sellers" className="opacity-80 hover:opacity-100 transition-opacity py-2 px-2 min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent-header rounded">
              Sellers
            </Link>
            <span className="opacity-60 hidden sm:inline" aria-hidden>|</span>
            <Link href="/sellers/become" className="opacity-80 hover:opacity-100 transition-opacity py-2 px-2 min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent-header rounded">
              Become a Seller
            </Link>
            {!isAuthPage && (
              <>
                <span className="opacity-60 hidden sm:inline" aria-hidden>|</span>
                <Link href="/dashboard" className="opacity-80 hover:opacity-100 transition-opacity py-2 px-2 min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent-header rounded">
                  Dashboard
                </Link>
              </>
            )}
          </div>

          <p className="text-sm opacity-80">
            &copy; 2026 Handcrafted Haven
          </p>
        </div>
      </div>
    </footer>
  );
}
