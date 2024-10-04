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
  },
]
