import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('messages')
class Message {
  @PrimaryColumn()
  readonly id: number;

  @Column()
  guild_id: number;

  @Column()
  message_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Message };