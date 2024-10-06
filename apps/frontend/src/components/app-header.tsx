"use client"

import { ButtonGroup } from "./button-group"
import { Icons } from "./ui/icons"
import { formatKRDate } from "@/lib/utils"
import { useAlert } from "@/store/alert"
import { useRouter } from "next/navigation"

export const AppHeader = ({ date }: { date: string }) => {
  const { setAlert } = useAlert()
  const router = useRouter()
  const isEditing = true
  return (
    <div className="relative flex justify-center items-center w-full mt-[35px] h-[46px]">
      <Icons.chevronLeft
        className="absolute left-[18px] cursor-pointer"
        onClick={() => {
          if (isEditing) {
            setAlert({
              open: true,
              title: "수정을 중단할까요?",
              description: "수정 중인 내용이 원래대로 돌아가요",
              cancelName: "계속 작성",
              confirmName: "나가기",
              confirmAction: () => router.push("/diary"),
            })
          }
        }}
      />
      <div className="text-center font-bold tracking-[-0.03em]">
        {formatKRDate(date)}
      </div>

      <ButtonGroup className="absolute right-[12px]" size="md" />
    </div>
  )
}
