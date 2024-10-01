import { User } from "@/user/user.entity"
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

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
  context: string

  @Column({ type: "varchar", length: 45, nullable: true })
  music_url: string

  @Column({ type: "varchar", length: 45, nullable: true })
  emotion: string

  @Column({ type: "mediumtext", nullable: true })
  reply_context: string

  @Column({ type: "int", nullable: true, default: 0 })
  heart: number // 0 : 없음, 1:있음

  @CreateDateColumn({ type: "datetime", nullable: false })
  create_dt: Date

  @UpdateDateColumn({ type: "datetime", nullable: true })
  update_dt: Date
}
