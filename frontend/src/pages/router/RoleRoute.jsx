import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../common/Loader";

export default function RoleRoute({ roles }) {
    const { user, loading, role } = useAuth()

    if (loading) return <Loader />

    if (!user) return <Navigate to="/login" />

    const allowed = roles.includes(user.role)

    return allowed ? <Outlet /> : <Navigate to="/unauthorized" replace />
}