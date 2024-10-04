"use client"

import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { useAlert } from "@/store/alert"
import { useRouter } from "next/navigation"

export const DiaryWriteHeader = ({ className }: { className?: string }) => {
  const router = useRouter()
  const { setAlert } = useAlert()
  return (
    <div className={cn("relative pt-[60px]", className)}>
      <div className="flex justify-center pb-[18px]">
        <Icons.chevronLeft
          className="absolute left-[18px] cursor-pointer"
          onClick={() =>
            setAlert({
              open: true,
              title: "일기를 그만 쓸까요?",
              description: "지금까지 입력한 내용이 사라져요",
              cancelName: "계속 작성",
              confirmName: "나가기",
              confirmAction: () => router.push("/diary"),
            })
          }
        />
        <h2 className="font-bold tracking-[-0.03em]">10월 2일 수요일</h2>
      </div>
      <hr className="w-full h-2 bg-[#f4f4f4]" />
    </div>
  )
}
