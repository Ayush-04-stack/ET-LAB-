import { useState, useEffect } from "react"
import api from "../services/api"

function Orders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    async function fetchOrders() {
        try {
            let res = await api.get("/orders/my")
            setOrders(res.data)
        } catch (err) {
            setError("Failed to load orders")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    async function cancelOrder(id) {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;
        try {
            await api.put(`/orders/${id}/cancel`)
            fetchOrders()
        } catch (err) {
            alert(err.response?.data?.message || "Failed to cancel order")
        }
    }

    function getStatusBadge(status) {
        let map = { "Pending": "warning", "Preparing": "info", "Out for Delivery": "primary", "Delivered": "success", "Cancelled": "danger" }
        return <span className={`badge bg-${map[status] || "secondary"}`}>{status}</span>
    }

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-warning"></div></div>
    if (error) return <div className="alert alert-danger">{error}</div>
    if (orders.length === 0) return <div className="text-center py-5"><h4>No orders yet!</h4></div>

    return (
        <div>
            <h2 className="mb-4">📦 My Orders</h2>
            {orders.map(order => (
                <div className="card mb-3 shadow-sm" key={order._id}>
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <span className="text-muted small">Order ID: {order._id}</span>
                        <div>
                            {order.status === "Pending" && (
                                <button className="btn btn-sm btn-outline-danger me-2" onClick={() => cancelOrder(order._id)}>
                                    Cancel Order
                                </button>
                            )}
                            {getStatusBadge(order.status)}
                        </div>
                    </div>
                    <div className="card-body">
                        <p><strong>Address:</strong> {order.deliveryAddress}</p>
                        <ul className="list-group list-group-flush mb-2">
                            {order.orderItems.map((item, i) => (
                                <li className="list-group-item d-flex justify-content-between" key={i}>
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>₹{item.price * item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="fw-bold text-end">Total: ₹{order.totalAmount}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Orders
