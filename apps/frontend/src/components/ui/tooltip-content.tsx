import {
  TooltipContent as DefaultTooltipContent,
  TooltipArrow,
} from "@/components/ui/tooltip"

export const TooltipContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <DefaultTooltipContent
      className="px-3 py-[6px] rounded-full"
      sideOffset={6}
    >
      <TooltipArrow width={12} height={6} />
      {children}
    </DefaultTooltipContent>
  )
}
