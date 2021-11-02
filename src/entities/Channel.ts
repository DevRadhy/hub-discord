import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('channels')
class Channels {
  @PrimaryColumn()
  readonly id: number;

  @Column()
  guild_id: number;

  @Column()
  channel_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Channels };