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
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden py-20 md:py-32">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 opacity-20 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 opacity-10 rounded-full -ml-48 -mb-48"></div>

        <div className="container-fluid relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover Artisan Treasures
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
              Connect with talented creators worldwide. Every handcrafted item has a story to tell.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all shadow-lg"
              >
                Browse Products
              </Link>
              <Link
                href="/sellers/become"
                className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all border-2 border-white"
              >
                Become a Seller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-fluid">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
              className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-600 mt-4">Loading products...</p>
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
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-600 text-lg mb-6">
                {sellerSearch ? "No products found for this seller" : "No products available yet"}
              </p>
              {sellerSearch ? (
                <button
                  onClick={() => setSellerSearch("")}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  Clear Search
                </button>
              ) : (
                <Link
                  href="/sellers/become"
                  className="btn-primary bg-accent-header text-white hover:bg-[#1a282d] inline-flex shadow-md"
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
                className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
              >
                View All Products →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-fluid">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Haven?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We connect artisans with art lovers for authentic, meaningful purchases
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-xl bg-blue-50 border border-blue-100 hover:border-blue-300 transition">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                ✨
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Unique Pieces</h3>
              <p className="text-gray-600">
                Handcrafted by skilled artisans. Each item is one-of-a-kind with its own character.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-xl bg-purple-50 border border-purple-100 hover:border-purple-300 transition">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                👥
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Connection</h3>
              <p className="text-gray-600">
                Support creators directly. Know the story behind every piece you purchase.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-xl bg-green-50 border border-green-100 hover:border-green-300 transition">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                🌱
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainable</h3>
              <p className="text-gray-600">
                Quality over quantity. Support sustainable consumption and ethical production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container-fluid text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Explore or Create?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Join thousands of art lovers and creators on Haven
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition border-2 border-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
