import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-fluid py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg"></div>
              <span>Haven</span>
            </div>
            <p className="text-gray-400 text-sm">
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
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Browse Products
                </Link>
              </li>
              <li>
                <Link
                  href="/sellers"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="/sellers/become"
                  className="text-gray-400 hover:text-blue-400 transition"
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
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition">
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
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Handcrafted Haven. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-400 hover:text-blue-400 transition">
              Twitter
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-400 transition">
              Instagram
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-400 transition">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
