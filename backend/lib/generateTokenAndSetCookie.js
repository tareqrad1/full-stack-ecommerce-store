import jwt from 'jsonwebtoken';
import { redis } from '../config/connectRedis.config.js';
import dotenv from 'dotenv';
dotenv.config();

export const generateTokenAndSetCookie = async (userId, res) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m'
    });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });

    res.cookie('accessToken', accessToken, {
        httpOnly: true, // XSS attacks
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', //CSRF attacks
        maxAge: 15 * 60 * 1000
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true, //XSS attacks
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', //CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    await redis.set(`refresh_token-${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60);
    return { accessToken, refreshToken };
}