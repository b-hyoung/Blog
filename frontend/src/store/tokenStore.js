import { persist } from 'zustand/middleware';
import { create } from 'zustand';

const useTokenStore = create(
    persist(
        (set) => ({
            accessToken: null,
            username: null, // added username
            setAccessToken: (token) => set({ accessToken: token }),
            setUsername: (name) => set({ username: name }), // added setUsername
            clearToken: () => set({ accessToken: null, username: null }), // updated clearToken
        }),
        {
            name: 'user-token' // zustand로 상태 저장하면서, persist로 자동 localStorage 저장/복구까지 처리함.
        }
    )
);

export default useTokenStore;