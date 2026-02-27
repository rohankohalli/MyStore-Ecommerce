import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import orderApi from "../../api/orderApi"

const OrderBox = ({ addressId, paymentMethod }) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const placeOrder = async () => {
        setLoading(true)
        try {
            const res = await orderApi.checkout({ addressId, paymentMethod })
            navigate(`/order-success/${res.data.orderId}`)
            toast.success("Order placed successfully!")
        } catch (error) {
            toast.error(error.response?.data?.message || "Checkout Failed")
            console.error("Checkout Failed:", error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-lg cursor-pointer"
                onClick={placeOrder}
                disabled={loading}>
                {loading ? "Processing..." : "Order Now"}
            </button>
        </div>
    )
}

export default OrderBox