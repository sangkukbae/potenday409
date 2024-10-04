import { AppHeader } from "@/components/app-header"
import { FriendsReply } from "../../_component/diary-detail/friends-reply"
import { MyDiary } from "../../_component/diary-detail/my-diary"
import { MyEmotion } from "../../_component/diary-detail/my-emotion"

export default function DiaryDetailPage() {
  return (
    <div className="flex flex-col items-center px-5 mb-[60px]">
      <AppHeader />
      <MyEmotion />
      <MyDiary />
      <FriendsReply />
    </div>
  )
}
