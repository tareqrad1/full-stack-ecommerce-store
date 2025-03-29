import { create } from 'zustand';
import Axios from '../lib/axios';
import axios from 'axios';


type ProductsType = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    isFeatured: boolean;
    createdAt: number;
}


interface ProductsState {
    products: ProductsType[];
    isLoading: boolean;
    error: string | null;
    createProduct: (name: string, description: string, price: number, category: string, image: string) => Promise<void>;
    getAllProducts: () => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    toggleFeaturedProduct: (id: string) => Promise<void>;
    getCategoryProducts: (category: string | undefined) => Promise<void>;
}

export const useProductStore = create<ProductsState>((set) => ({
    products: [],
    isLoading: false,
    error: null,

    createProduct: async (name: string, description: string, price: number, category: string, image: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await Axios.post('/products', {
                name,
                description,
                price,
                category,
                image
            }, {
                withCredentials: true
            });
            set((prev) => ({ isLoading: false, products: [...prev.products, response.data], error: null }));
        } catch (error: unknown) {
            if(axios.isAxiosError(error)) {
                if(error instanceof Error) {
                    console.log(error.message);
                    set({ error: error.response?.data.error, isLoading: false });
                }
            }
            throw error;
        }
    },
    getAllProducts: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await Axios.get('/products');
            set({ isLoading: false, products: response.data.products, error: null });
        } catch (error: unknown) {
            if(axios.isAxiosError(error)) {
                if(error instanceof Error) {
                    console.log(error.message);
                    set({ error: error.response?.data.error, isLoading: false });
                }
            }
            throw error;
        }
    },
    deleteProduct: async(id: string) => {
        set({ isLoading: true, error: null });
        try {
            await Axios.delete('/products/' + id);
            set((prev) => ({ ...prev, isLoading: false,  products: prev.products.filter((product) => product._id !== id), error: null }))
        } catch (error: unknown) {
            if(axios.isAxiosError(error)) {
                if(error instanceof Error) {
                    console.log(error.message);
                    set({ error: error.response?.data.error, isLoading: false });
                }
            }
            throw error;
        }
    },
    toggleFeaturedProduct: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await Axios.patch(`/products/${id}`);
            set((prev) => ({ ...prev, isLoading: false, products: prev.products.map((product) => product._id === id ? { ...product, isFeatured: response.data.product.isFeatured} : product),error: null }));
        } catch (error: unknown) {
            if(axios.isAxiosError(error)) {
                if(error instanceof Error) {
                    console.log(error.message);
                    set({ error: error.response?.data.error, isLoading: false });
                }
            }
            throw error;
        }
    },
    getCategoryProducts: async (category: string | undefined) => {
        set({ isLoading: true, error: null });
        try {
            const response = await Axios.get(`/products/category/${category}`);
            set({ isLoading: false, products: response.data.products, error: null });
        } catch (error: unknown) {
            if(axios.isAxiosError(error)) {
                if(error instanceof Error) {
                    console.log(error.message);
                    set({ error: error.response?.data.error, isLoading: false });
                }
            }
            throw error;
        }
    }
}));