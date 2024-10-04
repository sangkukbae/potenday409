import { BottomButton } from "@/components/bottom-button"
import { Button } from "@/components/ui/button"

export const DiaryForm = () => {
  return (
    <div className="relative w-full">
      <form className="" action="">
        <input
          className="px-[30px] w-full h-10 border-t border-b placeholder:text-[#8d8d8d] outline-none"
          type="text"
          placeholder="하루의 제목을 적어주세요."
          required
        />
        <textarea
          className="px-[30px] py-3 w-full h-auto outline-none resize-none"
          cols={30}
          rows={10}
          placeholder="오늘 기록하고 싶은 일기를 작성해 주세요."
          required
          maxLength={1000}
        ></textarea>
        <div className="w-full h-[82px]"></div>

        <BottomButton value="답장받기" />
      </form>
    </div>
  )
}
