import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createFiles1607030048590 implements MigrationInterface {

    private table = new Table({
        name: 'files',
        columns: [
            {
                name: 'id',
                // isGenerated: true,
                type: 'varchar',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            },
            {
                name: 'file',
                type: 'varchar',
            },
            {
                name: 'name',
                type: 'varchar',
            },
            {
                name: 'type',
                type: 'varchar',
            },
            {
                name: 'url',
                type: 'varchar',
            },
            {
                name: 'product_id',
                type: 'varchar',
                isNullable: true,
            },
            {
                name: 'user_id',
                type: 'varchar',
                isNullable: true,
            },
            {
                name: 'created_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            },
            {
                name: 'updated_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            },
        ]
    })

    private foreignKey = new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        referencedTableName: 'users',
    });

    private foreignKeyProduct = new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        referencedTableName: 'products',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table)
        await queryRunner.createForeignKey('files', this.foreignKey)
        await queryRunner.createForeignKey('files', this.foreignKeyProduct)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }

}

// file: {
//     type: String,
//         required: true,
//       },
// name: {
//     type: String,
//         required: true,
//       },
// type: {
//     type: String,
//         required: true,
//       },
// subtype: {
//     type: String,
//         required: true,
//       },
// user_id: {
//     type: Number,
//         // required: true,
//       },