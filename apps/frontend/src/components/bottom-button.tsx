"use client"

import { Button } from "./ui/button"

interface BottomButtonProps {
  value: string | React.ReactNode
  action?: () => void
  disabled?: boolean
}

export const BottomButton = ({
  value,
  disabled,
  action,
}: BottomButtonProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-full py-5 text-center bg-white border-t px-[18px] md:max-w-[500px] md:left-1/2 md:-translate-x-1/2 md:px-0">
      <Button
        className="w-full  h-[42px] bg-black text-white rounded-[8px]"
        type="button"
        disabled={disabled}
        onClick={() => action?.()}
      >
        {value}
      </Button>
    </div>
  )
}
