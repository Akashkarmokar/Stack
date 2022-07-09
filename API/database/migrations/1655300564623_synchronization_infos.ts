import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SynchronizationInfos extends BaseSchema {
  protected tableName = 'synchronization_infos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('last_codeforces_contest_id').nullable()
      table.integer('last_codeforces_problem_id').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })

    this.defer(async (db)=>{
      const initialRow = { last_codeforces_contest_id: 0,last_codeforces_problem_id:0};
      await db.table('synchronization_infos').insert(initialRow);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
