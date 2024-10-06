import { notFound } from "next/navigation"
import { getDiaryList } from "@/actions/diary"

import { DiaryListHeader } from "../../_component/diary-list/diary-list-header"
import { DiaryListItem } from "../../_component/diary-list/diary-list-item"

// import { Pagination } from "@/components/pagination"

export default async function DiaryListPage() {
  const data = await getDiaryList({ sort: "recent", limit: 10, page: 1 })
  console.log("data:", data)

  if (!data) {
    return notFound()
  }

  return (
    <div className="md:mb-10">
      <DiaryListHeader />
      <div className="flex flex-col items-center w-full p-5 gap-y-4 md:mb-[35px]">
        {data?.diaries.map((item) => (
          <DiaryListItem key={item.id} item={item} />
        ))}
      </div>
      {/* <Pagination /> */}
      <div className="w-full h-20 md:hidden" />
    </div>
  )
}
