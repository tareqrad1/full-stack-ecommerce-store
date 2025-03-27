import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { authSchema } from '../utils/schemaValidate.js';
import { generateTokenAndSetCookie } from "../lib/generateTokenAndSetCookie.js";
import jwt from 'jsonwebtoken';
import { redis } from "../config/connectRedis.config.js";
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        if(!name || !email || !password || !confirmPassword) return res.status(400).json({ error: 'All fields are required' });
        const { error } = authSchema.validate(req.body);
        if(error) return res.status(400).json({ error: error.message });

        const userExists = await User.findOne({ email });
        if(userExists) return res.status(400).json({ error: 'User already exists' });
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user: {
            ...user._doc,
            password: undefined,
        }});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ error: 'Email and password are required' });
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ error: 'Email or password is incorrect' });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ error: 'Email or password is incorrect' });

        //generate token and set cookie and send in redis cache 
        await generateTokenAndSetCookie(user._id, res);
        res.status(200).json({ message: 'User logged in successfully', user: {
            ...user._doc,
            password: undefined,
        }});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
};
export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token-${decoded.userId}`);
        }
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        return res.status(200).json({ message: 'logout successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
};
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json({ error: 'No refresh token found' });

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if(!decoded) return res.status(401).json({ error: 'Invalid refresh token' });
        const storedToken = await redis.get(`refresh_token-${decoded.userId}`);
        
        if(refreshToken !== storedToken) return res.status(401).json({ error: 'Invalid refresh token' });

        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m',
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true, //XSS attacks
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', //CSRF attacks
            maxAge: 15 * 60 * 1000
        });
        return res.status(200).json({ message: 'Token refreshed successfully', accessToken });
    } catch (error) {
        console.log('error in refresh-token', error);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
};
export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({ user: {
            ...user._doc,
            password: undefined
        }});
    } catch (error) {
        console.log('error in refresh-token', error);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
};