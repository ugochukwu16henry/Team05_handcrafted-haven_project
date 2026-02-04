import Link from "next/link";

export default function HomePage() {
  return (
    <>

  
      {/* ================= HEADER ================= */}
      <header className="w-full bg-bg-primary border-b border-border-color sticky top-0 z-50">
        <div className="container-fluid flex items-center justify-between py-5">
          <h2 className="text-accent-header font-bold">
            Handcrafted Haven
          </h2>

          <nav className="flex gap-6">
            <Link href="/products" className="interactive">
              Products
            </Link>
            <Link href="/sellers" className="interactive">
              Sellers
            </Link>
            <Link href="/login" className="interactive">
              Login
            </Link>
          </nav>
        </div>
      </header>
    

      <main className="flex-grow">
        {/* ================= HERO & FEATURES GRID ================= */}
        <section className="bg-bg-primary">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-screen">
            {/* LEFT SIDE - HERO CONTENT */}
            <div className="bg-bg-primary flex flex-col justify-center items-center p-12 lg:p-24 grid @import">
              <div className="text-left w-full max-w-md">
                <h1 className="mb-6">
                  Discover Unique Handcrafted Treasures
                </h1>

                <p className="text-text-secondary mb-12">
                  A curated marketplace connecting you with skilled artisans
                  creating meaningful, one-of-a-kind handmade products.
                </p>

                <div className="flex gap-4 flex-wrap">
                  <Link
                    href="/products"
                    className="bg-accent-header text-text-background px-8 py-4 rounded-lg font-semibold interactive shadow-sm"
                  >
                    Browse Products
                  </Link>

                  <Link
                    href="/sellers"
                    className="border-2 border-accent-header text-accent-header px-8 py-4 rounded-lg font-semibold interactive"
                  >
                    Become a Seller
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - FEATURES */}
            <div className="bg-bg-secondary flex flex-col justify-center items-center p-12 lg:p-24">
              <div className="w-full max-w-md">
                <h2 className="mb-12 text-left">
                  Why Choose Handcrafted Haven?
                </h2>

                <div className="space-y-8">
                  <div className="card">
                    <h3 className="mb-4">Authentic Craftsmanship</h3>
                    <p className="text-text-secondary">
                      Every product is handmade by verified artisans who care deeply
                      about quality and detail.
                    </p>
                  </div>

                  <div className="card">
                    <h3 className="mb-4">Support Small Creators</h3>
                    <p className="text-text-secondary">
                      Your purchases directly empower independent makers and
                      strengthen local communities.
                    </p>
                  </div>

                  <div className="card">
                    <h3 className="mb-4">Curated Marketplace</h3>
                    <p className="text-text-secondary">
                      We carefully curate products so you discover only the best
                      handmade items.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="bg-accent-header w-full">
          <div className="container-fluid py-24 text-center text-text-background">

            <h2 className="mb-6 text-text-background">
              Ready to Find Something Special?
            </h2>

            <p className="max-w-xl mx-auto mb-10 opacity-90">
              Join thousands of people discovering meaningful handmade products
              from passionate creators.
            </p>

            <Link
              href="/products"
              className="bg-text-background text-accent-header px-10 py-4 rounded-lg font-semibold interactive"
            >
              Start Exploring
            </Link>

          </div>
        </section>
      </main>
  

      {/* ================= FOOTER ================= */}
      <footer className="w-full bg-bg-primary border-t border-border-color">
        <div className="container-fluid py-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link href="/about" className="interactive">
              About
            </Link>
            <Link href="/contact" className="interactive">
              Contact
            </Link>
            <Link href="/privacy" className="interactive">
              Privacy Policy
            </Link>
          </div>

        </div>
      </footer>
    </>
  );
}
