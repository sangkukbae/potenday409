import Link from "next/link"
import { OnBoardingSlider } from "@/components/on-boarding-slider"
import { SocialLoginButton } from "../_components/social-login-button"

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center mb-10">
      <OnBoardingSlider />
      <SocialLoginButton provider="kakao" />
      <SocialLoginButton provider="google" />
      <Link
        className="font-medium text-sm tracking-[-0.03em] text-[#A0A0A0] hover:underline hover:underline-offset-4"
        href="/diary"
      >
        홈으로 이동하기
      </Link>
    </div>
  )
}
