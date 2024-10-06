"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import OnBoardingImg01 from "@/app/assets/images/on_boarding_01.svg"
import OnBoardingImg02 from "@/app/assets/images/on_boarding_02.svg"
import OnBoardingImg03 from "@/app/assets/images/on_boarding_03.svg"

import { Icons } from "./ui/icons"

export const OnBoardingSlider = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="grid place-items-center">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {/* onboarding 01 */}
          <CarouselItem className="mt-[120px] flex flex-col items-center justify-center cursor-pointer">
            <Icons.logo className="mb-[25px]" />
            <Image
              className="mb-[63px]"
              src={OnBoardingImg01.src}
              width={282}
              height={206}
              alt="onboarding"
            />

            <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.03em] mb-5">
              나의 하루를 적어보세요!
            </h2>
            <p className="font-medium text-sm text-[#A0A0A0] tracking-[-0.03em] text-center mb-[29px]">
              오늘 하루 있었던 일이나 고민을 적고
              <br />
              이야기 나누고싶은 소울프렌즈를 고를 수 있어요
            </p>
          </CarouselItem>

          {/* onboarding 02 */}
          <CarouselItem className="mt-[97px] flex flex-col items-center justify-end cursor-pointer">
            <Image
              className="mb-[30px]"
              src={OnBoardingImg02.src}
              width={304}
              height={284}
              alt="onboarding"
            />
            <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.03em] mb-5">
              소울프렌즈가 내 일기를 분석하고 답장을 드려요
            </h2>
            <p className="font-medium text-sm text-[#A0A0A0] tracking-[-0.03em] text-center mb-[29px]">
              소울프렌즈가 내 감정을 분석하고 <br />
              답장과 함께 음악을 추천해 줄 거 에요
            </p>
          </CarouselItem>

          {/* onboarding 03 */}
          <CarouselItem className="mt-[91px] flex flex-col items-center justify-end cursor-pointer">
            <Image
              className="mb-[30px]"
              src={OnBoardingImg03.src}
              width={283}
              height={290}
              alt="onboarding"
            />
            <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.03em] mb-5">
              그럼 이제 일기쓰기를 시작해 볼까요?
            </h2>
            <p className="font-medium text-sm text-[#A0A0A0] tracking-[-0.03em] mb-[29px]">
              오늘 하루 당신의 이야기를 들려주세요 <br />
              소울프렌즈가 기다리고 있어요!
            </p>
          </CarouselItem>
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>
      {/* pagination */}
      <div className="flex justify-center items-center gap-x-[9.3px] mb-[30px]">
        <span
          className={cn(
            "size-[7px] rounded-full transition-colors",
            current === 1 ? "bg-[#333333]" : "bg-[#d9d9d9]"
          )}
        />
        <span
          className={cn(
            "size-[7px] rounded-full transition-colors",
            current === 2 ? "bg-[#333333]" : "bg-[#d9d9d9]"
          )}
        />
        <span
          className={cn(
            "size-[7px] rounded-full transition-colors",
            current === 3 ? "bg-[#333333]" : "bg-[#d9d9d9]"
          )}
        />
      </div>
    </div>
  )
}
