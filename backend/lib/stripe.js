import { stripe } from "../config/connectStripe.config.js";
import Coupon from "../models/coupon.model.js";

export async function createStripeCoupon(discountPercentage) {
    const coupon = await stripe.coupons.create({
		percent_off: discountPercentage,
		duration: "once",
	});
	return coupon.id;
};
export async function createCouponCode(userId) {
    await Coupon.findOneAndDelete({ userId });
	const newCoupon = new Coupon({
		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		userId: userId,
	});
	await newCoupon.save();

	return newCoupon;
};