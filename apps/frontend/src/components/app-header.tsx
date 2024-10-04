import { ButtonGroup } from "./button-group"
import { Icons } from "./ui/icons"

export const AppHeader = () => {
  return (
    <div className="relative flex justify-center items-center w-full mt-[35px] h-[46px]">
      <Icons.chevronLeft className="absolute left-[18px] cursor-pointer" />
      <div className="text-center font-bold tracking-[-0.03em]">
        10월 2일 수요일
      </div>

      <ButtonGroup className="absolute right-[12px]" />
    </div>
  )
}
