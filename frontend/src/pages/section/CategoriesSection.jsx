import { Link, useSearchParams } from "react-router-dom"
import { Categories } from "../../constants/categories"
import { useEffect, useState } from "react"
import productApi from "../../api/productApi"

const CategoriesSection = () => {
    const [showAll, setShowAll] = useState(false)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const showCtgs = showAll ? Categories : Categories.slice(0, 5)

    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await productApi.allProducts(category)
                setProducts(res.data.items)
            } catch (error) {
                setError("Failed to load Products")
                console.error("Error fetching products:", error)
            } finally {
                setLoading(false)
            }
        }
        loadProducts()
    }, [category])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div>
            <div className="flex justify-between items-center mt-2">
                <h4>Shop By Category</h4>

                <button
                    onClick={() => setShowAll(prev => !prev)}
                    className="text-blue-600 cursor-pointer"
                >
                    {showAll ? 'Show less' : 'View all'}
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
        </div>
    )
}

export default CategoriesSection