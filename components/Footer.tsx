import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-accent-header text-text-background border-t border-border-accent-dark">
      <div className="container-fluid">
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-border-accent to-border-accent-dark rounded-lg flex items-center justify-center">
              <span className="text-text-primary text-lg font-bold">H</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-text-background">Handcrafted Haven</p>
              <p className="text-xs opacity-80">Artisan Marketplace</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-8 md:gap-10 text-sm">
            <Link href="/products" className="opacity-80 hover:opacity-100 interactive transition-opacity">
              Products
            </Link>
            <Link href="/sellers" className="opacity-80 hover:opacity-100 interactive transition-opacity">
              Sellers
            </Link>
            <Link href="/sellers/become" className="opacity-80 hover:opacity-100 interactive transition-opacity">
              Become a Seller
            </Link>
            <Link href="/dashboard" className="opacity-80 hover:opacity-100 interactive transition-opacity">
              Dashboard
            </Link>
          </div>
          
          <p className="text-sm opacity-80">
            &copy; {new Date().getFullYear()} Handcrafted Haven
          </p>
        </div>
      </div>
    </footer>
  );
}
