import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProblemsProblemsTags extends BaseSchema {
  protected tableName = 'problems_problems_tags'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      /**
       * Relational Columns
       */
      table.increments('id').primary()
      table.integer('problem_id').notNullable().unsigned().references('id').inTable('problems').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('problem_tag_id').notNullable().unsigned().references('id').inTable('problem_tags').onDelete('CASCADE').onUpdate('CASCADE')

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
