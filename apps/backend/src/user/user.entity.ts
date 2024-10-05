import { Diary } from "@/diary/diary.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "varchar",
    length: 15,
    nullable: true,
    unique: true,
  })
  user_name: string

  @Column({ type: "varchar", length: 45, nullable: false, unique: true })
  email: string

  @Column({ type: "varchar", length: 45, nullable: false, unique: true })
  provider_id: string

  @Column({ type: "varchar", length: 15, nullable: false })
  provider: string

  @Column({
    type: "datetime",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  create_dt: Date

  @Column({ type: "text", nullable: true })
  refresh_token: string

  @OneToMany(() => Diary, (diary) => diary.user)
  diaries: Diary[]
}
