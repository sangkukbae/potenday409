import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col p-5 ">
      <Link href="/diary">홈</Link>
      <Link href="/diary/write">일기 작성</Link>
      <Link href="/diary/1">일기 답장</Link>
      <Link href="/diary/list">일기 목록</Link>
    </div>
  )
}
