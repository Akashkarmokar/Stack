import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ContestCategoriesContests extends BaseSchema {
  protected tableName = 'contest_categories_contests'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      /**
       * Relational Columns
       */
      table.increments('id').primary()
      table.integer('contest_category_id').notNullable().unsigned().references('id').inTable('contest_categories').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('contest_id').notNullable().unsigned().references('id').inTable('contests').onDelete('CASCADE').onUpdate('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
