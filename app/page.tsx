import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-secondary">
      <div className="container-fluid py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="mb-4">Welcome to Handcrafted Haven</h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Discover unique, handcrafted treasures from talented artisans around the world. 
            Connect with creators and find pieces that tell a story.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link 
              href="/login"
              className="bg-accent-header text-text-background px-8 py-3 rounded-lg font-semibold interactive hover:opacity-90"
            >
              Log in
            </Link>
            <Link 
              href="/products"
              className="bg-border-accent text-text-background px-8 py-3 rounded-lg font-semibold interactive hover:opacity-90"
            >
              Browse Products
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card interactive cursor-pointer hover:shadow-lg">
            <h2 className="mb-4">For Buyers</h2>
            <p className="text-text-secondary">
              Browse unique handcrafted items from talented artisans. Each piece is one-of-a-kind.
            </p>
          </div>
          
          <div className="card interactive cursor-pointer hover:shadow-lg">
            <h2 className="mb-4">For Sellers</h2>
            <p className="text-text-secondary">
              Showcase your craftsmanship and reach customers worldwide. Join our community today.
            </p>
          </div>
          
          <div className="card interactive cursor-pointer hover:shadow-lg">
            <h2 className="mb-4">Community</h2>
            <p className="text-text-secondary">
              Join a thriving community of creators and art enthusiasts. Share your passion.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}