import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import connectDb from './config/conntctDb.config.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} ✔`);
    connectDb();
});