import { create } from "zustand"

export const useNickname = create<{
  nickname: string
  isAvailable: boolean
  setNickname: (nickname: string, isAvailable: boolean) => void
}>((set) => ({
  nickname: "",
  isAvailable: false,
  setNickname: (nickname: string, isAvailable: boolean) =>
    set({ nickname, isAvailable }),
}))

export const useAgreements = create<{
  isAgreedAll: boolean
  setAgreedAll: (isAgreedAll: boolean) => void
}>((set) => ({
  isAgreedAll: false,
  setAgreedAll: (isAgreedAll: boolean) => set({ isAgreedAll }),
}))
