import mongoose from "mongoose"
import Order from "../models/order.model.js"

async function placeOrder(req, res) {
    try {
        let { orderItems, deliveryAddress, totalAmount } = req.body

        let newOrder = await Order.create({
            user: req.user.id,
            orderItems,
            deliveryAddress,
            totalAmount
        })

        res.status(201).send(newOrder)
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "Order not placed", "error": error.message })
    }
}

async function myOrders(req, res) {
    try {
        let orders = await Order.find({ user: req.user.id }).populate("orderItems.food", "name image")
        res.send(orders)
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "Error fetching orders", "error": error.message })
    }
}

async function allOrders(req, res) {
    try {
        let orders = await Order.find().populate("user", "-password").populate("orderItems.food", "name image")
        res.send(orders)
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "Error fetching orders", "error": error.message })
    }
}

async function updateOrderStatus(req, res) {
    try {
        let { id } = req.params
        let { status } = req.body

        let order = await Order.findOneAndUpdate({ _id: id }, { status }, { returnDocument: "after" })
        if (order !== null) {
            res.send(order)
        } else {
            res.status(404).send({ "message": "Order not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "Order not updated", "error": error.message })
    }
}

async function cancelOrder(req, res) {
    try {
        let { id } = req.params
        let order = await Order.findOne({ _id: id, user: req.user.id })
        
        if (!order) {
            return res.status(404).send({ "message": "Order not found" })
        }
        
        if (order.status !== "Pending") {
            return res.status(400).send({ "message": "Only pending orders can be cancelled" })
        }
        
        order.status = "Cancelled"
        await order.save()
        res.send(order)
    } catch (error) {
        console.log(error)
        res.status(400).send({ "message": "Order not cancelled", "error": error.message })
    }
}

export {
    placeOrder,
    myOrders,
    allOrders,
    updateOrderStatus,
    cancelOrder
}
