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
    <div
      className={cn(
        "w-[750px] mx-auto h-[46px] hidden md:flex justify-between items-center px-[18px] py-[11px]",
        {
          "hidden md:flex": path === "/sign-in",
        }
      )}
    >
      <Link href="/diary">
        <Icons.logo className="w-[96px] h-[18px]" />
      </Link>
      <div className="flex items-center gap-x-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/diary">
              <Icons.home
                className={cn(
                  "cursor-pointer fill-black hover:fill-black",
                  path === "/diary" ? "fill-black" : "fill-[#c3c3c3]"
                )}
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <span className="font-medium text-sm tracking-[-0.05em] text-white">
              홈
            </span>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            className={cn({
              "md:hidden":
                path === "/sign-in" ||
                path === "/nickname" ||
                path === "/nickname/complete",
            })}
            asChild
          >
            <Link href="/diary-list">
              <Icons.diary
                className={cn(
                  "cursor-pointer fill-[#c3c3c3] hover:fill-black",
                  path === "/diary-list" ? "fill-black" : "fill-[#c3c3c3]"
                )}
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <span className="font-medium text-sm tracking-[-0.05em] text-white">
              내일기
            </span>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            className={cn({
              "md:hidden":
                path === "/sign-in" ||
                path === "/nickname" ||
                path === "/nickname/complete",
            })}
            asChild
          >
            <Link href="/mypage">
              <Icons.user
                className={cn(
                  "cursor-pointer fill-[#c3c3c3] hover:fill-black",
                  path === "/mypage" ? "fill-black" : "fill-[#c3c3c3]"
                )}
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <span className="font-medium text-sm tracking-[-0.05em] text-white">
              마이페이지
            </span>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
