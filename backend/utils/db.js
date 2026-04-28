import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8"]);

async function connectToDB() {
  try {
    const DB_URL = process.env.MONGO_URI; 

    if (!DB_URL) {
      throw new Error("MONGO_URI is undefined");
    }

    await mongoose.connect(DB_URL);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Database Error");
    console.log(error.message);
  }
}

export default connectToDB;