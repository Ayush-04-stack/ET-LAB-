import express from "express"

import {
    registerUser,
    loginUser,
    allUsers,
    getUserById
} from "../controllers/user.controller.js"

import authMiddleware from "../middleware/auth.middleware.js"

let router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/", authMiddleware, allUsers)
router.get("/:id", authMiddleware, getUserById)

export default router
