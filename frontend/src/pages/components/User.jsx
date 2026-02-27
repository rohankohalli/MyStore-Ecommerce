import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";

export default function UserBox({ user }) {
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const Navigate = useNavigate()

    const handleLogout = () => {
        logout();
        Navigate("/login");
    }

    useEffect(() => {
        const close = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    const navLinks = {
        User: [
            { label: "Orders", to: "orders" },
            // {label:"Profile", to:"/profile"},            
        ],
        Seller: [
            { label: "My Products", to: "my-products" },
            { label: "Dashboard", to: "dashboard" },
            // {label:"Profile", to:"/profile"}, 
        ],
        Admin: [
            { label: "My Products", to: "my-products" },
            { label: "Dashboard", to: "dashboard" },
            // {label:"Profile", to:"/profile"}, 
        ]
    }

    const links = navLinks[user.role] || []

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="relative" onClick={() => setOpen(!open)}>
                <button className="flex items-center hover:bg-gray-200 p-2 gap-3 rounded-2xl cursor-pointer border-none">
                    <User />
                </button>
            </div>

            {open && (
                <div className="absolute -right-4 mt-4 w-48 bg-white rounded-xl shadow-lg p-4 z-50">
                    <div className="pb-3 mb-1">
                        <p className="font-semibold">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    <hr />

                    {links.map(link => (
                        <Link key={link.to} to={link.to} className="block py-2 hover:text-blue-600">
                            {link.label}
                        </Link>
                    ))}

                    <button onClick={handleLogout}
                        className="p-2 border bg-red-500 hover:bg-red-600 text-white rounded-lg cursor-pointer">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}