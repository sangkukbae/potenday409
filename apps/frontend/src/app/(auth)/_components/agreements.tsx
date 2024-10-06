"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from "react"

import { Icons } from "@/components/ui/icons"
import { PrivacyPolicy } from "@/components/privacy-policy"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TermsAndService } from "@/components/terms-condition"
import { useAgreements } from "@/store/nickname"

export const Agreements = () => {
  const [checkedAll, setCheckedAll] = useState(false)
  const [terms, setTerms] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const { setAgreedAll } = useAgreements()

  // Effect to synchronize "Select All" with individual checkboxes
  useEffect(() => {
    if (terms && privacy && marketing) {
      setCheckedAll(true)
      setAgreedAll(true)
    } else {
      setCheckedAll(false)
    }
  }, [terms, privacy, marketing, setAgreedAll])

  // Handler for "Select All" checkbox
  const handleCheckAll = () => {
    const newCheckedState = !checkedAll
    setCheckedAll(newCheckedState)
    setTerms(newCheckedState)
    setPrivacy(newCheckedState)
    setMarketing(newCheckedState)
  }

  return (
    <div className="w-full h-auto rounded-[12px] bg-[#F7F7F8] p-[18px] mb-6">
      <div
        className="flex items-center mb-4 cursor-pointer gap-x-2"
        onClick={handleCheckAll}
      >
        {checkedAll ? <Icons.checkCircleOn /> : <Icons.checkCircleOff />}
        <span className="font-semibold text-lg tracking-[-0.03em] text-black">
          전체 동의
        </span>
      </div>

      <Accordion className="w-full mb-3 space-y-3" type="single" collapsible>
        {/* 서비스 이용 약관 */}
        <AccordionItem className="pl-[10px] border-none" value="service">
          <div
            className="flex items-center cursor-pointer gap-x-2"
            onClick={() => setTerms(!terms)}
          >
            {terms ? <Icons.checkOn /> : <Icons.checkOff />}
            <AccordionTrigger className="h-[18px] p-0">
              <span className="text-xs tracking-[-0.03em] text-black underline underline-offset-2">
                서비스 이용 약관 [필수]
              </span>
            </AccordionTrigger>
          </div>
          <AccordionContent>
            <ScrollArea className="w-full h-[148px]">
              <TermsAndService />
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>

        {/* 개인정보 처리방침 */}
        <AccordionItem className="pl-[10px] border-none" value="privacy">
          <div
            className="flex items-center cursor-pointer gap-x-2"
            onClick={() => setPrivacy(!privacy)}
          >
            {privacy ? <Icons.checkOn /> : <Icons.checkOff />}
            <AccordionTrigger className="h-[18px] p-0">
              <span className="text-xs tracking-[-0.03em] text-black underline underline-offset-2">
                개인정보 처리방침 [필수]
              </span>
            </AccordionTrigger>
          </div>
          <AccordionContent>
            <ScrollArea className="w-full h-[148px]">
              <PrivacyPolicy />
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* 마케팅 이용 동의 */}
      <div
        className="pl-[10px] flex items-center cursor-pointer gap-x-2"
        onClick={() => setMarketing(!marketing)}
      >
        {marketing ? <Icons.checkOn /> : <Icons.checkOff />}
        <span className="text-xs tracking-[-0.03em] text-black underline underline-offset-2">
          소울프렌즈의 광고와 마케팅 메세지를 <br className="md:hidden" />{" "}
          카카오톡으로 받습니다 [선택]
        </span>
      </div>
    </div>
  )
}
