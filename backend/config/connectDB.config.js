import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async() => {
    try {
        // const connect = await mongoose.connect('mongodb://localhost:27017/e-commerce'); //for local
        const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('Database connection failed', error.message);
        process.exit(1);
    }
} 
export default connectDb;