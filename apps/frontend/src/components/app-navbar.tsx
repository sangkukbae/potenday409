import { usePathname, useRouter } from "next/navigation"

import { Icon } from "@/components/icon"
import { Icons } from "./ui/icons"
import { cn } from "@/lib/utils"
import { useAlert } from "@/store/alert"
import { useAuth } from "@/store/auth"

export const AppNavbar = () => {
  const path = usePathname()
  const router = useRouter()

  const { token } = useAuth((state) => state)

  const isLogin = !!token

  const { setAlert } = useAlert()

  if (path !== "/diary" && path !== "/diary/list" && path !== "/mypage") {
    return null
  }

  const alertLogin = () => {
    setAlert({
      open: true,
      title: "로그인이 필요한 메뉴입니다",
      description: "로그인 하시겠어요?",
      cancelName: "취소",
      confirmName: "로그인",
      confirmAction: () => router.push("/sign-in"),
    })
  }

  return (
    <div className="fixed left-0 bottom-0 flex md:hidden justify-around h-20 border-t border-[#ebebeb] pt-4 bg-white w-full">
      <div onClick={() => router.push("/diary")}>
        <Icon
          className={cn(
            "text-[10px]",
            path === "/diary" ? "text-black" : "text-[#c3c3c3]"
          )}
          icon={
            <Icons.home
              className={path === "/diary" ? "fill-black" : "fill-[#c3c3c3]"}
            />
          }
          text="홈"
        />
      </div>

      <div
        onClick={() => {
          if (isLogin) {
            router.push("/diary/list")
          } else {
            alertLogin()
          }
        }}
      >
        <Icon
          className={cn(
            "text-[10px]",
            path === "/diary/list" ? "text-black" : "text-[#c3c3c3]"
          )}
          icon={
            <Icons.diary
              className={
                path === "/diary/list" ? "fill-black" : "fill-[#c3c3c3]"
              }
            />
          }
          text="내일기"
        />
      </div>

      <div
        onClick={() => {
          if (isLogin) {
            router.push("/mypage")
          } else {
            alertLogin()
          }
        }}
      >
        <Icon
          className={cn(
            "text-[10px]",
            path === "/mypage" ? "text-black" : "text-[#c3c3c3]"
          )}
          icon={
            <Icons.user
              className={path === "/mypage" ? "fill-black" : "fill-[#c3c3c3]"}
            />
          }
          text="마이페이지"
        />
      </div>
    </div>
  )
}
