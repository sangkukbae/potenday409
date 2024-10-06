"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { SOUL_FRIENDS_CARD_COLOR } from "@/constants"
import { EmotionType, FriendType } from "@/types"

import { ButtonGroup } from "@/components/button-group"
import { EmotionFriendButton } from "@/components/emotion-friend-button"
import { YoutubeButton } from "@/components/youtube-button"

export const DiaryListItem = ({
  emotion,
  friend,
}: {
  emotion: EmotionType
  friend: FriendType
}) => {
  const color = SOUL_FRIENDS_CARD_COLOR[friend]

  const router = useRouter()

  return (
    <div
      className="relative w-full max-w-[500px] rounded-[12px] bg-[#EBF8FD] p-5 md:px-6"
      style={{ backgroundColor: `${color}` }}
    >
      <div className="font-medium text-[12px] tracking-[-0.03em] text-[#8D8D8D] mb-4">
        2024. 10. 3 수요일
      </div>
      <h2
        className="font-semibold tracking-[-0.03em] text-[#333333] mb-4 cursor-pointer"
        onClick={() => router.push("/diary/1")}
      >
        일기 제목 영역
      </h2>
      <Link
        className="inline-block"
        href="https://www.youtube.com/watch?v=ft70sAYrFyY&ab_channel=HYBELABELS"
        target="_blank"
      >
        <YoutubeButton className="text-xs w-fit" />
      </Link>
      <ButtonGroup
        className="absolute right-[36px] bottom-5 size-5 gap-x-2"
        size="sm"
      />
      <EmotionFriendButton
        className="absolute top-4 right-4"
        type="card"
        emotion={emotion}
        friend={friend}
      />
    </div>
  )
}
