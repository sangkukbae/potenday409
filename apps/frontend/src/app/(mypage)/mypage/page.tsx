import Link from "next/link"
import { getUserInfo } from "@/actions/user"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { SignOutButton } from "@/components/sign-out-button"

export default async function MypagePage() {
  const userInfo = await getUserInfo()

  return (
    <div className="">
      <header className="font-bold tracking-[-0.03em] text-black text-center pt-[47px] pb-[36px] md:pt-[13px] md:pb-[24px]">
        마이페이지
      </header>

      <hr className="w-full h-2 bg-[#F4F4F4]" />
      <div className="px-[18px] pt-[28px] w-full max-w-[500px] mx-auto">
        <h2 className="font-semibold text-4 tracking-[-0.03em] text-[#333333] mb-[25px]">
          로그인 정보
        </h2>

        {/* 닉네임 변경하기 */}
        <div className="flex items-end justify-between mb-6 ">
          <div className="flex flex-col gap-y-2">
            <span className="font-medium text-sm tracking-[-0.03em] text-[#333333]">
              닉네임
            </span>
            <span className="text-sm text-[#8D8D8D]">{userInfo.user_name}</span>
          </div>
          <Link href="/nickname/change">
            <Button
              className="px-[14.5px] py-[6px] font-medium text-xs tracking-[-0.03em] text-[#333333]"
              variant="outline"
            >
              변경하기
            </Button>
          </Link>
        </div>

        {/* 연결된 계정 */}
        <div className="flex items-end justify-between mb-[28px]">
          <div className="flex flex-col gap-y-2">
            <span className="font-medium text-sm tracking-[-0.03em] text-[#333333]">
              연결된 계정
            </span>
            <span className="text-sm text-[#8D8D8D]">{userInfo.email}</span>
          </div>
        </div>
      </div>
      <hr className="w-full h-2 bg-[#F4F4F4]" />

      <ul className="px-[18px] pt-[13px] w-full max-w-[500px] mx-auto">
        <Link href="/service">
          <li className="flex items-center justify-between py-[15px]">
            <span className="font-medium text-sm tracking-[-0.03em] text-[#333333]">
              서비스 이용약관
            </span>
            <Icons.chevronRight />
          </li>
        </Link>
        <Link href="/privacy">
          <li className="flex items-center justify-between py-[15px]">
            <span className="font-medium text-sm tracking-[-0.03em] text-[#333333]">
              개인정보 처리방침
            </span>
            <Icons.chevronRight />
          </li>
        </Link>
      </ul>

      <SignOutButton />
    </div>
  )
}
