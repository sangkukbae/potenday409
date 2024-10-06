"use client"

import { COOKIE_KEY } from "@/constants"
import Cookies from "js-cookie"
import { useAuth } from "@/store/auth"

export const SignOutButton = () => {
  const { clear } = useAuth()
  return (
    <div className="fixed bottom-[110px] left-1/2 -translate-x-1/2">
      <button
        className="w-[48px] h-[17px] font-medium text-sm tracking-[-0.03em] text-[#A0A0A0]"
        onClick={() => {
          Cookies.remove(COOKIE_KEY.ACCESS_TOKEN)
          Cookies.remove(COOKIE_KEY.REFRESH_TOKEN)

          clear()

          window.location.reload()
        }}
      >
        로그아웃
      </button>
    </div>
  )
}
