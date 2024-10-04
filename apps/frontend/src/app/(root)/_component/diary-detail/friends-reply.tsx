import { Icons } from "@/components/ui/icons"
import Image from "next/image"

export const FriendsReply = () => {
  const isLoading = false
  return <>{isLoading ? <ReplyLoading /> : <Reply />}</>
}

const Reply = () => {
  return (
    <div className="w-full max-w-[500px] h-auto rounded-tl-[20px] rounded-bl-[20px] rounded-br-[20px] bg-[#D5E5F4] flex flex-col justify-center items-center px-5 py-10">
      <Icons.cozyS className="size-[66px] mb-5" />
      <h2 className="mb-5 font-semibold tracking-[-0.03em]">
        <strong className="text-[#2D88FF] ">소울님</strong>을 위한 포근이의 답장
      </h2>
      <p className="leaing-[180%] tracking-[-0.02em] text-[#333333] mb-5">
        아침부터 산책이라니! 진짜 멋지다! 친구랑 커피 마신 것도 좋았겠다. ☕️
        도서관에서 새로운 책 발견한 것도 대박! 어떤 책인지 궁금해! 읽고 싶었던
        책 목록이 늘어나는 거, 나도 항상 그런다니까! 평범한 일상이지만 그런
        순간들이 진짜 소중한 것 같아. 앞으로도 이렇게 하루하루 소중히 즐겨 보자!
        💖
      </p>

      <p className="text-left w-full leaing-[180%] tracking-[-0.02em] text-[#333333] mb-3">
        🎵오늘 하루는 이 노래로 마무리 어때?
      </p>

      <div className="w-full p-[10px] rounded-[8px] bg-white border border-[#dddddd] flex items-center gap-x-3 ">
        <Image src="/images/youtube.png" width={24} height={16} alt="youtube" />
        <span className="text-sm leading-[150%] tracking-[-0.02em] text-[#333333]">
          NewJeans - Bubble Gum
        </span>
      </div>
    </div>
  )
}

const ReplyLoading = () => {
  return (
    <div className="min-w-[320px] w-full h-[202px] rounded-tl-[20px] rounded-bl-[20px] rounded-br-[20px] bg-[#f4f4f4] flex flex-col justify-center items-center">
      <Icons.cozyS className="size-[66px] mb-5" />
      <p className="text-sm text-center font-medium tracking-[-0.02em] text-[#333333]">
        포근이가 정성껏 답장을 쓰고 있어요
        <br />
        잠시만 기다려주세요
      </p>
    </div>
  )
}
