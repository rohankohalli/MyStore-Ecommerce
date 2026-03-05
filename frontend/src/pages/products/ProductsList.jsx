import { useEffect, useState } from "react"
import productApi from "../../api/productApi"
import ProductCard from "../../components/ProductCard"
import { useSearchParams } from "react-router-dom"

const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category")

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await productApi.allProducts({ category })
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
    )
}

export default ProductsList