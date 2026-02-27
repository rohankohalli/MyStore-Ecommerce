import { useEffect, useState } from "react"
import productApi from "../../api/productApi"
import ProductCard from "../components/ProductCard";

const MyProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const load = async () => {
            try {
                const res = await productApi.myProducts()
                setProducts(res.data.products)
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
        <div>
            <h3 className="text-center">My Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    )
}

export default MyProducts