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

let router = express.Router()

router.get("/", allFoods)
router.get("/category/:category", getFoodsByCategory)
router.get("/:id", getFoodById)
router.post("/", authMiddleware, addFood)
router.put("/:id", authMiddleware, updateFood)
router.delete("/:id", authMiddleware, deleteFood)

export default router
