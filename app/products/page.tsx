import ProductCard from '@/components/ProductCard';

// Sample product data
const sampleProducts = [
  {
    id: '1',
    title: 'Handcrafted Ceramic Vase',
    description: 'Beautiful hand-thrown ceramic vase with unique glaze pattern. Perfect for fresh or dried flowers.',
    price: 89.99,
    artistName: 'Sarah Johnson',
    category: 'Ceramics',
  },
  {
    id: '2',
    title: 'Wooden Cutting Board',
    description: 'Premium walnut and maple cutting board with juice groove. Food-safe finish.',
    price: 65.00,
    artistName: 'Michael Chen',
    category: 'Woodwork',
  },
  {
    id: '3',
    title: 'Hand-Knitted Wool Scarf',
    description: 'Soft merino wool scarf in beautiful earth tones. Warm and stylish for winter.',
    price: 45.50,
    artistName: 'Emma Williams',
    category: 'Textiles',
  },
  {
    id: '4',
    title: 'Abstract Canvas Painting',
    description: 'Original acrylic painting on canvas. Modern abstract design in vibrant colors.',
    price: 250.00,
    artistName: 'David Martinez',
    category: 'Art',
  },
  {
    id: '5',
    title: 'Leather Journal',
    description: 'Hand-stitched leather journal with recycled paper. Perfect for writing or sketching.',
    price: 55.00,
    artistName: 'Lisa Anderson',
    category: 'Leather Goods',
  },
  {
    id: '6',
    title: 'Silver Wire Earrings',
    description: 'Delicate sterling silver earrings with gemstone accents. Handcrafted with care.',
    price: 38.00,
    artistName: 'Rachel Kim',
    category: 'Jewelry',
  },
];

const categories = ['All', 'Ceramics', 'Woodwork', 'Textiles', 'Art', 'Leather Goods', 'Jewelry'];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-secondary to-bg-primary py-12 md:py-20">
      <div className="container-fluid">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-accent-400 text-accent-header rounded-full text-sm font-semibold">
            ✨ Our Collection
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-accent-header">Browse Our Collection</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Discover unique, handcrafted items from talented artisans around the world. Each piece tells a story and is made with passion.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-10 pb-8 border-b-2 border-border-accent">
          <p className="text-sm text-text-secondary mb-4 font-semibold">FILTER BY CATEGORY</p>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                  category === 'All'
                    ? 'bg-accent-header text-text-background shadow-md'
                    : 'bg-bg-primary text-accent-header border-2 border-border-accent hover:border-accent-header'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              artistName={product.artistName}
              category={product.category}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <button className="bg-accent-header text-text-background px-8 py-4 rounded-lg font-semibold text-lg interactive hover:opacity-90 transition shadow-md">
            Load More Products
          </button>
        </div>
      </div>
    </main>
  );
}