"use client"

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog"

import { useAlert } from "@/store/alert"

export const AlertProvider = () => {
  const {
    open,
    title,
    description,
    cancelName,
    confirmName,
    confirmAction,
    setAlert,
  } = useAlert()
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="w-[320px] h-[180px] rounded-[20px] bg-white px-0 pb-0 gap-y-8">
        <header className="text-center">
          <h2 className="font-bold text-xl leading-[150%] tracking-[-0.03em] mb-2">
            {title}
          </h2>
          <p className="leading-[150%] tracking-[-0.03em] text-[#8d8d8d]">
            {description}
          </p>
        </header>

        <div className="flex w-full border-t ">
          {cancelName && (
            <button
              className="w-full h-[60px] border-r font-medium tracking-[-0.03em] text-[#333333]"
              onClick={() => setAlert({ open: false })}
            >
              {cancelName}
            </button>
          )}
          <button
            className="w-full h-[60px] font-medium tracking-[-0.03em] text-[#FF655E]"
            onClick={() => {
              confirmAction?.()
              setAlert({ open: false })
            }}
          >
            {confirmName}
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
