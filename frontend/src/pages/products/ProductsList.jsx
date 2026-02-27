import { useEffect, useState } from "react"
import productApi from "../../api/productApi"
import ProductCard from "../components/ProductCard"

const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const load = async () => {
            try {
                const res = await productApi.allProducts()
                setProducts(res.data.items)
            } catch (error) {
                setError("Failed to load Products")
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
    )
}

export default ProductsList