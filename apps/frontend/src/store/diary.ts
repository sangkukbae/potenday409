import { create } from "zustand"

export const useDiary = create<{
  date: Date
  title: string
  character: string
  content: string
  setTitle: (title: string) => void
  setCharacter: (character: string) => void
  setContent: (content: string) => void
  setDate: (date: Date) => void
  clear: () => void
}>((set) => ({
  date: new Date(),
  title: "",
  character: "",
  content: "",
  setTitle: (title: string) => set({ title }),
  setCharacter: (character: string) => set({ character }),
  setContent: (content: string) => set({ content }),
  setDate: (date: Date) => set({ date }),
  clear: () => set({ title: "", character: "", content: "" }),
}))
