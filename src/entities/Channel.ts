import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('channels')
class Channel {
  @PrimaryColumn()
  readonly id: number;

  @Column()
  guild_id: string;

  @Column()
  channel_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Channel };