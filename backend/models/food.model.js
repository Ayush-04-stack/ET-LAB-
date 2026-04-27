import mongoose from "mongoose"

let foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Burger", "Pizza", "Biryani", "Noodles", "Drinks", "Desserts", "Main Course", "Rice", "Starter", "South Indian"]
    }
}, {
    timestamps: true
})

let Food = mongoose.model("Food", foodSchema)
export default Food
