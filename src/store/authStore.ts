import { create } from "zustand"
import {
    loginUser, logout, fetchCurrentUser
} from "@/services/auth"

import { User } from "@/types/PTask";
import { useWorkspaceStore } from "./workspaceStore";
import { getToken, getUser, setUser } from "@/utils/tokenStorage";

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

    // New
    updateUserData: (userData: Partial<User>) => void;
    syncUserData: () => Promise<void> // New method to sync user data
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

        },

        // OTP verification action
        verifyOTP: async () => {

        },


        // Login action (authenticates the user)
        login: async (email, password) => {
            set({ loading: true, error: null });
            try {
                const userData = await loginUser({ email, password });
                set({ user: userData, isAuthenticated: true, loading: false });
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


        // New
        updateUserData: (userData: Partial<User>) => {
            set((state) => {
                const updatedUser = state.user ? { ...state.user, ...userData } : null
                if (updatedUser) {
                    setUser(updatedUser) // Update local storage
                }
                return { user: updatedUser }
            })
        },

        syncUserData: async () => {
            set({ loading: true, error: null })
            try {
                const userData = await fetchCurrentUser()
                if (userData) {
                    setUser(userData) // Update local storage
                    set({ user: userData, loading: false })
                }
            } catch (error) {
                set({
                    error: error instanceof Error ? error.message : 'Failed to sync user data',
                    loading: false
                })
                throw error
            }
        },

    }))