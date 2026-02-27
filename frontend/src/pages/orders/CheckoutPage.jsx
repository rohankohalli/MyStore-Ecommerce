import { useState } from "react"
import AddressSection from "../checkout/AddressSection"
import OrderBox from "../checkout/OrderBox"
import OrderSummary from "../checkout/OrderSummary"
import PaymentSection from "../checkout/PaymentSection"

const CheckoutPage = () => {
    const [addressId, setAddressId] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState()
    
    return (
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 gap-6">
            <div>
                <h2 className="text-center">Order Summary</h2>
                <OrderSummary />
            </div>

            <div className="space-y-6">
                <h2 className="text-center">Checkout</h2>

                <AddressSection value={addressId} onChange={setAddressId}/>
                <PaymentSection value={paymentMethod} onChange={setPaymentMethod}/>
                <OrderBox addressId={addressId} paymentMethod={paymentMethod}/>
            </div>
        </div>
    )
}

export default CheckoutPage