import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { generateRandomString } from "@/lib/utils"

type ParamValue = string | number | boolean | null | undefined
type ParamObject = Record<string, ParamValue>
type NavigationOption = { scroll?: boolean }

export const useUpdateSearchParams = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const updateSearchParams = (
    param: ParamObject,
    options: NavigationOption = {}
  ) => {
    const urlParams = new URLSearchParams(searchParams.toString())

    Object.entries(param).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        urlParams.delete(key)
      } else {
        urlParams.set(key, String(value))
      }
    })

    if (urlParams.toString() !== searchParams.toString()) {
      urlParams.set("r", generateRandomString(5)) // Add random string to prevent caching
      router.replace(`${pathname}?${urlParams.toString()}`, {
        scroll: options.scroll ?? false,
      })
    }
  }

  return {
    updateSearchParams,
  }
}
