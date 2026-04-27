import "dotenv/config"
import express from "express"
import cors from "cors"

import connectToDB from "./utils/db.js"

import userRouter from "./routes/user.route.js"
import foodRouter from "./routes/food.route.js"
import orderRouter from "./routes/order.route.js"

const app = express()

app.use(cors())
app.use(express.json())

// routesz
app.get("/", (req, res) => {
    res.send("Food Delivery API is running")
})

app.use("/api/auth", userRouter)
app.use("/api/foods", foodRouter)
app.use("/api/orders", orderRouter)

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
    connectToDB()
})