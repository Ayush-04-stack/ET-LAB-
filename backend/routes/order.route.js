import express from "express"

import {
    placeOrder,
    myOrders,
    allOrders,
    updateOrderStatus,
    cancelOrder
} from "../controllers/order.controller.js"

import authMiddleware from "../middleware/auth.middleware.js"

let router = express.Router()

router.post("/", authMiddleware, placeOrder)
router.get("/my", authMiddleware, myOrders)
router.get("/", authMiddleware, allOrders)
router.put("/:id", authMiddleware, updateOrderStatus)
router.put("/:id/cancel", authMiddleware, cancelOrder)

export default router
