"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Calendar } from "@/components/ui/calendar"
import { EmotionFriendButton } from "@/components/emotion-friend-button"
import { Icons } from "@/components/ui/icons"
import { ko } from "date-fns/locale"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DiaryPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const router = useRouter()

  const noData = false
  return (
    <div className="pt-[60px] flex flex-col items-center">
      <header className="flex flex-col items-center mb-[18px]">
        <div className="flex items-center gap-x-[6px] h-[21px] mb-[25px]">
          <span className="font-bold text-lg tracking-[-0.03em]">2024.10</span>
          <Icons.calendar className="cursor-pointer" />
        </div>
        <div className="font-medium text-sm tracking-[-0.03em] mb-[14px]">
          이번 달 소울프렌즈
        </div>

        {noData ? (
          <EmptyDiary />
        ) : (
          <EmotionFriendButton className="mb-[18px]" type="diary" />
        )}
      </header>

      <div className="">
        <Tabs className="" defaultValue="emotion">
          <TabsList className="w-[312px] h-8 rounded-[8px] bg-[#eaeaea]">
            <TabsTrigger
              className="w-[153px] h-[26px] rounded-[6px] text-[#878787] aria-selected:text-[#333333]"
              value="emotion"
            >
              감정
            </TabsTrigger>
            <TabsTrigger
              className="w-[153px] h-[25px] rounded-[6px] text-[#878787] aria-selected:text-[#333333]"
              value="friends"
            >
              소울프렌즈
            </TabsTrigger>
          </TabsList>
          <TabsContent value="emotion">
            <Calendar
              className="w-[316px] h-[370px] rounded-md p-0"
              classNames={{
                months: "justify-between",
                caption: "hidden",
                head_row: "flex justify-between mb-[11px]",
                head_cell:
                  "w-[34px] h-[14px] font-medium text-xs text-[#8d8d8d] tacking-[-0.03]",
                row: "flex justify-between gap-x-[13px] mb-[15px]",
                day: "size-[34px] rounded-full",
                day_today: "bg-white",
                day_selected: "bg-none border-black",
                day_disabled: "size-[34px] rounded-full bg-[#F4F4F4]",
              }}
              mode="single"
              selected={date}
              onSelect={(val) => {
                if (val === undefined) {
                  router.push("/diary/write")
                } else {
                  setDate(val)
                }
              }}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              locale={ko}
            />
          </TabsContent>
          <TabsContent value="friends">
            <Calendar
              className="w-[316px] h-[370px] rounded-md p-0"
              classNames={{
                months: "justify-between",
                caption: "hidden",
                head_row: "flex justify-between mb-[11px]",
                head_cell:
                  "w-[34px] h-[14px] font-medium text-xs text-[#8d8d8d] tacking-[-0.03]",
                row: "flex justify-between gap-x-[13px] mb-[15px]",
                day: "size-[34px] rounded-full",
                day_today: "bg-white",
                day_selected: "bg-none border-black",
                day_disabled: "size-[34px] rounded-full bg-[#F4F4F4]",
              }}
              mode="single"
              selected={date}
              onSelect={(val) => {
                if (val === undefined) {
                  router.push("/diary/write")
                } else {
                  setDate(val)
                }
              }}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              locale={ko}
            />
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full h-20 mt-[15px]"></div>
    </div>
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
