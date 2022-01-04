import {MigrationInterface, QueryRunner} from "typeorm";

export class initDb1641241122019 implements MigrationInterface {
    name = 'initDb1641241122019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_role\` (\`uuid\` varchar(36) NOT NULL, \`fechaIngreso\` datetime NOT NULL, \`fechaFinVigencia\` datetime NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`nombreUserRole\` varchar(255) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`uuid\` varchar(36) NOT NULL, \`fechaIngreso\` datetime NOT NULL, \`fechaFinVigencia\` datetime NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`dniUsuario\` int NOT NULL, \`userName\` varchar(255) NOT NULL, \`nombreUsuario\` varchar(255) NOT NULL, \`apellidoUsuario\` varchar(255) NOT NULL, \`legajoUsuario\` varchar(255) NOT NULL, \`password\` text NOT NULL, \`rolUuid\` varchar(36) NULL, UNIQUE INDEX \`IDX_da5934070b5f2726ebfd3122c8\` (\`userName\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`informe_comentario_edicion\` (\`uuid\` varchar(36) NOT NULL, \`fechaIngreso\` datetime NOT NULL, \`fechaFinVigencia\` datetime NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`descripcionPrevia\` varchar(300) NOT NULL, \`descripcionNueva\` varchar(300) NOT NULL, \`informeComentarioUuid\` varchar(36) NULL, \`usuarioEditorUuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`informe_comentario\` (\`uuid\` varchar(36) NOT NULL, \`fechaIngreso\` datetime NOT NULL, \`fechaFinVigencia\` datetime NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`descripcion\` varchar(300) NOT NULL, \`informeUuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`informe_cosecha_estimada\` (\`uuid\` varchar(36) NOT NULL, \`fechaIngreso\` datetime NOT NULL, \`fechaFinVigencia\` datetime NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`cantKgEstimadoCosecha\` int NOT NULL, \`fechaEstimadaCosecha\` date NOT NULL, \`informeUuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`variedad\` (\`uuid\` varchar(36) NOT NULL, \`fechaIngreso\` datetime NOT NULL, \`fechaFinVigencia\` datetime NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`nombreVariedad\` varchar(255) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`informe\` (\`uuid\` varchar(36) NOT NULL, \`fechaIngreso\` datetime NOT NULL, \`fechaFinVigencia\` datetime NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`codInforme\` int NOT NULL, \`informeTitulo\` varchar(255) NOT NULL, \`cantKgRealCosecha\` int NULL, \`fechaRealCosecha\` date NULL, \`fincaUuid\` varchar(36) NULL, \`variedadUuid\` varchar(36) NULL, \`usuarioRecorredorUuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`productor\` (\`uuid\` varchar(36) NOT NULL, \`fechaIngreso\` datetime NOT NULL, \`fechaFinVigencia\` datetime NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`nombreProductor\` varchar(255) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`finca\` (\`uuid\` varchar(36) NOT NULL, \`fechaIngreso\` datetime NOT NULL, \`fechaFinVigencia\` datetime NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`nombreFinca\` varchar(255) NOT NULL, \`coordenadasFinca\` varchar(255) NOT NULL, \`encargadoFincaUuid\` varchar(36) NULL, \`productorUuid\` varchar(36) NULL, UNIQUE INDEX \`REL_105a04088bbb0a1d0ee023d850\` (\`encargadoFincaUuid\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`encargado_finca\` (\`uuid\` varchar(36) NOT NULL, \`fechaIngreso\` datetime NOT NULL, \`fechaFinVigencia\` datetime NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`nombreEncargadoFinca\` varchar(255) NOT NULL, \`numeroEncargadoFinca\` varchar(255) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`finca_variedades_variedad\` (\`fincaUuid\` varchar(36) NOT NULL, \`variedadUuid\` varchar(36) NOT NULL, INDEX \`IDX_423b37d4ae278d303ce4e25d6c\` (\`fincaUuid\`), INDEX \`IDX_6c0c3bfa80e50d8c243ddee34f\` (\`variedadUuid\`), PRIMARY KEY (\`fincaUuid\`, \`variedadUuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_40d4dcf5a395b5ade0531997232\` FOREIGN KEY (\`rolUuid\`) REFERENCES \`user_role\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` ADD CONSTRAINT \`FK_4b859356ca6696619404f5be745\` FOREIGN KEY (\`informeComentarioUuid\`) REFERENCES \`informe_comentario\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` ADD CONSTRAINT \`FK_4dddb412b05bbb01a3ab8974462\` FOREIGN KEY (\`usuarioEditorUuid\`) REFERENCES \`user\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`informe_comentario\` ADD CONSTRAINT \`FK_0aed2d7b0832ef379a87d234a26\` FOREIGN KEY (\`informeUuid\`) REFERENCES \`informe\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`informe_cosecha_estimada\` ADD CONSTRAINT \`FK_edbf4616770675161661d041158\` FOREIGN KEY (\`informeUuid\`) REFERENCES \`informe\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`informe\` ADD CONSTRAINT \`FK_b2c50b9b51a6548249fc8d0e8ae\` FOREIGN KEY (\`fincaUuid\`) REFERENCES \`finca\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`informe\` ADD CONSTRAINT \`FK_8f97732aeb09564a24e88918754\` FOREIGN KEY (\`variedadUuid\`) REFERENCES \`variedad\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`informe\` ADD CONSTRAINT \`FK_3ad4d87f35b30e926bbc7ad3497\` FOREIGN KEY (\`usuarioRecorredorUuid\`) REFERENCES \`user\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`finca\` ADD CONSTRAINT \`FK_105a04088bbb0a1d0ee023d850c\` FOREIGN KEY (\`encargadoFincaUuid\`) REFERENCES \`encargado_finca\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`finca\` ADD CONSTRAINT \`FK_ed3a0741bb6b5e283fff7242f50\` FOREIGN KEY (\`productorUuid\`) REFERENCES \`productor\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`finca_variedades_variedad\` ADD CONSTRAINT \`FK_423b37d4ae278d303ce4e25d6cb\` FOREIGN KEY (\`fincaUuid\`) REFERENCES \`finca\`(\`uuid\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`finca_variedades_variedad\` ADD CONSTRAINT \`FK_6c0c3bfa80e50d8c243ddee34ff\` FOREIGN KEY (\`variedadUuid\`) REFERENCES \`variedad\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`finca_variedades_variedad\` DROP FOREIGN KEY \`FK_6c0c3bfa80e50d8c243ddee34ff\``);
        await queryRunner.query(`ALTER TABLE \`finca_variedades_variedad\` DROP FOREIGN KEY \`FK_423b37d4ae278d303ce4e25d6cb\``);
        await queryRunner.query(`ALTER TABLE \`finca\` DROP FOREIGN KEY \`FK_ed3a0741bb6b5e283fff7242f50\``);
        await queryRunner.query(`ALTER TABLE \`finca\` DROP FOREIGN KEY \`FK_105a04088bbb0a1d0ee023d850c\``);
        await queryRunner.query(`ALTER TABLE \`informe\` DROP FOREIGN KEY \`FK_3ad4d87f35b30e926bbc7ad3497\``);
        await queryRunner.query(`ALTER TABLE \`informe\` DROP FOREIGN KEY \`FK_8f97732aeb09564a24e88918754\``);
        await queryRunner.query(`ALTER TABLE \`informe\` DROP FOREIGN KEY \`FK_b2c50b9b51a6548249fc8d0e8ae\``);
        await queryRunner.query(`ALTER TABLE \`informe_cosecha_estimada\` DROP FOREIGN KEY \`FK_edbf4616770675161661d041158\``);
        await queryRunner.query(`ALTER TABLE \`informe_comentario\` DROP FOREIGN KEY \`FK_0aed2d7b0832ef379a87d234a26\``);
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` DROP FOREIGN KEY \`FK_4dddb412b05bbb01a3ab8974462\``);
        await queryRunner.query(`ALTER TABLE \`informe_comentario_edicion\` DROP FOREIGN KEY \`FK_4b859356ca6696619404f5be745\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_40d4dcf5a395b5ade0531997232\``);
        await queryRunner.query(`DROP INDEX \`IDX_6c0c3bfa80e50d8c243ddee34f\` ON \`finca_variedades_variedad\``);
        await queryRunner.query(`DROP INDEX \`IDX_423b37d4ae278d303ce4e25d6c\` ON \`finca_variedades_variedad\``);
        await queryRunner.query(`DROP TABLE \`finca_variedades_variedad\``);
        await queryRunner.query(`DROP TABLE \`encargado_finca\``);
        await queryRunner.query(`DROP INDEX \`REL_105a04088bbb0a1d0ee023d850\` ON \`finca\``);
        await queryRunner.query(`DROP TABLE \`finca\``);
        await queryRunner.query(`DROP TABLE \`productor\``);
        await queryRunner.query(`DROP TABLE \`informe\``);
        await queryRunner.query(`DROP TABLE \`variedad\``);
        await queryRunner.query(`DROP TABLE \`informe_cosecha_estimada\``);
        await queryRunner.query(`DROP TABLE \`informe_comentario\``);
        await queryRunner.query(`DROP TABLE \`informe_comentario_edicion\``);
        await queryRunner.query(`DROP INDEX \`IDX_da5934070b5f2726ebfd3122c8\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`user_role\``);
    }

}
