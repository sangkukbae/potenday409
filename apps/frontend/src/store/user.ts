import { UserInfo } from "@/types"
import { create } from "zustand"

export const useUser = create<{
  userInfo: UserInfo | null
  setUserInfo: (userInfo: UserInfo) => void
  clear: () => void
}>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
  clear: () => set({ userInfo: null }),
}))
