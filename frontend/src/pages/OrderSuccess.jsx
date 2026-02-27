import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import orderApi from "../api/orderApi";

export default function OrderSuccess() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await orderApi.getOrderById(id);
                setOrder(data);
            } catch (err) {
                setError("Failed to fetch order.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id]);

    if (loading) {
        return <div className="text-center mt-10">Checking order...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    if (!order) {
        return (
            <div className="text-center mt-10 text-gray-600">
                <h2 className="text-2xl font-semibold">Order Not Found</h2>
                <p className="mt-2">We couldn't find an order with ID #{id}.</p>
                <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">
                    Go back home
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h1 className="text-3xl font-bold text-green-600">
                Order Placed Successfully
            </h1>

            <p className="mt-2 text-gray-600">
                Order ID: #{id}
            </p>

            <p className="mt-2 text-sm text-gray-500">
                Total: {order.totalAmount}
            </p>

            <Link to={`/orders/${id}`} className="mt-6 text-blue-500 hover:underline">
                View your order →
            </Link>
        </div>
    );
}