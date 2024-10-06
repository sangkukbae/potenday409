"use client"

import { useEffect, useState } from "react"
import { checkExistedNickname } from "@/actions/user"
import { useNickname } from "@/store/nickname"

import { cn } from "@/lib/utils"

import { Input } from "./ui/input"

type NicknameInputProps = {
  className?: string
}

const MAX_NICKNAME_LENGTH = 12

export const NicknameInput = ({ className }: NicknameInputProps) => {
  const [nickname, setNickname] = useState("")
  const [isAvailableNickname, setIsAvailableNickname] = useState(false)

  const { setNickname: setNicknameStore } = useNickname((state) => state)

  useEffect(() => {
    // Do not proceed if nickname is empty or userInfo is not available
    if (nickname.trim().length === 0) return

    // Set a timer to call updateNickname after 5 seconds
    const timer = setTimeout(async () => {
      try {
        const result = await checkExistedNickname(nickname)

        setIsAvailableNickname(result)
        if (result) {
          setNicknameStore(nickname, true)
        } else {
          setNicknameStore("", false)
        }
      } catch (error) {
        console.error(`Error checking nickname: ${error}`)
      } finally {
      }
    }, 1000)

    // Cleanup function to clear the timer if nickname changes before 5 seconds
    return () => clearTimeout(timer)
  }, [nickname, setNicknameStore])

  return (
    <div className={cn(className)}>
      <Input
        className="w-full h-[50px] rounded-[12px] border border-[#A0A0A0] text-lg tracking-[-0.03em] placeholder:text-lg placeholder:tracking-[-0.03em] placeholder:text-[#A0A0A0] mb-3"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={async (e) => {
          if (e.target.value.length > MAX_NICKNAME_LENGTH) return
          setNickname(e.target.value)
        }}
        required
        maxLength={MAX_NICKNAME_LENGTH}
        autoFocus
      />

      <div className="relative flex items-center justify-between pl-3">
        {nickname.trim().length > 0 && isAvailableNickname && (
          <p className="text-sm text-black tracking-[-0.03em]">
            사용할 수 있는 닉네임 입니다
          </p>
        )}
        {nickname.trim().length > 0 && !isAvailableNickname && (
          <p className="text-sm text-[#FF655E] tracking-[-0.03em]">
            이미 사용중인 닉네임 입니다
          </p>
        )}
        <div
          className={cn(
            "text-sm tracking-[-0.03em] text-right flex-1",
            nickname.length > 0 ? "text-black" : "text-[#A0A0A0]"
          )}
        >
          ({nickname.length}/{MAX_NICKNAME_LENGTH})
        </div>
      </div>
    </div>
  )
}
