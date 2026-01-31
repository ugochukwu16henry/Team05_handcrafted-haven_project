'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardProductsPage() {
  const router = useRouter();
  const [sellerId, setSellerId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    artistName: '',
    category: '',
    imageUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, you'd get the seller ID from authentication/session
    // For now, we'll use localStorage or a query param
    const storedSellerId = localStorage.getItem('sellerId');
    if (storedSellerId) {
      setSellerId(storedSellerId);
      fetchSellerProducts(storedSellerId);
    } else {
      // Prompt for seller ID if not set (for demo purposes)
      const id = prompt('Enter your Seller ID:');
      if (id) {
        localStorage.setItem('sellerId', id);
        setSellerId(id);
        fetchSellerProducts(id);
      }
    }
  }, []);

  const fetchSellerProducts = async (id: string) => {
    try {
      const response = await fetch(`/api/sellers/${id}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerId) {
      setError('Seller ID is required. Please set it first.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          sellerId: sellerId, // Auto-filled seller ID
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create product');
      }

      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        price: '',
        artistName: '',
        category: '',
        imageUrl: '',
      });
      fetchSellerProducts(sellerId);
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <a href="/dashboard/products" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent-header/10 text-accent-header font-medium backdrop-blur-sm transition-all duration-200 hover:bg-accent-header/20 group">
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">📦</span>
                <span>Products</span>
              </a>
              <a href="/dashboard/sellers" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-bg-secondary/50 dark:hover:bg-[#2a2a2a] interactive transition-all duration-200 group">
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">👥</span>
                <span>Sellers</span>
              </a>
            </nav>
            
            <div className="pt-4 border-t border-border-color/20">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 interactive transition-all duration-200 text-red-600 dark:text-red-400">
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
              Products Management
            </h1>
            <p className="text-text-secondary">Create and manage your product listings</p>
          </div>

          {sellerId && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl backdrop-blur-sm">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Seller ID:</strong> {sellerId} (auto-filled)
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl backdrop-blur-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Add Product Form */}
          <div className="card shadow-lg">
            <h2 className="mb-6">Create New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-full">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold mb-2 text-accent-header">
                  Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Handcrafted Ceramic Vase"
                  className="w-full px-4 py-3 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold mb-2 text-accent-header">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your product..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary resize-none"
                  required
                />
              </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Add Product Form */}
            <div className="backdrop-blur-xl bg-white/70 dark:bg-[#1f1f1f]/70 border border-border-color/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-semibold text-accent-header mb-6">Create New Product</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold mb-2 text-accent-header">
                    Product Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Handcrafted Ceramic Vase"
                    className="w-full px-4 py-3 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-header/50 focus:border-accent-header transition-all bg-bg-primary dark:bg-[#2a2a2a] dark:border-gray-700"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold mb-2 text-accent-header">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your product..."
                    rows={4}
                    className="w-full px-4 py-3 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-header/50 focus:border-accent-header transition-all bg-bg-primary dark:bg-[#2a2a2a] dark:border-gray-700 resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-semibold mb-2 text-accent-header">
                      Price ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-header/50 focus:border-accent-header transition-all bg-bg-primary dark:bg-[#2a2a2a] dark:border-gray-700"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold mb-2 text-accent-header">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-header/50 focus:border-accent-header transition-all bg-bg-primary dark:bg-[#2a2a2a] dark:border-gray-700"
                    >
                      <option value="">Select category</option>
                      <option value="Ceramics">Ceramics</option>
                      <option value="Woodwork">Woodwork</option>
                      <option value="Textiles">Textiles</option>
                      <option value="Art">Art</option>
                      <option value="Leather Goods">Leather Goods</option>
                      <option value="Jewelry">Jewelry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="artistName" className="block text-sm font-semibold mb-2 text-accent-header">
                    Artist/Seller Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="artistName"
                    name="artistName"
                    value={formData.artistName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-header/50 focus:border-accent-header transition-all bg-bg-primary dark:bg-[#2a2a2a] dark:border-gray-700"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-semibold mb-2 text-accent-header">
                    Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border border-border-color rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-header/50 focus:border-accent-header transition-all bg-bg-primary dark:bg-[#2a2a2a] dark:border-gray-700"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !sellerId}
                  className="w-full bg-gradient-to-r from-accent-header to-border-accent-dark text-text-background py-3.5 rounded-xl font-semibold interactive hover:shadow-lg hover:scale-[1.02] transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Creating...' : 'Create Product'}
                </button>
              </form>
            </div>

            {/* Your Products List */}
            <div className="backdrop-blur-xl bg-white/70 dark:bg-[#1f1f1f]/70 border border-border-color/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-accent-header">Your Products</h2>
                <span className="px-3 py-1 bg-accent-header/10 text-accent-header rounded-full text-sm font-semibold">
                  {products.length}
                </span>
              </div>
              {products.length > 0 ? (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {products.map((product) => (
                    <div 
                      key={product._id} 
                      className="p-4 bg-bg-secondary/50 dark:bg-[#2a2a2a]/50 rounded-xl border border-border-color/20 hover:bg-bg-secondary dark:hover:bg-[#2a2a2a] transition-all duration-200 group cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-accent-header group-hover:text-border-accent transition-colors">{product.title}</h3>
                        {product.category && (
                          <span className="text-xs bg-gradient-to-r from-border-accent to-border-accent-dark text-text-background px-2 py-1 rounded-lg font-medium">
                            {product.category}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold bg-gradient-to-r from-accent-header to-border-accent bg-clip-text text-transparent">
                          ${product.price.toFixed(2)}
                        </span>
                        <button className="text-xs text-accent-header hover:text-border-accent font-semibold interactive">
                          Edit →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-text-secondary mb-2">No products yet</p>
                  <p className="text-sm text-text-secondary">Create your first product to get started!</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
