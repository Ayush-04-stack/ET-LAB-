import "dotenv/config"
import mongoose from "mongoose"
import dns from "dns"
import Food from "./models/food.model.js"

dns.setServers(["8.8.8.8"])

const sampleFoods = [
    {
        name: "Classic Chicken Burger",
        description: "Juicy chicken patty with lettuce, tomato, cheese and our special sauce",
        price: 199,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
        category: "Burger"
    },
    {
        name: "Crispy Chicken Burger",
        description: "Crispy fried chicken fillet with coleslaw and mayo in a toasted bun",
        price: 179,
        image: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80",
        category: "Burger"
    },
    {
        name: "Margherita Pizza",
        description: "Classic pizza with fresh mozzarella, tomato sauce and basil",
        price: 299,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
        category: "Pizza"
    },
    {
        name: "Pepperoni Pizza",
        description: "Loaded with pepperoni slices on a rich tomato base with mozzarella",
        price: 349,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80",
        category: "Pizza"
    },
    {
        name: "Chicken Biryani",
        description: "Aromatic basmati rice cooked with tender chicken and whole spices",
        price: 249,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17Lg2lI9yX38USHLDP3qV5Q9mh7OmhEFdipO__abyvjOM5EN4Pu8n1710T7JYzsenX-qMKE13AsWdnuGvbqCacczocf7OAOTbvBc6YBd41g&s=10",
        category: "Biryani"
    },
    {
        name: "Mutton Biryani",
        description: "Slow-cooked mutton pieces layered with fragrant saffron rice",
        price: 329,
        image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=400&q=80",
        category: "Biryani"
    },
    {
        name: "Veg Hakka Noodles",
        description: "Stir-fried noodles with fresh vegetables in a savory soy sauce",
        price: 149,
        image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80",
        category: "Noodles"
    },
    {
        name: "Chicken Chow Mein",
        description: "Classic Chinese noodles with chicken strips and crunchy vegetables",
        price: 189,
        image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&q=80",
        category: "Noodles"
    },
    {
        name: "Mango Lassi",
        description: "Chilled yogurt-based mango drink, sweet and refreshing",
        price: 89,
        image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80",
        category: "Drinks"
    },
    {
        name: "Cold Coffee",
        description: "Smooth blended iced coffee with cream and a hint of chocolate",
        price: 99,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
        category: "Drinks"
    },
    {
        name: "Chocolate Brownie",
        description: "Warm fudgy chocolate brownie served with a scoop of vanilla ice cream",
        price: 149,
        image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&q=80",
        category: "Desserts"
    },
    {
        name: "Gulab Jamun",
        description: "Soft milk-solid dumplings soaked in rose-flavored sugar syrup",
        price: 99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBl6O3Fvguy7oQmgglQYMcAHyQS3vfBrJ7r97no34NR3dxWJzlDeRjTof8wG8C8_0drl0e4TQGCX01ofCQYsIg8SMws9AkH1GWwoVvgY6l&s=10",
        category: "Desserts"
    },
    {
        name: "Paneer Butter Masala",
        description: "Creamy tomato-based curry with soft paneer cubes and rich spices",
        price: 229,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80",
        category: "Main Course"
    },
    {
        name: "Veg Fried Rice",
        description: "Flavorful rice stir-fried with vegetables and soy sauce",
        price: 159,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80",
        category: "Rice"
    },
    {
        name: "Chicken Tikka",
        description: "Grilled chicken marinated in yogurt and spices, served with mint chutney",
        price: 269,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq-UjgXhMe-lq1ivbiBXWjyVf2-P5DEFTr98hA39p9z69vG61G65hD2y-VZ82jXAM9NboVaL3JjHJVYsi84qy-eZROTJHy3jNaE6X9pa37&s=10",
        category: "Starter"
    },
    {
        name: "Masala Dosa",
        description: "Crispy South Indian dosa filled with spiced potato masala",
        price: 129,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEgIEelwDNCWX45IOyjwdhoSnhXLGGuyw5J0ARSsLZSUTjx72Zp7XqqPENugaQE6nTZNn3tOn5OunMNwR5NkCRmRJQgER3AfaP8C-Cfbac&s=10",
        category: "South Indian"
    },
    {
        name: "Strawberry Milkshake",
        description: "Refreshing chilled milkshake made with fresh strawberries",
        price: 119,
        image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&q=80",
        category: "Drinks"
    }
]

async function seedFoods() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected")

        // Remove old food data first
        await Food.deleteMany({})
        console.log("Old food data cleared")

        // Insert all sample foods
        await Food.insertMany(sampleFoods)
        console.log(`${sampleFoods.length} food items added successfully!`)

        mongoose.connection.close()
        console.log("Done. Database connection closed.")
    } catch (error) {
        console.log("Seeding failed:", error.message)
        process.exit(1)
    }
}

seedFoods()
