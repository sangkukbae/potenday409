import { create } from "zustand"

export const useAlert = create<{
  open: boolean
  title: string
  description: string
  cancelName: string
  confirmName: string
  confirmAction?: () => void
  setAlert: (params: {
    open: boolean
    title?: string
    description?: string
    cancelName?: string
    confirmName?: string
    confirmAction?: () => void
  }) => void
}>((set) => ({
  open: false,
  title: "",
  description: "",
  cancelName: "",
  confirmName: "",
  confirmAction: () => {},
  setAlert: ({
    open,
    title,
    description,
    cancelName,
    confirmName,
    confirmAction,
  }) =>
    set({ open, title, description, cancelName, confirmName, confirmAction }),
}))
