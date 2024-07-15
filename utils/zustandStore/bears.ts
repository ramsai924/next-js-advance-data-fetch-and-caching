import { create } from 'zustand'

export const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
  removeBear: () => set((state: any) => ({ bears: state.bears - 1 })),
  updateBears: (newBears: any) => set({ bears: newBears }),
}))