"use client"

import { useRouter } from "next/navigation"
import { updateNickname } from "@/actions/user"
import { useAgreements, useNickname } from "@/store/nickname"

import { BottomButton } from "@/components/bottom-button"
import { NicknameInput } from "@/components/nickname-input"

import { Agreements } from "../_components/agreements"

export default function NicknamePage() {
  const router = useRouter()

  const { nickname, isAvailable } = useNickname((state) => state)
  const { isAgreedAll } = useAgreements((state) => state)

  return (
    <div className="mt-[120px] px-[30px] w-full md:max-w-[500px] md:px-0 mx-auto">
      <h2 className="font-bold text-[22px] tracking-[-0.03em] text-black mb-3">
        어떻게 불러드릴까요?
      </h2>
      <p className="text-sm tracking-[-0.03em] text-[#A0A0A0] mb-6">
        소울프렌즈에서 사용할 닉네임을 적어주세요 <br />
        닉네임은 나중에 수정할 수 있어요
      </p>
      {/* 닉네임 설정 */}
      <NicknameInput className="mb-6" />

      {/* 이용 정책 */}
      <p className="text-sm text-[#A0A0A0] tracking-[-0.03em] mb-4">
        정책 및 약관을 클릭해 모든 내용을 확인해주세요.
      </p>
      <Agreements />
      <BottomButton
        value="다음"
        disabled={!nickname || !isAvailable || !isAgreedAll}
        action={async () => {
          if (nickname) {
            await updateNickname(nickname)

            router.push("/nickname/complete")
          }
        }}
      />
    </div>
  )
}
