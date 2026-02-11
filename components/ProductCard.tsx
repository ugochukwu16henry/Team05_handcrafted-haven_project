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
    <Link
      href={`/products/${id}`}
      className="block h-full rounded-xl border border-border-color bg-bg-primary overflow-hidden shadow-sm hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-header focus-visible:ring-offset-2 transition-shadow duration-200"
    >
      <div className="h-full flex flex-col">
        {/* Product Image */}
        <div className="w-full h-64 bg-border-accent/20 relative overflow-hidden flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl text-border-accent/60" aria-hidden>
              🎨
            </div>
          )}
          {category && (
            <span className="absolute top-3 right-3 bg-accent-header text-white px-2.5 py-1 rounded-md text-xs font-medium">
              {category}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5 flex-1 flex flex-col min-w-0">
          <h3 className="text-lg font-semibold text-accent-header mb-2 line-clamp-1">
            {title}
          </h3>

          <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-1">
            {description}
          </p>

          <div className="flex items-center justify-between gap-3 mt-auto pt-2 border-t border-border-color">
            <div className="min-w-0">
              <p className="text-xs text-text-secondary mb-0.5">by {artistName}</p>
              <p className="text-xl font-bold text-accent-header">
                ${price.toFixed(2)}
              </p>
            </div>
            <span className="shrink-0 bg-border-accent text-accent-header px-4 py-2.5 rounded-lg font-semibold text-sm">
              View details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
