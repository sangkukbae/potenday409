import Image from "next/image"
import Link from "next/link"
import YoutubeIcon from "@/app/assets/icons/ico_youtube.svg"
import { cn } from "@/lib/utils"

type YoutubeButtonProps = {
  className?: string
  link: string
  value: string
}

export const YoutubeButton = ({
  className,
  link,
  value,
}: YoutubeButtonProps) => {
  return (
    <Link href={link} target="_blank">
      <div
        className={cn(
          "w-full p-[10px] rounded-[8px] bg-white border border-[#dddddd] flex items-center gap-x-3",
          className
        )}
      >
        <Image src={YoutubeIcon.src} width={24} height={16} alt="youtube" />
        <span className="leading-[150%] tracking-[-0.02em] text-[#333333]">
          {value}
        </span>
      </div>
    </Link>
  )
}
