import React, { useEffect } from 'react'
import { useProductStore } from '../../store/useProductStore';
import { useParams } from 'react-router-dom';
import CardProducts from '../../components/layout/CardProducts';

const CategoryPage: React.FC = (): React.JSX.Element => {
  const { category } = useParams();
  const { getCategoryProducts, products } = useProductStore();
  useEffect(() => {
    getCategoryProducts(category)
  },[getCategoryProducts, category]);
  return (
    <>
      <div className='min-h-screen overflow-hidden w-full mt-8'>
          <div className='max-w-7xl mx-auto px-4 py-2'>
          <h1 className='font-bold text-center text-6xl mb-9 text-emerald-400 capitalize'>{category}</h1>
            {products.length === 0 && <p className='text-center text-2xl font-bold mt-9'>No products found</p>}
            {products.map((prod) => (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-3 '>
                <CardProducts key={prod._id} category={prod} />
              </div>
            ))}
          </div>
        </div>
    </>
  )
}

export default CategoryPage