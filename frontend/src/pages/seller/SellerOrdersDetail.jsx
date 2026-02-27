import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import sellerApi from "../../api/sellerApi"
import { useAuth } from "../../context/AuthContext"
import toast from "react-hot-toast"

const SellerOrdersDetail = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const { user } = useAuth()

    const fetchOrderDetail = async () => {
        try {
            const res = await sellerApi.OrderDetailsById(id)
            setOrder(res.data.orders)
        } catch (err) {
            setError("Failed to load order details")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (!id) return
        fetchOrderDetail()
    }, [id])

    const handleClick = async (e) => {
        e.preventDefault()
        try{
            await sellerApi.ShipOrder(id)
            fetchOrderDetail()
            toast.success("Order Shipped!!")
        } catch(err) {
            toast.error(err.response?.data?.message || "Failed to ship order")
        }

    }

    if (loading) return <p className="p-6">Loading order...</p>
    if (error) return <p className="p-6 text-red-500">{error}</p>
    if (!order) return <p className="p-6">Order not found</p>

    const canShip = order.status === "Placed" && ["Seller", "Admin"].includes(user.role)
    return (
        <div className="max-w-4xl mx-auto p-5">
            <h2 className="text-2xl font-bold mb-1">
                Order #{order.id}
            </h2>

            <p className="text-gray-600 mb-4">
                Status: <span className="font-medium">{order.status}</span>
            </p>

            <p className="text-sm text-gray-500 mb-6">
                Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <div className="space-y-4">
                {order.orderitems.map(item => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 border rounded-lg p-4"
                    >
                        <img
                            src={`${import.meta.env.VITE_API_URL}${item.product.image}`}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                        />

                        <div className="flex-1">
                            <p className="font-medium">
                                {item.product.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                Qty: {item.quantity}
                            </p>
                        </div>

                        <div className="font-semibold">
                            ₹{item.quantity * item.priceAtPurchase}
                        </div>
                    </div>
                ))}

                {canShip && (
                    <button onClick={handleClick}
                        className="bg-green-500 p-3 rounded-lg text-white cursor-pointer">
                        Mark as Shipped
                    </button>
                )}
            </div>
        </div>
    )
}

export default SellerOrdersDetail
