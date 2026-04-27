import { createBrowserRouter } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import Admin from "./pages/Admin"
import ProtectedRoute from "./components/ProtectedRoute"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "/cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
            { path: "/orders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
            { path: "/admin", element: <ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute> },
        ]
    }
])

export default router
