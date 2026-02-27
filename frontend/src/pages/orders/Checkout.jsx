import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"
import { useState } from "react";
import orderApi from '../../api/orderApi'
import toast from "react-hot-toast"

const Checkout = () => {
    const { cart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    if (cart.length === 0) return <p className="p-6 text-center">Your cart is empty.</p>;

    const subtotal = cart.reduce((sum, item) => sum + item.quantity * Number(item.product.price), 0)

    const placeOrder = async () => {
        setLoading(true)
        try {
            const res = await orderApi.checkout()
            navigate(`/order-success/${res.data.orderId}`)
            toast.success("Order placed successfully!");
        } catch (error) {
            setError(error.response?.data?.message || "Checkout Failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {cart.map((item) => (
                <div key={item.productId} className="flex justify-between text-gray-700">
                    <span>{item.product.name} X {item.quantity}</span>
                    <span>₹{item.quantity * item.product.price}</span>
                </div>
            ))}
            <hr />

            <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{subtotal}</span>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <button onClick={placeOrder} disabled={loading}
                className="mt-6 bg-blue-500 hover:bg-blue-700 disabled:bg-gray-300 text-white p-3 rounded-xl text-lg cursor-pointer">
                {loading ? "Placing order..." : "Place Order"}
            </button>
        </div>
    )
}

export default Checkout