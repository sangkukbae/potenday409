"use client"

import { COOKIE_KEY } from "@/constants"
import Cookies from "js-cookie"
import { useAuth } from "@/store/auth"
import { useEffect } from "react"

export function NavigationEvents() {
  const setToken = useAuth((state) => state.setToken)

  useEffect(() => {
    const checkCookie = () => {
      const accessToken = Cookies.get(COOKIE_KEY.ACCESS_TOKEN)
      setToken(accessToken || "")
    }

    // Check immediately
    checkCookie()

    // Set up an interval to check regularly
    const intervalId = setInterval(checkCookie, 30000) // Check every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId)
  })

  return null
}
