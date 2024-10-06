import { EMOTION_ICON, SOUL_FRIENDS_ICON } from "@/constants"

import { cn } from "@/lib/utils"

import { Icons } from "./ui/icons"

// import { EmotionType, FriendType } from "@/types"

type EmotionFriendButtonProps = {
  type: "diary" | "card"
  className?: string
  emotion: string //EmotionType
  friend: string //FriendType
}

export const EmotionFriendButton = ({
  type,
  className,
  emotion = "happy",
  friend = "cozy",
}: EmotionFriendButtonProps) => {
  return (
    <div
      className={cn(
        "flex items-center",
        type === "diary" ? "gap-x-[18px]" : "gap-x-[12px]",
        className
      )}
    >
      <div className="relative text-center">
        {EMOTION_ICON[emotion]({
          className: cn(
            "mb-[6px]",
            type === "diary" ? "size-10" : "size-[28px]"
          ),
        })}
        {type === "diary" && (
          <div className="absolute w-[35px] left-1/2 -translate-x-1/2 font-medium text-xs tracking-[-0.03em] text-[#8d8d8d]">
            {emotion}
          </div>
        )}
      </div>
      <Icons.heart />
      <div className="relative text-center">
        {SOUL_FRIENDS_ICON[friend]({
          className: cn(
            "mb-[6px]",
            type === "diary" ? "size-10" : "size-[28px]"
          ),
        })}
        {type === "diary" && (
          <div className="absolute w-[35px] left-1/2 -translate-x-1/2 font-medium text-xs tracking-[-0.03em] text-[#8d8d8d]">
            {friend}
          </div>
        )}
      </div>
    </div>
  )
}
