import Image from "next/image"
import YoutubeIcon from "@/app/assets/icons/ico_youtube.svg"
import { cn } from "@/lib/utils"

export const YoutubeButton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full p-[10px] rounded-[8px] bg-white border border-[#dddddd] flex items-center gap-x-3",
        className
      )}
    >
      <Image src={YoutubeIcon.src} width={24} height={16} alt="youtube" />
      <span className="leading-[150%] tracking-[-0.02em] text-[#333333]">
        NewJeans - Bubble Gum
      </span>
    </div>
  )
}