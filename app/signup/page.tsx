'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup:', formData);
  };

  return (
    <main className="min-h-screen bg-bg-secondary py-12">
      <div className="container-fluid">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
            {/* Value Proposition - Left Side (Desktop) / Top (Mobile) */}
            <div className="order-2 lg:order-1">
              <div className="card bg-gradient-to-br from-accent-header to-border-accent-dark text-text-background shadow-xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-text-background">
                  Join Handcrafted Haven
                </h1>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🎨</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-text-background">Discover Unique Creations</h3>
                      <p className="opacity-90 text-sm">
                        Access thousands of handcrafted items from talented artisans worldwide
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">👥</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-text-background">Support Artisans</h3>
                      <p className="opacity-90 text-sm">
                        Connect directly with creators and support their craft
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🌍</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-text-background">Sustainable Shopping</h3>
                      <p className="opacity-90 text-sm">
                        Choose quality over quantity and make a positive impact
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">⭐</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-text-background">Exclusive Access</h3>
                      <p className="opacity-90 text-sm">
                        Get early access to new products and special offers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Signup Form - Right Side (Desktop) / Bottom (Mobile) */}
            <div className="order-1 lg:order-2">
              <div className="card shadow-xl">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
                  <p className="text-text-secondary text-sm">
                    Start your journey with Handcrafted Haven
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-accent-header">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      autoComplete="name"
                      autoFocus
                      className="w-full px-4 py-3 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-accent-header">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full px-4 py-3 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold mb-2 text-accent-header">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        autoComplete="new-password"
                        className="w-full px-4 py-3 pr-12 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent-header interactive"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2 text-accent-header">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        className="w-full px-4 py-3 pr-12 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent-header interactive"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      className="mt-1 w-4 h-4 cursor-pointer"
                      required
                    />
                    <label htmlFor="terms" className="text-text-secondary cursor-pointer">
                      I agree to the{' '}
                      <Link href="/terms" className="text-accent-header font-semibold hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-accent-header font-semibold hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-accent-header text-text-background py-3.5 rounded-lg font-semibold interactive hover:opacity-90 transition shadow-md text-base"
                  >
                    Create Account
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border-color"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-bg-primary text-text-secondary">Or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-border-color rounded-lg interactive hover:bg-bg-secondary transition"
                  >
                    <span>🔵</span>
                    <span className="font-medium text-sm">Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-border-color rounded-lg interactive hover:bg-bg-secondary transition"
                  >
                    <span>⚫</span>
                    <span className="font-medium text-sm">GitHub</span>
                  </button>
                </div>

                {/* Sign in link */}
                <p className="text-center text-sm text-text-secondary">
                  Already have an account?{' '}
                  <Link href="/login" className="text-accent-header font-semibold interactive hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
