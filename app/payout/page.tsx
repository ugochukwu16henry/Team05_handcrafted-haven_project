'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PayoutRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/checkout');
  }, [router]);
  return (
    <main id="main-content" className="min-h-screen bg-bg-secondary py-12 flex items-center justify-center">
      <p className="text-text-secondary">Redirecting to checkout…</p>
    </main>
  );
}
