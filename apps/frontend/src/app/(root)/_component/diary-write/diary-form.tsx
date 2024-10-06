"use client"

import { BottomButton } from "@/components/bottom-button"
import { Loader2 } from "lucide-react"
import { addDiary } from "@/actions/diary"
import { useDiary } from "@/store/diary"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const DiaryForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { title, content, character, setTitle, setContent } = useDiary(
    (state) => state
  )

  const router = useRouter()
  return (
    <div className="relative w-full md:max-w-[500px] mx-auto">
      <form className="" action="">
        <input
          className="px-[30px] w-full h-10 border-t border-b placeholder:text-[#8d8d8d] outline-none"
          type="text"
          placeholder="하루의 제목을 적어주세요."
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="px-[30px] py-3 w-full h-auto outline-none resize-none"
          cols={30}
          rows={10}
          placeholder="오늘 기록하고 싶은 일기를 작성해 주세요."
          required
          maxLength={1000}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="w-full h-[82px]"></div>

        <BottomButton
          value={
            <div>
              {isLoading ? (
                <div className="flex items-center">
                  <span>감정을 분석하고 있어요...</span>{" "}
                  <Loader2 className="size-5 animate-spin" />
                </div>
              ) : (
                "답장받기"
              )}
            </div>
          }
          disabled={!title || !content}
          action={async () => {
            setIsLoading(true)
            const result = await addDiary({
              title,
              content,
              character,
            })
            if (result) {
              router.push(`/diary/${result.id}`)
            }
            setIsLoading(false)
          }}
        />
      </form>
    </div>
  )
}
