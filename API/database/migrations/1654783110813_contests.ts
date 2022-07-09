import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contests extends BaseSchema {
  protected tableName = 'contests'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      /**
       * Relational Columns
       */
      table.increments('id').primary()
      table.integer('type_id').notNullable().unsigned().references('id').inTable('contest_types').onDelete('CASCADE').onUpdate('CASCADE')

      /**
       * Non - Relational Columns
       */
      table.integer('contest_id').notNullable().unique()
      table.string('name').notNullable()
      table.string('phase').notNullable()
      table.boolean('frozen').notNullable()
      table.bigInteger('duration_seconds').notNullable()
      
      /**
       * Can be Null 
       */
      table.bigInteger('start_time_seconds').nullable()
      table.bigInteger('relative_time_seconds').nullable()
      table.string('prepared_by').nullable()
      table.string('website_url').nullable()
      table.string('description').nullable()
      table.integer('difficulty').nullable()
      table.string('kind').nullable()
      table.string('icpc_region').nullable()
      table.string('country').nullable()
      table.string('city').nullable()
      table.string('season').nullable()
      

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
