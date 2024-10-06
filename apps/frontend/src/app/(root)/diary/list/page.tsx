"use client"

import { Pagination } from "@/components/pagination"

import { DiaryListHeader } from "../../_component/diary-list/diary-list-header"
import { DiaryListItem } from "../../_component/diary-list/diary-list-item"

export default function DiaryListPage() {
  return (
    <div className="md:mb-10">
      <DiaryListHeader />
      <div className="flex flex-col items-center w-full p-5 gap-y-4 md:mb-[35px]">
        <DiaryListItem emotion="두려워" friend="포근이" />
        <DiaryListItem emotion="화나" friend="단짝이" />
        <DiaryListItem emotion="신나" friend="열정이" />
        <DiaryListItem emotion="설레" friend="차분이" />
      </div>

      <Pagination />
      <div className="w-full h-20 md:hidden" />
    </div>
  )
}
