import mongoose from "mongoose"
import { MONGO_URI } from "../constants/env"

// Connects to MongoDB Atlas Database
const connectToDatabase = async () => {
    try{
        await mongoose.connect(MONGO_URI)
        console.log("successfully connected to DB")
    }catch (error) {
        console.log('could not connect to the database', error)
        process.exit(1)
    }
}

export default connectToDatabase