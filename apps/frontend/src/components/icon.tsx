import { cn } from "@/lib/utils"

type IconProps = {
  className: string
  icon: React.ReactNode
  text: string
  onChangeValue?: () => void
}

export const Icon = ({ className, icon, text, onChangeValue }: IconProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-y-[6px] cursor-pointer",
        className
      )}
      onClick={onChangeValue}
    >
      {icon}
      <span className="font-semibold tracking-[-0.03em]">{text}</span>
    </div>
  )
}
