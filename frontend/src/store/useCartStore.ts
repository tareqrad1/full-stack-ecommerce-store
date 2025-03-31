import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import Axios from '../lib/axios';
import { ProductsType } from './useProductStore';


type CartTypes ={ 
    _id: string;
    qwt: number;
    price: number;
}

type CouponType = {
    code: string;
    discountPercentage: number;
}


interface CartState {
    cart: CartTypes[];
    total: number;
    subTotal: number;
    coupon: null | CouponType;
    getCartItems: () => Promise<void>;
    addToCart: (product: ProductsType ) => Promise<void>;
    calculateTotals: () => void;
    removeProductInCart: (id: string) => Promise<void>;
    updateQwtInCart: (id: string, qwt: number) => Promise<void>;
}

export const useCartStore = create<CartState>()(
    devtools((set, get) => ({
        cart: [],
        total: 0,
        subTotal: 0,
        coupon: null,

        getCartItems: async () => {
            try {
                const response = await Axios.get('/cart');
                set({ cart: response.data.cartItems });
                get().calculateTotals();
            } catch (error: unknown) {
                set({ cart: [] });
                console.log('error in getting cart items', error);
            }
        },
        addToCart: async (product: ProductsType) => {
            try {
                await Axios.post('/cart', {
                    productId: product._id,
                });
                set((prev) => {
                    const findProduct = prev.cart.find((item) => item._id === product._id);
                    const newProduct = findProduct ? prev.cart.map((item) => item._id === product._id ? { ...item, qwt: item.qwt + 1 } : item)
                    : [...prev.cart, { ...product, qwt: 1 }];
                    return { cart: newProduct };
                });
                get().calculateTotals();
            } catch (error: unknown) {
                console.log('error in adding to cart', error);
            }
        },
        calculateTotals: () => {
            const { cart, coupon } = get();
            const subTotal = cart.reduce((acc, item) => acc + item.price * item.qwt, 0);
            let total = subTotal;
            if(coupon) {
                const discount = subTotal * coupon.discountPercentage / 100;
                total = subTotal - discount;
            }
            set({ subTotal, total }) //subTotal That is the total amount before discount, total is the total amount after discount
        },
        removeProductInCart: async (id: string) => {
            try {
                await Axios.delete('/cart/' + id);
                set((prev) => {
                    const newCart = prev.cart.filter((item) => item._id !== id);
                    return { cart: newCart };
                });
            } catch (error: unknown) {
                console.log('error in removing product in cart', error);
            }
        },
        updateQwtInCart: async (id: string, qwt: number) => {
            try {
                if(qwt === 0) return get().removeProductInCart(id);
                await Axios.put('/cart/' + id, { qwt });
                set((prev) => {
                    const newQwt = prev.cart.map((item) => item._id === id ? { ...item, qwt: qwt } : item);
                    return { cart: newQwt };
                });
                get().calculateTotals();
            } catch (error: unknown) {
                console.log('error in updating qwt in cart', error);
            }
        },
    }))
);