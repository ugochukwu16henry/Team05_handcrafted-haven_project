'use client';

import Link from 'next/link';

type AuthLayoutProps = {
  children: React.ReactNode;
  /** Wider form area for longer forms (e.g. become a seller) */
  formWidth?: 'default' | 'wide';
  /** Left panel tagline */
  tagline?: string;
};

export default function AuthLayout({
  children,
  formWidth = 'default',
  tagline = 'Discover unique handmade products from trusted sellers.',
}: AuthLayoutProps) {
  return (
    <main className="auth-layout min-h-screen flex flex-col md:flex-row">
      {/* Left: Branding — compact on mobile, full on desktop */}
      <section
        className="relative flex-none md:flex-1 flex flex-col justify-center px-5 py-8 md:py-16 md:px-12 lg:px-16 order-2 md:order-1 min-h-[160px] md:min-h-screen"
        style={{
          background: 'linear-gradient(135deg, #2d3e42 0%, #22333B 50%, #1a282d 100%)',
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 md:gap-3 mb-4 md:mb-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#22333B] rounded-lg w-fit"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
            <span className="text-white text-lg md:text-xl font-bold">H</span>
          </div>
          <span className="text-base md:text-xl font-bold text-white">Handcrafted Haven</span>
        </Link>
        <p className="text-white/90 text-sm md:text-lg max-w-sm md:mb-8">
          {tagline}
        </p>
        <div className="absolute bottom-4 right-4 md:bottom-12 md:right-12 opacity-20 hidden md:block" aria-hidden>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="w-20 h-20 md:w-28 md:h-28">
            <path d="M60 20v80M30 50h60M45 35l30 30M75 35l-30 30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="60" cy="60" r="12" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M50 25c0-2 4-4 10-4s10 2 10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </section>

      {/* Right: Form — full width on mobile, generous padding and scroll */}
      <section className="flex-1 flex items-start md:items-center justify-center px-4 py-6 md:py-12 pb-10 md:pb-12 bg-[#eef0ef] order-1 md:order-2 overflow-y-auto min-h-0">
        <div className={`w-full my-auto md:my-0 ${formWidth === 'wide' ? 'max-w-[32rem]' : 'max-w-[420px]'}`}>
          {children}
        </div>
      </section>
    </main>
  );
}
