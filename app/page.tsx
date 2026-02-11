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
        setProducts(data.products ?? []);
        setFilteredProducts(data.products ?? []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="home-section bg-accent-header text-white"
        aria-label="Welcome"
      >
        <div className="container-fluid text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[2.75rem] max-w-4xl mx-auto mb-5 text-white">
            Discover Unique Handcrafted Treasures
          </h1>
          <p className="section-subtitle text-white/90 mb-10 mx-auto">
            Connect with talented artisans and find one-of-a-kind pieces that
            tell a story. Every item is crafted with passion and care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="btn-primary bg-border-accent text-accent-header hover:bg-[#9a846e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-md w-full sm:w-auto min-w-[200px]"
            >
              Browse Products
            </Link>
            <Link
              href="/login"
              className="btn-secondary text-white border-white hover:bg-white hover:text-accent-header w-full sm:w-auto min-w-[200px]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        className="home-section bg-bg-secondary"
        aria-labelledby="featured-heading"
      >
        <div className="container-fluid">
          <header className="mb-8 md:mb-10">
            <h2 id="featured-heading" className="section-title text-center md:text-left mb-2">
              Featured Products
            </h2>
            <p className="text-text-secondary text-center md:text-left max-w-2xl">
              Discover unique, handcrafted items from talented artisans around
              the world.
            </p>
          </header>

          <div className="mb-6 max-w-md">
            <label
              htmlFor="seller-search"
              className="block text-sm font-medium text-accent-header mb-2"
            >
              Search by seller name
            </label>
            <input
              type="search"
              id="seller-search"
              value={sellerSearch}
              onChange={(e) => setSellerSearch(e.target.value)}
              placeholder="e.g. Jane, Art Studio"
              aria-describedby="seller-search-desc"
              className="w-full px-4 py-3 border border-border-color rounded-lg bg-bg-primary text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-header focus:border-transparent transition-shadow"
            />
            <span id="seller-search-desc" className="sr-only">
              Filter the list below by typing a seller or artist name.
            </span>
          </div>

          {loading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-busy="true"
              aria-live="polite"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-bg-primary rounded-xl border border-border-color overflow-hidden animate-pulse"
                  aria-hidden
                >
                  <div className="h-64 bg-border-color/30" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-border-color/40 rounded w-3/4" />
                    <div className="h-4 bg-border-color/30 rounded w-full" />
                    <div className="h-4 bg-border-color/30 rounded w-5/6" />
                    <div className="h-8 bg-border-color/40 rounded w-1/3 mt-4" />
                  </div>
                </div>
              ))}
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
            <div
              className="text-center py-12 px-4 bg-bg-primary rounded-xl border border-border-color"
              role="status"
            >
              <p className="text-text-secondary mb-4">
                {sellerSearch
                  ? "No products found for this seller."
                  : "No products available yet."}
              </p>
              {sellerSearch ? (
                <button
                  type="button"
                  onClick={() => setSellerSearch("")}
                  className="text-accent-header font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2 rounded py-2 px-3 min-h-[44px] inline-flex items-center"
                  aria-label="Clear seller search"
                >
                  Clear search
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
            <p className="text-center mt-10">
              <Link
                href="/products"
                className="btn-primary bg-accent-header text-white hover:bg-[#1a282d] shadow-md"
              >
                View all products
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* Why choose us */}
      <section
        className="home-section bg-bg-primary"
        aria-labelledby="why-heading"
      >
        <div className="container-fluid">
          <header className="text-center mb-10 md:mb-12">
            <h2 id="why-heading" className="section-title">
              Why choose Handcrafted Haven?
            </h2>
            <p className="section-subtitle">
              We bring together a community of passionate creators and conscious
              consumers.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <article className="bg-bg-secondary rounded-xl p-6 md:p-8 text-center border border-border-color hover:shadow-lg transition-shadow duration-200 focus-within:ring-2 focus-within:ring-accent-header focus-within:ring-offset-2">
              <span className="text-4xl mb-4 block" aria-hidden>
                🎨
              </span>
              <h3 className="text-lg font-semibold text-accent-header mb-2">
                Unique creations
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Every piece is handcrafted with care, making each item truly
                one-of-a-kind.
              </p>
            </article>
            <article className="bg-bg-secondary rounded-xl p-6 md:p-8 text-center border border-border-color hover:shadow-lg transition-shadow duration-200 focus-within:ring-2 focus-within:ring-accent-header focus-within:ring-offset-2">
              <span className="text-4xl mb-4 block" aria-hidden>
                👥
              </span>
              <h3 className="text-lg font-semibold text-accent-header mb-2">
                Support artisans
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Connect directly with creators and support their craft and
                livelihood.
              </p>
            </article>
            <article className="bg-bg-secondary rounded-xl p-6 md:p-8 text-center border border-border-color hover:shadow-lg transition-shadow duration-200 focus-within:ring-2 focus-within:ring-accent-header focus-within:ring-offset-2">
              <span className="text-4xl mb-4 block" aria-hidden>
                🌍
              </span>
              <h3 className="text-lg font-semibold text-accent-header mb-2">
                Sustainable choice
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Choose quality over quantity and contribute to sustainable
                consumption.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="home-section bg-bg-secondary border-t border-border-color"
        aria-labelledby="cta-heading"
      >
        <div className="container-fluid text-center">
          <h2 id="cta-heading" className="section-title mb-2">
            Ready to start your journey?
          </h2>
          <p className="section-subtitle mb-8">
            Join our community of artisans and art lovers. Whether you&apos;re
            looking to buy or sell, Handcrafted Haven is your destination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/sellers/become"
              className="btn-primary bg-accent-header text-white hover:bg-[#1a282d] shadow-md w-full sm:w-auto min-w-[200px]"
            >
              Become a seller
            </Link>
            <Link
              href="/products"
              className="btn-secondary text-accent-header border-accent-header hover:bg-accent-header hover:text-white w-full sm:w-auto min-w-[200px]"
            >
              Explore products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
