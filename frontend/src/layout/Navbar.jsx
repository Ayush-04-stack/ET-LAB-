import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"

function Navbar() {
    let { user, logout } = useContext(AuthContext)
    let { cartItems } = useContext(CartContext)
    let navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate("/login")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">🍔 MEAL TIME 🍔</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cart">
                                        Cart <span className="badge bg-danger">{cartItems.length}</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/orders">Orders</Link>
                                </li>
                                {user.isAdmin && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin">Admin</Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button className="btn btn-outline-light ms-2" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        )}
                        {!user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
