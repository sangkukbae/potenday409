"use client"

import { useEffect, useState } from "react"

import { Icon } from "@/components/icon"
import { SOUL_FRIENDS } from "@/constants"
import { cn } from "@/lib/utils"
import { useDiary } from "@/store/diary"

export const SelectFriends = () => {
  const { setCharacter, character } = useDiary((state) => state)
  const [selected, setSelected] = useState(character || "단짝이")

  const currentFriend = SOUL_FRIENDS.find((item) => item.name === selected)

  useEffect(() => {
    setCharacter(selected)
  }, [selected, setCharacter])

  return (
    <div className="pt-6 px-[18px] flex flex-col items-center w-full md:max-w-[500px] mx-auto">
      <p className="text-sm font-medium tracking-[-0.03em] text-[#333333] text-center mb-[18px]">
        조언을 받고 싶은 소울프렌즈를 골라주세요
      </p>
      <ul className="flex mb-3 gap-x-5">
        {SOUL_FRIENDS.map((item) => (
          <li
            key={item.name}
            onClick={() => {
              setSelected(item.name)
            }}
          >
            <Icon
              className={cn(
                "text-xs",
                selected === item.name ? "text-[#333333]" : "text-[#c3c3c3]"
              )}
              icon={selected === item.name ? item.icon.on : item.icon.off}
              text={item.name}
            />
          </li>
        ))}
      </ul>

      <div
        className="w-[210px] h-[26px] rounded-[20px] text-center mb-[18px]"
        style={{ backgroundColor: currentFriend?.color }}
      >
        <span className="text-[13px] text-[#333333]">
          {currentFriend?.description}
        </span>
      </div>
    </div>
  )
}
