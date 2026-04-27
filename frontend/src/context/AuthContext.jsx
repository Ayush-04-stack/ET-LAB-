import { createContext, useState } from "react"

export const AuthContext = createContext()

function AuthProvider({ children }) {
    let storedUser = localStorage.getItem("user")
    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null)

    function login(userData) {
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
    }

    function logout() {
        setUser(null)
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
