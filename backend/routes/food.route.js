import express from "express"

import {
    addFood,
    allFoods,
    getFoodById,
    updateFood,
    deleteFood,
    getFoodsByCategory
} from "../controllers/food.controller.js"

import authMiddleware from "../middleware/auth.middleware.js"
import adminMiddleware from "../middleware/admin.middleware.js"

let router = express.Router()

router.get("/", allFoods)
router.get("/category/:category", getFoodsByCategory)
router.get("/:id", getFoodById)
router.post("/", authMiddleware, adminMiddleware, addFood)
router.put("/:id", authMiddleware, adminMiddleware, updateFood)
router.delete("/:id", authMiddleware, adminMiddleware, deleteFood)

export default router
