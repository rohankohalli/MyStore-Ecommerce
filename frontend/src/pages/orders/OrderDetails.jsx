import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import orderApi from "../../api/orderApi"

const OrderDetails = () => {

    const { id } = useParams()
    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await orderApi.getOrderById(id)
                setOrder(res.data.order)
            } catch (error) {
                console.error(error);
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [id])

    if (loading) return <p className="p-6">Loading Order...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="max-w-3xl mx-auto p-5">
            <h3 className="text-2xl font-bold mb-6">Order #{order.id}</h3>

            <div className="space-y-4">
                {order.orderitems?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 border p-3 rounded-lg">
                        <img
                            src={`${import.meta.env.VITE_API_URL}${item.product.image}`}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-md"/>

                        <div className="flex-1">
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-500">
                                Qty: {item.quantity}
                            </p>
                        </div>

                        <div className="font-semibold">
                            ₹{item.quantity * item.priceAtPurchase}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default OrderDetails