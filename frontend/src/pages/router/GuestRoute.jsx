import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function GuestRoute() {
    const { isAuthenticated, loading } = useAuth()

    if (loading) return null

    return !isAuthenticated ? <Outlet /> : null;
}