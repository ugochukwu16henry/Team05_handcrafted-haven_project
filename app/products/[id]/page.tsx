'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

interface Owner {
  _id?: string;
  name?: string;
  email?: string;
  businessName?: string;
  location?: string;
}

interface ProductDetail {
  _id: string;
  title: string;
  description: string;
  price: number;
  artistName: string;
  category?: string;
  imageUrl?: string;
  country?: string;
  size?: string;
  createdAt?: string;
  updatedAt?: string;
  sellerId?: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setError(data.message || data.error || 'Product not found');
          setProduct(null);
          setOwner(null);
          return;
        }
        setProduct(data.product ?? null);
        setOwner(data.owner ?? null);
        setError(null);
      } catch (e) {
        if (!cancelled) {
          setError('Failed to load product');
          setProduct(null);
          setOwner(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  const formatDate = (iso?: string) => {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { dateStyle: 'medium' });
    } catch {
      return iso;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-bg-secondary py-12">
        <div className="container-fluid flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-border-color border-t-accent-header rounded-full animate-spin" />
          <p className="mt-4 text-text-secondary">Loading product…</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-bg-secondary py-12">
        <div className="container-fluid">
          <h1 className="text-xl font-semibold text-accent-header mb-4">{error || 'Product not found'}</h1>
          <Link href="/products" className="text-accent-header font-medium interactive hover:underline">
            ← Back to products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-secondary py-12">
      <div className="container-fluid">
        <Link
          href="/products"
          className="inline-block text-accent-header font-medium mb-6 interactive hover:underline"
        >
          ← Back to products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="w-full aspect-square max-h-[520px] rounded-xl overflow-hidden border border-border-color bg-bg-primary">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl bg-border-accent/20">
                🎨
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.category && (
              <span className="inline-block bg-accent-header text-text-background px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {product.category}
              </span>
            )}
            <h1 className="text-3xl lg:text-4xl font-bold text-accent-header mb-3">{product.title}</h1>
            <p className="text-2xl font-bold text-accent-header mb-6">${Number(product.price).toFixed(2)}</p>

            <p className="text-lg text-text-primary mb-8 leading-relaxed">{product.description}</p>

            {/* Product info */}
            <div className="rounded-xl border border-border-color bg-bg-primary/50 p-5 mb-6 space-y-3">
              <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
                Product details
              </h2>
              <dl className="space-y-2 text-sm">
                <div className="flex flex-wrap gap-x-2">
                  <dt className="text-text-secondary">Added:</dt>
                  <dd className="text-text-primary font-medium">{formatDate(product.createdAt)}</dd>
                </div>
                {product.country && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="text-text-secondary">Country:</dt>
                    <dd className="text-text-primary font-medium">{product.country}</dd>
                  </div>
                )}
                {product.size && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="text-text-secondary">Size:</dt>
                    <dd className="text-text-primary font-medium">{product.size}</dd>
                  </div>
                )}
                <div className="flex flex-wrap gap-x-2">
                  <dt className="text-text-secondary">Artist / Creator:</dt>
                  <dd className="text-text-primary font-medium">{product.artistName}</dd>
                </div>
              </dl>
            </div>

            {/* Owner / Seller */}
            <div className="rounded-xl border border-border-color bg-bg-primary/50 p-5 mb-8">
              <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
                About the owner
              </h2>
              <p className="font-semibold text-accent-header">{product.artistName}</p>
              {owner?.businessName && (
                <p className="text-text-secondary text-sm mt-1">{owner.businessName}</p>
              )}
              {owner?.location && (
                <p className="text-text-secondary text-sm mt-1">📍 {owner.location}</p>
              )}
              {owner?.email && (
                <a
                  href={`mailto:${owner.email}`}
                  className="text-accent-header text-sm mt-2 inline-block interactive hover:underline"
                >
                  Contact seller
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                addItem({
                  productId: product._id,
                  title: product.title,
                  price: product.price,
                  imageUrl: product.imageUrl,
                });
                setAdded(true);
              }}
              className="w-full bg-accent-header text-text-background py-4 rounded-lg font-semibold interactive hover:opacity-90 transition shadow-md"
            >
              {added ? 'Added to cart ✓' : 'Add to cart'}
            </button>
            {added && (
              <Link
                href="/cart"
                className="mt-3 w-full block text-center py-3 border-2 border-accent-header text-accent-header rounded-lg font-medium hover:bg-accent-header/10 transition"
              >
                View cart
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
