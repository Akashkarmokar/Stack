import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Problem from './Problem'

export default class ProblemType extends BaseModel {
  /**
   * Relational Columns
   */
  @column({ isPrimary: true })
  public id: number
  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  /**
   * Model Relationships
   */
  @hasMany(()=>Problem,{
    foreignKey:'typeId'
  })
  public problems: HasMany<typeof Problem>
}
