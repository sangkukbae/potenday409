import { AppHeader } from "@/components/app-header"
import { FriendsReply } from "../../_component/diary-detail/friends-reply"
import { MyDiary } from "../../_component/diary-detail/my-diary"
import { MyEmotion } from "../../_component/diary-detail/my-emotion"
import { getDiaryList } from "@/actions/diary"
import { notFound } from "next/navigation"

export default async function DiaryDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const data = await getDiaryList({ sort: "recent", limit: 10 })

  if (!data) {
    return notFound()
  }

  const diary = data.find((diary) => {
    return diary.id === Number(params.id)
  })

  return (
    <div className="flex flex-col items-center px-5 mb-[60px]">
      <AppHeader diaryId={diary?.id || 0} date={diary?.create_dt ?? ""} />
      <MyEmotion emotion={diary?.emotion || ""} />
      <MyDiary title={diary?.title || ""} content={diary?.content || ""} />
      <FriendsReply
        character={diary?.character || ""}
        reply={diary?.reply_content || ""}
        youtubeUrl={diary?.music_url || ""}
        trackInfo={diary?.music_name || ""}
      />
    </div>
  )
}
