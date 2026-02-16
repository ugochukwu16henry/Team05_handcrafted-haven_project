"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  artistName: string;
  category?: string;
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  imageUrl,
  artistName,
  category,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <div className="bg-bg-primary rounded-xl border border-border-color overflow-hidden hover:shadow-lg hover:border-border-accent transition-all duration-300 h-full flex flex-col group">
      <Link href={`/products/${id}`} className="block flex-1 flex flex-col">
        {/* Image Container */}
        <div className="relative h-64 bg-bg-secondary overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl bg-border-accent/20">
              🎨
            </div>
          )}

          {category && (
            <span className="absolute top-3 right-3 bg-accent-header text-text-background px-3 py-1 rounded-full text-xs font-semibold">
              {category}
            </span>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-accent-header mb-2 line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-text-secondary mb-4 line-clamp-2 flex-1">
            {description}
          </p>

          <p className="text-xs text-text-secondary mb-3">
            by <span className="font-medium text-text-primary">{artistName}</span>
          </p>

          <div className="pt-4 border-t border-border-color">
            <p className="text-2xl font-bold text-accent-header">
              ${price.toFixed(2)}
            </p>
          </div>
        </div>
      </Link>

      <div className="p-5 pt-0 flex gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            addItem({ productId: id, title, price, imageUrl });
            setAdded(true);
          }}
          className="flex-1 px-4 py-2 bg-accent-header text-text-background rounded-lg font-medium text-sm hover:opacity-90 transition-colors"
        >
          {added ? "Added ✓" : "Add to cart"}
        </button>
        <Link
          href={`/products/${id}`}
          className="px-4 py-2 border border-accent-header text-accent-header rounded-lg font-medium text-sm hover:bg-accent-header/10 transition-colors inline-flex items-center"
        >
          View
        </Link>
      </div>
    </div>
  );
}
