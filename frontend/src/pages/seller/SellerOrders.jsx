import { useEffect } from "react"
import { useState } from "react"
import sellerApi from "../../api/sellerApi"
import { Link } from "react-router-dom"

const SellerOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await sellerApi.SellersOrders()
                setOrders(res.data.orders)
            } catch (error) {
                setError("Failed to fetch Orders")
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    if (orders.length === 0) {
        return <div className="text-center">No orders yet</div>
    }

    return (
        <div className="space-y-4">
            {orders.map(order => (
                <Link to={`/seller/orders/${order.id}`}>
                    <div className="max-w-4xl mx-auto font-semibold">
                        Order #{order.id}
                        <div key={order.id} className="border rounded p-4">

                            <div>Status: {order.status}</div>
                            <div>Date: {new Date(order.createdAt).toLocaleDateString()}</div>

                            <div className="mt-2 space-y-2">
                                {order.orderitems.map(item => (

                                    <div key={item.id} className="flex items-center gap-3">
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}${item.product.image}`}
                                            alt={item.product.name}
                                            className="w-12 h-12 object-cover"
                                        />
                                        <div>
                                            <div>{item.product.name}</div>
                                            <div className="text-sm text-gray-500">
                                                Qty: {item.quantity} • ₹{item.priceAtPurchase}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default SellerOrders