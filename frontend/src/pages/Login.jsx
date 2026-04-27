import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"
import { AuthContext } from "../context/AuthContext"

function Login() {
    const [form, setForm] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    let { login } = useContext(AuthContext)
    let navigate = useNavigate()

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            let res = await api.post("/auth/login", form)
            login(res.data)
            navigate("/")
        } catch (err) {
            setError(err.response?.data?.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="card shadow p-4">
                    <h3 className="mb-4 text-center">Login</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
                        </div>
                        <button className="btn btn-warning w-100" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <p className="text-center mt-3">Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login
