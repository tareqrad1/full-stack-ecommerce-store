import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
type CategoryTypeProps = { 
    category: {
        name: string;
        imageUrl: string;
        href: string
    }
}

const CategoryItems = ({ category }: CategoryTypeProps): React.JSX.Element => {
  return (
    <motion.div className='relative overflow-hidden rounded-sm'
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }} 
    >
        <Link to={`/category${category.href}`}>
            <div className='h-96 z-10 relative hover:scale-105 transition duration-500 cursor-pointer shadow-md'>
                <img src={category.imageUrl} alt={category.name} className='h-full w-full absolute object-cover opacity-80' />
                <div className='absolute bottom-0 left-0 p-4 z-50 flex flex-col gap-1.5'>
                    <h3 className='text-2xl font-bold'>{category.name}</h3> 
                    <p className='text-sm text-gray-200 z-50'>Explore-{category.name}</p>
                </div>
            </div>
        </Link>
    </motion.div>
  )
}

export default CategoryItems;