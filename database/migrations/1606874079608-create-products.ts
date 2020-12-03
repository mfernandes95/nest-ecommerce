import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createProducts1606874079608 implements MigrationInterface {
    private table = new Table({
        name: 'products',
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
                name: 'name',
                type: 'varchar',
            },
            {
                name: 'description',
                type: 'varchar',
            },
            {
                name: 'price',
                type: 'float',
                // precision: 2
            },
            {
                name: 'images',
                type: 'varchar',
                isArray: true
            },
            {
                name: 'user_id',
                type: 'varchar',
                isNullable: true,
            },
            // {
            //     name: 'created_at',
            //     type: 'timestamp',
            //     default: 'CURRENT_TIMESTAMP'
            // }
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

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table)
        await queryRunner.createForeignKey('products', this.foreignKey)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }

}
