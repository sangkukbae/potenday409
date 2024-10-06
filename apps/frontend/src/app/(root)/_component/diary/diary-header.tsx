"use client"

import { useMonth } from "@/store/calendar"
import { addMonths, format } from "date-fns"

import { useUpdateSearchParams } from "@/hooks/use-update-search-params"
import { Icons } from "@/components/ui/icons"
import { EmotionFriendButton } from "@/components/emotion-friend-button"

export const DiaryHeader = ({
  emotion,
  friend,
}: {
  emotion: string
  friend: string
}) => {
  const { month, setMonth } = useMonth((state) => state)

  const { updateSearchParams } = useUpdateSearchParams()

  return (
    <header className="flex flex-col items-center mb-[18px]">
      <div className="flex items-center gap-x-[6px] h-[21px] mb-[25px]">
        <Icons.chevronLeft
          className="cursor-pointer"
          onClick={() => {
            setMonth(addMonths(month, -1))
            updateSearchParams({
              year: new Date().getFullYear(),
              month: format(addMonths(month, -1), "MM"),
            })
          }}
        />
        <span className="font-bold text-lg tracking-[-0.03em]">
          {format(month, "yyyy.MM")}
        </span>
        <Icons.chevronRight
          className="cursor-pointer"
          onClick={() => {
            setMonth(addMonths(month, 1))
            updateSearchParams({
              year: new Date().getFullYear(),
              month: format(addMonths(month, -1), "MM"),
            })
          }}
        />
        {/* <Icons.calendar className="cursor-pointer" /> */}
      </div>
      <div className="font-medium text-sm tracking-[-0.03em] mb-[14px]">
        이번 달 소울프렌즈
      </div>

      {!emotion && !friend ? (
        <EmptyDiary />
      ) : (
        <EmotionFriendButton
          className="mb-[18px]"
          type="diary"
          emotion={emotion}
          friend={friend}
        />
      )}
    </header>
  )
}

const EmptyDiary = () => {
  return (
    <div className="flex flex-col items-center gap-y-3">
      <div className="flex gap-x-[18px] items-center">
        <div className="size-10 rounded-full bg-[#F4F4F4]" />
        <Icons.heart />
        <div className="size-10 rounded-full bg-[#F4F4F4]" />
      </div>
      <p className="text-xs text-[#8D8D8D] tracking-[-0.03em]">
        소울프렌즈에게 나의 이야기를 들려주세요
      </p>
    </div>
  )
}
