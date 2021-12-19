import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationName1639689522264 implements MigrationInterface {
    name = 'MigrationName1639689522264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`fechaFinVigencia\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`fechaFinVigencia\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` ADD \`fechaFinVigencia\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`informe_comentario\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`informe_comentario\` ADD \`fechaFinVigencia\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`variedad\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`variedad\` ADD \`fechaFinVigencia\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`informe\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`informe\` ADD \`fechaFinVigencia\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`productor\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`productor\` ADD \`fechaFinVigencia\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`finca\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`finca\` ADD \`fechaFinVigencia\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`encargado_finca\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`encargado_finca\` ADD \`fechaFinVigencia\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`encargado_finca\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`encargado_finca\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`finca\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`finca\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`productor\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`productor\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`informe\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`informe\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`variedad\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`variedad\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`informe_comentario\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`informe_comentario\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`fechaFinVigencia\` date NOT NULL`);
    }

}
