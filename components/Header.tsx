'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-blue-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-[100px]">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🌐</span>
            </div>

            <span className="text-white text-xl font-semibold">
              Handcrafted Haven
            </span>
          </Link>

        </div>
      </div>
    </header>
  );
}
