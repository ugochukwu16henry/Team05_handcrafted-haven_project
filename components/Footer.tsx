'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <footer className="bg-bg-primary text-text-primary border-t border-border-color">
      <div className="container-fluid">
        <div className={`py-6 md:py-8 flex flex-col ${isAuthPage ? 'items-center gap-4 text-center' : 'md:flex-row justify-between items-center gap-4'}`}>
          {!isAuthPage && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent-header rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">H</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-accent-header">Handcrafted Haven</p>
                <p className="text-xs text-text-secondary">Artisan Marketplace</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-text-primary">
            <Link href="/products" className="text-text-secondary hover:text-accent-header transition-colors py-2 px-2 min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2 rounded">
              Products
            </Link>
            <span className="text-border-color hidden sm:inline" aria-hidden>|</span>
            <Link href="/sellers" className="text-text-secondary hover:text-accent-header transition-colors py-2 px-2 min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2 rounded">
              Sellers
            </Link>
            <span className="text-border-color hidden sm:inline" aria-hidden>|</span>
            <Link href="/sellers/become" className="text-text-secondary hover:text-accent-header transition-colors py-2 px-2 min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2 rounded">
              Become a Seller
            </Link>
            {!isAuthPage && (
              <>
                <span className="text-border-color hidden sm:inline" aria-hidden>|</span>
                <Link href="/dashboard" className="text-text-secondary hover:text-accent-header transition-colors py-2 px-2 min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2 rounded">
                  Dashboard
                </Link>
              </>
            )}
          </div>

          <p className="text-sm text-text-secondary">
            &copy; 2026 Handcrafted Haven
          </p>
        </div>
      </div>
    </footer>
  );
}
