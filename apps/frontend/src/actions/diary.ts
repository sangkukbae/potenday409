"use server"

import { Diary } from "@/types"
import { fetchData } from "."
import qs from "query-string"
import { revalidatePath } from "next/cache"

interface CalendarDiary {
  diaries: Diary[]
  mostCharacter: string
  mostEmotion: string
}

interface DiaryList {
  diaries: Diary[]
  page: number
  totalPage: number
  totalCount: number
}

interface AddDiary {
  title: string
  character: string
  content: string
  year: number
  month: number
  day: number
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

export const getDiaryList = async ({
  sort = "recent",
  limit = 10,
  page = 1,
}: {
  sort: "recent" | "heart"
  limit: number
  page: number
}): Promise<DiaryList | null> => {
  try {
    const data = await fetchData<DiaryList>(
      `/diary?${qs.stringify({ sort, limit, page })}`
    )
    return data
  } catch (error) {
    console.error(`Error getting diary list: ${error}`)
    return null
  }
}

export const getDiary = async (diaryId: number): Promise<Diary | null> => {
  try {
    const data = await fetchData<Diary>(`/diary/${diaryId}`)
    return data
  } catch (error) {
    console.error(`Error getting diary: ${error}`)
    return null
  }
}

export const addDiary = async (params: AddDiary) => {
  try {
    const data = await fetchData<Diary>("/diary", {
      method: "POST",
      body: params,
    })

    return data
  } catch (error) {
    console.error(`Error adding diary: ${error}`)
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

    revalidatePath(`/diary/${diaryId}`)
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
