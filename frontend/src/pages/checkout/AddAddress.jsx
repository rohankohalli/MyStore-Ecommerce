import { useEffect, useState } from "react"
import addressApi from "../../api/addressApi"
import toast from "react-hot-toast"

const AddAddress = ({ onCreated, editingAddress }) => {
    const [form, setForm] = useState({
        fullName: "", phone: "", addressLine: "", city: "", state: "", country: "", pincode: ""
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (editingAddress) {
            setForm({
                fullName: editingAddress.fullName || "",
                phone: editingAddress.phone || "",
                addressLine: editingAddress.addressLine || "",
                city: editingAddress.city || "",
                state: editingAddress.state || "",
                country: editingAddress.country || "",
                pincode: editingAddress.pincode || ""
            });
        }
    }, [editingAddress])

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            let res;

            if (editingAddress) {
                res = await addressApi.updateAddress(editingAddress.id, form);
                toast.success("Address updated");
            } else {
                res = await addressApi.addAddress(form)
                toast.success("Address added")
            }

            onCreated(res.data.address)

            if (!editingAddress) {
                setForm({ fullName: "", phone: "", addressLine: "", city: "", state: "", country: "", pincode: "" })
            }
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
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
                    pattern="^(\+91)?[6-9]\d{9}$" />

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
                {loading ? "Saving..." : editingAddress ? "Update Address" : "Save Address"}
            </button>
        </form>
    )
}

export default AddAddress
