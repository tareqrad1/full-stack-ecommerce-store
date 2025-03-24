import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './config/connectDB.config.js';
import { connectToCloudinary } from './config/connectCloudinary.config.js';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.route.js';
import productRoute from './routes/product.route.js';
import cartRoute from './routes/cart.route.js'
import couponRoute from './routes/coupon.route.js';

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/coupon', couponRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} ✔`);
    connectDb();
    connectToCloudinary();
});