import {create} from 'zustand'

const useTokenStore = create(
    persist(
        (set) => ({
            accessToken: null,
            setAccessToken:(token) => set({ accessToken : token }),
            clearToken : set({accessToken : null}),
        }),{
            name:'user-token' //zustand로 상태 저장하면서, persist로 자동 localStorage 저장/복구까지 처리함.
        }

    )
)

export default useTokenStore