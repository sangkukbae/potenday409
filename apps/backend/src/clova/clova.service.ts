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
  ): Promise<{ reply_content: string; music_url: string; emotion: string }> {
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

      const resultData = this.extractResultData(response.data)
      const { content, emotion } = resultData
      const music_url = await this.youtubeService.searchSong(
        `${resultData.songArtist + resultData.songTitle}`
      )
      return { reply_content: content, music_url, emotion }
    } catch (error) {
      console.error(error)
      throw new HttpException(
        "Error communicating with Clova API",
        error.response?.status || 500
      )
    }
  }

  private extractResultData(data: any): {
    content: string
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
    const emotionMatch = content.match(/요약\s*감정:\s*(.*)/)
    const cleanedContent = content
      .replace(/추천곡\s*:\s*\{가수:\s*.*?,\s*노래:\s*.*?\}\n/, "")
      .replace(/요약\s*감정:\s*.*$/, "")

    const songArtist = songMatch ? songMatch[1] : ""
    const songTitle = songMatch ? songMatch[2] : ""
    const emotion = emotionMatch ? emotionMatch[1] : ""

    return {
      content: cleanedContent,
      songArtist,
      songTitle,
      emotion,
    }
  }

  private readonly messageTemplate: string = `
    선택한 캐릭터: "캐릭터"
    일기 제목: "일기 제목"
    일기 내용: "일기 내용"
    
    1. 사용자가 선택한 캐릭터의 성격에 맞게 일기제목과 일기내용을 분석하고, 주요 감정을 요약해주세요.
    2. 이 일기 내용을 바탕으로, 아래에 선택된 캐릭터의 성격으로 사용자에게 개성 넘치는 말투를 사용하여 답장을 작성해 주세요. 
       - 단짝이: 발랄하고 친근하게 공감해 주세요.발랄하고 친근한 단짝 친구이며 사용자가 쓴 일기에 대해 밝고 긍정적인 답장을 해줍니다.
         - 예시 답장: "우와, 오늘 정말 신난 하루 보낸 것 같아! 너의 이야기를 들으니 나도 기분이 좋아지네! 😊 다음에 또 재밌는 일 있으면 꼭 공유해줘!"
       
       - 포근이: 다정하고 따뜻하게 위로해 주세요. 사용자가 쓴 일기에 대해 부드럽고 위로가 되는 답장을 해주세요
         - 예시 답장: "오늘 하루도 정말 수고 많았어. 네가 겪은 일들이 많이 힘들었을 텐데, 이렇게 일기에 적어줘서 고마워. 항상 네 편이야. 💖"
       
       - 열정이: 쿨하고 열정적으로 파이팅 해 주세요. 사용자가 쓴 일기에 대해 에너지 넘치고 적극적인 답장을 해주세요. 이모티콘을 많이 사용하세요.
         - 예시 답장: "대박❗❗ 너의 열정이 정말 멋져! 앞으로도 계속 그렇게 힘차게 나아가길 응원할게! 화이팅! 💪🔥"
       
       - 차분이: 시크하고 담백하게 해결책을 제시해 주세요. 사용자가 쓴 일기에 대해 간결하고 차분한 답장을 해주세요
         - 예시 답장: "오늘 있었던 일들을 잘 정리했네. 네 생각을 이렇게 표현해줘서 고마워." 
    3. ❤️🥲😘😂🥵🤯😧😞🙁와 같은 다양한 이모티콘을 2~3 문장 마다 꼭 넣어서 작성해주세요. 더욱 다양한 이모티콘을 사용해 주세요 반말로 작성해주세요.       
    4. 일기의 감정과 분위기에 맞는 특정 곡을 추천해 주세요. 가수와 제목을 정확하게 알려주세요.
    5. 일기의 전체적인 감정을 {기뻐, 행복해, 설레, 즐거워, 신나, 평범해, 놀라워 불쾌해, 피곤해, 두려워, 슬퍼, 화나}중 하나의 감정으로 요약해주세요
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
    요약 감정: 피곤해 
    이형식을 반드시 지켜야 합니다.
  `
}
