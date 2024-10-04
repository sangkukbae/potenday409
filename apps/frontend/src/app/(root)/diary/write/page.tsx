import { DiaryForm } from "../../_component/diary-write/diary-form"
import { SelectFriends } from "../../_component/diary-write/select-friends"
import { SubHeader } from "@/components/sub-header"

export default function DiaryWritePage() {
  return (
    <div className="">
      <SubHeader />
      <SelectFriends />
      <DiaryForm />
    </div>
  )
}
