import { useEffect, useState } from "react";
import orderApi from "../../api/orderApi";
import { Link } from "react-router-dom";

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchMyOrder = async () => {
            try {
                const res = await orderApi.getMyOrders()
                setOrders(res.data.orders)
            } catch (error) {
                console.error(error);
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMyOrder()
    }, [])

    if (orders.length === 0) return <p className="p-6 text-center">No Orders yet!! Order soon</p>;
    if (loading) return <p className="p-6">Loading Orders...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6" >
            <h2 className="text-2xl font-bold mb-6"> My Orders </h2>

            <div className="space-y-4">
                {orders.map(order => (
                    <Link key={order.id} to={`/orders/${order.id}`}
                        className="block border p-4 rounded-lg hover:bg-gray-50">

                        <div className="flex justify-between">
                            <span>Order #{order.id} </span>
                            <span className="text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                            <span>Status: {order.status} </span>
                            <span>
                                ₹{order.orderitems.reduce((sum, i) => sum + i.quantity * i.priceAtPurchase, 0)}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default OrdersList