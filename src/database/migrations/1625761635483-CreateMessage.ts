import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMessage1625761635483 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "messages",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "increment",
        },
        {
          name: "guild_id",
          type: "varchar",
        },
        {
          name: "message_id",
          type: "varchar",
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
    await queryRunner.dropTable("messages");
  }

}
