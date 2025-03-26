import { stripe } from "../config/connectStripe.config.js";
import Coupon from "../models/coupon.model.js";

export async function createStripeCoupon(discountPercentage) {
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: 'once'
    });
    return coupon.id;
};
export async function createCouponCode(userId) {
    const newCoupon = new Coupon({
        code: 'GIFT' + Math.random().toString(36).substring(2,8).toUpperCase(),
        discountPercentage: 10,
        expirationDate: new Date(Date.now() * 15 * 24 * 60 * 60 * 1000), //15 days
        userId: userId,
    });
    await newCoupon.save();
    return newCoupon
};