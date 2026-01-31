import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-accent-header text-text-background border-t-2 border-border-accent-dark">
      <div className="container-fluid">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-border-accent to-border-accent-dark rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-text-primary text-xl font-bold">H</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-background tracking-tight">Handcrafted Haven</h3>
                <p className="text-xs opacity-90 font-medium">Artisan Marketplace</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed mb-6">
              Connecting talented artisans with customers who appreciate unique, handcrafted treasures.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-border-accent-dark rounded-full flex items-center justify-center interactive hover:bg-border-accent hover:scale-110 transition-all duration-200 shadow-md"
                aria-label="Facebook"
              >
                <span className="text-sm font-semibold">f</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-border-accent-dark rounded-full flex items-center justify-center interactive hover:bg-border-accent hover:scale-110 transition-all duration-200 shadow-md"
                aria-label="Twitter"
              >
                <span className="text-sm font-semibold">t</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-border-accent-dark rounded-full flex items-center justify-center interactive hover:bg-border-accent hover:scale-110 transition-all duration-200 shadow-md"
                aria-label="LinkedIn"
              >
                <span className="text-sm font-semibold">in</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-5 text-text-background uppercase tracking-wide">Marketplace</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition-colors duration-200 inline-block">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="/sellers" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition-colors duration-200 inline-block">
                  Our Artisans
                </Link>
              </li>
              <li>
                <Link href="/categories" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition-colors duration-200 inline-block">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition-colors duration-200 inline-block">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* For Sellers */}
          <div>
            <h4 className="text-base font-bold mb-5 text-text-background uppercase tracking-wide">For Sellers</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/sellers/become" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition-colors duration-200 inline-block">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link href="/seller-guide" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition-colors duration-200 inline-block">
                  Seller Guide
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition-colors duration-200 inline-block">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition-colors duration-200 inline-block">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-base font-bold mb-5 text-text-background uppercase tracking-wide">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/help" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition-colors duration-200 inline-block">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition-colors duration-200 inline-block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition-colors duration-200 inline-block">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition-colors duration-200 inline-block">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t-2 border-border-accent-dark py-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="opacity-90 font-medium">
              &copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 justify-center md:justify-end">
              <Link href="/privacy" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="opacity-90 hover:opacity-100 interactive hover:text-border-accent transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}