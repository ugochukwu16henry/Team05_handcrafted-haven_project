'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalSales: number;
  pendingOrders: number;
  totalProducts: number;
  totalSellers: number;
  revenueTrend: number;
  orderTrend: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }

    // Simulate data fetching with skeleton loading
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      setStats({
        totalSales: 4890.80,
        pendingOrders: 5430.03,
        totalProducts: 64,
        totalSellers: 6,
        revenueTrend: 12.5,
        orderTrend: 8.3,
      });
      setLoading(false);
    };

    fetchData();
    
    // Real-time updates every 30 seconds
    const interval = setInterval(fetchData, 30000);
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
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 interactive transition-all duration-200 text-red-600 dark:text-red-400 min-h-[44px]">
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
            <p className="text-text-secondary">Welcome back! Here's what's happening today.</p>
          </div>
          
          {/* Inverted Pyramid Layout: Critical KPIs at Top */}
          {loading ? (
            <DashboardSkeleton />
          ) : stats ? (
            <>
              {/* Top Level: Critical KPIs (Bento Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <KPICard
                  title="Total Sales"
                  value={`$${stats.totalSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  trend={stats.revenueTrend}
                  icon="💰"
                  color="from-green-500 to-emerald-600"
                  loading={loading}
                />
                <KPICard
                  title="Pending Orders"
                  value={`$${stats.pendingOrders.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  trend={stats.orderTrend}
                  icon="⏳"
                  color="from-amber-500 to-orange-600"
                  loading={loading}
                />
                <KPICard
                  title="Total Products"
                  value={stats.totalProducts.toString()}
                  trend={5.2}
                  icon="📦"
                  color="from-blue-500 to-cyan-600"
                  loading={loading}
                />
                <KPICard
                  title="Active Sellers"
                  value={stats.totalSellers.toString()}
                  trend={2.1}
                  icon="👥"
                  color="from-purple-500 to-pink-600"
                  loading={loading}
                />
              </div>

              {/* Middle Level: Trends & Charts (Bento Grid) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {/* Revenue Chart - Takes 2 columns */}
                <div className="lg:col-span-2">
                  <GlassCard>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-accent-header">Revenue Trend</h2>
                      <select className="text-sm border border-border-color rounded-lg px-3 py-1.5 bg-bg-primary focus:outline-none focus:border-accent-header">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                      </select>
                    </div>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📈</div>
                        <p className="text-text-secondary">Chart visualization</p>
                        <p className="text-xs text-text-secondary mt-2">Real-time data updates every 30s</p>
                      </div>
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
                        className="block p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">👤</span>
                          <div>
                            <div className="font-semibold text-accent-header">Invite Seller</div>
                            <div className="text-xs text-text-secondary">Onboard new artisan</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </GlassCard>
                </div>
              </div>

              {/* Bottom Level: Granular Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Latest Orders */}
                <GlassCard>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-accent-header">Recent Orders</h2>
                    <Link href="/dashboard/orders" className="text-sm text-accent-header hover:underline">
                      View all →
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((order) => (
                      <OrderItem key={order} orderNumber={order} />
                    ))}
                  </div>
                </GlassCard>

                {/* Activity Feed */}
                <GlassCard>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-accent-header">Activity Feed</h2>
                    <button className="text-sm text-text-secondary hover:text-accent-header">
                      Filter
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: '✅', text: 'New product added', time: '2m ago' },
                      { icon: '💰', text: 'Order #1234 completed', time: '15m ago' },
                      { icon: '👤', text: 'New seller joined', time: '1h ago' },
                      { icon: '📦', text: 'Product updated', time: '2h ago' },
                    ].map((activity, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-bg-secondary/50 transition-colors duration-200 group"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                          {activity.icon}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-accent-header">{activity.text}</p>
                          <p className="text-xs text-text-secondary">{activity.time}</p>
                        </div>
                      </div>
                    ))}
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

// KPI Card Component with Microinteractions
function KPICard({ 
  title, 
  value, 
  trend, 
  icon, 
  color,
  loading 
}: { 
  title: string; 
  value: string; 
  trend: number; 
  icon: string;
  color: string;
  loading: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  if (loading) {
    return (
      <GlassCard>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
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
      <GlassCard className="">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <div className={`text-sm font-semibold flex items-center gap-1 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <span>{trend >= 0 ? '↑' : '↓'}</span>
            <span>{Math.abs(trend)}%</span>
          </div>
        </div>
      <p className="text-sm text-text-secondary mb-2">{title}</p>
      <p className={`text-3xl font-bold text-accent-header transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}>
        {value}
      </p>
      <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${color} transition-all duration-500`}
          style={{ width: `${Math.min(Math.abs(trend) * 10, 100)}%` }}
        ></div>
      </div>
      </GlassCard>
    </div>
  );
}

// Order Item Component with Progressive Disclosure
function OrderItem({ orderNumber }: { orderNumber: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="p-4 rounded-xl bg-bg-secondary/50 dark:bg-[#2a2a2a]/50 hover:bg-bg-secondary dark:hover:bg-[#2a2a2a] transition-all duration-200 cursor-pointer group"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-border-accent to-border-accent-dark rounded-full flex items-center justify-center text-white font-semibold group-hover:scale-110 transition-transform duration-200">
            {orderNumber}
          </div>
          <div>
            <p className="font-semibold text-accent-header">Customer {orderNumber}</p>
            <p className="text-xs text-text-secondary">customer{orderNumber}@email.com</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-accent-header">${(300 + orderNumber * 50).toFixed(2)}</p>
          <p className="text-xs text-green-600">Completed</p>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-border-color/20 animate-in slide-in-from-top">
          <p className="text-xs text-text-secondary">Order details and timeline...</p>
        </div>
      )}
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
