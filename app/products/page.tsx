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

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-bg-secondary py-12">
      <div className="container-fluid">
        <div className="mb-8">
          <h1 className="mb-4">Browse Our Collection</h1>
          <p className="text-lg text-text-secondary">
            Discover unique, handcrafted items from talented artisans around the world.
          </p>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </main>
  );
}