import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
dotenv.config();

export const protectedRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if(!accessToken) return res.status(401).json({ error: 'Unauthorized: No access token found' });

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if(!decoded) return res.status(401).json({ error: 'Unauthorized: Invalid access token' });
        
        const user = await User.findById(decoded.userId);
        if(!user) return res.status(400).json({ error: 'User not found' });

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
}