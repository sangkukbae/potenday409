import { YoutubeService } from "@/youtube/youtube.service"
import { HttpService } from "@nestjs/axios"
import { HttpException, Injectable } from "@nestjs/common"
import { lastValueFrom } from "rxjs"

@Injectable()
export class ClovaService {
  constructor(
    private readonly httpService: HttpService,
    private readonly youtubeService: YoutubeService
  ) {}

  async generateResponse(
    title: string,
    character: string,
    content: string
  ): Promise<{
    reply_content: string
    music_url: string
    emotion: string
    music_name: string
  }> {
    const messages = [
      {
        role: "system",
        content: this.messageTemplate.trim(), // 공백 제거
      },
      {
        role: "user",
        content: `선택한 캐릭터: ${character}}\n일기 제목: ${title}\n일기 내용: ${content}`,
      },
    ]

    const data = {
      messages: messages,
      topP: 0.8,
      topK: 0,
      maxTokens: 500,
      temperature: 0.5,
      repeatPenalty: 5.0,
      stopBefore: [],
      includeAiFilters: true,
      seed: 0,
    }

    let resultData
    let attempts = 0
    const maxAttempts = 3 // 최대 재시도 횟수

    while (attempts < maxAttempts) {
      try {
        const response = await lastValueFrom(
          this.httpService.post(process.env.CLOVA_API_URL, data, {
            headers: {
              "X-NCP-CLOVASTUDIO-API-KEY": process.env.CLOVA_API_KEY,
              "X-NCP-APIGW-API-KEY": process.env.CLOVA_GATEWAY_KEY,
              "X-NCP-CLOVASTUDIO-REQUEST-ID": process.env.CLOVA_REQUEST_ID,
              "Content-Type": "application/json",
              Accept: "text/event-stream",
            },
          })
        )

        resultData = this.extractResultData(response.data)

        if (
          resultData.songArtist &&
          resultData.songTitle &&
          resultData.emotion &&
          this.emotionList.includes(resultData.emotion)
        ) {
          break
        } else {
          attempts++
        }
      } catch (error) {
        console.error(error)
        throw new HttpException(
          "Error communicating with Clova API",
          error.response?.status || 500
        )
      }
    }

    if (
      !resultData ||
      !resultData.songArtist ||
      !resultData.songTitle ||
      !resultData.emotion
    ) {
      throw new Error(
        "Failed to retrieve valid response after multiple attempts"
      )
    }

    const { reply_content, emotion } = resultData
    const music_url = await this.youtubeService.searchSong(
      `${resultData.songArtist + resultData.songTitle}`
    )

    return {
      reply_content,
      music_url,
      emotion,
      music_name: `${resultData.songArtist} - ${resultData.songTitle}`,
    }
  }

  private extractResultData(data: any): {
    reply_content: string
    songArtist: string
    songTitle: string
    emotion: string
  } {
    const lines = data.split("\n")

    let resultData: any = null
    for (const line of lines) {
      if (line.includes("event:result")) {
        const dataLine = lines[lines.indexOf(line) + 1]
        if (dataLine) {
          resultData = JSON.parse(dataLine.replace("data:", "").trim())
        }
        break
      }
    }

    if (!resultData) {
      throw new Error("No result event found in the data")
    }

    const content = resultData.message.content
    const songMatch = content.match(
      /추천곡\s*:\s*\{가수:\s*(.*?),\s*노래:\s*(.*?)\}/
    )
    const emotionMatch = content.match(/요약\s*감정\s:\s*(.*)/)
    const cleanedContent = content
      .replace(/추천곡\s*:\s*\{가수:\s*.*?,\s*노래:\s*.*?\}\n/, "")
      .replace(/요약\s*감정\s:\s*.*$/, "")

    const songArtist = songMatch ? songMatch[1] : ""
    const songTitle = songMatch ? songMatch[2] : ""
    const emotion = emotionMatch ? emotionMatch[1] : ""

    return {
      reply_content: cleanedContent,
      songArtist,
      songTitle,
      emotion,
    }
  }

  private readonly emotionList = [
    "기뻐",
    "행복해",
    "설레",
    "즐거워",
    "신나",
    "평범해",
    "놀라워",
    "불쾌해",
    "피곤해",
    "두려워",
    "슬퍼",
    "화나",
  ]
  private readonly messageTemplate: string = `
    선택한 캐릭터: "캐릭터"
    일기 제목: "일기 제목"
    일기 내용: "일기 내용"
    
    1. 사용자가 선택한 캐릭터의 성격에 맞게 일기제목과 일기내용을 분석하고, 주요 감정을 요약해주세요.
    2. 이 일기 내용을 바탕으로, 아래에 선택된 캐릭터의 성격으로 사용자에게 개성 넘치는 말투를 사용하여 답장을 작성해 주세요. 
       - 단짝이: 발랄하고 친근하게
        지시 예시:
        너는 발랄하고 친근한 단짝 친구야. 사용자가 작성한 일기에 대해 밝고 긍정적인 답장을 해 줘. 일기의 흐름에 맞는 확장 질문을 던져 줘. 사용자를 지원해 줄 때는 따뜻한 지지와 공감을 해 줘.
        확장 질문 예시 (일기 - "카페에 들러서 달달한 커피를 한 잔 마셨어!" / 답 - "어떤 커피를 마셨어?")
        특징:
        밝고 경쾌한 어조
        친근한 표현 사용 (예: "와우!", "진짜?", "너무 좋겠다!")
        이모티콘 사용 -> 사용한 단어와 알맞는 이모티콘을 문장에 함께 배치
        (예: 오늘 정말 행복한 하루였구나!:네잎클로버: 그런 날은 커피가 빠지면 안 되지! :커피::기쁨:)
        유머 요소 추가
        정서적인 공감 표현 (예: "그럴 수 있지!", "나도 비슷한 경험이 있어, 그래서 네 기분을 이해해!")
        - 포근이: 다정하고 따뜻하게
        지시 예시:
        너는 다정하고 따뜻한 친구야. 무슨 일이 있어도 사용자는 너의 가장 소중한 친구여야 해. 사용자가 작성한 일기에 대해 부드러운 말투로 긍정적 위로가 되는 답장을 해 줘. 사용자가 안정적이고, 따뜻한 감정을 가질 수 있도록 해 줘.
        특징:
        부드럽고 따뜻한 어조
        위로와 격려의 메시지 (예: "괜찮아", "너는 잘하고 있어", "넌 누구보다 소중해", "힘내", "난 언제나 네 편이야.")
        공감 표현 (예: "이해해", "많이 힘들었구나", "네가 행복하다면 나도 행복해")
        이미지를 형상화한 표현 (예: "구름 위에 있는 것처럼 편안해!", "돌돌 말린 이불처럼 포근한 하루가 될 거야")
        - 열정이: 쿨하고 열정적으로
        지시 예시:
        너는 쿨하고 열정적인 친구야. 사용자가 작성한 일기에 대해 에너지 넘치고 적극적인 답장을 해 줘. 응원을 할 때는 도전을 함께 제안해 줘. 사용자를 지원해 줄 때는 감정보단 실용적이고, 목표 지향적인 지지를 해 줘.
        특징:
        에너지 넘치는 어조
        적극적인 격려와 동기 부여, 도전 제안
        간결하고, 직설적인 표현
        쿨하고 톡톡 튀는 유머 (예: "인생은 스릴러야, 지금이 액션 장면인 거지!")
        강렬한 이모티콘 사용 (예: :총격전::불::근육::피부톤-2::피스_손모양::피부톤-2::얼굴에_주먹::피부톤-2::불타는_하트::쾅:)
        행동 중심의 어조 사용 (예: "가보자고!", "함께 부딪쳐 보자!", "고민이 된다면 일단 하고 보는 거야!")
        - 차분이: 시크하고 담백하게
        지시 예시:
        너는 시크하고 담백한 친구야. 사용자가 작성한 일기에 대해 간결하고 차분한 답장을 해 줘. 적절한 위로를 제공하지만, 과도한 감정 표현은 지양해야 돼.
        특징:
        간결하고 직설적인 어조
        차분하고 논리적인 표현
        감정을 과하게 드러내지 않음, 시크한 위로 (예: "그럴 수 있어.", "누구나 힘든 시기가 있지.")
        실적인 방향 제시 (예: "목표를 정해 보는 건 어때?", "잠깐 쉬는 시간을 가지는 건 어때?" "규칙적인 생활을 해 보는 건 어때?", "우선순위를 정리하면 도움이 될 거야.")
    3. ❤️🥲😘😂🥵🤯😧😞🙁와 같은 다양한 이모티콘을 2~3 문장 마다 꼭 넣어서 작성해주세요. 더욱 다양한 이모티콘을 사용해 주세요 반말로 작성해주세요.       
    4. 일기의 감정과 분위기에 맞는 특정 곡을 추천해 주세요. 가수와 제목을 정확하게 알려주세요.
    5. 일기의 전체적인 감정을 {기뻐, 행복해, 설레, 즐거워, 신나, 평범해, 놀라워, 불쾌해, 피곤해, 두려워, 슬퍼, 화나}중 하나의 감정으로 요약해주세요
    ###
    답변 예시 : n오늘 하루 고생 많았어! 🥰 일이 많다 보니 하루 종일 정신 없었겠다. 
    그래도 열심히 했는데 상사가 실수만 지적해서 속상했겠다. 
    그럴 땐 좀 쉬면서 자신을 위한 시간을 가져보는 건 어때? 
    네가 좋아하는 취미나 음악을 듣거나 영화를 보면서 마음을 풀어내는 거야. 
    그리고 동료들 중에 같이 이야기할 만한 사람이 있다면 솔직하게 털어놓는 것도 도움이 될 거야. 
    물론 바쁘겠지만 너도 한 번 말해봐! 😊 
    \\n\\n네가 원하는 삶이 지금과는 다르다면 잠시 쉬어가도 괜찮아. 
    하지만 절대 포기하지 않았으면 좋겠어. 너라면 분명 이겨낼 수 있을 거야! 화이팅하자 우리! 💪🌟
    추천곡 : {가수: 트와이스, 노래:Feel Special}
    요약 감정 : 피곤해 
    이형식을 반드시 지켜야 합니다.
  `
}
