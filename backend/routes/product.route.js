import express from 'express';
import { getAllProducts, getFeaturedProducts, createProducts, deleteProduct, getRecommendationProducts, getCategoryProducts, toggleIsFeatured, } from '../controllers/product.controller.js';
import { protectedRoute } from '../middleware/protectedRoute.js';
import { adminRoute } from '../middleware/rolesRoute.js';

const router = express.Router();

router.route('/')
                .get(protectedRoute, adminRoute, getAllProducts)
                .post(protectedRoute, adminRoute, createProducts);
router.get('/featured', getFeaturedProducts);
router.get('/recommendations', getRecommendationProducts)
router.get('/category/:category', getCategoryProducts)
router.route('/:id')
                    .delete(protectedRoute, adminRoute, deleteProduct)
                    .patch(protectedRoute, adminRoute, toggleIsFeatured);


export default router;