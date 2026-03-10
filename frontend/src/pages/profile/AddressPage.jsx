import { useEffect, useState } from "react"
import addressApi from "../../api/addressApi.js"
import AddAddress from "../checkout/AddAddress.jsx"
import AddressCard from "../../components/AddressCard.jsx"
import toast from "react-hot-toast"

const AddressPage = () => {
    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showAddAddressForm, setShowAddAddressForm] = useState(false)

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const res = await addressApi.getAddress()
                setAddresses(res.data)
            } catch (err) {
                setError(err.message || "Failed to fetch addresses")
            } finally {
                setLoading(false)
            }
        }
        fetchAddresses()
    }, [])

    const handleAddressCreated = (newAddress) => {
        setAddresses(prev => [...prev, newAddress])
        setShowAddAddressForm(false)
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-danger">Error: {error}</p>

    const handleEdit = async (address) => {

    }

    const handleDelete = async (address) => {

        const confirmed = window.confirm("Are you sure you want to delete the product?");
        if (!confirmed) return;

        try {
            const res = await addressApi.deleteAddress(address.id)
            if (res.success) {
                toast.info("Address Deleted")
                setAddresses(prev => prev.filter(a => a.id !== address.id))
            }
        } catch (error) {
            toast.error("Error in deleting address")
            console.error(error)
        }
    }

    const handleMakeDefault = async (address) => {
        try {
            await addressApi.setDefaultAddress(address.id)

            setAddresses(prev =>
                prev.map(a => ({ ...a, isDefault: a.id === address.id }))
            )

            toast.success("Default address changed")
        } catch (error) {
            console.error("Error changing default address:", error)
            toast.error("Error changing default address")
        }
    }

    return (
        <div>
            <h3 className="text-center">Address</h3>
            <div className="mt-5 row">
                <h4 className="mb-4">Your Addresses</h4>
                <div className="flex flex-row flex-wrap gap-5 mb-5">
                    {addresses.length > 0 ? (
                        addresses.map(adr => (
                            <AddressCard key={adr.id}
                                address={adr}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onMakeDefault={handleMakeDefault}
                            />
                        ))
                    ) : (
                        <p>No addresses found</p>
                    )}
                </div>
                <div className="col-md-4">
                    <button
                        className="bg-blue-500 text-white p-1.5 rounded-sm flex cursor-pointer"
                        onClick={() => setShowAddAddressForm(!showAddAddressForm)}>
                        {showAddAddressForm ? "Close" : "Add Address"}
                    </button>
                    {showAddAddressForm && (
                        <AddAddress onCreated={handleAddressCreated} />
                    )}
                </div>
            </div>
        </div>
    )
}
export default AddressPage
