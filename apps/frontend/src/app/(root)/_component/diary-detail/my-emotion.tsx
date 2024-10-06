import { Icons } from "@/components/ui/icons"

export const MyEmotion = ({ emotion }: { emotion: string }) => {
  const emotionIcon: Record<string, React.ReactNode> = {
    두려워: <Icons.afraid className="size-[44px]" />,
    화나: <Icons.angry className="size-[44px]" />,
    평범해: <Icons.common className="size-[44px]" />,
    신나: <Icons.excited className="size-[44px]" />,
    설레: <Icons.flutter className="size-[44px]" />,
    즐거워: <Icons.fun className="size-[44px]" />,
    기뻐: <Icons.good className="size-[44px]" />,
    행복해: <Icons.happy className="size-[44px]" />,
    슬퍼: <Icons.sad className="size-[44px]" />,
    놀라워: <Icons.surprising className="size-[44px]" />,
    피곤해: <Icons.tired className="size-[44px]" />,
    불쾌해: <Icons.unpleasant className="size-[44px]" />,
  }

  return (
    <div className="pt-[30px] pb-[57px] flex flex-col gap-y-2 items-center">
      {emotionIcon[emotion]}
      <p className="text-sm tracking-[-0.02em] text-[#8D8D8D]">{emotion}</p>
    </div>
  )
}
