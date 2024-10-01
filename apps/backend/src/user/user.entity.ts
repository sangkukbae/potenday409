import { Diary } from "@/diary/diary.entity"
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 15, nullable: false, unique: true })
  user_name: string

  @Column({ type: "varchar", length: 45, nullable: false, unique: true })
  email: string

  @Column({ type: "varchar", length: 45, nullable: false, unique: true })
  provider_id: string

  @Column({ type: "varchar", length: 15, nullable: false })
  provider: string

  @CreateDateColumn({ type: "datetime", nullable: false })
  create_dt: Date = new Date()

  @OneToMany(() => Diary, (diary) => diary.user)
  diaries: Diary[]
}
