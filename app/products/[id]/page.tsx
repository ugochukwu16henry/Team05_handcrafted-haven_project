import Link from 'next/link';

// Sample product data (match products list page for demo)
const SAMPLE_PRODUCTS: Record<string, { title: string; description: string; price: number; artistName: string; category: string }> = {
  '1': { title: 'Handcrafted Ceramic Vase', description: 'Beautiful hand-thrown ceramic vase with unique glaze pattern. Perfect for fresh or dried flowers.', price: 89.99, artistName: 'Sarah Johnson', category: 'Ceramics' },
  '2': { title: 'Wooden Cutting Board', description: 'Premium walnut and maple cutting board with juice groove. Food-safe finish.', price: 65.00, artistName: 'Michael Chen', category: 'Woodwork' },
  '3': { title: 'Hand-Knitted Wool Scarf', description: 'Soft merino wool scarf in beautiful earth tones. Warm and stylish for winter.', price: 45.50, artistName: 'Emma Williams', category: 'Textiles' },
  '4': { title: 'Abstract Canvas Painting', description: 'Original acrylic painting on canvas. Modern abstract design in vibrant colors.', price: 250.00, artistName: 'David Martinez', category: 'Art' },
  '5': { title: 'Leather Journal', description: 'Hand-stitched leather journal with recycled paper. Perfect for writing or sketching.', price: 55.00, artistName: 'Lisa Anderson', category: 'Leather Goods' },
  '6': { title: 'Silver Wire Earrings', description: 'Delicate sterling silver earrings with gemstone accents. Handcrafted with care.', price: 38.00, artistName: 'Rachel Kim', category: 'Jewelry' },
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = SAMPLE_PRODUCTS[id];

  if (!product) {
    return (
      <main className="min-h-screen bg-bg-secondary py-12">
        <div className="container-fluid">
          <h1 className="mb-4">Product not found</h1>
          <Link href="/products" className="text-accent-header font-semibold interactive hover:underline">
            ← Back to products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-secondary py-12">
      <div className="container-fluid">
        <Link href="/products" className="inline-block text-accent-header font-medium mb-6 interactive hover:underline">
          ← Back to products
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full aspect-square max-h-[480px] bg-border-accent rounded-xl flex items-center justify-center text-8xl">
            🎨
          </div>
          <div>
            <span className="inline-block bg-accent-header text-text-background px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-accent-header mb-4">{product.title}</h1>
            <p className="text-text-secondary mb-4">by {product.artistName}</p>
            <p className="text-lg text-text-primary mb-6">{product.description}</p>
            <p className="text-3xl font-bold text-accent-header mb-8">${product.price.toFixed(2)}</p>
            <button className="w-full bg-accent-header text-text-background py-4 rounded-lg font-semibold interactive hover:opacity-90 transition shadow-md">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
