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
    <div className="flex flex-col md:flex-row h-screen bg-bg-secondary">
      {/* Sidebar */}
      <aside className="w-full md:w-60 bg-primary border-r border-border-color flex-shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-accent-header rounded-full"></div>
            <span className="text-xl font-bold">Handcrafted Haven</span>
          </div>
          
          <nav className="space-y-2">
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-bg-secondary interactive">
              <span>🏠</span> Home
            </a>
            <a href="/dashboard/products" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-bg-secondary text-accent-header font-medium">
              <span>📦</span> Products
            </a>
            <a href="/dashboard/sellers" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-bg-secondary interactive">
              <span>👥</span> Sellers
            </a>
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-60 p-6 border-t border-border-color">
          <button className="flex items-center gap-3 interactive">
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <h1 className="mb-8">Add Product</h1>

        {sellerId && (
          <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Seller ID:</strong> {sellerId} (auto-filled)
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg text-green-700">
            Product created successfully!
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Add Product Form */}
          <div className="card">
            <h2 className="mb-6">Create New Product</h2>
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
                    className="w-full px-4 py-3 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary"
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
                    className="w-full px-4 py-3 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary"
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
                  className="w-full px-4 py-3 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary"
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
                  className="w-full px-4 py-3 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !sellerId}
                className="w-full bg-accent-header text-text-background py-3 rounded-lg font-semibold interactive hover:opacity-90 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating...' : 'Create Product'}
              </button>
            </form>
          </div>

          {/* Your Products List */}
          <div className="card">
            <h2 className="mb-6">Your Products ({products.length})</h2>
            {products.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {products.map((product) => (
                  <div key={product._id} className="p-4 bg-bg-secondary rounded-lg border border-border-color">
                    <h3 className="font-semibold text-accent-header mb-2">{product.title}</h3>
                    <p className="text-sm text-text-secondary mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-accent-header">${product.price.toFixed(2)}</span>
                      {product.category && (
                        <span className="text-xs bg-border-accent text-text-background px-2 py-1 rounded">
                          {product.category}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary">No products yet. Create your first product!</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
