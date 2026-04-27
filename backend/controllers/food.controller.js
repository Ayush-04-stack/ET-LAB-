import mongoose from "mongoose"
import Food from "../models/food.model.js"

async function addFood(req, res) {
    try {
        let newFood = req.body
        newFood = await Food.create(newFood)
        res.status(201).send(newFood)
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "Food not added", "error": error.message })
    }
}

async function allFoods(req, res) {
    try {
        let foods = await Food.find()
        res.send(foods)
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "Error fetching foods", "error": error.message })
    }
}

async function getFoodById(req, res) {
    try {
        let { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ "message": "Invalid ID" })
        }

        let food = await Food.findById(id)
        if (food) {
            res.send(food)
        } else {
            res.status(404).send({ "message": "Food not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "Food not found", "error": error.message })
    }
}

async function updateFood(req, res) {
    try {
        let { id } = req.params
        let updatedFood = req.body

        updatedFood = await Food.findOneAndUpdate({ _id: id }, updatedFood, { returnDocument: "after" })
        if (updatedFood !== null) {
            res.send(updatedFood)
        } else {
            res.status(404).send({ "message": "Food not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "Food not updated", "error": error.message })
    }
}

async function deleteFood(req, res) {
    try {
        let { id } = req.params

        let food = await Food.findOneAndDelete({ _id: id })
        if (food !== null) {
            res.send({ "message": "Food Deleted" })
        } else {
            res.status(404).send({ "message": "Food not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "Food not deleted", "error": error.message })
    }
}

async function getFoodsByCategory(req, res) {
    try {
        let { category } = req.params
        let foods = await Food.find({ category })
        res.send(foods)
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "Error fetching foods", "error": error.message })
    }
}

export {
    addFood,
    allFoods,
    getFoodById,
    updateFood,
    deleteFood,
    getFoodsByCategory
}
