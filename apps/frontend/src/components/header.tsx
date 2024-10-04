"use client"

import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip"

import { Icons } from "./ui/icons"
import Link from "next/link"
import { TooltipContent } from "@/components/ui/tooltip-content"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export const Header = () => {
  const path = usePathname()

  return (
    <div className="w-[750px] mx-auto h-[46px] hidden md:flex justify-between items-center px-[18px] py-[11px]">
      <div className="cursor-pointer">로고</div>
      <div className="flex items-center gap-x-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/diary">
              <Icons.home
                className={cn(
                  "cursor-pointer fill-black",
                  path === "/diary" ? "fill-black" : "fill-[#c3c3c3]"
                )}
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>홈</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/diary-list">
              <Icons.diary
                className={cn(
                  "cursor-pointer fill-[#c3c3c3]",
                  path === "/diary-list" ? "fill-black" : "fill-[#c3c3c3]"
                )}
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>내일기</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/mypage">
              <Icons.user
                className={cn(
                  "cursor-pointer fill-[#c3c3c3]",
                  path === "/mypage" ? "fill-black" : "fill-[#c3c3c3]"
                )}
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>마이페이지</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
