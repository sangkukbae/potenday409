import "./globals.css"

import { Suspense } from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { NavigationEvents } from "@/components/navigation-events"
import { Providers } from "@/components/providers"

const pretendard = localFont({
  src: [
    {
      path: "./fonts/PretendardVariable.woff2",
      weight: "100 900", // Adjust based on your font's weight range
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap", // Improves performance by swapping the font after loading
})

export const metadata: Metadata = {
  title: "소울프렌즈",
  description: "오늘 하루 당신의 이야기를 들려주세요",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} antialiased`}>
        <Providers>
          <div className="flex flex-col w-full h-screen">
            <Header />
            <main className="flex-1 w-full max-w-screen-md mx-auto">
              {children}
            </main>
            <Footer />
            <Suspense fallback={null}>
              <NavigationEvents />
            </Suspense>
          </div>
        </Providers>
      </body>
    </html>
  )
}
