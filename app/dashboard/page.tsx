'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProductItem {
  _id: string;
  title: string;
  description?: string;
  price: number;
  sellerId?: string;
  artistName?: string;
  category?: string;
  imageUrl?: string;
  createdAt?: string;
}

interface SellerItem {
  _id: string;
  name: string;
  email: string;
  businessName?: string;
  createdAt?: string;
}

interface DashboardStats {
  totalProducts: number;
  totalSellers: number;
  catalogValue: number;
  newListingsCount: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [sellers, setSellers] = useState<SellerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('sellerId');
    router.push('/login');
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [productsRes, sellersRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/sellers'),
        ]);

        if (!productsRes.ok) throw new Error('Failed to load products');
        if (!sellersRes.ok) throw new Error('Failed to load sellers');

        const productsData = await productsRes.json();
        const productsList: ProductItem[] = Array.isArray(productsData.products) ? productsData.products : [];
        const sellersList: SellerItem[] = await sellersRes.json();
        if (!Array.isArray(sellersList)) throw new Error('Invalid sellers data');

        setProducts(productsList);
        setSellers(sellersList);

        const catalogValue = productsList.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
        const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const newListingsCount = productsList.filter((p) => {
          const created = p.createdAt ? new Date(p.createdAt).getTime() : 0;
          return created >= oneWeekAgo;
        }).length;

        setStats({
          totalProducts: productsList.length,
          totalSellers: sellersList.length,
          catalogValue,
          newListingsCount,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
        setStats({
          totalProducts: 0,
          totalSellers: 0,
          catalogValue: 0,
          newListingsCount: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-bg-secondary'}`}>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Modern Sidebar with Glassmorphism */}
        <aside className="w-full md:w-64 flex-shrink-0 border-r border-border-color/20 backdrop-blur-xl bg-white/80 dark:bg-[#1f1f1f]/80">
          <div className="p-6 h-full flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-header to-border-accent rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-text-background text-xl font-bold">H</span>
              </div>
              <div>
                <div className="text-lg font-bold text-accent-header">Haven</div>
                <div className="text-xs text-text-secondary">Dashboard</div>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-1 flex-1">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent-header/10 text-accent-header font-medium backdrop-blur-sm transition-all duration-200 hover:bg-accent-header/20 group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">🏠</span>
                <span>Overview</span>
              </Link>
              <Link 
                href="/dashboard/products" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-bg-secondary/50 dark:hover:bg-[#2a2a2a] interactive transition-all duration-200 group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">📦</span>
                <span>Products</span>
              </Link>
              <Link 
                href="/dashboard/sellers" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-bg-secondary/50 dark:hover:bg-[#2a2a2a] interactive transition-all duration-200 group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">👥</span>
                <span>Sellers</span>
              </Link>
            </nav>
            
            {/* Theme Toggle & Sign Out */}
            <div className="space-y-2 pt-4 border-t border-border-color/20">
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-bg-secondary/50 dark:hover:bg-[#2a2a2a] interactive transition-all duration-200 min-h-[44px]"
                aria-label="Toggle dark mode"
              >
                <span className="text-xl">{isDarkMode ? '☀️' : '🌙'}</span>
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
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
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 md:p-8">
          {/* Page Header */}
          <div className="mb-8 page-header">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-accent-header to-border-accent bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-text-secondary">Live overview of your marketplace.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm">
              {error}
            </div>
          )}
          
          {/* Critical KPIs */}
          {loading ? (
            <DashboardSkeleton />
          ) : stats ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <KPICard
                  title="Total Products"
                  value={stats.totalProducts.toLocaleString()}
                  subtitle="Listings"
                  icon="📦"
                  color="from-accent-header to-border-accent-dark"
                  loading={loading}
                />
                <KPICard
                  title="Active Sellers"
                  value={stats.totalSellers.toLocaleString()}
                  subtitle="Registered"
                  icon="👥"
                  color="from-border-accent to-border-accent-dark"
                  loading={loading}
                />
                <KPICard
                  title="Catalog Value"
                  value={`$${stats.catalogValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  subtitle="Sum of listing prices"
                  icon="💰"
                  color="from-green-600 to-emerald-700"
                  loading={loading}
                />
                <KPICard
                  title="New This Week"
                  value={stats.newListingsCount.toLocaleString()}
                  subtitle="Products added"
                  icon="✨"
                  color="from-amber-500 to-orange-600"
                  loading={loading}
                />
              </div>

              {/* Middle: Summary & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <div className="lg:col-span-2">
                  <GlassCard>
                    <h2 className="text-xl font-semibold text-accent-header mb-4">Catalog Summary</h2>
                    <div className="h-64 flex flex-col justify-center">
                      {products.length === 0 ? (
                        <p className="text-text-secondary text-center">No products yet. Add your first listing.</p>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {[...new Set(products.map((p) => p.category).filter(Boolean))].slice(0, 6).map((cat) => (
                            <div
                              key={cat}
                              className="p-3 rounded-xl bg-bg-secondary/50 dark:bg-[#2a2a2a]/50 border border-border-color/20"
                            >
                              <p className="text-xs text-text-secondary uppercase tracking-wide">{cat || 'Uncategorized'}</p>
                              <p className="text-lg font-bold text-accent-header">
                                {products.filter((p) => (p.category || '') === (cat || '')).length}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-text-secondary mt-4">Data refreshes every minute</p>
                    </div>
                  </GlassCard>
                </div>

                {/* Quick Actions */}
                <div>
                  <GlassCard>
                    <h2 className="text-xl font-semibold text-accent-header mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                      <Link
                        href="/dashboard/products"
                        className="block p-4 rounded-xl bg-gradient-to-r from-accent-header/10 to-border-accent/10 hover:from-accent-header/20 hover:to-border-accent/20 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">➕</span>
                          <div>
                            <div className="font-semibold text-accent-header">Add Product</div>
                            <div className="text-xs text-text-secondary">Create new listing</div>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="/sellers/become"
                        className="block p-4 rounded-xl bg-gradient-to-r from-border-accent/10 to-border-accent-dark/10 hover:from-border-accent/20 hover:to-border-accent-dark/20 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">👤</span>
                          <div>
                            <div className="font-semibold text-accent-header">Become a Seller</div>
                            <div className="text-xs text-text-secondary">Register as artisan</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </GlassCard>
                </div>
              </div>

              {/* Recent Products & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <GlassCard>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-accent-header">Recent Products</h2>
                    <Link href="/dashboard/products" className="text-sm text-accent-header hover:underline">
                      Manage all →
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {products
                      .slice()
                      .sort((a, b) => (new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()))
                      .slice(0, 5)
                      .map((product) => (
                        <Link
                          key={product._id}
                          href={`/products/${product._id}`}
                          className="flex items-center justify-between p-4 rounded-xl bg-bg-secondary/50 dark:bg-[#2a2a2a]/50 hover:bg-bg-secondary dark:hover:bg-[#2a2a2a] transition-all duration-200 group border border-border-color/20"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-accent-header truncate">{product.title}</p>
                            <p className="text-xs text-text-secondary">
                              {product.artistName || '—'} · {product.category || 'Uncategorized'}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-accent-header shrink-0 ml-2">
                            ${Number(product.price).toFixed(2)}
                          </p>
                        </Link>
                      ))}
                    {products.length === 0 && (
                      <p className="text-text-secondary text-center py-6 text-sm">No products yet.</p>
                    )}
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-accent-header">Recent Activity</h2>
                  </div>
                  <div className="space-y-3">
                    {getRecentActivity(products, sellers).map((activity, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-bg-secondary/50 transition-colors duration-200"
                      >
                        <span className="text-xl">{activity.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-accent-header">{activity.text}</p>
                          <p className="text-xs text-text-secondary">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                    {products.length === 0 && sellers.length === 0 && (
                      <p className="text-text-secondary text-center py-6 text-sm">No recent activity.</p>
                    )}
                  </div>
                </GlassCard>
              </div>
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}

function formatRelativeTime(dateStr: string): string {
  const d = new Date(dateStr).getTime();
  const now = Date.now();
  const diff = now - d;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function getRecentActivity(
  products: ProductItem[],
  sellers: SellerItem[]
): { icon: string; text: string; time: string }[] {
  const list: { icon: string; text: string; time: string; ts: number }[] = [];
  products.forEach((p) => {
    const ts = p.createdAt ? new Date(p.createdAt).getTime() : 0;
    if (ts) list.push({ icon: '📦', text: `"${p.title}" listed`, time: formatRelativeTime(p.createdAt!), ts });
  });
  sellers.forEach((s) => {
    const ts = s.createdAt ? new Date(s.createdAt).getTime() : 0;
    if (ts) list.push({ icon: '👤', text: `${s.name} joined as seller`, time: formatRelativeTime(s.createdAt!), ts });
  });
  list.sort((a, b) => b.ts - a.ts);
  return list.slice(0, 5).map(({ icon, text, time }) => ({ icon, text, time }));
}

function GlassCard({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`backdrop-blur-xl bg-white/70 dark:bg-[#1f1f1f]/70 border border-border-color/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

// KPI Card Component
function KPICard({
  title,
  value,
  subtitle,
  icon,
  color,
  loading,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: string;
  color: string;
  loading: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  if (loading) {
    return (
      <GlassCard>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        </div>
      </GlassCard>
    );
  }

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlassCard>
        <div className="flex items-start justify-between mb-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 text-white`}>
            {icon}
          </div>
        </div>
        <p className="text-sm text-text-secondary mb-1">{title}</p>
        <p className={`text-2xl md:text-3xl font-bold text-accent-header transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}>
          {value}
        </p>
        {subtitle && <p className="text-xs text-text-secondary mt-1">{subtitle}</p>}
      </GlassCard>
    </div>
  );
}

// Skeleton Loading Component
function DashboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <GlassCard key={i}>
            <div className="animate-pulse">
              <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-xl mb-3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
              <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </GlassCard>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </GlassCard>
        </div>
        <GlassCard>
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4"></div>
            <div className="space-y-3">
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
