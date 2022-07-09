import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Contest from './Contest'

export default class ContestType extends BaseModel {
  /**
   * Relational Columns
   */
  @column({ isPrimary: true })
  public id: number

  /**
   * Non Relational Columns
   */
  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * Relationships
   */
  @hasMany(()=>Contest,{
    foreignKey:'typeId'
  })
  public contests: HasMany<typeof Contest>
}
