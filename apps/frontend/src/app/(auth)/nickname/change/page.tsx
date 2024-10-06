"use client"

import { BottomButton } from "@/components/bottom-button"
import { NicknameInput } from "@/components/nickname-input"
import { updateNickname } from "@/actions/user"
import { useNickname } from "@/store/nickname"
import { useRouter } from "next/navigation"

export default function NicknameChangePage() {
  const { nickname, isAvailable } = useNickname((state) => state)
  const router = useRouter()

  return (
    <div className="mt-[120px] px-[30px] w-full mx-auto md:px-0 md:max-w-[500px]">
      <h2 className="font-bold text-[22px] tracking-[-0.03em] text-black mb-3">
        변경할 닉네임을 입력해주세요
      </h2>
      <p className="text-sm tracking-[-0.03em] text-[#A0A0A0] mb-[43px]">
        소울프렌즈에서 사용할 닉네임을 적어주세요
      </p>

      <NicknameInput />
      <BottomButton
        value="완료"
        disabled={!nickname || !isAvailable}
        action={async () => {
          if (nickname) {
            await updateNickname(nickname)

            router.push("/mypage")
          }
        }}
      />
    </div>
  )
}
