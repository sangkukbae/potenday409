"use client"

import { Pagination } from "@/components/pagination"

import { DiaryListHeader } from "../_component/diary-list/diary-list-header"
import { DiaryListItem } from "../_component/diary-list/diary-list-item"

export default function DiaryListPage() {
  return (
    <div className="md:mb-10">
      <DiaryListHeader />
      <div className="flex flex-col items-center w-full p-5 gap-y-4 md:mb-[35px]">
        <DiaryListItem emotion="afraid" friend="cozy" />
        <DiaryListItem emotion="happy" friend="bestFriend" />
        <DiaryListItem emotion="excited" friend="passion" />
        <DiaryListItem emotion="flutter" friend="calm" />
      </div>

      <Pagination />
      <div className="w-full h-20 md:hidden" />
    </div>
  )
}
