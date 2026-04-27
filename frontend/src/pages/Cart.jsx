import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

function Cart() {
    let { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useContext(CartContext)
    let { user } = useContext(AuthContext)
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    let navigate = useNavigate()

    async function handlePlaceOrder() {
        if (!address) return setMessage("Please enter a delivery address")
        setLoading(true)
        try {
            let orderItems = cartItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                food: item._id
            }))
            await api.post("/orders", { orderItems, deliveryAddress: address, totalAmount: totalPrice })
            clearCart()
            setMessage("Order placed successfully!")
            setTimeout(() => navigate("/orders"), 1500)
        } catch (err) {
            setMessage(err.response?.data?.message || "Failed to place order")
        } finally {
            setLoading(false)
        }
    }

    if (cartItems.length === 0) return (
        <div className="text-center py-5">
            <h4>🛒 Your cart is empty</h4>
            <p className="text-muted">Add some food from the menu!</p>
        </div>
    )

    return (
        <div>
            <h2 className="mb-4">🛒 Your Cart</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>₹{item.price}</td>
                                <td>
                                    <div className="d-flex align-items-center gap-2">
                                        <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                                    </div>
                                </td>
                                <td>₹{item.price * item.quantity}</td>
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item._id)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="card p-3 mt-3">
                <h5>Total: ₹{totalPrice}</h5>
                <div className="mb-3">
                    <label className="form-label">Delivery Address</label>
                    <input type="text" className="form-control" value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter your full address" />
                </div>
                <button className="btn btn-warning" onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? "Placing Order..." : "Place Order"}
                </button>
            </div>
        </div>
    )
}

export default Cart
