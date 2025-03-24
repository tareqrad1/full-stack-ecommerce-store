import express from 'express';
import { protectedRoute } from '../middleware/protectedRoute.js';
import { getCoupons, validateCoupon } from '../controllers/coupon.controller.js';

const router = express.Router();

router.get('/', protectedRoute, getCoupons);
router.post('/validate-coupon', protectedRoute, validateCoupon);

export default router;