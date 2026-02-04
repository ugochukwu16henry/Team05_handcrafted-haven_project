export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-bg-secondary">
      
      {/* Sidebar */}
      <aside className="w-60 bg-primary border-r border-border-color">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-accent-header rounded-full"></div>
            <span className="text-xl font-bold">Handcrafted Haven</span>
          </div>
          
          <nav className="space-y-2">
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-bg-secondary text-accent-header font-medium">
              <span>🏠</span> Home
            </a>
            <a href="/dashboard/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-bg-secondary interactive">
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
        <h1 className="mb-8">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <p className="text-text-secondary text-sm mb-2">💰 Total Sales</p>
            <p className="text-3xl font-bold">$4,890.80</p>
          </div>
          <div className="card">
            <p className="text-text-secondary text-sm mb-2">⏳ Pending Orders</p>
            <p className="text-3xl font-bold">$5,430.03</p>
          </div>
          <div className="card">
            <p className="text-text-secondary text-sm mb-2">📦 Total Products</p>
            <p className="text-3xl font-bold">64</p>
          </div>
          <div className="card">
            <p className="text-text-secondary text-sm mb-2">👥 Total Sellers</p>
            <p className="text-3xl font-bold">6</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Revenue Chart Placeholder */}
          <div className="card">
            <h2 className="mb-4">Recent Revenue</h2>
            <div className="h-64 bg-bg-secondary rounded flex items-center justify-center">
              <p className="text-text-secondary">Chart will go here</p>
            </div>
          </div>
          
          {/* Latest Orders */}
          <div className="card">
            <h2 className="mb-4">Latest Orders</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((order) => (
                <div key={order} className="flex items-center justify-between p-3 bg-bg-secondary rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-border-accent rounded-full"></div>
                    <div>
                      <p className="font-medium">Customer Name</p>
                      <p className="text-sm text-text-secondary">customer@email.com</p>
                    </div>
                  </div>
                  <p className="font-bold">$300.00</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}