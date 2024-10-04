import type { ReactNode } from "react"

import { TooltipProvider } from "@/components/ui/tooltip"

import { AlertProvider } from "./alert-provider"

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TooltipProvider>
      <AlertProvider />
      {children}
    </TooltipProvider>
  )
}
