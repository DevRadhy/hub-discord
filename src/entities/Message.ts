import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('messages')
class Message {
  @PrimaryColumn()
  readonly id: number;

  @Column()
  guild_id: string;

  @Column()
  message_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Message };