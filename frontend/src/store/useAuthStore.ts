import { create } from 'zustand';
import Axios from '../lib/axios';

type UserType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    cartItems: string[];
};

interface AuthState {
    user: UserType | null;
    isLoading: boolean;
    error: string | null;
    isCheckingAuth: boolean;
    CheckAuth: () => Promise<void>;
    signup: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: false,
    error: null,
    isCheckingAuth: false,

    CheckAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
        const response = await Axios.get('/auth/check-auth');
        set({ isCheckingAuth: false, user: response.data.user, error: null });
        } catch (error: unknown) {
        console.log(error);
        set({ isCheckingAuth: false, error: null });
        }
    },

    signup: async (name: string, email: string, password: string, confirmPassword: string) => {
        set({ isLoading: true, error: null });
        try {
        const response = await Axios.post('/auth/signup', { name, email, password, confirmPassword });
        set({ isLoading: false, error: null });
        return response.data.user;
        } catch (error: unknown) {
        console.log(error);
        set({ error: 'Error during signup', isLoading: false });
        throw error;
        }
    },

    login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
        const response = await Axios.post('/auth/login', { email, password });
        set({ isLoading: false, user: response.data.user, error: null });
        } catch (error: unknown) {
        console.log(error);
        set({ error: 'Error during login', isLoading: false });
        throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
        await Axios.post('/auth/logout');
        set({ isLoading: false, user: null, error: null });
        } catch (error: unknown) {
        console.log(error);
        set({ isLoading: false });
        throw error;
        }
    },

    refreshToken: async () => {
        try {
            const response = await Axios.post('/auth/refresh-token');
            const newAccessToken = response.data.accessToken;
        
            Axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            set((state) => ({
                ...state,
                user: state?.user
                ? {
                    ...state.user,
                    accessToken: newAccessToken,
                    }
                : null,
            }));
            console.log('Token refreshed successfully');
        } catch (error: unknown) {
            console.log('Error refreshing token', error);
            throw error;
        }
    },
}));

// Auto-refresh token every 1 minute
setInterval(() => {
    const { refreshToken } = useAuthStore.getState();
    refreshToken();
}, 15 * 60 * 1000); // 15 minute interval
