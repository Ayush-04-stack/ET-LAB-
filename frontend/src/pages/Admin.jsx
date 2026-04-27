import { useState, useEffect } from "react"
import api from "../services/api"

function Admin() {
    const [foods, setFoods] = useState([])
    const [orders, setOrders] = useState([])
    const [tab, setTab] = useState("foods")
    const [form, setForm] = useState({ name: "", description: "", price: "", image: "", category: "Burger" })
    const [message, setMessage] = useState("")

    let categories = ["Burger", "Pizza", "Biryani", "Noodles", "Drinks", "Desserts"]

    async function fetchFoods() {
        let res = await api.get("/foods")
        setFoods(res.data)
    }

    async function fetchOrders() {
        let res = await api.get("/orders")
        setOrders(res.data)
    }

    useEffect(() => {
        fetchFoods()
        fetchOrders()
    }, [])

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleAddFood(e) {
        e.preventDefault()
        try {
            await api.post("/foods", { ...form, price: Number(form.price) })
            setMessage("Food added successfully!")
            setForm({ name: "", description: "", price: "", image: "", category: "Burger" })
            fetchFoods()
        } catch (err) {
            setMessage(err.response?.data?.message || "Failed to add food")
        }
    }

    async function handleDeleteFood(id) {
        try {
            await api.delete(`/foods/${id}`)
            fetchFoods()
        } catch (err) {
            setMessage("Failed to delete food")
        }
    }

    async function handleUpdateStatus(id, status) {
        try {
            await api.put(`/orders/${id}`, { status })
            fetchOrders()
        } catch (err) {
            setMessage("Failed to update order status")
        }
    }

    return (
        <div>
            <h2 className="mb-4">⚙️ Admin Panel</h2>
            <div className="d-flex gap-2 mb-4">
                <button className={`btn ${tab === "foods" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setTab("foods")}>Manage Foods</button>
                <button className={`btn ${tab === "orders" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setTab("orders")}>All Orders</button>
            </div>
            {message && <div className="alert alert-info">{message}</div>}

            {tab === "foods" && (
                <div>
                    <div className="card p-4 mb-4 shadow-sm">
                        <h5>Add New Food Item</h5>
                        <form onSubmit={handleAddFood}>
                            <div className="row g-2">
                                <div className="col-md-6"><input className="form-control" name="name" placeholder="Name" value={form.name} onChange={handleChange} required /></div>
                                <div className="col-md-6"><input className="form-control" name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required /></div>
                                <div className="col-md-6"><input className="form-control" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required /></div>
                                <div className="col-md-6">
                                    <select className="form-select" name="category" value={form.category} onChange={handleChange}>
                                        {categories.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="col-12"><textarea className="form-control" name="description" placeholder="Description" value={form.description} onChange={handleChange} required /></div>
                                <div className="col-12"><button className="btn btn-warning">Add Food</button></div>
                            </div>
                        </form>
                    </div>
                    <h5>All Food Items ({foods.length})</h5>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Action</th></tr></thead>
                            <tbody>
                                {foods.map(food => (
                                    <tr key={food._id}>
                                        <td>{food.name}</td>
                                        <td>{food.category}</td>
                                        <td>₹{food.price}</td>
                                        <td><button className="btn btn-sm btn-danger" onClick={() => handleDeleteFood(food._id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {tab === "orders" && (
                <div>
                    <h5>All Orders ({orders.length})</h5>
                    {orders.map(order => (
                        <div className="card mb-3 shadow-sm" key={order._id}>
                            <div className="card-body">
                                <p><strong>Customer:</strong> {order.user?.name} ({order.user?.email})</p>
                                <p><strong>Address:</strong> {order.deliveryAddress}</p>
                                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                                <div className="d-flex align-items-center gap-2">
                                    <strong>Status:</strong>
                                    <select className="form-select form-select-sm w-auto" value={order.status} onChange={e => handleUpdateStatus(order._id, e.target.value)}>
                                        {["Pending", "Preparing", "Out for Delivery", "Delivered"].map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Admin
