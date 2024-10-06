"use server"

import { COOKIE_KEY } from "@/constants"
import { cookies } from "next/headers"

export async function fetchData<T>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<string, any> = {}
): Promise<T> {
  const accessToken =
    options?.token ?? cookies().get(COOKIE_KEY.ACCESS_TOKEN)?.value

  const fetchOptions: RequestInit & {
    refetch?: boolean
    token?: string
    refreshToken?: string
  } = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    },
    ...options,
    ...(options.body && { body: JSON.stringify(options.body) }),
  }

  if (options.refetch) {
    delete fetchOptions.refetch
    delete fetchOptions.token
    delete fetchOptions.refreshToken
  }

  try {
    const response = await fetch(
      `https://soulfriends.site/api/v1${url}`,
      fetchOptions
    )

    const data = await response.json()

    if (
      data.statusCode === 401 &&
      data.message === "Unauthorized" &&
      !options.refetch
    ) {
      const refreshTokenValue = cookies().get(COOKIE_KEY.REFRESH_TOKEN)?.value

      if (!refreshTokenValue) {
        throw new Error("Refresh token not found")
      }
      const result = await updateToken(refreshTokenValue)

      if (result && "message" in result && "statusCode" in result) {
        console.error(
          `Error refreshing token: ${result.message}: statusCode: ${result.statusCode}`
        )
      }

      if (!result) {
        throw new Error("Error refreshing token", result)
      }

      return fetchData<T>(url, {
        ...options,
        refetch: true,
        token: result.accessToken,
        refreshToken: result.refreshToken,
      })
    }

    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`${error.message}`)
  }
}

export async function updateToken(refreshToken: string): Promise<
  { accessToken: string; refreshToken: string } | undefined
  // | { message: string; error: string; statusCode: number }
> {
  try {
    const response = await fetch(
      `https://soulfriends.site/api/v1/user/token-refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    )

    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
    return undefined
  }
}
