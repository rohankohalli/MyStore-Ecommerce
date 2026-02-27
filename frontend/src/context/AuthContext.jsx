import { createContext, useContext, useEffect, useState } from "react"
import authApi from "../api/authApi"
import userApi from "../api/userApi"
import cartApi from "../api/cartApi"
import { Navigate } from "react-router-dom"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const mergeGuestCart = async () => {
        try {
            const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")

            if (guestCart.length === 0) return

            await cartApi.mergeCart({ items: guestCart })
            localStorage.removeItem("guestCart")
        } catch (error) {
            console.error("Error Fetching Guest Cart:", error);
        }
    }

    const register = async (data) => {
        setError(null)
        try {
            const res = await authApi.register(data)
            localStorage.setItem("accessToken", res.data.accessToken)
            setUser(res.data.user)
            await mergeGuestCart()
            return { success: true, user: res.data.user }

        } catch (err) {
            setError(err.response?.data?.message || "Registration failed")
            return { success: false }
        }
    }

    const login = async (email, password, remember) => {
        setError(null)
        try {
            const res = await authApi.login({ email, password, remember })
            localStorage.setItem("accessToken", res.data.accessToken)
            setUser(res.data.user)
            await mergeGuestCart()
            return { success: true }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed")
            return { success: false, error: err }
        }
    }

    const logout = async () => {
        // console.log("Logout Clicked")
        try {
            await authApi.logout()
            // Navigate("/login")
        } finally {
            localStorage.removeItem("accessToken")
            setUser(null)
        }
    }

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("accessToken")
            if (!token) {
                setLoading(false)
                return
            }
            try {
                // const res = await authApi.refresh()
                // localStorage.setItem("accessToken", res.data.accessToken)

                const me = await userApi.getUser()
                setUser(me.data.user)
                // console.log("User Details:", me.data)


            } catch (err) {
                console.error("Auth load failed:", err)
                localStorage.removeItem("accessToken")
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        initAuth()
    }, [])

    const value = { user, isAuthenticated: !!user, loading, error, register, login, logout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
