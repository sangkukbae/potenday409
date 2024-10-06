"use client"

import { useDiary } from "@/store/diary"
import { useEffect } from "react"

type MyDiaryProps = {
  title: string
  content: string
}

export const MyDiary = ({ title, content }: MyDiaryProps) => {
  const { setTitle, setContent } = useDiary((state) => state)

  useEffect(() => {
    setTitle(title)
    setContent(content)
  }, [title, content, setTitle, setContent])

  return (
    <div className="w-full max-w-[500px] p-5 md:px-[30px] md:py-6 border rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] border-[#dddddd] mb-6">
      <h2 className="font-semibold tracking-[-0.03em] text-[#333333] mb-[22px]">
        {title}
      </h2>
      <p className="leading-[150%] tracking-[-0.02em]">{content}</p>
    </div>
  )
}
