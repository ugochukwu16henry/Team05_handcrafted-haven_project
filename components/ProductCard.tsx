import Link from "next/link";

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
    <Link href={`/products/${id}`}>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300 h-full flex flex-col group">
        {/* Image Container */}
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-gray-100 to-gray-200">
              🎨
            </div>
          )}

          {/* Category Badge */}
          {category && (
            <span className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
            {description}
          </p>

          {/* Artist */}
          <p className="text-xs text-gray-500 mb-3">
            by <span className="font-medium text-gray-700">{artistName}</span>
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                ${price.toFixed(2)}
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
