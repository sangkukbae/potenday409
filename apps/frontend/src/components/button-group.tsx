"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Icons } from "./ui/icons"
import { cn } from "@/lib/utils"
import { useAlert } from "@/store/alert"
import { useState } from "react"

type ButtonGroupProps = {
  className?: string
  size?: "sm" | "md" | "lg"
}

export const ButtonGroup = ({ className, size }: ButtonGroupProps) => {
  const [liked, setLiked] = useState(false)

  const { setAlert } = useAlert()

  return (
    <div className={cn("flex gap-x-3", className)}>
      <div className="" onClick={() => setLiked(!liked)}>
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
          <button className="w-full py-[10px] block font-medium text-sm tracking-[-0.02em] text-[#333333] cursor-pointer">
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
                confirmAction: () => console.log("delete"),
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
