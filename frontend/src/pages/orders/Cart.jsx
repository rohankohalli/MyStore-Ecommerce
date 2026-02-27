import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Cart = () => {
    const { loading, cart, updateItems, removeItem } = useCart();
    const { isAuthenticated } = useAuth()
    const Navigate = useNavigate()

    if (loading) return <p className="p-6 text-center">Loading cart...</p>;
    if (cart.length === 0) return <p className="p-6 text-center">Your cart is empty.</p>;

    const subtotal = cart.reduce((sum, item) => sum + item.quantity * Number(item.product.price), 0);

    const handleClick = async (e) => {
        e.preventDefault()

        if (!isAuthenticated) {
            toast.error("Please Login or Register before to proceed")
            return
        } else {
            Navigate("/Checkout")
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Cart</h1>

            <div className="space-y-4">
                {cart.map((cart) => (
                    <div key={cart.productId} className="flex gap-4 items-center border p-4 rounded-xl">
                        <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded overflow-hidden">
                            <img
                                src={`${import.meta.env.VITE_API_URL}${cart.product.image}`}
                                alt={cart.product.name}
                                className="max-w-full max-h-full object-contain p-2 rounded" />
                        </div>

                        <div className="grow">
                            <h3 className="font-semibold">{cart.product.name}</h3>
                            <p className="text-gray-500">₹{cart.product.price}</p>
                        </div>

                        <div className="flex items-center border rounded overflow-hidden">
                            <button
                                disabled={cart.quantity <= 1}
                                onClick={() => updateItems(cart.id, cart.quantity - 1)}
                                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-40 cursor-pointer">
                                <Minus />
                            </button>

                            <span className="px-2 font-medium">
                                {cart.quantity}
                            </span>

                            <button
                                disabled={cart.quantity >= cart.product.stock}
                                onClick={() => updateItems(cart.id, cart.quantity + 1)}
                                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-40 cursor-pointer">
                                <Plus />
                            </button>
                        </div>

                        <div className="flex items-center">
                            <button
                                onClick={() => removeItem( cart.id )}
                                className="flex bg-red-500 text-white p-2 rounded cursor-pointer
                                hover:bg-red-600  items-center">
                                <Trash2 className='h-5 w-5' /> Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
                <span className="text-xl font-semibold">Subtotal: ₹{subtotal}</span>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl cursor-pointer"
                    onClick={handleClick}>
                    Checkout
                </button>
            </div>
        </div>)
}

export default Cart