import mongoose from "mongoose";

const connectDb = async() => {
    try {
        const connect = await mongoose.connect('mongodb://localhost:27017/e-commerce');
        console.log(`Database is connected to ${connect.connection.host} ✔`);
    } catch (error) {
        console.log('Database connection failed', error.message);
        process.exit(1);
    }
} 
export default connectDb;