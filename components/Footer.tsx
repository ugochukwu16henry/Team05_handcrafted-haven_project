import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-accent-header text-text-background py-12">
      <div className="container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-text-background">Handcrafted Haven</h3>
            <p className="text-sm opacity-80">
              Connecting artisans with customers who appreciate unique, handcrafted treasures.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-background">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="opacity-80 hover:opacity-100 interactive">Products</Link></li>
              <li><Link href="/sellers" className="opacity-80 hover:opacity-100 interactive">Sellers</Link></li>
              <li><Link href="/about" className="opacity-80 hover:opacity-100 interactive">About Us</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-background">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="opacity-80 hover:opacity-100 interactive">Help Center</Link></li>
              <li><Link href="/contact" className="opacity-80 hover:opacity-100 interactive">Contact Us</Link></li>
              <li><Link href="/faq" className="opacity-80 hover:opacity-100 interactive">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-background">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="opacity-80 hover:opacity-100 interactive">Privacy Policy</Link></li>
              <li><Link href="/terms" className="opacity-80 hover:opacity-100 interactive">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border-accent-dark pt-8 text-center text-sm opacity-80">
          <p>&copy; 2026 Handcrafted Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}