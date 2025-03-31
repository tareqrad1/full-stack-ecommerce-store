import React, { useEffect } from 'react'
import CardProducts from '../layout/CardProducts';
import { useProductStore } from '../../store/useProductStore';
import { Loader } from 'lucide-react';

const PeopleAlsoBought = () => {
    const { getRecommendationsProducts, recommendations, isLoading } = useProductStore();
    useEffect(() => {
        getRecommendationsProducts();
    },[getRecommendationsProducts]);

    if(isLoading) return <div className='flex justify-center mt-8'><Loader size={20} className='animate-spin' /></div>;
    return (
		<div className='mt-8 md:mt-16'>
			<h3 className='text-2xl font-semibold text-emerald-400'>People also bought</h3>
			<div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
				{recommendations.map((product, idx) => (
					<CardProducts category={product}  key={idx} />
				))}
			</div>
		</div>
	);

}

export default PeopleAlsoBought