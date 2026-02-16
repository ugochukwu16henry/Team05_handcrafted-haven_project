'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, itemCount, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  if (items.length === 0 && !placed) {
    return (
      <main id="main-content" className="min-h-screen bg-bg-secondary py-12">
        <div className="container-fluid">
          <h1 className="text-3xl font-bold text-accent-header mb-4">Checkout</h1>
          <p className="text-text-secondary mb-6">Your cart is empty. Add items to checkout.</p>
          <Link
            href="/cart"
            className="inline-block px-6 py-3 bg-accent-header text-text-background rounded-lg font-medium hover:opacity-90 transition"
          >
            View cart
          </Link>
        </div>
      </main>
    );
  }

  const handlePlaceOrder = () => {
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <main id="main-content" className="min-h-screen bg-bg-secondary py-12">
        <div className="container-fluid max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6 text-4xl">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-accent-header mb-2">Order received</h1>
          <p className="text-text-secondary mb-6">
            Thank you for your order. This is a demo — no payment was processed.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-accent-header text-text-background rounded-lg font-medium hover:opacity-90 transition"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-bg-secondary py-12">
      <div className="container-fluid">
        <h1 className="text-3xl font-bold text-accent-header mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-accent-header mb-4">Order summary</h2>
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="flex justify-between items-center py-3 border-b border-border-color"
                >
                  <span className="text-text-primary">
                    {item.title} × {item.quantity}
                  </span>
                  <span className="font-semibold text-accent-header">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="p-6 rounded-xl border border-border-color bg-bg-primary sticky top-24">
              <h2 className="text-lg font-semibold text-accent-header mb-4">Total</h2>
              <div className="flex justify-between text-text-secondary mb-2">
                <span>Items ({itemCount})</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="border-t border-border-color pt-4 mt-4 flex justify-between text-xl font-bold text-accent-header">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className="text-sm text-text-secondary mt-4 mb-4">
                This is a demo. No real payment will be processed.
              </p>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-accent-header text-text-background rounded-lg font-semibold hover:opacity-90 transition"
              >
                Place order
              </button>
              <Link
                href="/cart"
                className="mt-3 w-full block text-center py-2 text-accent-header font-medium hover:underline text-sm"
              >
                ← Back to cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
