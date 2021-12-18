import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationName1639689085893 implements MigrationInterface {
    name = 'MigrationName1639689085893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`fechaAltaUsuario\``);
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` DROP COLUMN \`fechaEdicion\``);
        await queryRunner.query(`ALTER TABLE \`informe_comentario\` DROP COLUMN \`fechaIngresoInforme\``);
        await queryRunner.query(`ALTER TABLE \`informe\` DROP COLUMN \`fechaIngresoInforme\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`fechaIngreso\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`fechaIngreso\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` ADD \`fechaIngreso\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`informe_comentario\` ADD \`fechaIngreso\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`informe_comentario\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`variedad\` ADD \`fechaIngreso\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`variedad\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`informe\` ADD \`fechaIngreso\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`informe\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`productor\` ADD \`fechaIngreso\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`productor\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`finca\` ADD \`fechaIngreso\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`finca\` ADD \`fechaFinVigencia\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`encargado_finca\` ADD \`fechaIngreso\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`encargado_finca\` ADD \`fechaFinVigencia\` date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`encargado_finca\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`encargado_finca\` DROP COLUMN \`fechaIngreso\``);
        await queryRunner.query(`ALTER TABLE \`finca\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`finca\` DROP COLUMN \`fechaIngreso\``);
        await queryRunner.query(`ALTER TABLE \`productor\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`productor\` DROP COLUMN \`fechaIngreso\``);
        await queryRunner.query(`ALTER TABLE \`informe\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`informe\` DROP COLUMN \`fechaIngreso\``);
        await queryRunner.query(`ALTER TABLE \`variedad\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`variedad\` DROP COLUMN \`fechaIngreso\``);
        await queryRunner.query(`ALTER TABLE \`informe_comentario\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`informe_comentario\` DROP COLUMN \`fechaIngreso\``);
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` DROP COLUMN \`fechaIngreso\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`fechaIngreso\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`fechaFinVigencia\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP COLUMN \`fechaIngreso\``);
        await queryRunner.query(`ALTER TABLE \`informe\` ADD \`fechaIngresoInforme\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`informe_comentario\` ADD \`fechaIngresoInforme\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` ADD \`fechaEdicion\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`fechaAltaUsuario\` date NOT NULL`);
    }

}
