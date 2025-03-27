import { create } from 'zustand';
import Axios from '../lib/axios';
import axios from 'axios';
import toast from 'react-hot-toast';
type UserType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
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


    CheckAuth: async() => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await Axios.get('/auth/check-auth');
            if(response.status === 401) {
                await useAuthStore.getState().refreshToken();
                return Axios.get('/auth/check-auth');
            }
            set({ isCheckingAuth: false, user: response.data.user, error: null });
        } catch (error: unknown) {
            console.log(error);
            set({ isCheckingAuth: false, error: null });
        }
    },

    signup: async (name: string, email: string, password: string, confirmPassword: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await Axios.post('/auth/signup', {
                name,
                email,
                password,
                confirmPassword
            });
            set({ isLoading: false, error: null });
            return response.data.user;
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
    login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await Axios.post('/auth/login', {
                email,
                password
            });
            set({ isLoading: false, user: response.data.user, error: null });
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
    logout: async() => {
        set({ isLoading: true, error: null });
        try {
            await Axios.post('/auth/logout');
            set({ isLoading: false, user: null, error: null });
        } catch (error: unknown) {
            if(axios.isAxiosError(error)) {
                if(error instanceof Error) {
                    toast.error(error.response?.data.error);
                    set({ isLoading: false });
                }
            }
            throw error;
        }
    },
    
    //@todo: return to this function
    refreshToken: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await Axios.post('/auth/refresh-token');
            if(response.data.message === 'Token refreshed successfully') {
                Axios.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                set({ isLoading: false, error: null });
            }else {
                set({ isLoading: false, error: 'Failed to refresh token' });
            }
        } catch (error) {
            if(axios.isAxiosError(error)) {
                if(error instanceof Error) {
                    toast.error(error.response?.data.error);
                    set({ isLoading: false });
                }
            }
            throw error;
        }
    }
}));
