import { useState, useEffect, useRef, useCallback } from "react"
import api from "../services/api"
import FoodCard from "../components/FoodCard"

function Home() {
    const [foods, setFoods] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [category, setCategory] = useState("All")
    const [visibleCount, setVisibleCount] = useState(12)
    const [search, setSearch] = useState("")

    const observer = useRef()

    const categories = [
        "All", "Burger", "Pizza", "Biryani", "Noodles",
        "Drinks", "Desserts", "Main Course", "Rice",
        "Starter", "South Indian"
    ]

    async function fetchFoods() {
        try {
            let res = await api.get("/foods")
            setFoods(res.data)
        } catch (err) {
            setError("Failed to load foods")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFoods()
    }, [])

    // Reset when category/search changes
    useEffect(() => {
        setVisibleCount(12)
    }, [category, search])

    // Filter logic
    const allFiltered = foods.filter(f =>
        (category === "All" || f.category === category) &&
        f.name.toLowerCase().includes(search.toLowerCase())
    )

    const filtered = allFiltered.slice(0, visibleCount)

    // 👇 Infinite scroll logic
    const lastElementRef = useCallback(node => {
        if (loading) return

        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && filtered.length < allFiltered.length) {
                setVisibleCount(prev => prev + 12)
            }
        })

        if (node) observer.current.observe(node)
    }, [loading, filtered.length, allFiltered.length])

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-warning"></div>
            </div>
        )
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>
    }

    return (
        <div>
            <h2 className="mb-4">🍽️ Our Menu</h2>

            {/* 🔍 + 📂 Combined Row */}
            <div className="mb-3 d-flex flex-wrap align-items-center gap-2">

                <input
                    type="text"
                    className="form-control"
                    style={{ maxWidth: "250px" }}
                    placeholder="Search food..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`btn btn-sm ${category === cat ? "btn-warning" : "btn-outline-secondary"}`}
                        onClick={() => setCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {filtered.length === 0 && (
                <p className="text-muted">No food items found.</p>
            )}

            {/* Food Grid */}
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {filtered.map((food, index) => {
                    if (index === filtered.length - 1) {
                        return (
                            <div className="col" key={food._id} ref={lastElementRef}>
                                <FoodCard food={food} />
                            </div>
                        )
                    }
                    return (
                        <div className="col" key={food._id}>
                            <FoodCard food={food} />
                        </div>
                    )
                })}
            </div>

            {/* Optional loading indicator */}
            {filtered.length < allFiltered.length && (
                <div className="text-center mt-4">
                    <div className="spinner-border text-warning"></div>
                </div>
            )}
        </div>
    )
}

export default Home