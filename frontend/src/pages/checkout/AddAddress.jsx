import { useState } from "react"
import addressApi from "../../api/addressApi"
import toast from "react-hot-toast"

const AddAddress = ({ onCreated }) => {
    const [form, setForm] = useState({
        fullName: "", phone: "", addressLine: "", city: "", state: "", country: "", pincode: ""
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await addressApi.addAddress(form)
            onCreated(res.data.address)
            toast.success("Address added")
            setForm({ fullName: "", phone: "", addressLine: "", city: "", state: "", country: "", pincode: "" })
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <h3>Add Address</h3>
            <div className="grid grid-cols-2 gap-2">
                <input name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="rounded border p-1 bg-white"
                    required />
                <input name="phone"
                    value={form.phone}
                    type="tel"
                    onChange={handleChange}
                    placeholder="Phone"
                    className="rounded border p-1 bg-white"
                    required 
                    pattern="^(\+91)?[6-9]\d{9}$"/>
                <input name="addressLine"
                    value={form.addressLine}
                    onChange={handleChange}
                    placeholder="Address"
                    className="rounded border p-1 bg-white"
                    required />
                <input name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="rounded border p-1 bg-white"
                    required />
                <input name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="rounded border p-1 bg-white"
                    required />
                <input name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="rounded border p-1 bg-white"
                    required />
                <input name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    className="rounded border p-1 bg-white"
                    required />
            </div>

            <button disabled={loading} className="rounded p-2 border-none bg-green-400 text-white cursor-pointer">
                {loading ? "Saving..." : "Save Address"}
            </button>
        </form>
    )
}

export default AddAddress
