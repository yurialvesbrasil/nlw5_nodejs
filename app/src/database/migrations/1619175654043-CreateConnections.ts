import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateConnections1619175654043 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "connections",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "admin_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "socket_id",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );

        //Criação da ForeignKey de forma separada
        await queryRunner.createForeignKey(
            "connections",
            new TableForeignKey({
                name: "FKConnectionUser",
                referencedTableName: "users",
                referencedColumnNames:["id"],
                columnNames:["user_id"],
                onDelete: "SET NULL", //Quando o usuário form removido esse campo vai ser setado como null
                onUpdate: "SET NULL"
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("connections", "FKConnectionUser");
        await queryRunner.dropTable("connections");
    }

}
