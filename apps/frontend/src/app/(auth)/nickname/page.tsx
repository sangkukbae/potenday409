import Link from "next/link"

import { BottomButton } from "@/components/bottom-button"
import { NicknameInput } from "@/components/nickname-input"

import { Agreements } from "../_components/agreements"

export default function NicknamePage() {
  return (
    <div className="mt-[120px] px-[30px] w-full md:max-w-[500px] md:px-0 mx-auto">
      <h2 className="font-bold text-[22px] tracking-[-0.03em] text-black mb-3">
        어떻게 불러드릴까요?
      </h2>
      <p className="text-sm tracking-[-0.03em] text-[#A0A0A0] mb-6">
        소울프렌즈에서 사용할 닉네임을 적어주세요 <br />
        닉네임은 나중에 수정할 수 있어요
      </p>

      {/* 닉네임 입력하기 */}
      {/* <div className="mb-6">
        <Input
          className="w-full h-[50px] rounded-[12px] border border-[#A0A0A0] text-lg tracking-[-0.03em] placeholder:text-lg placeholder:tracking-[-0.03em] placeholder:text-[#A0A0A0]"
          placeholder="닉네임을 입력해주세요"
        />
      </div> */}
      <NicknameInput className="mb-6" />

      <p className="text-sm text-[#A0A0A0] tracking-[-0.03em] mb-4">
        정책 및 약관을 클릭해 모든 내용을 확인해주세요.
      </p>
      <Agreements />
      <Link href="/nickname/complete">
        <BottomButton value="다음" />
      </Link>
    </div>
  )
}
