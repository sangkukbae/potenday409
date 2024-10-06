// import { EmotionType, FriendType } from "@/types"

import { Icons } from "@/components/ui/icons"

export const SOUL_FRIENDS = [
  {
    name: "단짝이",
    icon: {
      on: <Icons.bestFriendS />,
      off: <Icons.bestFriendD />,
    },
    description: "발랄하고 친근한 공감의 대가",
    color: "#FFDC4C",
    bgColor: "#FFFBEA",
  },
  {
    name: "포근이",
    icon: {
      on: <Icons.cozyS />,
      off: <Icons.cozyD />,
    },
    description: "다정하고 따뜻한 위로의 대가",
    color: "#80CFEE",
    bgColor: "#EBF8FD",
  },
  {
    name: "열정이",
    icon: {
      on: <Icons.passionS />,
      off: <Icons.passionD />,
    },
    description: "쿨하고 열정적인 파이팅의 대가",
    color: "#FF7871",
    bgColor: "#FFF1F1",
  },
  {
    name: "차분이",
    icon: {
      on: <Icons.calmS />,
      off: <Icons.calmD />,
    },
    description: "시크하고 담백한 해결의 대가",
    color: "#918BD8",
    bgColor: "#EEEDFF",
  },
]

export const SOUL_FRIENDS_CARD_COLOR: Record<string, string> = {
  단짝이: "#FFFBEA",
  포근이: "#EBF8FD",
  열정이: "#FFF1F1",
  차분이: "#EEEDFF",
}

export const SOUL_FRIENDS_ICON: Record<
  string,
  (props: { className: string; onClick?: () => void }) => JSX.Element
> = {
  단짝이: (props: { className: string; onClick?: () => void }) => (
    <Icons.bestFriendS {...props} />
  ),
  포근이: (props: { className: string; onClick?: () => void }) => (
    <Icons.cozyS {...props} />
  ),
  열정이: (props: { className: string; onClick?: () => void }) => (
    <Icons.passionS {...props} />
  ),
  차분이: (props: { className: string; onClick?: () => void }) => (
    <Icons.calmS {...props} />
  ),
}

export const EMOTION_ICON: Record<
  string,
  (props: { className: string; onClick?: () => void }) => JSX.Element
> = {
  두려워: (props: { className: string; onClick?: () => void }) => (
    <Icons.afraid {...props} />
  ),
  화나: (props: { className: string; onClick?: () => void }) => (
    <Icons.angry {...props} />
  ),
  평범해: (props: { className: string; onClick?: () => void }) => (
    <Icons.common {...props} />
  ),
  신나: (props: { className: string; onClick?: () => void }) => (
    <Icons.excited {...props} />
  ),
  설레: (props: { className: string; onClick?: () => void }) => (
    <Icons.flutter {...props} />
  ),
  즐거워: (props: { className: string; onClick?: () => void }) => (
    <Icons.fun {...props} />
  ),
  기뻐: (props: { className: string; onClick?: () => void }) => (
    <Icons.good {...props} />
  ),
  행복해: (props: { className: string; onClick?: () => void }) => (
    <Icons.happy {...props} />
  ),
  슬퍼: (props: { className: string; onClick?: () => void }) => (
    <Icons.sad {...props} />
  ),
  놀라워: (props: { className: string; onClick?: () => void }) => (
    <Icons.surprising {...props} />
  ),
  피곤해: (props: { className: string; onClick?: () => void }) => (
    <Icons.tired {...props} />
  ),
  불쾌해: (props: { className: string; onClick?: () => void }) => (
    <Icons.unpleasant {...props} />
  ),
}

export const COOKIE_KEY = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
}
