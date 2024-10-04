import { Icon } from "@/components/icon"
import { Icons } from "./ui/icons"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useState } from "react"

export const AppNavbar = () => {
  const path = usePathname()
  console.log("path:", path)
  const [currentTab, setCurrentTab] = useState<"home" | "diary" | "mypage">(
    "home"
  )

  if (path !== "/diary" && path !== "/diary-list") {
    return null
  }

  return (
    <div className="fixed left-0 bottom-0 flex md:hidden justify-around h-20 border-t border-[#ebebeb] pt-4 bg-white w-full">
      <Link href="/diary">
        <Icon
          className={cn(
            "text-[10px]",
            currentTab === "home" ? "text-black" : "text-[#c3c3c3]"
          )}
          icon={
            <Icons.home
              className={
                currentTab === "home" ? "fill-black" : "fill-[#c3c3c3]"
              }
            />
          }
          text="홈"
          onChangeValue={() => setCurrentTab("home")}
        />
      </Link>

      <Link href="/diary-list">
        <Icon
          className={cn(
            "text-[10px]",
            currentTab === "diary" ? "text-black" : "text-[#c3c3c3]"
          )}
          icon={
            <Icons.diary
              className={
                currentTab === "diary" ? "fill-black" : "fill-[#c3c3c3]"
              }
            />
          }
          text="내일기"
          onChangeValue={() => setCurrentTab("diary")}
        />
      </Link>

      <Link href="/mypage">
        <Icon
          className={cn(
            "text-[10px]",
            currentTab === "mypage" ? "text-black" : "text-[#c3c3c3]"
          )}
          icon={
            <Icons.user
              className={
                currentTab === "mypage" ? "fill-black" : "fill-[#c3c3c3]"
              }
            />
          }
          text="마이페이지"
          onChangeValue={() => setCurrentTab("mypage")}
        />
      </Link>
    </div>
  )
}
