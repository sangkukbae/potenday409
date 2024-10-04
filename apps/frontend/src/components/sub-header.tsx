import { Icons } from "./ui/icons"
import { cn } from "@/lib/utils"

export const SubHeader = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative pt-[60px]", className)}>
      <div className="flex justify-center pb-[18px]">
        <Icons.chevronLeft className="absolute left-[18px]" />
        <h2 className="font-bold tracking-[-0.03em]">10월 2일 수요일</h2>
      </div>
      <hr className="w-full h-2 bg-[#f4f4f4]" />
    </div>
  )
}
