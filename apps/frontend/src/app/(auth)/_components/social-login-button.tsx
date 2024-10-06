"use client"

import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

export const SocialLoginButton = ({
  provider,
}: {
  provider: "kakao" | "google"
}) => {
  return (
    <button
      className={cn(
        "w-[316px] h-[48px] rounded-[8px]  flex items-center justify-center gap-x-3 mb-3",
        provider === "google"
          ? "bg-white border border-[#D9D9D9]"
          : "bg-[#FFEB00]"
      )}
      onClick={() =>
        window.open(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/to-${provider}`,
          "_self"
        )
      }
    >
      {provider === "google" ? <Icons.google /> : <Icons.kakao />}
      <span className="font-medium tracking-[-0.03em] text-black">
        {provider === "google" ? "구글" : "카카오"}로 시작하기
      </span>
    </button>
  )
}
