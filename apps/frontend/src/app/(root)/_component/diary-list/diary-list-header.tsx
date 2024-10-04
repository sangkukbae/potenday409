import { useState } from "react"

import { cn } from "@/lib/utils"

export const DiaryListHeader = () => {
  const [sort, setSort] = useState("최신순")
  return (
    <header className="flex justify-between mt-[47px] px-[18px] mb-5">
      <h2 className="font-bold tracking-[-0.03em] text-black">내일기</h2>

      <ul className="flex items-center gap-x-4">
        {["최신순", "오래된순", "좋아요순"].map((item) => (
          <li
            className={cn(
              "relative font-medium text-sm tracking-[-0.03em] text-black cursor-pointer",
              sort === item ? "text-black" : "text-[#c3c3c3]",
              {
                "before:absolute before:top-1/2 before:block before:w-[1px] before:-translate-y-1/2 before:transform before:bg-[#d5d5d5] before:content-[''] before:left-[-8px] before:h-5":
                  item !== "최신순",
              }
            )}
            key={item}
            onClick={() => setSort(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </header>
  )
}
