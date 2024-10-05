import { Button } from "./ui/button"

interface BottomButtonProps {
  value: string
  action?: () => void
}

export const BottomButton = ({ value }: BottomButtonProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-full py-5 text-center bg-white border-t px-[18px]">
      <Button
        className="w-full max-w-[500px] h-[42px] bg-black text-white rounded-[8px]"
        type="button"
        // onClick={() => action?.()}
      >
        {value}
      </Button>
    </div>
  )
}
