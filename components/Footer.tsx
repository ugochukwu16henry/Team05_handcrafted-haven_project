import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-accent-header via-border-accent-dark to-accent-header text-text-background">
      <div className="container-fluid">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-border-accent rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-text-primary text-xl font-bold">H</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-background">Handcrafted Haven</h3>
                <p className="text-xs opacity-80">Artisan Marketplace</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed mb-6">
              Connecting talented artisans with customers who appreciate unique, handcrafted treasures. Supporting creators worldwide.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-border-accent rounded-full flex items-center justify-center interactive hover:bg-text-background hover:text-accent-header transition font-bold">
                f
              </a>
              <a href="#" className="w-10 h-10 bg-border-accent rounded-full flex items-center justify-center interactive hover:bg-text-background hover:text-accent-header transition font-bold">
                𝕏
              </a>
              <a href="#" className="w-10 h-10 bg-border-accent rounded-full flex items-center justify-center interactive hover:bg-text-background hover:text-accent-header transition font-bold">
                in
              </a>
              <a href="#" className="w-10 h-10 bg-border-accent rounded-full flex items-center justify-center interactive hover:bg-text-background hover:text-accent-header transition font-bold">
                📸
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-6 text-text-background flex items-center gap-2">
              <span className="text-lg">🛍️</span> Marketplace
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="/sellers" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                  Our Artisans
                </Link>
              </li>
              <li>
                <Link href="/categories" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                  Blog & Stories
                </Link>
              </li>
            </ul>
          </div>
          
          {/* For Sellers */}
          <div>
            <h4 className="text-base font-bold mb-6 text-text-background flex items-center gap-2">
              <span className="text-lg">🎨</span> For Sellers
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/sell" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                  Start Selling
                </Link>
              </li>
              <li>
                <Link href="/seller-guide" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                  Seller Guide
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-base font-bold mb-6 text-text-background flex items-center gap-2">
              <span className="text-lg">❓</span> Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/help" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-border-accent-dark">
          <div className="max-w-md">
            <h4 className="text-base font-bold mb-3 text-text-background">Stay Updated</h4>
            <p className="text-sm opacity-90 mb-4">Get the latest collections and artisan stories delivered to your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-border-accent"
              />
              <button className="bg-border-accent text-accent-header px-6 py-2 rounded-lg font-semibold interactive hover:bg-text-background transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border-accent-dark py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="opacity-80">
              &copy; 2026 Handcrafted Haven. All rights reserved. Crafted with ❤️ for artisans.
            </p>
            <div className="flex gap-6 flex-wrap justify-center">
              <Link href="/privacy" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                Terms of Service
              </Link>
              <Link href="/cookies" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition font-medium">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
