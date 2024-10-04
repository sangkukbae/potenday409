import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip"

import { Icons } from "./ui/icons"
import { TooltipContent } from "@/components/ui/tooltip-content"
import { cn } from "@/lib/utils"

// import { useState } from "react"

export const Header = () => {
  // const [currentPath, setCurrentPath] = useState<"home" | "diary" | "mypage">(
  //   "home"
  // )

  return (
    <div className="w-[750px] mx-auto h-[46px] hidden md:flex justify-between items-center px-[18px] py-[11px]">
      <div className="cursor-pointer">로고</div>
      <div className="flex items-center gap-x-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Icons.home
              className={cn(
                "cursor-pointer fill-black"
                // currentPath === "home" ? "fill-black" : "fill-[#c3c3c3]"
              )}
              // onClick={() => setCurrentPath("home")}
            />
          </TooltipTrigger>
          <TooltipContent>홈</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Icons.diary
              className={cn(
                "cursor-pointer fill-[#c3c3c3]"
                // currentPath === "diary" ? "fill-black" : "fill-[#c3c3c3]"
              )}
              // onClick={() => setCurrentPath("diary")}
            />
          </TooltipTrigger>
          <TooltipContent>내일기</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Icons.user
              className={cn(
                "cursor-pointer fill-[#c3c3c3]"
                // currentPath === "mypage" ? "fill-black" : "fill-[#c3c3c3]"
              )}
              // onClick={() => setCurrentPath("mypage")}
            />
          </TooltipTrigger>
          <TooltipContent>마이페이지</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
