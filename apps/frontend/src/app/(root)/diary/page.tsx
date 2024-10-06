import { DiaryCalendar } from "../_component/diary/diary-calendar"
import { DiaryHeader } from "../_component/diary/diary-header"

// import { getDiaryList } from "@/actions/diary"

export default async function DiaryPage() {
  // const diaryList = await getDiaryList({ year: 2024, month: 10 })
  // console.log("diaryList:", diaryList)
  // console.log("diaryList:", diaryList)

  return (
    <div className="pt-[60px] flex flex-col items-center">
      <DiaryHeader />
      <DiaryCalendar />
      <div className="w-full h-20 mt-[15px]"></div>
    </div>
  )
}
