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
  isRequiredChecked: boolean
  setAgreedAll: (isAgreedAll: boolean) => void
  setRequiredChecked: (isRequiredChecked: boolean) => void
}>((set) => ({
  isAgreedAll: false,
  isRequiredChecked: false,
  setAgreedAll: (isAgreedAll: boolean) => set({ isAgreedAll }),
  setRequiredChecked: (isRequiredChecked: boolean) =>
    set({ isRequiredChecked }),
}))
