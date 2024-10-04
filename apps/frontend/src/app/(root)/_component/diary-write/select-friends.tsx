"use client"

import { Icon } from "@/components/icon"
import { SOUL_FRIENDS } from "@/constants"
import { cn } from "@/lib/utils"
import { useState } from "react"

export const SelectFriends = () => {
  const [selected, setSelected] = useState("bestFriend")

  const currentFriend = SOUL_FRIENDS.find((item) => item.name === selected)

  return (
    <div className="pt-6 px-[18px] flex flex-col items-center">
      <p className="text-sm font-medium tracking-[-0.03em] text-[#333333] text-center mb-[18px]">
        조언을 받고 싶은 소울프렌즈를 골라주세요
      </p>
      <div className="flex mb-3 gap-x-5">
        {SOUL_FRIENDS.map((item) => (
          <Icon
            className={cn(
              "text-xs",
              selected === item.name ? "text-[#333333]" : "text-[#c3c3c3]"
            )}
            key={item.name}
            icon={selected === item.name ? item.icon.on : item.icon.off}
            text={item.text}
            onChangeValue={() => setSelected(item.name)}
          />
        ))}
      </div>

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
