'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/AuthLayout';

export default function BecomeSellerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    description: '',
    location: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/sellers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create seller profile');
      }

      if (data._id) localStorage.setItem('sellerId', data._id);
      setSuccess(true);
      setTimeout(() => router.push('/dashboard/products'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase = 'w-full px-[14px] py-3 border rounded-md bg-white text-text-primary placeholder:text-text-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-header focus:ring-offset-0';
  const inputError = 'border-red-500';

  if (success) {
    return (
      <AuthLayout formWidth="wide" tagline="Sell your handcrafted work to buyers who value quality and craft.">
        <div className="bg-white rounded-[10px] shadow-lg p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6" aria-hidden>
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-accent-header mb-2">Application received</h1>
          <p className="text-text-secondary mb-6">
            Your seller profile has been created. Redirecting you to add your first product…
          </p>
          <div className="flex justify-center" aria-hidden>
            <svg className="animate-spin h-6 w-6 text-accent-header" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout formWidth="wide" tagline="Sell your handcrafted work to buyers who value quality and craft.">
      <div className="bg-white rounded-[10px] shadow-lg p-6 sm:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-accent-header mb-1">Become a seller</h1>
          <p className="text-sm text-text-secondary">
            Join our community of artisans and start selling your handcrafted creations.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-accent-header mb-2">
              Full name <span className="text-red-600" aria-hidden>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Jane Smith"
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!fieldErrors.name}
              className={`${inputBase} ${fieldErrors.name ? inputError : 'border-border-color'}`}
            />
            {fieldErrors.name && (
              <span className="block mt-1.5 text-sm text-red-600" role="alert">{fieldErrors.name}</span>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-accent-header mb-2">
              Email address <span className="text-red-600" aria-hidden>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              aria-required="true"
              aria-invalid={!!fieldErrors.email}
              className={`${inputBase} ${fieldErrors.email ? inputError : 'border-border-color'}`}
            />
            {fieldErrors.email && (
              <span className="block mt-1.5 text-sm text-red-600" role="alert">{fieldErrors.email}</span>
            )}
          </div>

          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-accent-header mb-2">
              Business name <span className="text-text-secondary font-normal">(optional)</span>
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="e.g. Jane&apos;s Ceramics"
              className={`${inputBase} border-border-color`}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-accent-header mb-2">
              About your craft <span className="text-text-secondary font-normal">(optional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your work and what makes it unique..."
              rows={4}
              className={`${inputBase} resize-none border-border-color min-h-[100px]`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-accent-header mb-2">
                Location <span className="text-text-secondary font-normal">(optional)</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                autoComplete="address-level2"
                className={`${inputBase} border-border-color`}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-accent-header mb-2">
                Phone <span className="text-text-secondary font-normal">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                autoComplete="tel"
                className={`${inputBase} border-border-color`}
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-4 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary border-border-color text-text-primary hover:bg-bg-secondary w-full sm:flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 bg-accent-header text-white py-3.5 rounded-md font-semibold hover:bg-[#1a282d] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting…
                </>
              ) : (
                'Submit application'
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-text-secondary mt-6">
          <Link href="/sellers" className="font-medium text-accent-header hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2 rounded">
            ← Back to sellers
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
