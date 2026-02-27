import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import cartApi from '../api/cartApi'

export const CartContext = createContext(null)

export function CartProvider({ children }) {
    const { user } = useAuth()
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [items, setItems] = useState(0)

    const fetchCart = async () => {
        if (!user) {
            const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")
            setCart(guestCart)
            setItems(guestCart.reduce((sum, i) => sum + i.quantity, 0))
            return
        }
        setLoading(true)
        try {
            const res = await cartApi.getCart()
            setCart(res.data.cart)
            setItems(res.data.totalItems)
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetchCart")
        } finally {
            setLoading(false)
        }
    }

    const addItem = async (product, qty = 1) => {
        try {
            setLoading(true)
            if (!user) {
                const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

                const existing = guestCart.find(i => i.productId === product.id)

                if (existing) {
                    existing.quantity += qty;
                } else {
                    guestCart.push({
                        productId: product.id,
                        quantity: qty,
                        product: {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            stock: product.stock,
                        },
                    })
                }
                localStorage.setItem("guestCart", JSON.stringify(guestCart))
                setCart(guestCart)
                setItems(guestCart.reduce((sum, i) => sum + i.quantity, 0))
                return;
            }
            await cartApi.addToCart({ productId: product.id, quantity: qty })
            await fetchCart()
        }
        catch (error) {
            setError(error.response?.data?.message || "Failed to add item")
        } finally {
            setLoading(false)
        }
    }

    const updateItems = async (cartItemId, quantity) => {
        if (!user) {
            const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

            const item = guestCart.find(i => i.productId === cartItemId);
            
            if (item) item.quantity = quantity;

            localStorage.setItem("guestCart", JSON.stringify(guestCart));
            setCart(guestCart);
            setItems(guestCart.reduce((sum, i) => sum + i.quantity, 0));
            return;
        }

        try {
            setLoading(true)
            await cartApi.updateItems(cartItemId, quantity)
            await fetchCart()
        } catch (error) {
            setError(error.response?.data?.message || "Failed to update items")
        } finally {
            setLoading(false)
        }
    }

    const removeItem = async (cartItemId) => {
        if (!user) {
            const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]").filter(i => i.productId !== cartItemId);

            localStorage.setItem("guestCart", JSON.stringify(guestCart));
            setCart(guestCart);
            setItems(guestCart.reduce((sum, i) => sum + i.quantity, 0));
            return;
        }
        setLoading(true)
        try {
            await cartApi.deleteItem(cartItemId)
            await fetchCart()
        } catch (error) {
            setError(error.response?.data?.message || "Failed to remove item")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [user])

    const value = { error, loading, cart, addItem, updateItems, removeItem, items }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
