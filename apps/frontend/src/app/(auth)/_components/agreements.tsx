"use client"

import { useEffect, useState } from "react"

import { Icons } from "@/components/ui/icons"

export const Agreements = () => {
  const [checkedAll, setCheckedAll] = useState(false)
  const [terms, setTerms] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [marketing, setMarketing] = useState(false)

  // Effect to synchronize "Select All" with individual checkboxes
  useEffect(() => {
    if (terms && privacy && marketing) {
      setCheckedAll(true)
    } else {
      setCheckedAll(false)
    }
  }, [terms, privacy, marketing])

  // Handler for "Select All" checkbox
  const handleCheckAll = () => {
    const newCheckedState = !checkedAll
    setCheckedAll(newCheckedState)
    setTerms(newCheckedState)
    setPrivacy(newCheckedState)
    setMarketing(newCheckedState)
  }

  return (
    <div className="w-full h-auto rounded-[12px] bg-[#F7F7F8] p-[18px]">
      <div
        className="flex items-center mb-4 cursor-pointer gap-x-2"
        onClick={handleCheckAll}
      >
        {checkedAll ? <Icons.checkCircleOn /> : <Icons.checkCircleOff />}
        <span className="font-semibold text-lg tracking-[-0.03em] text-black">
          전체 동의
        </span>
      </div>

      <div className="pl-[10px] space-y-3">
        {/* Terms Agreement */}
        <div
          className="flex items-center cursor-pointer gap-x-2"
          onClick={() => setTerms(!terms)}
        >
          {terms ? <Icons.checkOn /> : <Icons.checkOff />}
          <span className="text-xs tracking-[-0.03em] text-black underline underline-offset-2">
            서비스 이용 약관 [필수]
          </span>
        </div>

        {/* Privacy Agreement */}
        <div
          className="flex items-center cursor-pointer gap-x-2"
          onClick={() => setPrivacy(!privacy)}
        >
          {privacy ? <Icons.checkOn /> : <Icons.checkOff />}
          <span className="text-xs tracking-[-0.03em] text-black underline underline-offset-2">
            개인정보 처리방침 [필수]
          </span>
        </div>

        {/* Marketing Agreement */}
        <div
          className="flex items-center cursor-pointer gap-x-2"
          onClick={() => setMarketing(!marketing)}
        >
          {marketing ? <Icons.checkOn /> : <Icons.checkOff />}
          <span className="text-xs tracking-[-0.03em] text-black underline underline-offset-2">
            소울프렌즈의 광고와 마케팅 메세지를 <br className="md:hidden" />{" "}
            카카오톡으로 받습니다 [선택]
          </span>
        </div>
      </div>
    </div>
  )
}
