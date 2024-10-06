"use client"

import * as React from "react"

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { DayPicker, useDayRender } from "react-day-picker"
import { EMOTION_ICON, SOUL_FRIENDS_ICON } from "@/constants"

import { Diary } from "@/types"
import Image from "next/image"
import PlusOffIcon from "@/app/assets/icons/ico_plus_off.svg"
import PlusOnIcon from "@/app/assets/icons/ico_plus_on.svg"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { isSameDay } from "date-fns"
import { useRouter } from "next/navigation"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  items,
  type,
  ...props
}: CalendarProps & { items: Diary[]; type: "emotion" | "friends" }) {
  const router = useRouter()
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:transparent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="w-4 h-4" />,
        IconRight: () => <ChevronRightIcon className="w-4 h-4" />,
        Day: ({ date, displayMonth }) => {
          const buttonRef = React.useRef<HTMLButtonElement | null>(null)
          const renderProps = useDayRender(date, displayMonth, buttonRef)

          const { buttonProps, activeModifiers, selectedDays } = renderProps
          const { children, className } = buttonProps

          delete buttonProps.children
          delete buttonProps.className

          const { outside, disabled } = activeModifiers

          // const hasDiary = true

          const sameDay = items.find((item) => isSameDay(item.save_dt, date))

          return (
            <div className="flex flex-col items-center gap-y-[7px]">
              <button
                {...buttonProps}
                className={cn(
                  className,
                  "relative invisible",
                  outside ? "invisible" : "visible",
                  {
                    "border border-dashed": !disabled && !sameDay, //&& !hasDiary
                  }
                )}
                ref={buttonRef}
                type="button"
              >
                {type === "emotion" &&
                  sameDay &&
                  EMOTION_ICON[sameDay.emotion]?.({
                    className:
                      "absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 size-[40px]",
                    onClick: () => {
                      router.push(`/diary/${sameDay.id}`)
                    },
                  })}
                {type === "friends" &&
                  sameDay &&
                  SOUL_FRIENDS_ICON[sameDay.character]?.({
                    className:
                      "absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 size-[40px]",
                    onClick: () => {
                      router.push(`/diary/${sameDay.id}`)
                    },
                  })}
                {!sameDay &&
                  !disabled &&
                  isSameDay(date, selectedDays as Date) && (
                    <Image
                      className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      src={PlusOnIcon.src}
                      width={12}
                      height={12}
                      alt="plus on"
                    />
                  )}
                {!sameDay &&
                  !disabled &&
                  !isSameDay(date, selectedDays as Date) && (
                    <Image
                      className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      src={PlusOffIcon.src}
                      width={12}
                      height={12}
                      alt="plus off"
                    />
                  )}
              </button>

              <span
                className={cn(
                  "block text-xs text-[#8D8D8D] tracking-[-0.03em]",
                  {
                    "w-[26px] h-4 rounded-[66px] bg-black text-white":
                      selectedDays && isSameDay(date, selectedDays as Date),
                  },
                  outside ? "invisible" : "visible"
                )}
              >
                {children}
              </span>
            </div>
          )
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
