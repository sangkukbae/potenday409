"use server"

import { Diary } from "@/types"
import qs from "query-string"

import { fetchData } from "."

interface CalendarDiary {
  diaries: Diary[]
  mostCharacter: string
  mostEmotion: string
}

export const getCalendarDiary = async ({
  year,
  month,
}: {
  year: string
  month: string
}): Promise<CalendarDiary | null> => {
  try {
    const data = await fetchData<CalendarDiary>(
      `/diary/multiple?${qs.stringify({ year, month })}`
    )
    return data
  } catch (error) {
    console.error(`Error getting calendar diary: ${error}`)
    return null
  }
}

export const addDiary = async ({
  title,
  character,
  content,
}: {
  title: string
  character: string
  content: string
}) => {
  try {
    const data = await fetchData<Diary>("/diary", {
      method: "POST",
      body: {
        title,
        character,
        content,
      },
    })

    return data
  } catch (error) {
    console.error(`Error adding diary: ${error}`)
  }
}

export const getDiaryList = async ({
  sort = "recent",
  limit = 10,
}: {
  sort: "recent" | "heart"
  limit: number
}): Promise<Diary[] | null> => {
  try {
    const data = await fetchData<Diary[]>(
      `/diary?${qs.stringify({ sort, limit })}`
    )
    return data
  } catch (error) {
    console.error(`Error getting diary list: ${error}`)
    return null
  }
}

export const updateLike = async ({
  diaryId,
  isLike,
}: {
  diaryId: number
  isLike: number
}) => {
  try {
    const data = await fetchData(
      `/diary/${diaryId}/update-heart?${qs.stringify({ heart: isLike })}`,
      {
        method: "PATCH",
      }
    )

    return data
  } catch (error) {
    console.error(`Error updating like: ${error}`)
    return null
  }
}

export const removeDiary = async (diaryId: number) => {
  try {
    const data = await fetchData(`/diary/${diaryId}`, {
      method: "DELETE",
    })

    return data
  } catch (error) {
    console.error(`Error removing diary: ${error}`)
    return null
  }
}
