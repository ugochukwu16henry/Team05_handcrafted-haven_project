'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <main id="main-content" className="min-h-screen bg-bg-secondary py-12">
        <div className="container-fluid">
          <h1 className="text-3xl font-bold text-accent-header mb-4">Your Cart</h1>
          <p className="text-text-secondary mb-6">Your cart is empty.</p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-accent-header text-text-background rounded-lg font-medium hover:opacity-90 transition"
          >
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-bg-secondary py-12">
      <div className="container-fluid">
        <h1 className="text-3xl font-bold text-accent-header mb-2">Your Cart</h1>
        <p className="text-text-secondary mb-8">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 p-4 rounded-xl border border-border-color bg-bg-primary"
              >
                <Link
                  href={`/products/${item.productId}`}
                  className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-bg-secondary"
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">🎨</div>
                  )}
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.productId}`}
                    className="font-semibold text-accent-header hover:underline line-clamp-2"
                  >
                    {item.title}
                  </Link>
                  <p className="text-lg font-bold text-accent-header mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-border-color rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="px-3 py-1.5 bg-bg-secondary hover:bg-border-accent/20 text-accent-header font-medium"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-4 py-1.5 text-text-primary font-medium min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-3 py-1.5 bg-bg-secondary hover:bg-border-accent/20 text-accent-header font-medium"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="text-sm text-red-600 dark:text-red-400 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-xl border border-border-color bg-bg-primary">
              <h2 className="text-lg font-semibold text-accent-header mb-4">Order summary</h2>
              <div className="flex justify-between text-text-secondary mb-2">
                <span>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="border-t border-border-color pt-4 mt-4 flex justify-between text-lg font-bold text-accent-header">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="mt-6 w-full block text-center py-4 bg-accent-header text-text-background rounded-lg font-semibold hover:opacity-90 transition"
              >
                Proceed to checkout
              </Link>
              <Link
                href="/products"
                className="mt-3 w-full block text-center py-2 text-accent-header font-medium hover:underline"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
