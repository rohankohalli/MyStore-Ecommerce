import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import userApi from "../../api/userApi"

const PersonalInformation = () => {
    const { user, setUser } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState(null)

    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        mobileNo: user?.mobileNo || "",
        dateOfBirth: user?.dateOfBirth || ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // console.log("Updated user:", form)
        try {
            const res = await userApi.updateUser(form)
            setForm(res.data.user)
            setUser(res.data.user)
            setIsEditing(false)
        } catch (error) {
            console.error("Error updating profile:", error)
            setError("Failed to update profile. Please try again.")
        }
    }

    return (
        <div className="flex flex-col border rounded-lg p-6 shadow-md">

            <div className="flex justify-between items-center mb-6">

                <h3>Personal Information</h3>

                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 hover:underline cursor-pointer">
                        Edit
                    </button>
                )}
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 items-center gap-4">
                    <label className="text-sm font-medium">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        disabled={!isEditing}
                        onChange={handleChange}
                        className="border rounded p-2 mt-1 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                    <label className="text-sm font-medium">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        disabled={!isEditing}
                        onChange={handleChange}
                        className="border rounded p-2 mt-1 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                    <label className="text-sm font-medium">Mobile No.:</label>
                    <input
                        name="mobileNo"
                        type="tel"
                        value={form.mobileNo}
                        disabled={!isEditing}
                        onChange={handleChange}
                        className="border rounded p-2 mt-1 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                    <label className="text-sm font-medium">Date Of Birth:</label>
                    <input
                        name="dateOfBirth"
                        type="date"
                        value={form.dateOfBirth}
                        disabled={!isEditing}
                        onChange={handleChange}
                        className="border rounded p-2 mt-1 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    />
                </div>

                {isEditing && (
                    <div className="flex justify-end gap-3 mt-4">

                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 border rounded cursor-pointer"
                        >
                            Cancel
                        </button>
                        <div className="flex justify-end">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default PersonalInformation
