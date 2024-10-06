export type EmotionType =
  | "afraid"
  | "angry"
  | "common"
  | "excited"
  | "flutter"
  | "fun"
  | "good"
  | "happy"

export type FriendType = "bestFriend" | "cozy" | "passion" | "calm"

export interface UserInfo {
  create_dt: string
  id: number
  user_name: string
  email: string
  provider_id: string
  provider: string
  refresh_token: string
}

// Define the User interface
// interface User {
//   id: number;
//   user_name: string | null;
//   email: string;
//   provider_id: string;
//   provider: string;
//   create_dt: string; // ISO date string
//   refresh_token: string;
// }

// Define the main Post (or relevant) interface
export interface Diary {
  title: string
  character: string
  content: string
  user: UserInfo
  reply_content: string
  music_url: string
  emotion: string
  music_name: string
  heart: number
  update_dt: string | null // ISO date string or null
  id: number
  create_dt: string // ISO date string
}
