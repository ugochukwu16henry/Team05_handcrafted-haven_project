'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Seller {
  _id: string;
  name: string;
  email: string;
  businessName?: string;
  description?: string;
  location?: string;
  phone?: string;
}

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await fetch('/api/sellers');
      if (response.ok) {
        const data = await response.json();
        setSellers(data);
      }
    } catch (error) {
      console.error('Error fetching sellers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg-secondary py-12">
      <div className="container-fluid">
        <div className="mb-8 page-header">
          <h1 className="mb-4">Our Artisans</h1>
          <p className="text-lg text-text-secondary mb-6">
            Meet the talented creators behind our handcrafted treasures.
          </p>
          <Link
            href="/sellers/become"
            className="inline-block bg-accent-header text-text-background px-6 py-3 rounded-lg font-semibold interactive hover:opacity-90 transition shadow-md"
          >
            Become a Seller
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">Loading sellers...</p>
          </div>
        ) : sellers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellers.map((seller) => (
              <div key={seller._id} className="card interactive cursor-pointer hover:shadow-lg flex flex-col">
                <div className="w-full h-48 bg-border-accent rounded-lg mb-4 flex items-center justify-center text-6xl flex-shrink-0">
                  👨‍🎨
                </div>
                <h2 className="mb-2">{seller.businessName || seller.name}</h2>
                <p className="text-text-secondary text-sm mb-2">
                  <strong>Artisan:</strong> {seller.name}
                </p>
                {seller.description && (
                  <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-1">
                    {seller.description}
                  </p>
                )}
                {seller.location && (
                  <p className="text-text-secondary text-xs mb-4">
                    📍 {seller.location}
                  </p>
                )}
                <Link
                  href={`/products?sellerId=${seller._id}`}
                  className="text-accent-header font-semibold interactive hover:underline inline-block mt-auto"
                >
                  View Products →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-secondary mb-6">No sellers registered yet.</p>
            <Link
              href="/sellers/become"
              className="inline-block bg-accent-header text-text-background px-6 py-3 rounded-lg font-semibold interactive hover:opacity-90 transition shadow-md"
            >
              Be the First Seller
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}