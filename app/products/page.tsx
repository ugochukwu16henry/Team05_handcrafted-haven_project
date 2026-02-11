"use client";

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

const categories = ['All', 'Ceramics', 'Woodwork', 'Textiles', 'Art', 'Leather Goods', 'Jewelry'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sellerFilter, setSellerFilter] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const url = sellerFilter
        ? `/api/products?sellerId=${sellerFilter}`
        : "/api/products";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sellerFilter]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-secondary to-bg-primary py-12 md:py-20">
      <div className="container-fluid">
        <div className="mb-8 page-header">
          <h1 className="mb-4">Browse Our Collection</h1>
          <p className="text-lg text-text-secondary mb-6">
            Discover unique, handcrafted items from talented artisans around the
            world.
          </p>

          {/* Seller Filter */}
          <div className="mb-6 max-w-2xl mx-auto">
            <label
              htmlFor="sellerFilter"
              className="block text-sm font-semibold mb-2 text-accent-header"
            >
              Filter by Seller ID (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="sellerFilter"
                value={sellerFilter}
                onChange={(e) => setSellerFilter(e.target.value)}
                placeholder="Enter seller ID..."
                className="flex-1 px-4 py-3 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary"
              />
              {sellerFilter && (
                <button
                  onClick={() => setSellerFilter("")}
                  className="px-4 py-3 bg-border-accent text-text-background rounded-lg font-semibold interactive hover:opacity-90 transition whitespace-nowrap min-h-[44px] flex items-center"
                  aria-label="Clear seller filter"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-10 pb-8 border-b-2 border-border-accent">
          <p className="text-sm text-text-secondary mb-4 font-semibold">FILTER BY CATEGORY</p>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                  category === 'All'
                    ? 'bg-accent-header text-text-background shadow-md'
                    : 'bg-bg-primary text-accent-header border-2 border-border-accent hover:border-accent-header'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              artistName={product.artistName}
              category={product.category}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <button className="bg-accent-header text-text-background px-8 py-4 rounded-lg font-semibold text-lg interactive hover:opacity-90 transition shadow-md">
            Load More Products
          </button>
        </div>
      </div>
    </main>
  );
}
