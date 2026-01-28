import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-accent-header text-text-background py-20 md:py-32">
        <div className="container-fluid text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-background">
            Discover Unique Handcrafted Treasures
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Connect with talented artisans and find one-of-a-kind pieces that tell a story. 
            Every item is crafted with passion and care.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="bg-border-accent text-text-primary px-8 py-4 rounded-lg font-semibold interactive hover:opacity-90 transition shadow-lg"
            >
              Browse Products
            </Link>
            <Link 
              href="/login"
              className="bg-transparent border-2 border-text-background text-text-background px-8 py-4 rounded-lg font-semibold interactive hover:bg-text-background hover:text-accent-header transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-bg-secondary">
        <div className="container-fluid">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Choose Handcrafted Haven?</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We bring together a community of passionate creators and conscious consumers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center interactive hover:shadow-xl transition">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-3 text-accent-header">Unique Creations</h3>
              <p className="text-text-secondary">
                Every piece is handcrafted with care, making each item truly one-of-a-kind
              </p>
            </div>
            
            <div className="card text-center interactive hover:shadow-xl transition">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-3 text-accent-header">Support Artisans</h3>
              <p className="text-text-secondary">
                Connect directly with creators and support their craft and livelihood
              </p>
            </div>
            
            <div className="card text-center interactive hover:shadow-xl transition">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3 text-accent-header">Sustainable Choice</h3>
              <p className="text-text-secondary">
                Choose quality over quantity and contribute to sustainable consumption
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-bg-primary">
        <div className="container-fluid text-center">
          <h2 className="mb-4">Ready to Start Your Journey?</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Join our community of artisans and art lovers. Whether you're looking to buy or sell, 
            Handcrafted Haven is your destination.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/sellers"
              className="bg-accent-header text-text-background px-8 py-4 rounded-lg font-semibold interactive hover:opacity-90 transition shadow-md"
            >
              Become a Seller
            </Link>
            <Link 
              href="/products"
              className="bg-border-accent text-text-background px-8 py-4 rounded-lg font-semibold interactive hover:opacity-90 transition shadow-md"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}