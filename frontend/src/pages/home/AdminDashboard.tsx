import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { BarChart, PlusCircle, ShoppingBasket } from 'lucide-react';
import CreateProduct from '../../components/content/CreateProduct';
import Products from '../../components/content/Products';
import Analytics from '../../components/content/Analytics';

const tabs = [
    {id: 'create', name: 'Create Product', icons: <PlusCircle />},
    {id: 'product', name: 'Products', icons: <ShoppingBasket />},
    {id: 'analytic', name: 'Analytics', icons: <BarChart />}
]

const AdminDashboard: React.FC = (): React.JSX.Element => {
    const [activeTab, setActiveTab] = useState<string>('Create Product');
    console.log(activeTab);
    
  return (
    <div className='min-h-screen w-full overflow-hidden'>
        <div className='max-w-7xl mx-auto py-16 px-3'>
            <motion.h1 className='text-center text-5xl capitalize text-emerald-400 font-bold'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            >admin Dashboard</motion.h1>
            {/* toggle buttons */}
            <div className='flex justify-center  items-center gap-1 mt-6'>
                {tabs.map((tab) => (
                    <button key={tab.id} className={`flex items-center capitalize gap-2 px-1 md:px-3 py-2 transition-all duration-200 cursor-pointer
                        ${activeTab === tab.name && 'bg-emerald-400 text-white rounded-md'}
                        `}
                    onClick={() => setActiveTab(tab.name)}
                    >{tab.icons} {tab.name}</button>
                ))}
            </div>
            {activeTab === 'Create Product' && <CreateProduct />}
            {activeTab === 'Products' && <Products />}
            {activeTab === 'Analytics' && <Analytics />}
        </div>
    </div>
  )
}

export default AdminDashboard