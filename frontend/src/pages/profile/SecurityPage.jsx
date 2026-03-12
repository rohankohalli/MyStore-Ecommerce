import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import userApi from "../../api/userApi";

const SecurityPage = () => {

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
    const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmNewPassword: "" })
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (form.newPassword !== form.confirmNewPassword) {
            return setError("Passwords do not match")
        }

        const { confirmNewPassword, ...payload } = form
        try {
            const res = await userApi.changePassword(payload)
            if (res) {
                return toast.success("Password Updated Successfully")
            }
        } catch (err) {
            setError(err || 'Register failed')
            console.error("Password Update Failed")
            toast.error("Password Update Failed")
        }
    }

    return (
        <div className="flex items-center justify-center flex-col">
            <h3 className="text-center">Security</h3>

            {error && (
                <div className="mb-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
                <label htmlFor="currentPassword">Current Password:</label>
                <div className="relative">
                    <input name="currentPassword"
                        id="currentPassword"
                        value={form.currentPassword}
                        onChange={handleChange}
                        type={showCurrentPassword ? "text" : "password"}
                        className="border w-full rounded bg-white p-1 mt-1" />

                    <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        title={showCurrentPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-0 h-full flex items-center text-gray-500 cursor-pointer"
                    >
                        {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <label htmlFor="newPassword">New Password:</label>
                <div className="relative">
                    <input
                        name="newPassword"
                        id="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        type={showNewPassword ? "text" : "password"}
                        className="border w-full rounded bg-white p-1 mt-1" />

                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        title={showNewPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-0 h-full flex items-center text-gray-500 cursor-pointer"
                    >
                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                <div className="relative">
                    <input
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        value={form.confirmNewPassword}
                        onChange={handleChange}
                        type={showConfirmNewPassword ? "text" : "password"}
                        className="border w-full rounded bg-white p-1 mt-1" />

                    <button
                        type="button"
                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        title={showConfirmNewPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-0 h-full flex items-center text-gray-500 cursor-pointer"
                    >
                        {showConfirmNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <div className="flex">
                    <button className="bg-green-400 text-white px-4 py-2 rounded cursor-pointer">
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SecurityPage