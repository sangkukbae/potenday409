import { AppHeader } from "@/components/app-header"
import { FriendsReply } from "../../_component/diary-detail/friends-reply"
import { MyDiary } from "../../_component/diary-detail/my-diary"
import { MyEmotion } from "../../_component/diary-detail/my-emotion"
import { getDiary } from "@/actions/diary"
import { getUserInfo } from "@/actions/user"
import { notFound } from "next/navigation"

export default async function DiaryDetailPage({
  params,
}: {
  params: { id: string }
}) {
  if (!params.id) {
    return notFound()
  }

  const [diary, userInfo] = await Promise.all([
    getDiary(Number(params.id)),
    getUserInfo(),
  ])

  if (!diary && !userInfo) {
    return notFound()
  }

  return (
    <div className="flex flex-col items-center px-5 mb-[60px]">
      <AppHeader
        diaryId={diary?.id || 0}
        date={diary?.save_dt ?? ""}
        heart={diary?.heart ?? 0}
      />
      <MyEmotion emotion={diary?.emotion || ""} />
      <MyDiary title={diary?.title || ""} content={diary?.content || ""} />
      <FriendsReply
        character={diary?.character || ""}
        reply={diary?.reply_content || ""}
        youtubeUrl={diary?.music_url || ""}
        trackInfo={diary?.music_name || ""}
        nickname={userInfo?.user_name || ""}
      />
    </div>
  )
}
