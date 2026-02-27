import { useState } from "react";
import authApi from "../../api/authApi";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await authApi.passwordResetReq({ email })
            setEmail("")
            toast.success("Reset Link Sent")
        } catch (err) {
            console.error(err.response?.data?.message)
            // toast.error(err.response)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-green-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-10">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
                    <input
                        name="email"
                        type="email"
                        value={email}
                        placeholder="Enter Your Email"
                        onChange={e => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-lg w-full px-4 py-3 focus:outline-none transition"
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg
                        transition duration-200 cursor-pointer"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword