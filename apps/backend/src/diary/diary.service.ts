import { CreateDiaryDto, UpdateDiaryDto } from "@/diary/dirary.dto"
import { UserService } from "@/user/user.service"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Between, Repository } from "typeorm"

import { Diary } from "./diary.entity"

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private diaryRepository: Repository<Diary>,
    private userService: UserService
  ) {}

  async createDiary(diaryData: CreateDiaryDto) {
    const user = await this.userService.getUserById(diaryData.user_id)
    const diary = this.diaryRepository.create({ ...diaryData, user })
    return this.diaryRepository.save(diary)
  }

  updateDiary(id: number, updateData: UpdateDiaryDto) {
    return this.diaryRepository.update(id, updateData)
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

    return this.diaryRepository.find({
      where: {
        user: { id: userId },
        create_dt: Between(startDate, endDate),
      },
    })
  }
}
