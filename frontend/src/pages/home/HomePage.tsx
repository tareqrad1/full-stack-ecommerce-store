import React from 'react'
import CategoryItems from '../../components/layout/CategoryItems';

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage: React.FC = (): React.JSX.Element => {
  return (
    <>
      <div className='min-h-screen overflow-hidden'>
        <div className='max-w-7xl mx-auto py-16 px-3'>
          <div className='text-center'>
            <h1 className='text-emerald-400 text-3xl md:text-5xl font-bold'>Explore Our Categories</h1>
            <p className='mt-5 mb-14 text-xl text-gray-300'>Discover the latest trends in eco-friendly fashion</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative'>
            {categories.map((category) => (
              <CategoryItems key={category.name} category={category} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage