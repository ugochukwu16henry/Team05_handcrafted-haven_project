'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  sellerId: string;
  artistName: string;
  category?: string;
  imageUrl?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sellerSearch, setSellerSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (sellerSearch) {
      // Filter products by seller name (artistName)
      const filtered = products.filter(product =>
        product.artistName.toLowerCase().includes(sellerSearch.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [sellerSearch, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

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

      {/* Products Section */}
      <section className="py-16 md:py-24 bg-bg-secondary">
        <div className="container-fluid">
          <div className="mb-8 page-header">
            <h2 className="mb-4 text-center md:text-left">Featured Products</h2>
            <p className="text-text-secondary mb-6 text-center md:text-left">
              Discover unique, handcrafted items from talented artisans around the world.
            </p>
            
            {/* Seller Search */}
            <div className="mb-6 max-w-md mx-auto">
              <label htmlFor="sellerSearch" className="block text-sm font-semibold mb-2 text-accent-header">
                Search by Seller Name
              </label>
              <input
                type="text"
                id="sellerSearch"
                value={sellerSearch}
                onChange={(e) => setSellerSearch(e.target.value)}
                placeholder="Enter seller name..."
                className="w-full px-4 py-3 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-text-secondary">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.slice(0, 6).map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  artistName={product.artistName}
                  category={product.category}
                  imageUrl={product.imageUrl}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary mb-4">
                {sellerSearch ? 'No products found for this seller.' : 'No products available yet.'}
              </p>
              {sellerSearch && (
                <button
                  onClick={() => setSellerSearch('')}
                  className="text-accent-header font-semibold interactive hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="text-center mt-8">
              <Link
                href="/products"
                className="bg-accent-header text-text-background px-8 py-4 rounded-lg font-semibold interactive hover:opacity-90 transition shadow-md inline-block"
              >
                View All Products
              </Link>
            </div>
          )}
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
              href="/sellers/become"
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