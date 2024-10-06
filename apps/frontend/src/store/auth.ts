import { create } from "zustand"

export const useAuth = create<{
  token: string
  setToken: (token: string) => void
  clear: () => void
}>((set) => ({
  token: "",
  setToken: (token: string) => set({ token }),
  clear: () => set({ token: "" }),
}))
