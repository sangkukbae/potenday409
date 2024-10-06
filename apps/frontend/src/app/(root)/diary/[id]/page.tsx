import { notFound } from "next/navigation"
import { getDiary } from "@/actions/diary"

import { AppHeader } from "@/components/app-header"

import { FriendsReply } from "../../_component/diary-detail/friends-reply"
import { MyDiary } from "../../_component/diary-detail/my-diary"
import { MyEmotion } from "../../_component/diary-detail/my-emotion"

export default async function DiaryDetailPage({
  params,
}: {
  params: { id: string }
}) {
  if (!params.id) {
    return notFound()
  }

  const diary = await getDiary(Number(params.id))

  if (!diary) {
    return notFound()
  }

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
