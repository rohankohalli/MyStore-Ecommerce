import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { AuthContext } from "../../context/AuthContext"

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", dateOfBirth: "", mobileNo: "", password: "", confirmPassword: "" })
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { register } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (form.password !== form.confirmPassword) {
            return setError("Passwords do not match")
        }

        const { confirmPassword, ...payload } = form
        try {
            const result = await register(payload)
            if (result.success) {
                navigate("/home")
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Register failed')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input name="name" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                        value={form.name} onChange={handleChange} placeholder="Enter Name" />

                    <input type="email" name="email" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                        value={form.email} onChange={handleChange} placeholder="Enter Email" />

                    <div className="flex items-center gap-4">
                        <label htmlFor="dateOfBirth">Date Of Birth</label>
                        <input type="date" name="dateOfBirth" className="border border-gray-300 rounded-lg px-3 py-2
                         focus:outline-none w-52" value={form.dateOfBirth} onChange={handleChange} 
                         placeholder="Enter dateOfBirth" />
                    </div>

                    <input type="tel" name="mobileNo" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                        value={form.mobileNo} onChange={handleChange} placeholder="Enter mobile No" />

                    <div className="relative">
                        <input name="password" type={showPassword ? "text" : "password"} value={form.password}
                            onChange={handleChange} placeholder="Enter Password" required
                            className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none" />

                        <button onClick={() => setShowPassword(!showPassword)}
                            title={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-3 top-0 h-full flex items-center text-gray-500 hover:text-gray-700 cursor-pointer">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="relative">
                        <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"}
                            value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required
                            className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none" />

                        <button onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            title={showConfirmPassword ? "Hide password" : "Show password"}
                            className="absolute right-3 top-0 h-full flex items-center text-gray-500 hover:text-gray-700 cursor-pointer">
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <button className="bg-green-500 text-white py-2 rounded-lg font-semibold cursor-pointer">
                        Register
                    </button>
                </form>

                <div className="flex justify-between text-sm mt-4 text-gray-500">
                    <Link to="/forgot-password" className="hover:font-medium">Forgot password?</Link>
                    <Link to="/login" className="hover:font-medium">Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default Register