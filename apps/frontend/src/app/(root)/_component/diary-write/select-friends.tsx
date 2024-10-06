"use client"

import { useEffect, useState } from "react"
import { SOUL_FRIENDS } from "@/constants"
import { useDiary } from "@/store/diary"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/icon"

export const SelectFriends = () => {
  const [selected, setSelected] = useState("단짝이")

  const { setCharacter } = useDiary((state) => state)

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
