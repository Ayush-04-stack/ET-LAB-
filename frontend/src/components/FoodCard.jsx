import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"

function FoodCard({ food }) {
    let { addToCart } = useContext(CartContext)
    const [hover, setHover] = useState(false)

    return (
        <div 
            className="card h-100"
            style={{
                transition: "box-shadow 0.3s ease",
                boxShadow: hover
                    ? "0 10px 20px rgba(0, 0, 0, 0.57)"
                    : "0 2px 5px rgba(0, 0, 0, 0.46)"
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img src={food.image} className="card-img-top" alt={food.name} style={{ height: "180px", objectFit: "cover" }} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{food.name}</h5>
                <p className="card-text text-muted small">{food.description}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-success fs-5 mb-0">₹{food.price}</span>
                    <button className="btn btn-warning hover-effect-btn" onClick={() => addToCart(food)}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FoodCard
