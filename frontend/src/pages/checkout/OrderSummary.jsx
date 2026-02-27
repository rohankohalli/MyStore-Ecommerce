import { useState } from "react";
import { useCart } from "../../context/CartContext";

const OrderSummary = () => {
    const { cart } = useCart();
    // const [loading, setLoading] = useState();
    const [error, setError] = useState();

    if (cart.length === 0) return <p className="p-6 text-center">Your cart is empty.</p>;

    const subtotal = cart.reduce((sum, item) => sum + item.quantity * Number(item.product.price), 0)

    return (
        <div>
            {cart.map((item) => (
                <div key={item.productId} className="flex items-center justify-between text-gray-700">
                    <div className="relative flex items-center gap-2">
                        <span className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded overflow-hidden">
                            <img
                                src={`${import.meta.env.VITE_API_URL}${item.product.image}`}
                                alt={item.product.name}
                                className="max-w-full max-h-full object-contain p-2 rounded" />
                        </span>
                        <div className="flex flex-col">
                            <span>{item.product.name}</span>
                            <span className="bg-gray-300 rounded-xl p-1 w-fit">
                                Quantity:{item.quantity}
                            </span>
                        </div>
                    </div>
                    <span>₹{item.quantity * item.product.price}</span>
                </div>
            ))}
            <hr />

            <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{subtotal}</span>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

        </div>
    )
}

export default OrderSummary