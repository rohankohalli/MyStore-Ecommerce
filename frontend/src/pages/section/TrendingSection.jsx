import { useEffect, useState } from "react"
import productApi from "../../api/productApi"
import { Link } from "react-router-dom"

const TrendingSection = () => {
    const [trendingProducts, setTrendingProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const trendingProducts = async () => {
            try {
                const res = await productApi.trendingProducts()
                setTrendingProducts(res.data.trendingProducts)
            } catch (error) {
                setError("Failed to load Products")
                console.error("Error fetching products:", error)
            } finally {
                setLoading(false)
            }
        }
        trendingProducts()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div>
            <div>
                <h4>Trending Product</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
                {trendingProducts.map(trend => (
                    <Link to={`/products/${trend.product.id}`} key={trend.product.id}>
                        <div className="border rounded-lg p-0.5 flex flex-col hover:shadow-lg transition">
                            <img
                                src={`${import.meta.env.VITE_API_URL}${trend.product.image}`}
                                alt={trend.product.name}
                                className="object-contain h-48 rounded" />

                            <div className="bg-gray-200">
                                <h3 className="text-lg font-semibold mb-2">{trend.product.name}</h3>

                                <p className="text-gray-600 mb-2">₹{trend.product.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default TrendingSection