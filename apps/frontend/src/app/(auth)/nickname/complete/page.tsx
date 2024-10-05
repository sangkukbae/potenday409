import Link from "next/link"

import { Icons } from "@/components/ui/icons"
import { BottomButton } from "@/components/bottom-button"

export default function NicknameCompletePage() {
  return (
    <div className="mt-[120px] px-[30px] w-full max-w-[500px] mx-auto">
      <h2 className="font-bold text-[22px] tracking-[-0.03em] text-black text-left mb-[91px]">
        완료하였습니다
        <br />
        소울프렌즈를 시작해보세요
      </h2>

      <div className="flex flex-col items-center">
        <Icons.taskOn className="mb-[28px]" />
        <Icons.soulFriends />
      </div>
      <Link href="/diary">
        <BottomButton value="시작하기" />
      </Link>
    </div>
  )
}
