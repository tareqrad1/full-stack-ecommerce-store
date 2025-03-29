import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';

interface ProductTypes {
    category: {
        name: string;
        description: string;
        price: number;
        category: string;
        image: string;
    }
}

const CardProducts = ({category}: ProductTypes): React.JSX.Element => {
    const { user } = useAuthStore();
    function handleAddToCart() {
        if(!user) {
            return toast.error('Please login first to add product to cart');
        }
        toast.success('Product added to cart successfully');
    }
    return (
        <div>
            <div className='space-y-5 border border-[#a8a4a49b] rounded-md'>
                <img src={category.image} alt={category.name} className='rounded-md object-cover opacity-80 h-96 w-full'/>
                <div className='space-y-2 p-2'>
                    <h3 className='text-lg capitalize'>{category.name}</h3>
                    <h1 className='font-bold text-2xl text-emerald-400'>{category.price}$</h1>
                    <button className='flex items-center gap-2 cursor-pointer bg-emerald-400 hover:bg-emerald-300 transition-colors py-2 px-4 rounded-md' 
                    type='button'
                    onClick={handleAddToCart}
                    ><ShoppingCart />Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default CardProducts