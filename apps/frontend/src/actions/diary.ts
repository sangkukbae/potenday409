"use server"

import { Diary } from "@/types"
import { fetchData } from "."
import qs from "query-string"

// export const getDiaryList = async ({
//   year,
//   month,
// }: {
//   year: number
//   month: number
// }) => await fetchData(`/diary/multiple?${qs.stringify({ year, month })}`)

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
