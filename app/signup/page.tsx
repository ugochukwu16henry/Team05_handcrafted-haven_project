'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '../../components/AuthLayout';

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
    </svg>
  );
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address.';
    if (!formData.password) newErrors.password = 'Password is required.';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ form: data.error || 'Something went wrong. Please try again.' });
        return;
      }

      // Success! Store user info in localStorage and redirect
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-[10px] shadow-lg p-6 sm:p-8 transition-shadow duration-200">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-accent-header mb-1">Create Your Account</h1>
          <p className="text-sm text-text-secondary">Start your journey with Handcrafted Haven</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {errors.form && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
              {errors.form}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-accent-header mb-2">
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
              aria-invalid={!!errors.name}
              className={`w-full px-[14px] py-3 border rounded-md bg-white text-text-primary placeholder:text-text-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-header focus:ring-offset-0 ${
                errors.name ? 'border-red-500' : 'border-border-color'
              }`}
            />
            {errors.name && (
              <span className="block mt-1.5 text-sm text-red-600" role="alert">{errors.name}</span>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-accent-header mb-2">
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
              aria-invalid={!!errors.email}
              className={`w-full px-[14px] py-3 border rounded-md bg-white text-text-primary placeholder:text-text-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-header focus:ring-offset-0 ${
                errors.email ? 'border-red-500' : 'border-border-color'
              }`}
            />
            {errors.email && (
              <span className="block mt-1.5 text-sm text-red-600" role="alert">{errors.email}</span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-accent-header mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password (min 8 characters)"
                autoComplete="new-password"
                aria-invalid={!!errors.password}
                className={`w-full px-[14px] py-3 pr-12 border rounded-md bg-white text-text-primary placeholder:text-text-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-header focus:ring-offset-0 ${
                  errors.password ? 'border-red-500' : 'border-border-color'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-text-secondary hover:text-accent-header rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="block mt-1.5 text-sm text-red-600" role="alert">{errors.password}</span>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-accent-header mb-2">
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
                aria-invalid={!!errors.confirmPassword}
                className={`w-full px-[14px] py-3 pr-12 border rounded-md bg-white text-text-primary placeholder:text-text-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-header focus:ring-offset-0 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-border-color'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-text-secondary hover:text-accent-header rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="block mt-1.5 text-sm text-red-600" role="alert">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="mt-1 w-4 h-4 rounded border-border-color text-accent-header focus:ring-accent-header"
              required
              aria-describedby="terms-desc"
            />
            <label id="terms-desc" htmlFor="terms" className="text-text-secondary cursor-pointer">
              I agree to the{' '}
              <Link href="/terms" className="text-accent-header font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2 rounded">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-accent-header font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2 rounded">Privacy Policy</Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent-header text-white py-3.5 rounded-md font-semibold hover:bg-[#1a282d] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating account…
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-color" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-sm text-text-secondary">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3 border border-border-color rounded-md bg-white text-text-primary font-medium text-sm hover:bg-bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2 transition-colors duration-200"
          >
            <GoogleIcon />
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-[#24292f] text-white font-medium text-sm hover:bg-[#1a1f24] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2 transition-colors duration-200"
          >
            <GitHubIcon />
            GitHub
          </button>
        </div>

        <p className="text-center text-sm text-text-secondary mt-6">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-accent-header hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2 rounded">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
