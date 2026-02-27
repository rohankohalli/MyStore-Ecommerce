import { useNavigate, useParams } from "react-router-dom"
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import { useAuth } from "../../context/AuthContext";
import EditProductModal from "../components/EditProductModal";
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const { id } = useParams()
    const { addItem } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [qty, setQty] = useState(1)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await productApi.getProductsById(id)
                setProduct(res.data.product)
            } catch (error) {
                console.error(error)
                setError("Failed to load products")
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const isSellerOwner = user?.role === "Seller" || "Admin" && product?.seller?.id === user?.id

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete the product?");
        if (!confirmed) return;

        try {
            const res = await productApi.deleteProduct(id);
            if (res?.success) {
                toast.info("Product deleted successfully");
                navigate("/my-products")
            } else {
                toast.error("Error deleting product");
                console.log(res?.error);
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        }
    }

    const HandleSave = (updated) => {
        setProduct(updated)
        setEditing(null);
    }

    if (loading) return <p className="p-6">Loading...</p>
    if (error) return <p className="p-6 text-red-500">{error}</p>
    if (!product) return <p className="p-6">Product not found</p>

    const imgSrc = product.image ? `${import.meta.env.VITE_API_URL}${product.image}` : "/default.png";

    return (
        <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

            <img src={imgSrc} alt={product.name} className="w-full rounded-xl object-cover border bg-white" />

            <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <h6>Sold By:{product.seller.name}</h6>
                <p className="text-gray-500 mt-2">{product.description}</p>

                <p className="text-2xl text-indigo-600 mt-4">₹{product.price}</p>
                <p className="text-sm mt-1 text-gray-500">
                    {product.stock > 0 ? "In stock" : "Out of stock"}
                </p>

                <div className="flex items-center gap-4 mt-6">
                    {isSellerOwner ? (
                        <>
                            <button onClick={ () => setEditing(product)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl cursor-pointer">
                                Edit Product
                            </button>

                            <button onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-xl cursor-pointer">
                                Delete Product
                            </button>
                        </>
                    ) : (
                        <>
                            <input type="number" min="1" max={product.stock} value={qty}
                                onChange={(e) => setQty(Number(e.target.value))}
                                className="w-20 border rounded-lg p-2" />

                            <button
                                disabled={product.stock === 0}
                                onClick={() => addItem(product, qty)}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 
                                rounded-xl transition cursor-pointer disabled:cursor-not-allowed">
                                Add to Cart
                            </button>
                        </>
                    )}

                    {editing && (
                        <EditProductModal
                            product={editing}
                            onClose={() => setEditing(null)}
                            onSave={HandleSave}
                        />
                    )}

                </div>
            </div>
        </div>
    )
}

export default ProductDetails