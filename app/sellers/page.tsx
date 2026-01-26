export default function SellersPage() {
  return (
    <main className="min-h-screen bg-bg-secondary">
      <div className="container-fluid py-8 md:py-12">
        <h1 className="mb-4">Our Artisans</h1>
        <p className="text-lg text-text-secondary mb-8">
          Meet the talented creators behind our handcrafted treasures.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder seller cards */}
          {[1, 2, 3].map((seller) => (
            <div key={seller} className="card interactive cursor-pointer hover:shadow-lg">
              <div className="w-full h-48 bg-border-accent rounded-lg mb-4"></div>
              <h2 className="mb-2">Artisan {seller}</h2>
              <p className="text-text-secondary text-sm mb-4">
                Specializing in handcrafted ceramics and pottery.
              </p>
              <button className="text-accent-header font-semibold interactive">
                View Profile →
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}