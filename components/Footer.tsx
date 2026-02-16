import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent-header text-text-background">
      <div className="container-fluid py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 bg-border-accent rounded-lg flex items-center justify-center text-accent-header font-bold">H</div>
              <span>Haven</span>
            </div>
            <p className="text-white/80 text-sm">
              A marketplace connecting artisans with art lovers worldwide.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-white/80 hover:text-border-accent transition"
                >
                  Browse Products
                </Link>
              </li>
              <li>
                <Link
                  href="/sellers"
                  className="text-white/80 hover:text-border-accent transition"
                >
                  Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="/sellers/become"
                  className="text-white/80 hover:text-border-accent transition"
                >
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/80 hover:text-border-accent transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-border-accent transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-border-accent transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/80 hover:text-border-accent transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-border-accent transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-border-accent transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-accent-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/80 text-sm">
            © {currentYear} Handcrafted Haven. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-white/80 hover:text-border-accent transition">
              Twitter
            </Link>
            <Link href="#" className="text-white/80 hover:text-border-accent transition">
              Instagram
            </Link>
            <Link href="#" className="text-white/80 hover:text-border-accent transition">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
