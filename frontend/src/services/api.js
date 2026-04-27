import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5001/api"
})

// Attach token to every request automatically
api.interceptors.request.use((config) => {
    let user = localStorage.getItem("user")
    if (user) {
        let token = JSON.parse(user).token
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api
