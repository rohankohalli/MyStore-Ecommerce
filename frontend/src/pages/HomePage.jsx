import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Categories } from "../constants/categories"
import productApi from "../api/productApi";

const HomePage = () => {
    const [showAll, setShowAll] = useState(false)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const showCtgs = showAll ? Categories : Categories.slice(0, 5)

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await productApi.allProducts()
                setProducts(res.data.items)
            } catch (error) {
                setError("Failed to load Products")
                console.error("Error fetching products:", error)
            } finally {
                setLoading(false)
            }
        }
        loadProducts()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div>
            <div className="flex justify-between items-center mt-2 mx-5">
                <h4>Shop By Category</h4>

                <button
                    onClick={() => setShowAll(prev => !prev)}
                    className="text-blue-600 cursor-pointer"
                >
                    {showAll ? 'Show less' : 'View all ->'}
                </button>

            </div>
            <div className="flex gap-4 border rounded-lg p-2 flex-wrap">
                {showCtgs.map(ctg => (
                    <Link to={`/list?category=${ctg.value}`} key={ctg.value}
                        className="flex flex-col items-center gap-4 border rounded p-4 w-3xs shrink-0 hover:shadow-lg">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm">{ctg.label[0]}</span>
                        </div>
                        <span className="text-sm">{ctg.label}</span>
                    </Link>
                ))}
            </div>

            {/* The section of trending products/most purchased */}


            <div className="flex justify-between items-center mt-5 mx-5">
                <h4>Recently Added</h4>
                <Link to="/list" className="text-blue-600">
                    View all
                </Link>
            </div>
            <div>
                {products.length === 0 ? (
                    <div className="text-center text-gray-500">No products found.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
                        {products.slice(0, 4).map(p => (
                            <div key={p.id} className="border rounded-lg p-4 flex flex-col">
                                <img
                                    src={`${import.meta.env.VITE_API_URL}${p.image}`}
                                    alt={p.name}
                                    className="object-contain h-48 rounded" />

                                <h3 className="text-lg font-semibold mb-2">{p.name}</h3>

                                <p className="text-gray-600 mb-2">₹{p.price}</p>
                                
                                <Link to={`/product/${p.id}`} className="mt-auto text-blue-600">
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default HomePage