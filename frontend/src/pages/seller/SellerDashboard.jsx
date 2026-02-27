import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
    return (
        <div className="w-2xl mx-auto p-6">
            <h3 className="text-2xl font-bold mb-6">Seller Dashboard</h3>

            <div className="flex justify-end mb-6">
                <Link to="/seller/products/new"
                    className="border p-2 bg-green-500 text-white rounded-lg flex gap-1 items-center cursor-pointer hover:bg-green-600">
                    <Plus className="h-5 w-5" /> Add Product
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Link to="/my-products" className="pb-4 bg-sky-500 text-center rounded-lg hover:shadow">
                    <h4 className="text-white mb-2">My Products</h4>
                    <p className="text-sm text-gray-50">View and manage your listings</p>
                </Link>

                <Link to="/seller/orders" className="pb-4 bg-blue-500 text-center rounded-lg hover:shadow">
                    <h4 className="text-white mb-2">Orders</h4>
                    <p className="text-sm text-gray-50">View buyer orders</p>
                </Link>
            </div>
        </div>
    )
}

export default SellerDashboard