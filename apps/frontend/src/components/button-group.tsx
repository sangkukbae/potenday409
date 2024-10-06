"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { removeDiary, updateLike } from "@/actions/diary"
import { usePathname, useRouter } from "next/navigation"

import { Icons } from "./ui/icons"
import { cn } from "@/lib/utils"
import { useAlert } from "@/store/alert"
import { useState } from "react"

type ButtonGroupProps = {
  className?: string
  size?: "sm" | "md" | "lg"
  id: number
  heart?: number
}

export const ButtonGroup = ({
  className,
  size,
  id,
  heart,
}: ButtonGroupProps) => {
  const [liked, setLiked] = useState(!!heart)

  const path = usePathname()
  const router = useRouter()

  const { setAlert } = useAlert()

  const diaryDetailRegex = /^\/diary\/[^/]+$/

  return (
    <div className={cn("flex gap-x-3", className)}>
      <div
        onClick={() => {
          setLiked(!liked)
          updateLike({ diaryId: id, isLike: liked === true ? 0 : 1 })
        }}
      >
        {liked ? (
          <Icons.likeOn
            className={cn(
              "cursor-pointer",
              size === "sm" ? "size-5" : "size-6"
            )}
          />
        ) : (
          <Icons.likeOff
            className={cn(
              "cursor-pointer",
              size === "sm" ? "size-5" : "size-6"
            )}
          />
        )}
      </div>
      <Popover>
        <PopoverTrigger>
          <Icons.more
            className={cn(
              "cursor-pointer",
              size === "sm" ? "size-5" : "size-6"
            )}
          />
        </PopoverTrigger>
        <PopoverContent
          className="w-[70px] rounded-[12px] bg-white p-[6px] flex flex-col items-center shadow-[0px_2px_12px_0px_rgba(0,0,0,0.15)]"
          align="end"
        >
          <button
            className="w-full py-[10px] block font-medium text-sm tracking-[-0.02em] text-[#333333] cursor-pointer"
            onClick={() => {
              router.push(`/diary/write?id=${id}`)
            }}
          >
            수정
          </button>
          <hr className="w-12 h-[1px] bg-[#ebebeb]" />
          <button
            className="w-full py-[10px] block font-medium text-sm tracking-[-0.02em] text-[#FF3A3A] cursor-pointer"
            onClick={() =>
              setAlert({
                open: true,
                title: "일기를 삭제할까요?",
                description: "삭제한 일기는 복원할 수 없어요",
                cancelName: "취소",
                confirmName: "삭제",
                confirmAction: async () => {
                  await removeDiary(id)

                  if (diaryDetailRegex.test(path)) {
                    router.replace("/diary")
                  } else {
                    router.refresh()
                  }
                },
              })
            }
          >
            삭제
          </button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
