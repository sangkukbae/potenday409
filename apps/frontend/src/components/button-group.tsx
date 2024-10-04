"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Icons } from "./ui/icons"

export const ButtonGroup = ({ className }: { className: string }) => {
  const [liked, setLiked] = useState(false)

  return (
    <div className={cn("flex gap-x-3", className)}>
      <div className="" onClick={() => setLiked(!liked)}>
        {liked ? (
          <Icons.likeOn className="cursor-pointer" />
        ) : (
          <Icons.likeOff className="cursor-pointer" />
        )}
      </div>
      <Popover>
        <PopoverTrigger>
          <Icons.more className="cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent
          className="w-[70px] rounded-[12px] bg-white p-[6px] flex flex-col items-center shadow-[0px_2px_12px_0px_rgba(0,0,0,0.15)]"
          align="end"
        >
          <span className="py-[10px] block font-medium text-sm tracking-[-0.02em] text-[#333333] cursor-pointer">
            수정
          </span>
          <hr className="w-12 h-[1px] bg-[#ebebeb]" />
          <span className="py-[10px] block font-medium text-sm tracking-[-0.02em] text-[#FF3A3A] cursor-pointer">
            삭제
          </span>
        </PopoverContent>
      </Popover>
    </div>
  )
}
