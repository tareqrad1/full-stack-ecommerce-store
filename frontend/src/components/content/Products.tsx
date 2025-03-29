import { Star, Trash } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { useProductStore } from '../../store/useProductStore'
import toast from 'react-hot-toast';
import SkeletonTable from '../loadingAndSkeletons/SkeletonTable';
import { motion } from 'framer-motion';


const Products: React.FC = (): React.JSX.Element => {
  const { products, getAllProducts, deleteProduct, toggleFeaturedProduct, isLoading, error } = useProductStore();
  const isMounted = useRef<boolean>(true);

  if(error) toast.error(error);
  useEffect(() => {
    if(isMounted.current) {
      isMounted.current = false;
      getAllProducts();
    }
  },[getAllProducts, toggleFeaturedProduct])
  console.log(products, 'product all');

  if(isLoading) {
    return <SkeletonTable />
  }

  if (products.length === 0) {
    return (
      <div className="text-white mt-9 flex items-center justify-center w-full bg-gray-800 py-10 rounded-lg shadow-lg">
        <p className="text-lg font-medium text-gray-300">No products found</p>
      </div>
    );
  }

  return (
    <>
      <motion.div className=" text-white mt-7 overflow-x-auto w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      >
        <table className="min-w-[1000px] mx-auto overflow-x-scroll divide-y-2 divide-gray-20">
          <thead className="ltr:text-left rtl:text-right text-white bg-gray-700">
            <tr className="*:font-medium *:text-white">
              <th className="px-3 py-2 whitespace-nowrap">Product</th>
              <th className="px-3 py-2 whitespace-nowrap">Price</th>
              <th className="px-3 py-2 whitespace-nowrap">Category</th>
              <th className="px-3 py-2 whitespace-nowrap">Featured</th>
              <th className="px-3 py-2 whitespace-nowrap">Actions</th>
            </tr>
        </thead>

        {products.map((product) => (
          <tbody className="divide-y divide-gray-200 bg-gray-800" key={product._id}>
          <tr className="*:first:font-medium *:text-[#ccc] hover:bg-gray-700">
            <td className="px-3 py-2 whitespace-nowrap flex gap-3 items-center"><img src={product.image} alt={product.name} className='w-10 h-10 md:w-14 md:h-14 rounded-full object-fill' />{product.name}</td>
            <td className="px-3 py-2 whitespace-nowrap">{product.price}$</td>
            <td className="px-3 py-2 whitespace-nowrap">{product.category}</td>
            <td className="px-3 py-2 whitespace-nowrap"><Star className={`${product.isFeatured ? 'bg-amber-300' : 'bg-gray-200'} rounded-full w-8 h-8 text-black p-1 cursor-pointer`} onClick={() => {
              toggleFeaturedProduct(product._id);
            }} /></td>
            <td className="px-3 py-2 whitespace-nowrap"><Trash className='cursor-pointer text-red-400 hover:text-red-600 transition-colors' onClick={() => {
              deleteProduct(product._id)
              toast.success('Product deleted successfully', {id: product._id});
              console.log(product.isFeatured, 'wow');
            }} /></td>
          </tr>
        </tbody>
        ))}
        
      </table>
      </motion.div>
    </>
  )
}

export default Products