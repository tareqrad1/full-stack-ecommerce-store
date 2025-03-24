import express from 'express';
import { protectedRoute } from '../middleware/protectedRoute.js';
import { addToCart, removeAllFromCart, removeProductInCart, getCartItems, updateQwtInCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.route('/')
                .get(protectedRoute, getCartItems)
                .post(protectedRoute, addToCart)
                .delete(protectedRoute, removeAllFromCart);

router.route('/:productId')
                .put(protectedRoute, updateQwtInCart)
                .delete(protectedRoute, removeProductInCart);

export default router;