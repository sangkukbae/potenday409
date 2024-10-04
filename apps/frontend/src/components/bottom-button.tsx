import { Button } from "./ui/button"

export const BottomButton = ({ value }: { value: string }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full py-5 text-center bg-white border-t">
      <Button
        className="w-[324px] h-[42px] bg-black text-white rounded-[8px]"
        type="submit"
      >
        {value}
      </Button>
    </div>
  )
}
