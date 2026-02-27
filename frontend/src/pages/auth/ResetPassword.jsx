import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import authApi from "../../api/authApi"

const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    if (!token) return <span>Invalid reset link</span>

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("")

        if (loading) return
        if (password !== confirm) return setError("Passwords do not match");

        try {
            await authApi.passwordReset({ token, newPassword: password })
            navigate("/login?reset=success");
        } catch (err) {
            setError(err.response?.data?.message);
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-green-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-10">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Reset Password</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
                    <div className="relative">
                        <input name="password" type={showPassword ? "text" : "password"} value={password}
                            placeholder="Enter Password" required onChange={e => { setPassword(e.target.value) }}
                            className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none" />

                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                            title={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-3 top-0 h-full flex items-center text-gray-500 hover:text-gray-700">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="relative">
                        <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={confirm}
                            placeholder="Confirm the Password" required onChange={e => { setConfirm(e.target.value) }}
                            className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none" />

                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-0 h-full flex items-center text-gray-500 hover:text-gray-700">
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button type="submit" disabled={loading} className="border bg-green-500 rounded-lg text-white p-2">
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    )
}

export default ResetPassword
