import { create } from "zustand"

export const useMonth = create<{
  month: Date
  setMonth: (month: Date) => void
}>((set) => ({
  month: new Date(),
  setMonth: (month: Date) => set({ month }),
}))
