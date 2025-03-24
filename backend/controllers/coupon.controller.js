import Coupon from "../models/coupon.mode.js";

export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.findOne({ userId: req.user._id, isActive: true });
        res.status(200).json(coupons || null);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
};
export const validateCoupon = async (req, res) => {
    const { code } = req.body;
    try {
        const coupon = await Coupon.findOne({ code: code, userId: req.user._id, isActive: true });
        if(!coupon) return res.status(400).json({ error: 'Coupon not found' });
        if(coupon.expirationDate < Date.now()){
            coupon.isActive = false;
            await coupon.save();
            return res.status(400).json({ error: 'Coupon expired' });
        }
        res.status(200).json({
            message: 'Coupon validated successfully',
            code: coupon.code,
            discountPercentage: coupon.discountPercentage,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
}