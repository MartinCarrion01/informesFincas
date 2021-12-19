import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationName1639685709116 implements MigrationInterface {
    name = 'MigrationName1639685709116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_8ce5845f6d50787572e3fa083e\` ON \`user\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_8ce5845f6d50787572e3fa083e\` ON \`user\` (\`dniUsuario\`)`);
    }

}
