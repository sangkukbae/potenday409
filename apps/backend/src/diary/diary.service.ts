import { ClovaService } from "@/clova/clova.service"
import { CreateDiaryDto, UpdateDiaryDto } from "@/diary/dirary.dto"
import { UserService } from "@/user/user.service"
import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Between, Repository } from "typeorm"

import { Diary } from "./diary.entity"

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>,
    private readonly userService: UserService,
    private readonly clovaService: ClovaService
  ) {}

  async createDiary(diaryData: CreateDiaryDto) {
    const user = await this.userService.getUserById(diaryData.user_id)
    const diary = this.diaryRepository.create({ ...diaryData, user })
    const { reply_content, music_url, emotion, music_name } =
      await this.clovaService.generateResponse(
        diaryData.title,
        diaryData.character,
        diaryData.content
      )
    return this.diaryRepository.save({
      ...diary,
      reply_content,
      music_url,
      emotion,
      music_name,
    })
  }

  async getDiary(id: number) {
    const diary = await this.diaryRepository.findOne({
      where: { id },
    })
    if (!diary) {
      throw new BadRequestException("Not Found")
    }

    return diary
  }

  async updateDiary(id: number, updateData: UpdateDiaryDto) {
    const diary = await this.getDiary(id)
    const { reply_content, music_url, emotion, music_name } =
      await this.clovaService.generateResponse(
        diary.title,
        diary.character,
        diary.content
      )
    await this.diaryRepository.update(id, {
      ...updateData,
      reply_content,
      music_url,
      emotion,
      music_name,
    })

    return this.getDiary(id)
  }

  async updateDiaryHeart(id: number, heart: number) {
    await this.diaryRepository.update(id, { heart })
  }

  deleteDiary(id: number) {
    return this.diaryRepository.delete(id)
  }

  async find(userId: number, sort: string[], limit: number) {
    let order = {}

    // sort 배열에 따른 동적 정렬 설정
    if (sort.includes("recent")) {
      order = { create_dt: "DESC" } // 최신순
    } else if (sort.includes("old")) {
      order = { create_dt: "ASC" } // 오래된순
    }

    if (sort.includes("like")) {
      order = { ...order, heart: "DESC" }
    }

    const result = await this.diaryRepository.find({
      where: { user: { id: userId } },
      order,
      take: limit, // 가져올 데이터 수 제한
    })
    return result
  }

  async findMultiple({
    userId,
    year,
    month,
  }: {
    userId: number
    year: number
    month: number
  }) {
    const startDate = new Date(year, month - 1, 1) // 시작일 (해당 월의 1일)
    const endDate = new Date(year, month, 1) // 다음 월의 1일 (종료일은 포함하지 않음)

    const diaries = await this.diaryRepository.find({
      where: {
        user: { id: userId },
        create_dt: Between(startDate, endDate),
      },
    })

    const characterCount = diaries.reduce((acc, diary) => {
      acc[diary.character] = (acc[diary.character] || 0) + 1
      return acc
    }, {})

    const emotionCount = diaries.reduce((acc, diary) => {
      acc[diary.emotion] = (acc[diary.emotion] || 0) + 1
      return acc
    }, {})

    const mostCharacter = this.getMostFrequent(characterCount)
    const mostEmotion = this.getMostFrequent(emotionCount)

    return { diaries, mostCharacter, mostEmotion }
  }

  private getMostFrequent(counts: Record<string, number>): string | null {
    return Object.keys(counts).reduce(
      (a, b) => (counts[a] > counts[b] ? a : b),
      null
    )
  }
}
