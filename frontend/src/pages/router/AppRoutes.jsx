import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "../auth/ForgotPassword";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ResetPassword from "../auth/ResetPassword";
import Navbar from "../components/Navbar";
import NotFound from "../NotFound";
import Cart from "../orders/Cart";
import Checkout from "../orders/Checkout";
import OrderDetails from "../orders/OrderDetails";
import OrdersList from "../orders/OrdersList";
import OrderSuccess from "../OrderSuccess";
import CreateProduct from "../products/CreateProduct";
import ProductDetails from "../products/ProductDetails";
import ProductsList from "../products/ProductsList";
import RoleRoute from "../router/RoleRoute";
import MyProducts from "../seller/MyProducts";
import SellerDashboard from "../seller/SellerDashboard";
import SellerOrders from "../seller/SellerOrders";
import SellerOrdersDetail from "../seller/SellerOrdersDetail";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutPage from "../orders/CheckoutPage";
import HomePage from "../HomePage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Navbar />}>
                    <Route element={<GuestRoute />} >
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>

                    <Route path="/" element={<HomePage />} />
                    <Route path="products/:id" element={<ProductDetails />} />
                    <Route path="list" element={<ProductsList />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="reset-password" element={<ResetPassword />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />

                    <Route element={<ProtectedRoute />}>
                        {/* <Route path="checkout_" element={<Checkout />} /> */}
                        <Route path="Checkout" element={<CheckoutPage />} />
                        <Route path="order-success/:id" element={<OrderSuccess />} />
                        <Route path="orders" element={<OrdersList />} />
                        <Route path="orders/:id" element={<OrderDetails />} />

                        <Route element={<RoleRoute roles={["Seller", "Admin"]} />}>
                            <Route path="my-products" element={<MyProducts />} />
                            <Route path="dashboard" element={<SellerDashboard />} />
                            <Route path="seller/products/new" element={<CreateProduct />} />
                            <Route path="seller/orders" element={<SellerOrders />} />
                            <Route path="seller/orders/:id" element={<SellerOrdersDetail />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
