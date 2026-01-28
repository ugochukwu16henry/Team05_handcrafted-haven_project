import Link from 'next/link';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  artistName: string;
  category?: string;
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  imageUrl,
  artistName,
  category,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="block">
      <div className="card interactive hover:shadow-xl transition cursor-pointer overflow-hidden p-0">
        {/* Product Image */}
        <div className="w-full h-64 bg-border-accent relative overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🎨
            </div>
          )}
          {category && (
            <span className="absolute top-4 right-4 bg-accent-header text-text-background px-3 py-1 rounded-full text-xs font-semibold">
              {category}
            </span>
          )}
        </div>
        
        {/* Product Info */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-accent-header mb-2 line-clamp-1">
            {title}
          </h3>
          
          <p className="text-text-secondary text-sm mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-text-secondary mb-1">by {artistName}</p>
              <p className="text-2xl font-bold text-accent-header">
                ${price.toFixed(2)}
              </p>
            </div>
            
            <button className="bg-border-accent text-text-background px-4 py-2 rounded-lg font-semibold text-sm interactive hover:opacity-90 transition">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}