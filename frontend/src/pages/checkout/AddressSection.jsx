import { useEffect, useState } from "react"
import addressApi from "../../api/addressApi.js"
import AddAddress from "./AddAddress.jsx"
import { Plus } from "lucide-react"

const AddressSection = ({ value, onChange }) => {
    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showAddAddressForm, setShowAddAddressForm] = useState(false)

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const addressRes = await addressApi.getAddress()
                setAddresses(addressRes.data)
            } catch (error) {
                setError(error || "Failed to fetch address")
            } finally {
                setLoading(false)
            }
        }
        fetchAddress()
    }, [])

    if (loading) return <p>Loading Address..</p>
    if (error) return <p className="text-red-500">Error: {error.message || error}</p>
    if (addresses.length === 0)
        return <AddAddress onCreated={(newAddress) => {
            setAddresses([newAddress])
            onChange(newAddress.id)
        }} />

    return (
        <div>
            <button
                className="bg-blue-500 text-white p-1.5 rounded-sm flex cursor-pointer"
                onClick={() => setShowAddAddressForm(prev => !prev)}>
                {showAddAddressForm ? "Close" : "Add Address"}
            </button>

            {showAddAddressForm && (
                <AddAddress onCreated={(newAddress) => {
                    setAddresses(prev => [...prev, newAddress])
                    onChange(newAddress.id)
                    setShowAddAddressForm(false)
                }} />
            )}

            <h3>Select Address</h3>
            {addresses.map(adr => (
                <label key={adr.id} className="block border p-3 rounded m-2">
                    <input
                        type="radio"
                        checked={value === adr.id}
                        onChange={() => onChange(adr.id)}
                    />
                    {adr.fullName}, {adr.addressLine}, {adr.city}
                </label>
            ))}
        </div>
    )
}

export default AddressSection