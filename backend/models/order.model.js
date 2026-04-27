import mongoose from "mongoose"

let orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food",
                required: true
            }
        }
    ],
    deliveryAddress: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"]
    }
}, {
    timestamps: true
})

let Order = mongoose.model("Order", orderSchema)
export default Order
