import { CircleUser, MapPinHouse, ShieldPlus, ShoppingBag } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {

    const linkStyle =
        "border py-3 rounded hover:bg-gray-300 flex gap-2 justify-center items-center";

    return (
        <div className="max-w-7xl mx-auto">

            <h2 className="text-center text-2xl font-semibold mb-6">
                Profile Page
            </h2>

            <div className="flex gap-8">

                <aside className="p-4 bg-gray-200 rounded flex flex-col gap-3 h-fit w-64">

                    <Link to="/orders" className={linkStyle}>
                        <ShoppingBag /> My Orders ＞
                    </Link>

                    <Link to="personal" className={linkStyle}>
                        <CircleUser /> Personal Information
                    </Link>

                    <Link to="address" className={linkStyle}>
                        <MapPinHouse /> Addresses
                    </Link>

                    <Link to="security" className={linkStyle}>
                        <ShieldPlus /> Security
                    </Link>
                </aside>

                <main className="flex-1">
                    <Outlet />
                </main>

            </div>

        </div>
    )
}

export default Profile
