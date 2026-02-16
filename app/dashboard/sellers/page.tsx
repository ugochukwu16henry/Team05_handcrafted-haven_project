'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Seller {
  _id: string;
  name: string;
  email: string;
  businessName?: string;
  description?: string;
  location?: string;
  phone?: string;
  createdAt?: string;
}

export default function DashboardSellersPage() {
  const router = useRouter();
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('sellerId');
    router.push('/login');
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/sellers');
      if (response.ok) {
        const data = await response.json();
        setSellers(data);
      }
    } catch (error) {
      console.error('Error fetching sellers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSellers = sellers.filter(seller =>
    seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (seller.businessName && seller.businessName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-bg-secondary">
      <div className="flex flex-col md:flex-row h-screen">
        {/* Modern Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 border-r border-border-color/20 backdrop-blur-xl bg-white/80 dark:bg-[#1f1f1f]/80">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-header to-border-accent rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-text-background text-xl font-bold">H</span>
              </div>
              <div>
                <div className="text-lg font-bold text-accent-header">Haven</div>
                <div className="text-xs text-text-secondary">Dashboard</div>
              </div>
            </div>
            
            <nav className="space-y-1 flex-1">
              <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-bg-secondary/50 dark:hover:bg-[#2a2a2a] interactive transition-all duration-200 group">
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">🏠</span>
                <span>Overview</span>
              </a>
              <a href="/dashboard/products" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-bg-secondary/50 dark:hover:bg-[#2a2a2a] interactive transition-all duration-200 group">
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">📦</span>
                <span>Products</span>
              </a>
              <a href="/dashboard/sellers" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent-header/10 text-accent-header font-medium backdrop-blur-sm transition-all duration-200 hover:bg-accent-header/20 group">
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">👥</span>
                <span>Sellers</span>
              </a>
            </nav>
            
            <div className="pt-4 border-t border-border-color/20">
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 interactive transition-all duration-200 text-red-600 dark:text-red-400 min-h-[44px]"
              >
                <span>🚪</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </aside>
      
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <div className="mb-8 page-header">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-accent-header to-border-accent bg-clip-text text-transparent">
              Sellers Management
            </h1>
            <p className="text-text-secondary">Manage and view all registered sellers</p>
          </div>

          {/* Search and Actions Bar */}
          <div className="mb-6 backdrop-blur-xl bg-white/70 dark:bg-[#1f1f1f]/70 border border-border-color/20 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <label htmlFor="search" className="block text-sm font-semibold mb-2 text-accent-header">
                  Search Sellers
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email, or business..."
                  className="w-full px-4 py-3 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-header/50 focus:border-accent-header transition-all bg-bg-primary dark:bg-[#2a2a2a] dark:border-gray-700"
                />
              </div>
              <div className="flex gap-3">
                <Link
                  href="/sellers/become"
                  className="px-6 py-3 bg-gradient-to-r from-accent-header to-border-accent-dark text-text-background rounded-xl font-semibold interactive hover:shadow-lg hover:scale-[1.02] transition-all duration-200 shadow-md min-h-[44px] flex items-center"
                >
                  + Add New Seller
                </Link>
              </div>
            </div>
          </div>

          {/* Sellers List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="backdrop-blur-xl bg-white/70 dark:bg-[#1f1f1f]/70 border border-border-color/20 rounded-2xl p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredSellers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSellers.map((seller) => (
                <div
                  key={seller._id}
                  className="backdrop-blur-xl bg-white/70 dark:bg-[#1f1f1f]/70 border border-border-color/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  {/* Seller Avatar */}
                  <div className="w-20 h-20 bg-gradient-to-br from-border-accent to-border-accent-dark rounded-xl flex items-center justify-center text-4xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-200">
                    👨‍🎨
                  </div>

                  {/* Seller Info */}
                  <div className="text-center mb-4 flex-1">
                    <h2 className="text-xl font-bold text-accent-header mb-2">
                      {seller.businessName || seller.name}
                    </h2>
                    <p className="text-sm text-text-secondary mb-1">
                      <strong>Name:</strong> {seller.name}
                    </p>
                    <p className="text-sm text-text-secondary mb-3">
                      <strong>Email:</strong> {seller.email}
                    </p>
                    {seller.description && (
                      <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                        {seller.description}
                      </p>
                    )}
                    {seller.location && (
                      <p className="text-xs text-text-secondary mb-2">
                        📍 {seller.location}
                      </p>
                    )}
                    {seller.phone && (
                      <p className="text-xs text-text-secondary">
                        📞 {seller.phone}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto pt-4 border-t border-border-color/20">
                    <Link
                      href={`/products?sellerId=${seller._id}`}
                      className="flex-1 px-4 py-2 bg-accent-header/10 text-accent-header rounded-lg font-semibold text-sm text-center interactive hover:bg-accent-header/20 transition-all duration-200"
                    >
                      View Products
                    </Link>
                    <button className="px-4 py-2.5 bg-border-accent/10 text-border-accent-dark rounded-lg font-semibold text-sm interactive hover:bg-border-accent/20 transition-all duration-200 min-h-[44px] flex items-center">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="backdrop-blur-xl bg-white/70 dark:bg-[#1f1f1f]/70 border border-border-color/20 rounded-2xl p-12 shadow-lg text-center">
              <div className="text-6xl mb-4">👥</div>
              <h2 className="text-2xl font-bold text-accent-header mb-2">
                {searchTerm ? 'No sellers found' : 'No sellers yet'}
              </h2>
              <p className="text-text-secondary mb-6">
                {searchTerm
                  ? 'Try adjusting your search terms'
                  : 'Start by adding your first seller to the platform'}
              </p>
              {!searchTerm && (
                <Link
                  href="/sellers/become"
                  className="inline-block bg-gradient-to-r from-accent-header to-border-accent-dark text-text-background px-6 py-3 rounded-xl font-semibold interactive hover:shadow-lg hover:scale-[1.02] transition-all duration-200 shadow-md"
                >
                  Add First Seller
                </Link>
              )}
            </div>
          )}

          {/* Stats Summary */}
          {!loading && sellers.length > 0 && (
            <div className="mt-8 backdrop-blur-xl bg-white/70 dark:bg-[#1f1f1f]/70 border border-border-color/20 rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-header mb-1">
                    {sellers.length}
                  </div>
                  <div className="text-sm text-text-secondary">Total Sellers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-header mb-1">
                    {sellers.filter(s => s.businessName).length}
                  </div>
                  <div className="text-sm text-text-secondary">With Business Names</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-header mb-1">
                    {filteredSellers.length}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {searchTerm ? 'Filtered Results' : 'Active Sellers'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
