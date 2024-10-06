"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { removeDiary, updateLike } from "@/actions/diary"
import { useAlert } from "@/store/alert"
import { useDiary } from "@/store/diary"

import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Icons } from "./ui/icons"

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
  const [liked, setLiked] = useState(heart === 1 ? true : false)

  const path = usePathname()
  const router = useRouter()

  const { setAlert } = useAlert()
  const { title, content } = useDiary((state) => state)
  console.log("content:", content)
  console.log("title:", title)

  const diaryDetailRegex = /^\/diary\/[^/]+$/

  return (
    <div className={cn("flex gap-x-3", className)}>
      <div
        onClick={() => {
          setLiked(!liked)
          updateLike({ diaryId: id, isLike: liked === true ? 1 : 0 })
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
