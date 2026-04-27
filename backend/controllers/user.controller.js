import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import User from "../models/user.model.js"

async function registerUser(req, res) {
    try {
        let { name, email, password } = req.body

        let existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send({ "message": "Email is already taken" })
        }

        let hashedPassword = await bcrypt.hash(password, 10)
        let newUser = await User.create({ name, email, password: hashedPassword })

        let token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: "30d" })

        res.status(201).send({ _id: newUser._id, name: newUser.name, email: newUser.email, isAdmin: newUser.isAdmin, token })
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "User not registered", "error": error.message })
    }
}

async function loginUser(req, res) {
    try {
        let { email, password } = req.body

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(401).send({ "message": "Invalid email or password" })
        }

        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({ "message": "Invalid email or password" })
        }

        let token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "30d" })

        res.send({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token })
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "Login failed", "error": error.message })
    }
}

async function allUsers(req, res) {
    try {
        let users = await User.find().select("-password")
        res.send(users)
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "Error fetching users", "error": error.message })
    }
}

async function getUserById(req, res) {
    try {
        let { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ "message": "Invalid ID" })
        }

        let user = await User.findById(id).select("-password")
        if (user) {
            res.send(user)
        } else {
            res.status(404).send({ "message": "User not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "User not found", "error": error.message })
    }
}

export {
    registerUser,
    loginUser,
    allUsers,
    getUserById
}
