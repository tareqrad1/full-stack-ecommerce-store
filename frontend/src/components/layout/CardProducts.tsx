import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { motion } from 'framer-motion';

interface ProductTypes {
    category: {
        _id: string;
        name: string;
        description: string;
        price: number;
        category: string;
        image: string;
        isFeatured: boolean;
        createdAt: number;
    }
}

const CardProducts = ({category}: ProductTypes): React.JSX.Element => {
    const { user } = useAuthStore();
    const { addToCart } = useCartStore();
    const Navigate = useNavigate();
    async function handleAddToCart() {
        if(!user) {
            Navigate('/login')
            return toast.error('Please login first to add product to cart');
        }
        await addToCart(category);
        toast.success('Product added to cart successfully');
    }

    return (
        <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        >
            <div className='space-y-5 border border-[#a8a4a464] rounded-md'>
                <img src={category.image} alt={category.name} className='rounded-md object-cover opacity-80 h-96 w-full'/>
                <div className='space-y-2 p-2'>
                    <h3 className='text-2xl capitalize'>{category.name}</h3>
                    <p className='text-sm text-start text-gray-400'>{category.description}</p>
                    <h1 className='font-bold text-2xl text-emerald-400'>{category.price}$</h1>
                    <button className='flex items-center gap-2 cursor-pointer bg-emerald-400 hover:bg-emerald-300 transition-colors py-2 px-4 rounded-md' 
                    type='button'
                    onClick={handleAddToCart}
                    ><ShoppingCart />Add To Cart</button>
                </div>
            </div>
        </motion.div>
    )
}

export default CardProducts