import Product from "../models/product.model.js";
import { redis } from "../config/connectRedis.config.js";
import cloudinary from "../config/connectCloudinary.config.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        if(!products) return res.status(400).json({ error: 'No products found' });
        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
};
export const getFeaturedProducts = async (req, res) => {
    try {
        //if featured products are already in redis, return them
        let featuredProducts = await redis.get('featuredProducts');
        if(featuredProducts) {
            return res.status(200).json({ products: JSON.parse(featuredProducts) });
        }

        //if featured products are not in redis, fetch them by mongodb
        featuredProducts = await Product.find({ isFeatured: true }).lean();
        if(!featuredProducts) return res.status(400).json({ error: 'No featured products found' });
        res.status(200).json({ products: featuredProducts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
};
export const createProducts = async (req, res) => {
    const { name, description, price, category } = req.body;
    let { image } = req.body;
    try {
        if(!name || !description || !price || !category) return res.status(400).json({ error: 'All fields are required' });
        if(image) {
            let uploadResponse = await cloudinary.uploader.upload(image, { folder: 'products' });
            image = uploadResponse.secure_url;
        };
        const product = new Product({
            name,
            description,
            price,
            image,
            category,
        });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
};
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if(!product) return res.status(400).json({ error: 'Product not found' });
        
        if(product.image) {
            try {
                const imageId = product.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`products/${imageId}`); //added products/.. because folder in cloudinary when i add image
                console.log('deleted image from cloudinary');
            } catch (error) {
                console.log('error in deleting image from cloudinary', error.message);
            }
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
}
export const getRecommendationProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 3 },
            },
            {
                $project: {
                    name: 1,
                    image: 1,
                    description: 1,
                    price: 1
                },
            }
        ]);
        res.status(200).json({ products })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
}
export const getCategoryProducts = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        if(!products) return res.status(400).json({ error: 'No products found' });
        res.status(200).json({ products });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
}
export const toggleIsFeatured = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if(product) {
            product.isFeatured = !product.isFeatured;
            await product.save();

            const featuredProductInCache = await Product.find({ isFeatured: true }).lean();
            await redis.set('featuredProducts', JSON.stringify(featuredProductInCache));
            
            res.status(200).json({ message: 'Product updated successfully', product });
        }else {
            res.status(400).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Server error occurred please try again later' });
    }
}