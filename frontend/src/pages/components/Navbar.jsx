import { LogIn, ShoppingCart, UserCheck } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import SearchBox from "./SearchBox";
import UserBox from "./User";

const Navbar = () => {
    const { user, isAuthenticated } = useAuth()
    const { items } = useCart()
    return (
        <div className="h-screen flex flex-col justify-between bg-gray-100 shadow-black">
            <header className="w-full bg-white shadow-lg px-6 py-2 flex items-center 
                justify-between">
                <div className="flex flex-row items-center">
                    <div className="text-2xl mr-4">
                        <Link to="/list">MyStore</Link>
                    </div>

                    <Link to="/">Shop</Link>
                </div>
                <SearchBox />

                <div className="flex items-center gap-3 p-2">
                    <Link to="/cart" className="relative">
                        <ShoppingCart className="transform -scale-x-110" />

                        {items > 0 && (
                            <span className="absolute -top-3.5 -right-2.25 text-white bg-amber-300 items-center text-base rounded-full">
                                {items}
                            </span>
                        )}
                    </Link>

                    {isAuthenticated ?
                        <UserBox user={user} />
                        : <div className="flex gap-3">
                            <Link to="/register">
                                <button className="flex text-white bg-orange-400 rounded p-1 gap-1 cursor-pointer">
                                    <UserCheck />
                                    <span>Register</span>
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="flex text-white bg-green-400 rounded  p-1 gap-1 cursor-pointer">
                                    <LogIn />
                                    <span>Login</span>
                                </button>
                            </Link>
                        </div>
                    }
                </div>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}

export default Navbar