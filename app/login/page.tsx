import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-bg-secondary via-bg-primary to-bg-secondary flex items-center justify-center p-4 relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-header rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-border-accent rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="card shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent-header rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">H</span>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-accent-header">Welcome Back</h1>
            <p className="text-text-secondary">
              Sign in to access your exclusive handcrafted collection
            </p>
          </div>
          
          {/* Form */}
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-accent-header">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary text-text-primary placeholder-text-secondary"
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
                className="w-full px-4 py-3 border-2 border-border-color rounded-lg focus:outline-none focus:border-accent-header transition bg-bg-primary text-text-primary placeholder-text-secondary"
                required
              />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 cursor-pointer accent-accent-header" />
                <span className="text-text-secondary group-hover:text-accent-header transition">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-accent-header font-semibold interactive hover:underline">
                Forgot password?
              </Link>
            </div>
            
            <button
              type="submit"
              className="w-full bg-accent-header text-text-background py-3 rounded-lg font-semibold interactive hover:shadow-lg transition shadow-md hover:scale-105"
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
            <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-border-color rounded-lg interactive hover:border-accent-header hover:bg-bg-secondary transition duration-200">
              <span>🔵</span>
              <span className="font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-border-color rounded-lg interactive hover:border-accent-header hover:bg-bg-secondary transition duration-200">
              <span>⚫</span>
              <span className="font-medium">GitHub</span>
            </button>
          </div>
          
          {/* Sign up link */}
          <p className="text-center text-sm text-text-secondary border-t border-border-color pt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-accent-header font-semibold interactive hover:underline">
              Create account
            </Link>
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-text-secondary">
          <p>Need help? <Link href="/support" className="text-accent-header font-semibold interactive hover:underline">Contact support</Link></p>
        </div>
      </div>
    </main>
  );
}