import { useState } from "react"
import AddressSection from "../checkout/AddressSection"

const Address = () => {
    const [addressId, setAddressId] = useState(null)
    return (
        <div>
            <h3 className="text-center">Address</h3>

            <AddressSection value={addressId} onChange={setAddressId} />
        </div>
    )
}

export default Address