import { createContext, useState } from "react"

export const CartContext = createContext()

function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    function addToCart(food) {
        let existing = cartItems.find(item => item._id === food._id)
        if (existing) {
            setCartItems(cartItems.map(item =>
                item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item
            ))
        } else {
            setCartItems([...cartItems, { ...food, quantity: 1 }])
        }
    }

    function removeFromCart(id) {
        setCartItems(cartItems.filter(item => item._id !== id))
    }

    function updateQuantity(id, quantity) {
        if (quantity < 1) return removeFromCart(id)
        setCartItems(cartItems.map(item =>
            item._id === id ? { ...item, quantity } : item
        ))
    }

    function clearCart() {
        setCartItems([])
    }

    let totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
