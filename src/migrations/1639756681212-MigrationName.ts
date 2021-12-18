import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationName1639756681212 implements MigrationInterface {
    name = 'MigrationName1639756681212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_d77c7370e5a816261a80d2feb7\` ON \`user\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_d77c7370e5a816261a80d2feb7\` ON \`user\` (\`legajoUsuario\`)`);
    }

}
