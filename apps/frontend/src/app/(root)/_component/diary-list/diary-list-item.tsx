"use client"

import { useRouter } from "next/navigation"
import { SOUL_FRIENDS_CARD_COLOR } from "@/constants"
import { Diary } from "@/types"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

import { convertKRDate } from "@/lib/utils"
// import { ButtonGroup } from "@/components/button-group"
import { EmotionFriendButton } from "@/components/emotion-friend-button"
import { YoutubeButton } from "@/components/youtube-button"

export const DiaryListItem = ({ item }: { item: Diary }) => {
  const color = SOUL_FRIENDS_CARD_COLOR[item.character]

  const router = useRouter()

  return (
    <div
      className="relative w-full max-w-[500px] rounded-[12px] bg-[#EBF8FD] p-5 md:px-6"
      style={{ backgroundColor: `${color}` }}
    >
      <div className="font-medium text-[12px] tracking-[-0.03em] text-[#8D8D8D] mb-4">
        {format(convertKRDate(item.create_dt), "yyyy. MM. dd EEEE", {
          locale: ko,
        })}
      </div>
      <h2
        className="font-semibold tracking-[-0.03em] text-[#333333] mb-4 cursor-pointer"
        onClick={() => router.push(`/diary/${item.id}`)}
      >
        {item.title}
      </h2>
      <YoutubeButton
        className="text-xs w-fit"
        link={item.music_url}
        value={item.music_name}
      />
      {/* <ButtonGroup
        className="absolute right-[36px] bottom-5 size-5 gap-x-2"
        size="sm"
        id={item.id}
        heart={item.heart}
      /> */}
      <EmotionFriendButton
        className="absolute top-4 right-4"
        type="card"
        emotion={item.emotion}
        friend={item.character}
      />
    </div>
  )
}
