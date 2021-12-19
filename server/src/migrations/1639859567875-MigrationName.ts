import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationName1639859567875 implements MigrationInterface {
    name = 'MigrationName1639859567875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` ADD \`active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`informe_comentario\` ADD \`active\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`informe_comentario\` DROP COLUMN \`active\``);
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` DROP COLUMN \`active\``);
    }

}
