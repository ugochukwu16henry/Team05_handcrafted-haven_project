import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-accent-header text-text-background">
      <div className="container-fluid">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-border-accent rounded-lg flex items-center justify-center">
                <span className="text-text-primary text-xl font-bold">H</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-background">Handcrafted Haven</h3>
                <p className="text-xs opacity-80">Artisan Marketplace</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Connecting talented artisans with customers who appreciate unique, handcrafted treasures.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="w-8 h-8 bg-border-accent-dark rounded-full flex items-center justify-center interactive hover:bg-border-accent transition">
                <span className="text-sm">f</span>
              </a>
              <a href="#" className="w-8 h-8 bg-border-accent-dark rounded-full flex items-center justify-center interactive hover:bg-border-accent transition">
                <span className="text-sm">t</span>
              </a>
              <a href="#" className="w-8 h-8 bg-border-accent-dark rounded-full flex items-center justify-center interactive hover:bg-border-accent transition">
                <span className="text-sm">in</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-text-background">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="/sellers" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition">
                  Our Artisans
                </Link>
              </li>
              <li>
                <Link href="/categories" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* For Sellers */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-text-background">For Sellers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sell" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition">
                  Start Selling
                </Link>
              </li>
              <li>
                <Link href="/seller-guide" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition">
                  Seller Guide
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-text-background">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border-accent-dark py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="opacity-80">
              &copy; 2026 Handcrafted Haven. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition">
                Terms of Service
              </Link>
              <Link href="/cookies" className="opacity-80 hover:opacity-100 interactive hover:text-border-accent transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}