import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveys1614262754364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "surveys",
                columns: [
                      {
                          name: "id",
								  type: "uuid"								  
								   
                      },

                ]

             }
            )
        )

        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
