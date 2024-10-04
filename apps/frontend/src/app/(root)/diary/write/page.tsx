import { DiaryForm } from "../../_component/diary-write/diary-form"
import { DiaryWriteHeader } from "../../_component/diary-write/diary-write-header"
import { SelectFriends } from "../../_component/diary-write/select-friends"

export default function DiaryWritePage() {
  return (
    <div className="">
      <DiaryWriteHeader />
      <SelectFriends />
      <DiaryForm />
    </div>
  )
}
