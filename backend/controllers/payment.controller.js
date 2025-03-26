import Coupon from '../models/coupon.model.js';
import { stripe } from '../config/connectStripe.config.js';
import { createCouponCode, createStripeCoupon } from '../lib/stripe.js';
import Order from '../models/order.model.js';

export const createCheckoutSession = async (req, res) => {
    const { products, couponCode } = req.body; //products must return in array
    try {
        if(!Array.isArray(products) || products.length === 0) return res.status(400).json({ error: 'Invalid or empty product' });
        let totalAmount = 0; //save in cents
        const lineItems = products.map((product) => {
            const amount = Math.round(product.price * 100); //because stripe need amount in cents
            totalAmount += amount * product.quantity; 
            
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                        image: [product.image],
                        price: product.price,
                    }
                },
                unit_amount: amount,
            }
        });
        
        let coupon = null;
        if(couponCode) {
            coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
            if(coupon !== null) {
                totalAmount -= Math.round(totalAmount * coupon.discountPercentage / 100);
            }
        }
        //create stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel-payment`,
            discounts: coupon ? [{
                coupon: await createStripeCoupon(coupon.discountPercentage)
            }] : [],
            //add metadata to stripe
            metadata: {
                userId: req.user?._id,
                couponCode: couponCode || '',
                products: JSON.stringify(
                    products.map((product) => (
                        {
                            id: product._id,
                            quantity: product.quantity,
                            price: product.price
                        }
                    ))
                )
            },
        });
        // add coupon to user he add +=200$ to his account
        if(totalAmount >= 20000) {
            await createCouponCode(req.user._id);
        }
        res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 }); //because stripe return amount in cents 200000cent => 200$
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Error occurred while processing payment', error: error.message });
    }
};
export const checkoutSuccess = async (req, res) => {
    const { sessionId } = req.body;
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if(session.payment_status === 'paid') { //if i paid successfully stop my old coupon
            await Coupon.findOneAndUpdate({ code: session.metadata.couponCode, userId: session.metadata.userId }, { isActive: false });
        }
        const products = JSON.parse(session.metadata.products);
        const newOrder = new Order({
            user: session.metadata.userId,
            products: products.map((product) => ({
                product: product.id,
                quantity: product.quantity,
                price: product.price,
            })),
            totalAmount: session.amount_total / 100, // convert to dollars $
            stripeSessionId: session.id,
        });
        await newOrder.save();
        res.status(200).json({
            message: 'Payment successful',
            orderId: newOrder._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error occurred while processing payment', error: error.message });
    }
}