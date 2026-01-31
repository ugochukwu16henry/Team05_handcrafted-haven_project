'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="card shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="mb-2 text-2xl font-bold">Welcome Back</h1>
            <p className="text-text-secondary text-sm">
              Sign in to access your account
            </p>
          </div>
          
          {/* Form */}
          <form className="space-y-6 max-w-full">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-accent-header">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="username"
                autoFocus
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
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
            
            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="remember"
                  className="w-4 h-4 cursor-pointer" 
                />
                <span className="text-text-secondary">Remember me</span>
              </label>
              <Link 
                href="/forgot-password" 
                className="text-accent-header font-semibold interactive hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-accent-header text-text-background py-3.5 rounded-lg font-semibold interactive hover:opacity-90 transition shadow-md text-base"
            >
              Sign In
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
          
          {/* Sign up link */}
          <p className="text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link href="/signup" className="text-accent-header font-semibold interactive hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
