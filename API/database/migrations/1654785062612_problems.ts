import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Problems extends BaseSchema {
  protected tableName = 'problems'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      /**
       * Relational Columns
       */
      table.increments('id').primary()
      table.integer('prefix_contest_id').notNullable().unsigned().references('id').inTable('contests').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('type_id').notNullable().unsigned().references('id').inTable('problem_types').onDelete('CASCADE').onUpdate('CASCADE')

      /**
       * Non - Relational Columns
       */
      table.integer('contest_id').notNullable()
      table.string('index').notNullable()
      table.string('name').notNullable()

      /**
       * Nullable Columns
       */
      table.float('points').nullable()
      table.float('rating').nullable()
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
