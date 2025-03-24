import Product from "../models/product.model.js";

export const getCartItems = async (req, res) => {
    try {
        const products = await Product.find({ _id: { $in: req.user.cartItems } }); //_id thats id for products & $in is for getting products in cart >> get ids product in my cart || get all ids in my cart item ($in)
        if(!products) return res.status(400).json({ error: 'No products found' });
        const cartItems = products.map((product) => {
            const items = req.user.cartItems.find((item) => item.id === product._id.toString());
            return { ...product.toJSON(), qwt: items.qwt };
        });
        res.status(200).json({ cartItems });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
}
export const addToCart = async (req, res) => {
    const { productId } = req.body;
    const user = req.user;
    try {
        const findProduct = user.cartItems.find((item) => item.id === productId);
        if(findProduct) {
            findProduct.qwt += 1;
        }else {
            user.cartItems.push(productId);
        }
        await user.save();
        res.status(200).json(user.cartItems);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
};
export const updateQwtInCart = async (req, res) => {
    const { productId } = req.params;
    const { qwt } = req.body;
    const user = req.user;
    try {
        const findProduct = user.cartItems.find((item) => item.id === productId);
        if(findProduct) {
            // if qwt is 0 remove the product
            if(qwt === 0) {
                user.cartItems = user.cartItems.filter((item) => item.id !== productId);
            }
            findProduct.qwt = qwt;
            await user.save();
            res.status(200).json(user.cartItems);
        }else {
            res.status(400).json({ error: 'Product not found in cart' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
}
export const removeProductInCart = async (req, res) => {
    const { productId } = req.params;
    const user = req.user;
    try {
        const findProduct = user.cartItems.find((item) => item.id === productId);
        if(findProduct) {
            user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        }else {
            res.status(400).json({ error: 'Product not found in cart' });
        }
        await user.save();
        res.status(200).json(user.cartItems);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
};
export const removeAllFromCart = async (req, res) => {
    const user = req.user;
    try {
        user.cartItems = [];
        await user.save();
        res.status(200).json({ message: 'Cart cleared successfully', cartItems: [] });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
}
