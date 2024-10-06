"use server"

import { revalidatePath } from "next/cache"
import { UserInfo } from "@/types"

import { fetchData } from "./index"

export const getUserInfo = async () => await fetchData<UserInfo>("/user/info")

export const checkExistedNickname = async (nickname: string) => {
  return fetchData<boolean>(`/user/check-nickname/${nickname}`, {})
}

export const updateNickname = async (nickname: string) => {
  try {
    await fetchData("/user/nickname", {
      method: "PUT",
      body: { username: nickname },
    })

    revalidatePath("/mypage")
  } catch (error) {
    console.error(`Error updating nickname: ${error}`)
  }
}
