import { create } from "zustand"
import {
    // registerUser,
    // verifyOTP,
    loginUser, logout
} from "@/services/auth"

import { User } from "@/types/PTask";
import { useWorkspaceStore } from "./workspaceStore";
import { getToken, getUser } from "@/utils/tokenStorage";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean,
    error: string | null,
    registrationSuccess: boolean;
    verificationSuccess: boolean;
    register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
    verifyOTP: (email: string, otp: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logoutUser: () => void;
    loadAuthFromStorage: () => void; // Function to load auth from localStorage
}




export const useAuthStore = create<AuthState>(
    (set) => ({
        user: null,
        isAuthenticated: false,
        error: null,
        loading: false,
        registrationSuccess: false,
        verificationSuccess: false,


        // Register user action
        register: async () => {
            // set({ loading: true, error: null, registrationSuccess: false });
            // try {
            //     await registerUser(data);
            //     set({ registrationSuccess: true, loading: false });
            // } catch (error: any) {
            //     set({ error: error.message, loading: false });
            // }
        },

        // OTP verification action
        verifyOTP: async () => {
            // set({ loading: true, error: null, verificationSuccess: false });
            // try {
            //     await verifyOTP({ email, otp });
            //     set({ verificationSuccess: true, loading: false });
            // } catch (error: any) {
            //     set({ error: error.message, loading: false });
            // }
        },


        // Login action (authenticates the user)
        login: async (email, password) => {
            set({ loading: true, error: null });
            try {
                const userData = await loginUser({ email, password });
                set({ user: userData, isAuthenticated: true, loading: false });

                // Save user data to localStorage
                // localStorage.setItem("user", JSON.stringify(userData));
                // localStorage.setItem("isAuthenticated", "true");
                console.log(userData)
            } catch (error) {
                set({ error: error.message, loading: false });
                throw error
            }
        },


        // Logout action
        logoutUser: async () => {
            await logout()
            set({ user: null, isAuthenticated: false });
            useWorkspaceStore.getState().setWorkspace("personal") // resert workspace

        },

        loadAuthFromStorage: () => {
            const token = getToken();
            const userData = getUser();

            if (token && userData) {
                set({ user: userData, isAuthenticated: true });
            } else {
                // If either token or user data is missing, clear everything
                set({ user: null, isAuthenticated: false });
            }
        },

    }))