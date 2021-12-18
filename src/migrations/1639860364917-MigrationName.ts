import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationName1639860364917 implements MigrationInterface {
    name = 'MigrationName1639860364917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`informe_cosecha_estimada\` (\`uuid\` varchar(36) NOT NULL, \`fechaIngreso\` date NOT NULL, \`fechaFinVigencia\` datetime NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`cantKgEstimadoCosecha\` int NOT NULL, \`fechaEstimadaCosecha\` date NOT NULL, \`informeUuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`informe\` DROP COLUMN \`cantKgEstimadoCosecha\``);
        await queryRunner.query(`ALTER TABLE \`informe\` DROP COLUMN \`fechaEstimadaCosecha\``);
        await queryRunner.query(`ALTER TABLE \`informe_cosecha_estimada\` ADD CONSTRAINT \`FK_edbf4616770675161661d041158\` FOREIGN KEY (\`informeUuid\`) REFERENCES \`informe\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`informe_cosecha_estimada\` DROP FOREIGN KEY \`FK_edbf4616770675161661d041158\``);
        await queryRunner.query(`ALTER TABLE \`informe\` ADD \`fechaEstimadaCosecha\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`informe\` ADD \`cantKgEstimadoCosecha\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`informe_cosecha_estimada\``);
    }

}
