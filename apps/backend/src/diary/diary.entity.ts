import { User } from "@/user/user.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Diary {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.diaries)
  user: User

  @Column({ type: "varchar", length: 45, nullable: false })
  title: string

  @Column({ type: "varchar", length: 15, nullable: false })
  character: string

  @Column({ type: "mediumtext", nullable: false })
  content: string

  @Column({ type: "varchar", length: 45, nullable: true })
  music_url: string

  @Column({ type: "varchar", length: 45, nullable: true })
  emotion: string

  @Column({ type: "mediumtext", nullable: true })
  reply_content: string

  @Column({ type: "int", nullable: true, default: 0 })
  heart: number // 0 : 없음, 1:있음

  @Column({
    type: "datetime",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  create_dt: Date

  @Column({ type: "datetime", nullable: true })
  update_dt: Date

  @Column({ type: "varchar", length: 45, nullable: true })
  music_name: string

  @Column({
    type: "datetime",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  save_dt: Date
}
