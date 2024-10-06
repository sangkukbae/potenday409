import { clsx, type ClassValue } from "clsx"
import { format, isValid, parseISO } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import { ko } from "date-fns/locale"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatKRDate = (
  dateString: string,
  timeZone: string = "Asia/Seoul"
): string => {
  const parsedDate = parseISO(dateString)
  if (!isValid(parsedDate)) {
    console.error("Invalid date string provided:", dateString)
    return ""
  }
  const zonedDate = toZonedTime(parsedDate, timeZone)
  return format(zonedDate, "M월 d일 EEEE", { locale: ko })
}
