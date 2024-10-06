import { EmotionType, FriendType } from "@/types"

import { Icons } from "@/components/ui/icons"

export const SOUL_FRIENDS = [
  {
    name: "bestFriend",
    text: "단짝이",
    icon: {
      on: <Icons.bestFriendS />,
      off: <Icons.bestFriendD />,
    },
    description: "발랄하고 친근한 공감의 대가",
    color: "#FFDC4C",
    bgColor: "#FFFBEA",
  },
  {
    name: "cozy",
    text: "포근이",
    icon: {
      on: <Icons.cozyS />,
      off: <Icons.cozyD />,
    },
    description: "다정하고 따뜻한위로의 대가",
    color: "#80CFEE",
    bgColor: "#EBF8FD",
  },
  {
    name: "passion",
    text: "열정이",
    icon: {
      on: <Icons.passionS />,
      off: <Icons.passionD />,
    },
    description: "쿨하고 열정적인 파이팅의 대가",
    color: "#FF7871",
    bgColor: "#FFF1F1",
  },
  {
    name: "calm",
    text: "차분이",
    icon: {
      on: <Icons.calmS />,
      off: <Icons.calmD />,
    },
    description: "시크하고 담백한해결의 대가",
    color: "#918BD8",
    bgColor: "#EEEDFF",
  },
]

export const SOUL_FRIENDS_CARD_COLOR = {
  bestFriend: "#FFFBEA",
  cozy: "#EBF8FD",
  passion: "#FFF1F1",
  calm: "#EEEDFF",
}

export const SOUL_FRIENDS_ICON: Record<
  FriendType,
  (props: { className: string }) => JSX.Element
> = {
  bestFriend: (props: { className: string }) => (
    <Icons.bestFriendS {...props} />
  ),
  cozy: (props: { className: string }) => <Icons.cozyS {...props} />,
  passion: (props: { className: string }) => <Icons.passionS {...props} />,
  calm: (props: { className: string }) => <Icons.calmS {...props} />,
}

export const EMOTION_ICON: Record<
  EmotionType,
  (props: { className: string }) => JSX.Element
> = {
  afraid: (props: { className: string }) => <Icons.afraid {...props} />,
  angry: (props: { className: string }) => <Icons.angry {...props} />,
  common: (props: { className: string }) => <Icons.common {...props} />,
  excited: (props: { className: string }) => <Icons.excited {...props} />,
  flutter: (props: { className: string }) => <Icons.flutter {...props} />,
  fun: (props: { className: string }) => <Icons.fun {...props} />,
  good: (props: { className: string }) => <Icons.good {...props} />,
  happy: (props: { className: string }) => <Icons.happy {...props} />,
}

export const COOKIE_KEY = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
}
