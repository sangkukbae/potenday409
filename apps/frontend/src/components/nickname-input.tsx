import { cn } from "@/lib/utils"

import { Input } from "./ui/input"

type NicknameInputProps = {
  className?: string
}

export const NicknameInput = ({ className }: NicknameInputProps) => {
  return (
    <div className={cn(className)}>
      <Input
        className="w-full h-[50px] rounded-[12px] border border-[#A0A0A0] text-lg tracking-[-0.03em] placeholder:text-lg placeholder:tracking-[-0.03em] placeholder:text-[#A0A0A0]"
        placeholder="닉네임을 입력해주세요"
      />
    </div>
  )
}
