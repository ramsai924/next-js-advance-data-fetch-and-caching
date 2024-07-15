import { create } from 'zustand'

export const useFoodStore = create(((set) => ({
    food: 0,
    setFood: () => set((state: any) => ({ food: state.food + 1 })),
    removeFood: () => set((state: any) => ({ food: state.food - 1 }))
})))