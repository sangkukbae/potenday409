import { DiaryCalendar } from "../_component/diary/diary-calendar"
import { DiaryHeader } from "../_component/diary/diary-header"
import { getCalendarDiary } from "@/actions/diary"

export default async function DiaryPage({
  searchParams,
}: {
  searchParams: { year: string; month: string }
}) {
  const { year, month } = searchParams

  const defaultMonth = new Date().getMonth() + 1
  const defaultYear = new Date().getFullYear()

  const data = await getCalendarDiary({
    year: year || defaultYear.toString(),
    month: month || defaultMonth.toString(),
  })

  console.log("data:", JSON.stringify(data))

  return (
    <div className="pt-[60px] flex flex-col items-center">
      <DiaryHeader
        emotion={data?.mostEmotion || ""}
        friend={data?.mostCharacter || ""}
      />
      <DiaryCalendar items={data?.diaries || []} />
      <div className="w-full h-20 mt-[15px]"></div>
    </div>
  )
}
