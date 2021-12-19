import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationName1639683731536 implements MigrationInterface {
    name = 'MigrationName1639683731536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`finca\` ADD UNIQUE INDEX \`IDX_9aa75d3ac9c5a17810676a90ae\` (\`coordenadasFinca\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`finca\` DROP INDEX \`IDX_9aa75d3ac9c5a17810676a90ae\``);
    }

}
