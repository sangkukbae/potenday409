"use client"

import { ButtonGroup } from "./button-group"
import { Icons } from "./ui/icons"
import { convertKRDate } from "@/lib/utils"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { useRouter } from "next/navigation"

type AppHeaderProps = {
  date: string
  diaryId: number
  heart: number
}

export const AppHeader = ({ date, diaryId, heart }: AppHeaderProps) => {
  const router = useRouter()

  return (
    <div className="relative flex justify-center items-center w-full mt-[35px] h-[46px]">
      <Icons.chevronLeft
        className="absolute left-[18px] cursor-pointer"
        onClick={() => {
          router.push("/diary")
        }}
      />
      <div className="text-center font-bold tracking-[-0.03em]">
        {format(convertKRDate(date), "M월 d일 EEEE", { locale: ko })}
      </div>

      <ButtonGroup
        className="absolute right-[12px]"
        size="md"
        id={diaryId}
        heart={heart}
      />
    </div>
  )
}
