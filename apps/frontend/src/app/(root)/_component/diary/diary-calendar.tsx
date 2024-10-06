"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Calendar } from "@/components/ui/calendar"
import { ko } from "date-fns/locale"
import { useDiary } from "@/store/diary"
import { useMonth } from "@/store/calendar"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const DiaryCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { setDate: setDateStore } = useDiary((state) => state)

  const router = useRouter()
  const { month } = useMonth((state) => state)

  return (
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
              setDateStore(val)
            }
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          locale={ko}
          month={month}
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
          month={month}
        />
      </TabsContent>
    </Tabs>
  )
}
