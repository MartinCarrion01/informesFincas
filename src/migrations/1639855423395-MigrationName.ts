import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationName1639855423395 implements MigrationInterface {
    name = 'MigrationName1639855423395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`informe\` ADD \`informeTitulo\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`informe\` DROP COLUMN \`informeTitulo\``);
    }

}
