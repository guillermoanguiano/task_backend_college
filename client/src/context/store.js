import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { API_URL } from '../api/consts'

export const useStore = create(
    persist(
        (set, get) => ({
            user: null,
            getUser: () => get().user,
            login: async (data) => {
                try {
                    const response = await fetch(API_URL + '/users/auth', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    const user = await response.json()
                    set({ user })
                    return user
                } catch (error) {
                    console.log(error)
                }
            },
            logout: () => set({ user: null }),
        }),
        {
            name: 'user-storage',
        },
    ),
)