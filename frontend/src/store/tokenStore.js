import { persist } from 'zustand/middleware';
import { create } from 'zustand';

const useTokenStore = create(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            username: null,

            setTokens: ({ accessToken, refreshToken }) =>
                set({ accessToken, refreshToken }),

            setUsername: (username) => set({ username }),

            clearTokens: () =>
                set({ accessToken: null, refreshToken: null, username: null }),
        }),
        {
            name: 'user-token',
            getStorage: () => localStorage,
        }
    )
);

export default useTokenStore;