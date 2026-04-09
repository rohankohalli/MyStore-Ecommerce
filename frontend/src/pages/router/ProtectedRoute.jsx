import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../common/Loader";

export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <Loader />

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}