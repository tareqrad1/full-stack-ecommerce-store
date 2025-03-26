import express from 'express';
import { protectedRoute } from '../middleware/protectedRoute.js';
import { createCheckoutSession, checkoutSuccess } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/create-checkout-session', protectedRoute, createCheckoutSession);
router.post('/checkout-success', protectedRoute, checkoutSuccess);

export default router;