import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateChannels1635853762755 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "channels",
      columns: [
        {
          name: "id",
          type: "integer",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "increment",
        },
        {
          name: "guild_id",
          type: "int8",
        },
        {
          name: "channel_id",
          type: "int8",
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()",
        },
        {
          name: "updated_at",
          type: "timestamp",
          default: "now()",
        },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("channels");
  }

}
