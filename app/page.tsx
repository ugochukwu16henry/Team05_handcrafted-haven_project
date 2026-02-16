"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

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
  const [sellerSearch, setSellerSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (sellerSearch) {
      const filtered = products.filter((product) =>
        product.artistName.toLowerCase().includes(sellerSearch.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [sellerSearch, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data?.products ?? []);
        setFilteredProducts(data?.products ?? []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-bg-primary">
      {/* Hero Section */}
      <section className="relative bg-accent-header text-text-background overflow-hidden py-20 md:py-32">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-border-accent opacity-20 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-border-accent opacity-10 rounded-full -ml-48 -mb-48"></div>

        <div className="container-fluid relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              Discover Artisan Treasures
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
              Connect with talented creators worldwide. Every handcrafted item has a story to tell.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-8 py-4 bg-text-background text-accent-header font-bold rounded-lg hover:opacity-90 transition-all shadow-lg"
              >
                Browse Products
              </Link>
              <Link
                href="/sellers/become"
                className="px-8 py-4 bg-border-accent text-accent-header font-bold rounded-lg hover:opacity-90 transition-all border-2 border-text-background"
              >
                Become a Seller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28 bg-bg-secondary">
        <div className="container-fluid">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-accent-header mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Explore handcrafted items from talented artisans across the globe
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <input
              type="search"
              id="seller-search"
              value={sellerSearch}
              onChange={(e) => setSellerSearch(e.target.value)}
              placeholder="Search by seller name..."
              className="w-full px-5 py-3 border border-border-color rounded-lg bg-bg-primary text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-header focus:border-transparent"
            />
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-border-color border-t-accent-header rounded-full animate-spin"></div>
              </div>
              <p className="text-text-secondary mt-4">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="text-center py-16 bg-bg-primary rounded-lg border border-border-color">
              <p className="text-text-secondary text-lg mb-6">
                {sellerSearch ? "No products found for this seller" : "No products available yet"}
              </p>
              {sellerSearch ? (
                <button
                  onClick={() => setSellerSearch("")}
                  className="px-6 py-3 bg-accent-header text-text-background font-medium rounded-lg hover:opacity-90 transition"
                >
                  Clear Search
                </button>
              ) : (
                <Link
                  href="/sellers/become"
                  className="btn-primary bg-accent-header text-text-background hover:opacity-90 inline-flex shadow-md"
                >
                  Become a seller
                </Link>
              )}
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-block px-8 py-4 bg-accent-header text-text-background font-bold rounded-lg hover:opacity-90 transition"
              >
                View All Products →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-bg-primary">
        <div className="container-fluid">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-accent-header mb-4">
              Why Choose Haven?
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              We connect artisans with art lovers for authentic, meaningful purchases
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-xl bg-bg-secondary border border-border-accent hover:border-border-accent-dark transition">
              <div className="w-16 h-16 bg-accent-header text-text-background rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                ✨
              </div>
              <h3 className="text-xl font-bold text-accent-header mb-3">Unique Pieces</h3>
              <p className="text-text-secondary">
                Handcrafted by skilled artisans. Each item is one-of-a-kind with its own character.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-xl bg-bg-secondary border border-border-accent hover:border-border-accent-dark transition">
              <div className="w-16 h-16 bg-accent-header text-text-background rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                👥
              </div>
              <h3 className="text-xl font-bold text-accent-header mb-3">Direct Connection</h3>
              <p className="text-text-secondary">
                Support creators directly. Know the story behind every piece you purchase.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-xl bg-bg-secondary border border-border-accent hover:border-border-accent-dark transition">
              <div className="w-16 h-16 bg-accent-header text-text-background rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                🌱
              </div>
              <h3 className="text-xl font-bold text-accent-header mb-3">Sustainable</h3>
              <p className="text-text-secondary">
                Quality over quantity. Support sustainable consumption and ethical production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-accent-header text-text-background">
        <div className="container-fluid text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Explore or Create?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Join thousands of art lovers and creators on Haven
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 bg-text-background text-accent-header font-bold rounded-lg hover:opacity-90 transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-8 py-4 bg-border-accent text-accent-header font-bold rounded-lg hover:opacity-90 transition border-2 border-text-background"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
