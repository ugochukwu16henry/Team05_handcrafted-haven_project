export default function LoginPage() {
  return (
    <main className="min-h-screen bg-bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="mb-2">Welcome Back</h1>
            <p className="text-text-secondary">
              Sign in to access your account
            </p>
          </div>
          
          {/* Form */}
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-accent-header">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2 text-accent-header">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary"
                required
              />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                <span className="text-text-secondary">Remember me</span>
              </label>
              <a href="#" className="text-accent-header font-semibold interactive hover:underline">
                Forgot password?
              </a>
            </div>
            
            <button
              type="submit"
              className="w-full bg-accent-header text-text-background py-3 rounded-lg font-semibold interactive hover:opacity-90 transition shadow-md"
            >
              Sign In
            </button>
          </form>
          
          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-color"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-bg-primary text-text-secondary">Or continue with</span>
            </div>
          </div>
          
          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-border-color rounded-lg interactive hover:bg-bg-secondary transition">
              <span>🔵</span>
              <span className="font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-border-color rounded-lg interactive hover:bg-bg-secondary transition">
              <span>⚫</span>
              <span className="font-medium">GitHub</span>
            </button>
          </div>
          
          {/* Sign up link */}
          <p className="text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <a href="/signup" className="text-accent-header font-semibold interactive hover:underline">
              Create account
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}