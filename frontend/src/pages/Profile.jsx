import { Circle, CircleUser, MapPinHouse, ShoppingBag } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {

    const linkStyle = "border py-3 rounded hover:bg-gray-300 text-center flex gap-2 justify-center";

    return (
        <div>
            <h2 className="text-center">Profile Page</h2>
            <div className="flex">
                <aside className="p-4 bg-gray-200 rounded flex flex-col gap-3 h-fit w-1/5 ml-6">

                    <Link to="/orders"
                        className={`${linkStyle}`} >
                        <ShoppingBag /> My Orders ＞
                    </Link>

                    <Link to="account" className={`${linkStyle}`}>
                        <CircleUser /> Account Information
                    </Link>

                    <Link to="address" className={`${linkStyle}`}>
                        <MapPinHouse /> Addresses
                    </Link>
                </aside>
                <main className="pl-6 text-center">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Profile