import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { AuthContext, useAuth } from "../../context/AuthContext"

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const [remember, setRemember] = useState(false)
    const { user, loading } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const result = await login(form.email, form.password, remember)

            if (result.success) {
                navigate("/list")
            }
            // console.log(result.data)
            // console.log("Login Page:", { user, loading })
        } catch (err) {
            console.error("Login error:", err);
            setError()
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input name="email" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                       type="email" value={form.email} onChange={handleChange} placeholder="Enter Email" />

                    <div className="relative">
                        <input name="password" type={showPassword ? "text" : "password"} value={form.password}
                            onChange={handleChange} placeholder="Enter Password" required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none" />

                        <button type="button" onClick={() => setShowPassword(!showPassword)} 
                            title={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-3 top-0 h-full flex items-center text-gray-500 hover:text-gray-700 cursor-pointer">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                        Remember me
                    </label>


                    <button type="submit" 
                        className="bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-400 cursor-pointer">
                        Login
                    </button>
                </form>

                <div className="flex justify-between text-sm mt-4 text-gray-500">
                    <Link to="/forgot-password" className="hover:font-medium">Forgot password?</Link>
                    <Link to="/register" className="hover:font-medium">Create account</Link>
                </div>
            </div>
        </div>
    )
}

export default Login