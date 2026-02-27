import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    const imgSrc = product.image ? `${import.meta.env.VITE_API_URL}${product.image}` : "/default.png";

    return (
        <Link to={`/products/${product.id}`}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">

            <div className="relative aspect-square bg-gray-50 overflow-hidden rounded-t-2xl">

                <img
                    src={imgSrc}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />

                {product.category && (
                    <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
                        {product.category}
                    </span>
                )}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <span className="bg-white/90 text-gray-900 text-sm font-medium px-4 py-2 rounded-full shadow">
                        View Product
                    </span>
                </div>
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                    {product.name}
                </h3>

                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">
                        ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${product.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                            }`}
                    >
                        {product.stock > 0 ? "In stock" : "Out of stock"}
                    </span>
                </div>

                {product.stock > 0 && product.stock <= 5 && (
                    <span className="text-xs text-orange-500 font-medium">
                        Last {product.stock} items left
                    </span>
                )}
            </div>
        </Link>
    )
}
