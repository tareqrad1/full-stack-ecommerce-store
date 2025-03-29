import React, { ChangeEvent, useState } from 'react'
import { PlusCircle, Upload } from 'lucide-react';

type ProductTypes = {
    name: string;
	description: string;
	price: string;
	category: string;
	image: string;
}

const categories: string[] = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const CreateProduct: React.FC = (): React.JSX.Element => {
    const [newProduct, setNewProduct] = useState<ProductTypes>({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});
    
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
                setNewProduct({ ...newProduct, image: reader.result as string });
			};

			reader.readAsDataURL(file); // base64
		}
	};
    return (
        <div className='overflow-hidden max-w-[500px] relative left-1/2 transform -translate-x-1/2 mt-7 rounded-md shadow-xl'>
            <div className='max-w-7xl mx-auto bg-gray-800/50 px-4 py-4'>
                <h1 className='text-3xl text-emerald-300 text-center py-6'>Create New Product</h1>
                <div className='space-y-3'>
                    <div>
                        <label className="block text-sm text-gray-500 dark:text-gray-300">Product Name</label>
                        <input type="text" className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 dark:text-gray-300">Description</label>
                        <textarea className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 dark:text-gray-300">Price</label>
                        <input type='number' className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 dark:text-gray-300">Category</label>
                        <select name="" id="" className='mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300'>
                        {categories.map((category, idx) => (
                            <option key={idx} value={category} className='text-sm cursor-pointer'>
                                {category}
                            </option>
                        ))}
                        </select>
                    </div>
                    {/* image upload */}
                    <div className='my-2 flex items-center'>
                        <input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
                        <label
                            htmlFor='image'
                            className='cursor-pointer bg-gray-700 py-1 px-2 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
                        >
                            <Upload className='h-5 w-5 inline-block' />
                        </label>
                        {newProduct.image && <span className='ml-3 text-sm text-gray-400'>Image uploaded </span>}
                    </div>
                    <button className="mt-5 flex items-center gap-2 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 cursor-pointer transform bg-emerald-600 rounded-lg hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        <PlusCircle className='w-5 h-5' />
                        Create Product
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct