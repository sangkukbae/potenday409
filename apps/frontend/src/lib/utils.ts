import { clsx, type ClassValue } from "clsx"
import { isValid, parseISO } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertKRDate = (
  dateString: string,
  timeZone: string = "Asia/Seoul"
): Date => {
  const parsedDate = parseISO(dateString)
  if (!isValid(parsedDate)) {
    console.error("Invalid date string provided:", dateString)
    return new Date()
  }
  const zonedDate = toZonedTime(parsedDate, timeZone)
  // return format(zonedDate, "M월 d일 EEEE", { locale: ko })
  return zonedDate
}

export function absoluteUrl(pathname: string, origin: string): string {
  return new URL(pathname, origin).toString()
}

export function generateRandomString(length: number): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}
